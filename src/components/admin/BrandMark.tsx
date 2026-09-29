import Image from "next/image";

// The red wordmark sits on white; on ink surfaces it gets a white chip so the
// brand colours stay true.
export function BrandMark({ onInk = false }: { onInk?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={
          onInk ? "inline-flex rounded-tm-control bg-tm-canvas px-2.5 py-1.5" : "inline-flex"
        }
      >
        <Image src="/logo.webp" alt="Telemart" width={258} height={92} className="h-9 w-auto" priority />
      </span>
      <span className={onInk ? "text-tm-small font-semibold text-white/80" : "text-tm-small font-semibold text-tm-muted"}>
        หลังบ้าน
      </span>
    </span>
  );
}
