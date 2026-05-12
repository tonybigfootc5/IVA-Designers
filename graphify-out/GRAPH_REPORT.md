# Graph Report - .  (2026-05-11)

## Corpus Check
- Corpus is ~12,206 words - fits in a single context window. You may not need a graph.

## Summary
- 185 nodes · 180 edges · 14 communities detected
- Extraction: 78% EXTRACTED · 21% INFERRED · 1% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin Data Operations|Admin Data Operations]]
- [[_COMMUNITY_Platform Architecture Plan|Platform Architecture Plan]]
- [[_COMMUNITY_Release Workflow Gates|Release Workflow Gates]]
- [[_COMMUNITY_Catalog And Discussion|Catalog And Discussion]]
- [[_COMMUNITY_Authentication Users|Authentication Users]]
- [[_COMMUNITY_Launch Scale Monitoring|Launch Scale Monitoring]]
- [[_COMMUNITY_Dashboard Metrics Utils|Dashboard Metrics Utils]]
- [[_COMMUNITY_Device Trust Logic|Device Trust Logic]]
- [[_COMMUNITY_Video Access Control|Video Access Control]]
- [[_COMMUNITY_File Document Icon|File Document Icon]]
- [[_COMMUNITY_Global Reach Icon|Global Reach Icon]]
- [[_COMMUNITY_Browser Window Icon|Browser Window Icon]]
- [[_COMMUNITY_Next.js Branding|Next.js Branding]]
- [[_COMMUNITY_Vercel Branding|Vercel Branding]]

## God Nodes (most connected - your core abstractions)
1. `POST()` - 24 edges
2. `GET()` - 18 edges
3. `IVA Web Platform` - 12 edges
4. `Stage 2 Authentication and Commerce` - 10 edges
5. `Stage 1 Foundation and Scaffolding` - 8 edges
6. `Integrations` - 6 edges
7. `Vercel Config` - 6 edges
8. `Graphify Workspace` - 6 edges
9. `Stage 5 Launch Scale and Monitoring` - 6 edges
10. `Stage 4 Admin and Live Operations` - 5 edges

## Surprising Connections (you probably didn't know these)
- `computeDeviceFingerprint()` --calls--> `GET()`  [INFERRED]
  D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\lib\services\devices.ts → D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\app\api\health\route.ts
- `POST()` --calls--> `createDiscussion()`  [INFERRED]
  D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\app\api\webhooks\phonepe\route.ts → D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\lib\repositories\community.ts
- `GET()` --calls--> `listAdminCoupons()`  [INFERRED]
  D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\app\api\health\route.ts → D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\lib\repositories\admin.ts
- `GET()` --calls--> `listAdminCourses()`  [INFERRED]
  D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\app\api\health\route.ts → D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\lib\repositories\admin.ts
- `GET()` --calls--> `listAdminLiveSessions()`  [INFERRED]
  D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\app\api\health\route.ts → D:\coding\Clients\IVA-Designers-main\IVA-Designers-main\src\lib\repositories\admin.ts

## Hyperedges (group relationships)
- **Graphify GitHub Vercel Delivery Pipeline** — graphify_readme_workspace, integrations_github_repository, integrations_vercel_config [EXTRACTED 1.00]
- **Production Launch Observability Stack** — stage_5_launch_scale_stage_5_launch_scale_monitoring, stage_5_launch_scale_sentry, stage_5_launch_scale_posthog, stage_5_launch_scale_redis_queue, stage_5_launch_scale_runbook [EXTRACTED 1.00]

## Communities

### Community 0 - "Admin Data Operations"
Cohesion: 0.07
Nodes (16): createAdminCoupon(), createAdminCourse(), createAdminLesson(), createAdminLiveSession(), createAdminModule(), listAdminCoupons(), listAdminCourses(), listAdminLiveSessions() (+8 more)

### Community 1 - "Platform Architecture Plan"
Cohesion: 0.13
Nodes (22): Release Gates, Stage Briefs, Graphify Workspace, Workspace JSON, Google OAuth, Graphify to GitHub to Vercel Pipeline, IVA Web Platform, Mux (+14 more)

