import Image from "next/image";

import type { MediaAsset } from "@/lib/content/schema";

import { RouterStage } from "./RouterStage";

type Binding = { "data-edit"?: string };

type RouterVisualProps = {
  poster: MediaAsset;
  alt: string;
  note: string;
  /** False in the Mirror editor: only the poster, no 3D model. */
  interactive?: boolean;
  binds?: { visual?: Binding; note?: Binding };
};

/**
 * The router, large. The poster is the image visitors see first and whenever
 * the 3D model cannot run; the frame keeps its size either way, so the text
 * beside it never moves.
 */
export function RouterVisual({ poster, alt, note, interactive = true, binds = {} }: RouterVisualProps) {
  const image = (
    <Image src={poster.src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
  );
  return (
    <figure className="w-full">
      <div className="relative w-full" style={{ aspectRatio: `${poster.width} / ${poster.height}` }} {...binds.visual}>
        {interactive ? <RouterStage poster={image} /> : <div className="absolute inset-0" data-router-stage="poster">{image}</div>}
      </div>
      <figcaption className="mt-2 text-center text-tm-caption text-tm-muted" {...binds.note}>
        {note}
      </figcaption>
    </figure>
  );
}
