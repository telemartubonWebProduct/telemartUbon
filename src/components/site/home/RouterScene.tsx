"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import {
  BufferAttribute,
  CanvasTexture,
  CapsuleGeometry,
  Color,
  ExtrudeGeometry,
  MathUtils,
  OrthographicCamera,
  PMREMGenerator,
  RingGeometry,
  Shape,
  Vector3,
  type Group,
  type Texture,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { antenna, body, camera as view, leds, rings, vents, viewAxes } from "./router-geometry";

// The hero's concept router as a procedural three.js model. It renders on
// demand: one intro turn, then it rests until a visitor drags it, and it stops
// when the hero is off screen (the stage sets `active`). No files are loaded;
// the studio lighting is three's RoomEnvironment.

const axes = viewAxes();
const introSeconds = 2.6;
const maxDragYaw = 0.5;
const white = "#f3f3f5";
// Studio balance: soft room reflections, one key light from the front left, so
// the top reads brightest, the front a step darker and the right side darkest.
const lighting = { environment: 0.32, ambient: 0.25, key: 2.2, keyPosition: [-3, 6, 4] as [number, number, number], fill: 0.35 };

function roundedRect(width: number, depth: number, radius: number) {
  const shape = new Shape();
  const x = width / 2;
  const y = depth / 2;
  shape.moveTo(-x + radius, -y);
  shape.lineTo(x - radius, -y);
  shape.quadraticCurveTo(x, -y, x, -y + radius);
  shape.lineTo(x, y - radius);
  shape.quadraticCurveTo(x, y, x - radius, y);
  shape.lineTo(-x + radius, y);
  shape.quadraticCurveTo(-x, y, -x, y - radius);
  shape.lineTo(-x, -y + radius);
  shape.quadraticCurveTo(-x, -y, -x + radius, -y);
  return shape;
}

function useBodyGeometry() {
  return useMemo(() => {
    const bevel = 0.035;
    const geometry = new ExtrudeGeometry(roundedRect(body.width - 2 * bevel, body.depth - 2 * bevel, body.cornerRadius - bevel), {
      depth: body.height - 2 * bevel,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4,
      curveSegments: 16,
    });
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, bevel, 0);
    return geometry;
  }, []);
}

/** Rings on the floor whose far side fades, like the poster's gradient stroke. */
function useRingGeometries() {
  return useMemo(
    () =>
      rings.map(({ radius, width }) => {
        const geometry = new RingGeometry(radius - width / 2, radius + width / 2, 160, 1);
        geometry.rotateX(-Math.PI / 2);
        const red = new Color("#e60012"); // converted to the linear working space
        const position = geometry.attributes.position;
        const colors = new Float32Array(position.count * 4);
        const reach = radius * Math.hypot(axes.up[0], axes.up[2]);
        for (let index = 0; index < position.count; index++) {
          const up = position.getX(index) * axes.up[0] + position.getZ(index) * axes.up[2];
          const t = MathUtils.clamp((up / reach + 1) / 2, 0, 1); // 0 at the front, 1 at the back
          const alpha = t < 0.5 ? MathUtils.lerp(1, 0.7, t * 2) : MathUtils.lerp(0.7, 0.25, (t - 0.5) * 2);
          colors.set([red.r, red.g, red.b, alpha], index * 4);
        }
        geometry.setAttribute("color", new BufferAttribute(colors, 4));
        return geometry;
      }),
    [],
  );
}

function useShadowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d")!;
    const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(0,0,0,0.34)");
    gradient.addColorStop(0.55, "rgba(0,0,0,0.2)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    return new CanvasTexture(canvas);
  }, []);
}

function Lights() {
  return (
    <>
      <ambientLight intensity={lighting.ambient} />
      <directionalLight position={lighting.keyPosition} intensity={lighting.key} />
      <directionalLight position={[4, 2, -3]} intensity={lighting.fill} />
    </>
  );
}

/** Orthographic camera framed exactly like the poster's viewBox (fixed frustum). */
function makeCamera() {
  const camera = new OrthographicCamera(-view.viewWidth / 2, view.viewWidth / 2, view.viewHeight / 2, -view.viewHeight / 2, 0.1, 60);
  const target = new Vector3(...axes.up).multiplyScalar(view.centreUp);
  camera.position.copy(target).addScaledVector(new Vector3(...axes.dir), 20);
  camera.lookAt(target);
  camera.updateProjectionMatrix();
  // Fiber keeps its hands off a camera marked manual (no resize to pixels).
  return Object.assign(camera, { manual: true });
}

type DragState = { yaw: number };

