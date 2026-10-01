import { describe, expect, it } from "vitest";

import { renderContext } from "@/components/site/context";
import { content } from "@/lib/content";
import { documentIds, documentSchema, isDocumentId, readDocument, writeDocument } from "@/lib/content/documents";
import { decodeBinding, encodeBinding, getAt, setAt } from "@/lib/content/paths";

describe("content documents", () => {
  it("split the content into documents that each satisfy their own schema", () => {
    const ids = documentIds(content);
    expect(ids).toContain("site");
    expect(ids).toContain("page:home");
    expect(ids).toContain("package:fiber-500-499");
    expect(ids).toContain("media:router-concept");
    expect(ids.length).toBe(1 + 9 + content.catalog.length + Object.keys(content.media).length + Object.keys(content.benefits).length);
    for (const id of ids) {
      expect(isDocumentId(id), id).toBe(true);
      expect(documentSchema(id).safeParse(readDocument(content, id)).success, id).toBe(true);
    }
  });

  it("replace one document without touching the others", () => {
    const home = readDocument(content, "page:home") as typeof content.pages.home;
    const edited = writeDocument(content, "page:home", { ...home, equipment: { ...home.equipment, tone: "ink" } });
    expect(edited.pages.home.equipment.tone).toBe("ink");
    expect(content.pages.home.equipment.tone).toBe("canvas");
    expect(edited.pages.solar).toBe(content.pages.solar);
    expect(edited.catalog).toBe(content.catalog);

    const item = content.catalog[0];
    const repriced = writeDocument(content, `package:${item.id}`, { ...item, price: { ...item.price, amount: 1 } });
    expect(repriced.catalog[0].price.amount).toBe(1);
    expect(repriced.catalog[1]).toBe(content.catalog[1]);
    expect(() => writeDocument(content, "package:no-such-package", item)).toThrow();
  });

  it("reject ids that are not documents", () => {
    for (const id of ["", "page:unknown", "package:Upper", "media:", "site/extra", "pages:home"]) expect(isDocumentId(id), id).toBe(false);
  });
});

describe("field bindings", () => {
  const home = content.pages.home;

  it("encode and decode document paths", () => {
    expect(encodeBinding("page:home", ["faq", "items", "nationwide", "answer"])).toBe("page:home/faq/items/nationwide/answer");
    expect(decodeBinding("page:home/faq/items/nationwide/answer")).toEqual({
      documentId: "page:home",
      path: ["faq", "items", "nationwide", "answer"],
    });
    expect(decodeBinding("page:nowhere/hero")).toBeNull();
    expect(decodeBinding("page:home//hero")).toBeNull();
  });

  it("address list items by id, and plain lists by index", () => {
    expect(getAt(home, ["faq", "items", "nationwide", "question"])).toEqual(home.faq.items[1].question);
    expect(getAt(home, ["faq", "items", "1"])).toBeUndefined();
    const notes = content.pages.packages[0].sections[0].notes;
    expect(getAt(content.pages.packages[0], ["sections", "packages", "notes", "1"])).toEqual(notes[1]);
    expect(getAt(content.site, ["contact", "phones", "0", "number"])).toBe(content.site.contact.phones[0].number);
    expect(getAt(home, ["hero", "nothing"])).toBeUndefined();
  });

  it("set a value with structural sharing, and refuse paths that do not exist", () => {
    const next = setAt(home, ["faq", "items", "nationwide", "answer", "en"], "Yes.") as typeof home;
    expect(next.faq.items[1].answer.en).toBe("Yes.");
    expect(next.faq.items[1].answer.th).toBe(home.faq.items[1].answer.th);
    expect(next.faq.items[0]).toBe(home.faq.items[0]);
    expect(next.hero).toBe(home.hero);
    expect(home.faq.items[1].answer.en).not.toBe("Yes.");
    expect(() => setAt(home, ["faq", "items", "no-such-item", "answer"], "x")).toThrow();
    expect(() => setAt(home, ["nothing", "deeper"], "x")).toThrow();
    const cleared = setAt(content.catalog[0], ["audience"], undefined) as Record<string, unknown>;
    expect("audience" in cleared).toBe(false);
  });

  it("appear in the markup only inside the editor", () => {
    expect(renderContext(content, "th").bind("page:home", "hero", "heading")).toEqual({});
    expect(renderContext(content, "th", { edit: true }).bind("page:home", "hero", "heading")).toEqual({
      "data-edit": "page:home/hero/heading",
    });
  });
});
