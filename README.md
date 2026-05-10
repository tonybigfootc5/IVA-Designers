# IVA Web Platform

IVA is a greenfield `Next.js 15` learning platform scaffold for premium fashion education. This implementation establishes the production architecture shape: SSR marketing routes, a PWA shell, Prisma-backed relational domain modeling, dual-mode auth seams, protected playback APIs, PhonePe checkout scaffolding, live-class webhook surfaces, and separate public, student, and admin experiences.

## Stack

- `Next.js 15` with App Router and TypeScript
- `Tailwind CSS` with a custom "Resonant Stark" design system
- `Prisma` targeting `PostgreSQL`
- `NextAuth` with Google OAuth and phone OTP credentials flow
- PWA manifest plus service worker registration
- Service boundaries for `PhonePe`, `VdoCipher`, `Mux`, and device trust
- Delivery pipeline via `Graphify -> GitHub -> Vercel`

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run prisma:generate
npm run dev
```

If you want the database-backed flows, point `DATABASE_URL` at PostgreSQL and run:

```bash
npm run prisma:push
npm run prisma:seed
```

## Current Scope

- Public pages: home, courses, pricing, blog
- Auth page with Google SSO entry point and OTP demo flow
- Student surfaces: dashboard and course detail/player shell
- Admin surface: lean operational dashboard
- API routes for checkout, video access, progress, discussions, device reset, PhonePe webhooks, and Mux webhooks
- Health endpoint at `/api/health`
- Admin create flows for courses and live sessions
- Admin create flows for modules, lessons, and coupons
- Prisma schema covering users, linked identities, catalog, lessons, progress, orders, devices, certificates, and live sessions

## Graphify, GitHub, Vercel

### Graphify

Graphify planning artifacts now live in [graphify/README.md](/home/anycarwash/Desktop/clients/IVA/graphify/README.md:1) with staged execution briefs and release gates.
Integration linkage is tracked in [graphify/integrations.md](/home/anycarwash/Desktop/clients/IVA/graphify/integrations.md:1) and [graphify/workspace.json](/home/anycarwash/Desktop/clients/IVA/graphify/workspace.json:1).

### GitHub

The repo now includes:

- CI workflow at `.github/workflows/ci.yml`
- Vercel readiness workflow at `.github/workflows/vercel-env-check.yml`
- PR template
- issue templates
- `CODEOWNERS`
- Dependabot config
- Git remote `origin` set to `https://github.com/tonybigfootc5/IVA-Designers.git`

### Vercel

Deployment configuration now lives in [vercel.json](/home/anycarwash/Desktop/clients/IVA/vercel.json:1).
Link notes for the Vercel project are in [.vercel/README.md](/home/anycarwash/Desktop/clients/IVA/.vercel/README.md:1).

Expected Vercel environment variables are the same ones documented in `.env.example`. At minimum for safe app boot:

- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `APP_URL`
- `DATABASE_URL` for DB-backed mode

Recommended operational endpoint:

- `GET /api/health`

## Notes

- OTP verification is scaffolded with a development-safe demo path using `123456` until Firebase Admin credentials are wired in.
- Payment, DRM, and live integrations currently return structured placeholder payloads unless real provider secrets are present.
- The current middleware protects `/dashboard`, `/learn/*`, and `/admin`; add role-aware admin enforcement once production auth persistence is enabled.