### Community 2 - "Release Workflow Gates"
Cohesion: 0.17
Nodes (16): Recommended Workflow, CI Workflow, GitHub Repository, Integrations, Vercel Config, Vercel Readiness Workflow, Vercel-Ready State, API Health Endpoint (+8 more)

### Community 3 - "Catalog And Discussion"
Cohesion: 0.2
Nodes (7): getCatalogCourse(), listCatalogCourses(), createDiscussion(), listDiscussionPreview(), CourseDetailPage(), generateStaticParams(), PricingPage()

### Community 5 - "Authentication Users"
Cohesion: 0.33
Nodes (3): authorize(), getServerAuthSession(), verifyOtpUser()

### Community 6 - "Launch Scale Monitoring"
Cohesion: 0.33
Nodes (6): Prepare IVA for Production Launch Observability and Controlled Scaling, PostHog Instrumentation, Redis and Queue Integration, Production Runbook and Incident Response Notes, Sentry Rollout, Stage 5 Launch Scale and Monitoring

### Community 7 - "Dashboard Metrics Utils"
Cohesion: 0.4
Nodes (2): getAdminDashboard(), formatCurrency()

### Community 8 - "Device Trust Logic"
Cohesion: 0.67
Nodes (1): computeDeviceFingerprint()

### Community 9 - "Video Access Control"
Cohesion: 1.0
Nodes (2): buildWatermarkPayload(), getPlaybackAuthorization()

### Community 10 - "File Document Icon"
Cohesion: 1.0
Nodes (3): Document, Document Icon, Text Content

### Community 11 - "Global Reach Icon"
Cohesion: 0.67
Nodes (3): Global Reach, Globe Icon, World

### Community 12 - "Browser Window Icon"
Cohesion: 1.0
Nodes (3): Browser Window, Window Controls, Window Icon

### Community 31 - "Next.js Branding"
Cohesion: 1.0
Nodes (2): Next.js, Next.js Wordmark

### Community 32 - "Vercel Branding"
Cohesion: 1.0
Nodes (2): Triangular Logomark, Vercel AMBIGUOUS

## Ambiguous Edges - Review These
- `Triangular Logomark` → `Vercel AMBIGUOUS`  [AMBIGUOUS]
  public/vercel.svg · relation: references

## Knowledge Gaps
- **23 isolated node(s):** `Resonant Stark Design System`, `PostgreSQL`, `Mux`, `Vercel Readiness Workflow`, `Vercel-Ready State` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Dashboard Metrics Utils`** (5 nodes): `getAdminDashboard()`, `utils.ts`, `cn()`, `formatCurrency()`, `formatPercent()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Device Trust Logic`** (3 nodes): `computeDeviceFingerprint()`, `evaluateDeviceTrust()`, `devices.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Video Access Control`** (3 nodes): `vdocipher.ts`, `buildWatermarkPayload()`, `getPlaybackAuthorization()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Branding`** (2 nodes): `Next.js`, `Next.js Wordmark`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vercel Branding`** (2 nodes): `Triangular Logomark`, `Vercel AMBIGUOUS`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Triangular Logomark` and `Vercel AMBIGUOUS`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `POST()` connect `Admin Data Operations` to `Video Access Control`, `Catalog And Discussion`, `Authentication Users`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `GET()` connect `Admin Data Operations` to `Device Trust Logic`, `Catalog And Discussion`, `Authentication Users`, `Dashboard Metrics Utils`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `getServerAuthSession()` connect `Authentication Users` to `Admin Data Operations`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `POST()` (e.g. with `createAdminCoupon()` and `createAdminCourse()`) actually correct?**
  _`POST()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Are the 9 inferred relationships involving `GET()` (e.g. with `listAdminCoupons()` and `listAdminCourses()`) actually correct?**
  _`GET()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `Stage 2 Authentication and Commerce` (e.g. with `Product and Ops Gate` and `Stage 3 Student Experience`) actually correct?**
  _`Stage 2 Authentication and Commerce` has 5 INFERRED edges - model-reasoned connections that need verification._