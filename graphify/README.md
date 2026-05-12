# Graphify Workspace

This folder is the repo-native planning companion for IVA's delivery pipeline:

`Graphify -> GitHub -> Vercel`

It is organized so the product roadmap, implementation staging, and release gates live next to the codebase and can be referenced in PRs, tickets, and deployment reviews.

## Structure

- `workspace.json`: high-level project metadata and stage map
- `stages/`: stage-by-stage execution briefs
- `checklists/`: release and launch readiness gates

## Recommended Workflow

1. Capture scope in the relevant `stages/*.md` file.
2. Convert implementation work into GitHub issues or PRs.
3. Use the CI workflow to validate every branch.
4. Let Vercel handle preview and production deployments after GitHub merge.
