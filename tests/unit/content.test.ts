import { describe, expect, it } from "vitest";

import { publicPages } from "@/content/routes";
import { content, contentProblems, publicPackages, type SiteContent } from "@/lib/content";

const thai = /[฀-๿]/;

/** Every { th, en } pair anywhere in the content, with its path. */
function localizedPairs(value: unknown, path = "content"): { path: string; th: string; en: string }[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => localizedPairs(item, `${path}[${index}]`));
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.th === "string" && typeof record.en === "string" && Object.keys(record).length === 2) {
      return [{ path, th: record.th, en: record.en }];
    }
    return Object.entries(record).flatMap(([key, item]) => localizedPairs(item, `${path}.${key}`));
  }
  return [];
}

describe("site content", () => {
  it("loads, validates and resolves every reference", () => {
    expect(contentProblems(content)).toEqual([]);
  });

  it("reports broken references instead of rendering around them", () => {
    const broken: SiteContent = structuredClone(content);
    broken.catalog[0].benefits.push("no-such-benefit");
    broken.pages.home.featured.packageIds = ["no-such-package"];
    broken.pages.home.mobile.columns[0].links[0].target = { kind: "page", path: "/monthy", hash: "no-such-section" };
    expect(contentProblems(broken)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('unknown benefit "no-such-benefit"'),
        expect.stringContaining('unknown package "no-such-package"'),
        expect.stringContaining('"/monthy#no-such-section" has no such section'),
      ]),
    );
  });

  it("has a document for every public page", () => {
    const documentPaths = [
      content.pages.home.path,
      ...content.pages.packages.map((doc) => doc.path),
      content.pages.solar.path,
      content.pages.contact.path,
      content.pages.agent.path,
      content.pages.terms.path,
    ].sort();
    expect(documentPaths).toEqual(publicPages.map((entry) => entry.path).sort());
  });

  it("keeps the in-page anchors that old links point to", () => {
    const sections = (path: string) => content.pages.packages.find((doc) => doc.path === path)!.sections.map((s) => s.id);
    expect(sections("/monthy")).toEqual(expect.arrayContaining(["internetpure", "socialInternet", "entertainment", "game"]));
    expect(sections("/topup")).toEqual(expect.arrayContaining(["internet", "internetcall", "call", "entertain", "game", "inssurance"]));
    expect(sections("/broadband-old")).toContain("cctv");
    expect(content.pages.solar.packages.id).toBe("solar");
  });

  it("writes every English string in English", () => {
    const pairs = localizedPairs(content);
    expect(pairs.length).toBeGreaterThan(300);
    const untranslated = pairs.filter((pair) => thai.test(pair.en)).map((pair) => `${pair.path}: ${pair.en}`);
    expect(untranslated).toEqual([]);
  });

  it("explains every imported package that needs the business to check it", () => {
    for (const item of content.catalog) {
      expect(item.review.notes.length, item.id).toBeGreaterThan(0);
      expect(item.source.file, item.id).toMatch(/^src\/datas\//);
    }
    const hidden = content.catalog.filter((item) => item.review.status === "hidden");
    expect(hidden.length).toBeGreaterThan(0);
    // Nothing is verified yet: prices and terms still need the business.
    expect(content.catalog.some((item) => item.review.status === "verified")).toBe(false);
  });

  it("keeps hidden packages off the public lists", () => {
    const visible = publicPackages("mobile-prepaid", "entertainment");
    expect(visible).toEqual([]);
    const boosts = publicPackages("broadband-existing", "speed-boost").map((item) => item.id);
    expect(boosts).toContain("boost-1000-500");
    expect(boosts).not.toContain("boost-1000-500-duplicate");
  });

  it("shows only regular prices above offer prices", () => {
    for (const item of content.catalog) {
      if (item.price.regularAmount !== undefined) expect(item.price.regularAmount, item.id).toBeGreaterThan(item.price.amount);
    }
  });
});
