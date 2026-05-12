# Release Gates

## GitHub

- [ ] CI is green on the target branch
- [ ] PR includes verification steps
- [ ] New environment variables are documented
- [ ] Prisma changes are reviewed for migration impact

## Vercel

- [ ] Preview deployment succeeded
- [ ] Production build command still matches `vercel.json`
- [ ] Required env vars are present in the Vercel project
- [ ] `/api/health` returns healthy in the deployed environment

## Product / Ops

- [ ] Landing pages render with correct metadata
- [ ] Auth fallback path still works
- [ ] Checkout API responds as expected
- [ ] Admin routes remain operational
