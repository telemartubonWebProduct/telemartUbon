import type { RenderContext } from "../context";
import { RouterVisual } from "./RouterVisual";

const doc = "page:home" as const;

/** The Wi-Fi router, large, beside what visitors get with a package. */
export function EquipmentSection({ ctx }: { ctx: RenderContext }) {
  const { equipment } = ctx.content.pages.home;
  const visual = ctx.media(equipment.visual);
  return (
    <section aria-labelledby="equipment-heading" className="overflow-hidden py-14 lg:py-24" data-tone={equipment.tone} {...ctx.bind(doc, "equipment")}>
      <div className="tm-container grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <RouterVisual
          poster={visual}
          alt={ctx.t(visual.alt)}
          note={ctx.t(equipment.visualNote)}
          // The editor shows the poster, the 3D model's first frame, so the preview stays light.
          interactive={!ctx.edit}
          binds={{ visual: ctx.bind(doc, "equipment", "visual"), note: ctx.bind(doc, "equipment", "visualNote") }}
        />
        <div className="max-w-[34rem] lg:order-first">
          <h2 id="equipment-heading" className="tm-section-title" {...ctx.bind(doc, "equipment", "heading")}>
            {ctx.t(equipment.heading)}
          </h2>
          <p className="mt-4 text-tm-lead text-tm-muted" {...ctx.bind(doc, "equipment", "description")}>
            {ctx.t(equipment.description)}
          </p>
          {equipment.points.length > 0 ? (
            <ul role="list" className="mt-8 grid gap-5">
              {equipment.points.map((point) => {
                const bind = (...path: string[]) => ctx.bind(doc, "equipment", "points", point.id, ...path);
                return (
                  <li key={point.id} className="border-l-2 border-tm-red pl-4" {...bind()}>
                    <h3 className="text-tm-h4 font-semibold" {...bind("title")}>
                      {ctx.t(point.title)}
                    </h3>
                    <p className="mt-1 text-tm-muted" {...bind("description")}>
                      {ctx.t(point.description)}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
