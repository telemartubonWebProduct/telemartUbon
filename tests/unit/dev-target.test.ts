import { describe, expect, it } from "vitest";

import {
  DEV_ORGANIZATION_ID,
  DEV_PROJECT_REF,
  devTargetProblem,
} from "../../scripts/supabase/dev-target.mjs";

describe("dev migration target", () => {
  it("accepts the dev project in the telemart-ubon organization", () => {
    expect(
      devTargetProblem({ ref: DEV_PROJECT_REF, organization_id: DEV_ORGANIZATION_ID, status: "ACTIVE_HEALTHY" }),
    ).toBeNull();
    expect(devTargetProblem({ id: DEV_PROJECT_REF, organization_slug: DEV_ORGANIZATION_ID })).toBeNull();
    expect(
      devTargetProblem({ ref: DEV_PROJECT_REF, organization_id: "7", organization_slug: DEV_ORGANIZATION_ID }),
    ).toBeNull();
  });

  it("refuses a project in any other organization", () => {
    expect(devTargetProblem({ ref: DEV_PROJECT_REF, organization_id: "truefiberhome" })).toMatch(
      /belongs to organization 'truefiberhome'/,
    );
    expect(devTargetProblem({ ref: DEV_PROJECT_REF })).toMatch(/organization 'unknown'/);
  });

  it("refuses a different project or an unexpected response", () => {
    expect(devTargetProblem({ ref: "abcdefghijklmnopqrst", organization_id: DEV_ORGANIZATION_ID })).toMatch(
      /returned project 'abcdefghijklmnopqrst'/,
    );
    expect(devTargetProblem({ organization_id: DEV_ORGANIZATION_ID })).toMatch(/returned project 'undefined'/);
    expect(devTargetProblem(null)).toMatch(/did not return a project/);
    expect(devTargetProblem("wdcbbjvxrcxuaabcipqo")).toMatch(/did not return a project/);
  });
});
