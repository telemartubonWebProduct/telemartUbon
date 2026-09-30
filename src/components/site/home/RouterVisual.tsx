import Image from "next/image";

import type { MediaAsset } from "@/lib/content/schema";

import { RouterStage } from "./RouterStage";

type RouterVisualProps = { poster: MediaAsset; alt: string; note: string };

/**
 * The hero's one bold element. The poster is the image visitors see first and
 * whenever the 3D model cannot run; the frame keeps its size either way, so the
 * text and calls to action beside it never move.
 */
export function RouterVisual({ poster, alt, note }: RouterVisualProps) {
  return (
    <figure className="w-full">
      <div className="relative w-full" style={{ aspectRatio: `${poster.width} / ${poster.height}` }}>
        <RouterStage
          poster={
            <Image
              src={poster.src}
              alt={alt}
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="tm-reveal object-contain"
            />
          }
        />
      </div>
      <figcaption className="mt-2 text-center text-tm-caption text-tm-muted">{note}</figcaption>
    </figure>
  );
}
