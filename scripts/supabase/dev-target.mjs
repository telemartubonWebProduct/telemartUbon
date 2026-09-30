// The only Supabase project this repository may push migrations to.
export const DEV_PROJECT_REF = "wdcbbjvxrcxuaabcipqo";
// Organization telemart-ubon. Projects in any other organization (including truefiberhome) are refused.
export const DEV_ORGANIZATION_ID = "pfvlbpujcoqiqziehstu";

/**
 * Checks a Management API `GET /v1/projects/{ref}` response against the dev target.
 *
 * @param {unknown} project
 * @returns {string | null} why the project is refused, or null when it is the dev project
 */
export function devTargetProblem(project) {
  if (typeof project !== "object" || project === null) {
    return "the Management API did not return a project";
  }
  const { ref, id, organization_id: organizationId, organization_slug: organizationSlug } =
    /** @type {Record<string, unknown>} */ (project);

  const actualRef = ref ?? id;
  if (actualRef !== DEV_PROJECT_REF) {
    return `the Management API returned project '${String(actualRef)}', expected '${DEV_PROJECT_REF}'`;
  }

  const organizations = [organizationId, organizationSlug].filter((value) => value != null);
  if (!organizations.includes(DEV_ORGANIZATION_ID)) {
    const actual = organizations.map(String).join(" / ") || "unknown";
    return `project ${DEV_PROJECT_REF} belongs to organization '${actual}', expected '${DEV_ORGANIZATION_ID}' (telemart-ubon)`;
  }
  return null;
}