function Router({ drag, onFirstFrame }: { drag: RefObject<DragState>; onFirstFrame: () => void }) {
  const group = useRef<Group>(null);
  const ringGroup = useRef<Group>(null);
  const started = useRef<number | null>(null);
  const reported = useRef(false);
  const invalidate = useThree((state) => state.invalidate);
  const bodyGeometry = useBodyGeometry();
  const shadow = useShadowTexture();
  const ringGeometries = useRingGeometries();
  const antennaGeometry = useMemo(() => new CapsuleGeometry(antenna.width / 2, antenna.top - antenna.bottom - antenna.width, 8, 20), []);

  useFrame((state, delta) => {
    if (!group.current || !ringGroup.current) return;
    if (!reported.current) {
      reported.current = true;
      onFirstFrame();
    }
    started.current ??= state.clock.elapsedTime;
    const progress = Math.min(1, (state.clock.elapsedTime - started.current) / introSeconds);
    const eased = Math.sin(progress * Math.PI);
    // The one orchestrated moment: a small turn that shows the side, then rest.
    const desired = drag.current.yaw - 0.22 * eased;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, desired, 7, delta);
    ringGroup.current.scale.setScalar(1 + 0.035 * eased);
    if (progress < 1 || Math.abs(group.current.rotation.y - desired) > 0.0005) invalidate();
  });

  const centreX = (index: number, first: number, step: number) => first + index * step;

  return (
    <>
      <group ref={ringGroup} position={[0, 0.002, 0]}>
        {ringGeometries.map((geometry, index) => (
          <mesh key={index} geometry={geometry} renderOrder={1}>
            <meshBasicMaterial vertexColors transparent opacity={rings[index].opacity} depthWrite={false} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={group}>
        <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[body.width * 1.25, body.depth * 1.45, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={shadow} transparent depthWrite={false} toneMapped={false} />
        </mesh>
        <mesh geometry={bodyGeometry}>
          <meshPhysicalMaterial color={white} roughness={0.42} clearcoat={0.35} clearcoatRoughness={0.3} />
        </mesh>
        {antenna.xs.map((x) => (
          <mesh key={x} geometry={antennaGeometry} position={[x, (antenna.bottom + antenna.top) / 2, antenna.z]} scale={[1, 1, antenna.thickness / antenna.width]}>
            <meshPhysicalMaterial color={white} roughness={0.45} clearcoat={0.25} />
          </mesh>
        ))}
        {Array.from({ length: vents.count }, (_, index) => (
          <mesh key={index} position={[centreX(index, vents.firstX, vents.step), body.height + 0.002, (vents.zFrom + vents.zTo) / 2]}>
            <boxGeometry args={[vents.width, 0.004, vents.zTo - vents.zFrom]} />
            <meshStandardMaterial color="#d6d6db" roughness={0.9} />
          </mesh>
        ))}
        {Array.from({ length: leds.count }, (_, index) => (
          <mesh key={index} position={[centreX(index, leds.firstX, leds.step), leds.y, body.depth / 2]}>
            <sphereGeometry args={[leds.radius, 12, 12]} />
            <meshStandardMaterial color="#9f9fa9" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </>
  );
}

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type RouterSceneProps = {
  /** False while the hero is off screen or the tab is hidden: nothing renders. */
  active: boolean;
  onReady: () => void;
  onFail: () => void;
};

export default function RouterScene({ active, onReady, onFail }: RouterSceneProps) {
  const drag = useRef<DragState>({ yaw: 0 });
  const pointer = useRef<{ id: number; x: number; yaw: number } | null>(null);
  const invalidateRef = useRef<() => void>(() => {});
  const environment = useRef<Texture | null>(null);
  const camera = useMemo(() => makeCamera(), []);
  useEffect(() => () => environment.current?.dispose(), []);

  const release = () => {
    pointer.current = null;
    drag.current.yaw = 0;
    invalidateRef.current();
  };

  return (
    <SceneBoundary onError={onFail}>
      <div
        className="h-full w-full cursor-grab active:cursor-grabbing"
        // Vertical swipes keep scrolling the page; only sideways drags turn the model.
        style={{ touchAction: "pan-y" }}
        onPointerDown={(event) => {
          pointer.current = { id: event.pointerId, x: event.clientX, yaw: drag.current.yaw };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const start = pointer.current;
          if (!start || start.id !== event.pointerId) return;
          drag.current.yaw = MathUtils.clamp(start.yaw + (event.clientX - start.x) * 0.006, -maxDragYaw, maxDragYaw);
          invalidateRef.current();
        }}
        onPointerUp={release}
        onPointerCancel={release}
      >
        <Canvas
          orthographic
          flat
          frameloop={active ? "demand" : "never"}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          camera={camera}
          onCreated={(state) => {
            invalidateRef.current = state.invalidate;
            // Studio lighting without files: three's RoomEnvironment, prefiltered once.
            const pmrem = new PMREMGenerator(state.gl);
            environment.current = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
            pmrem.dispose();
            state.scene.environment = environment.current;
            state.scene.environmentIntensity = lighting.environment;
            state.gl.domElement.addEventListener(
              "webglcontextlost",
              (event) => {
                event.preventDefault();
                onFail();
              },
              { once: true },
            );
          }}
        >
          <Lights />
          <Router drag={drag} onFirstFrame={onReady} />
        </Canvas>
      </div>
    </SceneBoundary>
  );
}
