"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

// three.js loads only when the 3D model will actually run, after the page is
// idle, so the headline and calls to action never wait for it.
const RouterScene = dynamic(() => import("./RouterScene"), { ssr: false });

type StageState = "poster" | "loading" | "ready" | "fallback";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Motion allowed, data not saved, WebGL2 available. */
function canRun3d(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData || /2g$/.test(connection?.effectiveType ?? "")) return false;
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

function whenIdle(callback: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(callback, 600);
  return () => window.clearTimeout(handle);
}

/**
 * Shows the poster, and swaps in the 3D router once it has rendered its first
 * frame. Reduced motion, Save-Data, missing WebGL2 or a lost GPU context keep
 * the poster. The model renders only while the hero is on screen.
 */
export function RouterStage({ poster }: { poster: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<StageState>("poster");
  const [onScreen, setOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    if (!canRun3d() || !frame.current) return;
    let cancelIdle: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting && !cancelIdle) cancelIdle = whenIdle(() => setState((current) => (current === "poster" ? "loading" : current)));
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(frame.current);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      cancelIdle?.();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const showScene = state === "loading" || state === "ready";
  return (
    <div ref={frame} className="absolute inset-0" data-router-stage={state} data-active={showScene && onScreen && pageVisible ? "true" : "false"}>
      <div className={`absolute inset-0 transition-opacity duration-500 ${state === "ready" ? "opacity-0" : "opacity-100"}`}>{poster}</div>
      {showScene ? (
        <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-500 ${state === "ready" ? "opacity-100" : "opacity-0"}`}>
          <RouterScene active={onScreen && pageVisible} onReady={() => setState("ready")} onFail={() => setState("fallback")} />
        </div>
      ) : null}
    </div>
  );
}
