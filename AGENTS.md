# AI Agent Instructions

This file provides context for AI coding agents working on this project.

## Project Overview

MTconnect-BR is a real estate platform built with Angular 22, featuring SSR, deployed on Vercel. The project uses a feature-first architecture with Spartan NG components and Tailwind CSS.

## Tech Stack

- **Framework**: Angular 22 (SSR via Express)
- **Monorepo**: Nx 23
- **Package Manager**: pnpm 11.9 (use `pnpm`, not `npm` or `yarn`)
- **Styling**: Tailwind CSS 4 + Spartan NG Helm
- **Testing**: Vitest (unit), Playwright (E2E)
- **Deployment**: Vercel (serverless SSR)

## Commands

```bash
# Development
pnpm start                    # Start dev server on http://localhost:4200
pnpm build                    # Production build
pnpm serve:ssr:meu-app        # Serve SSR locally

# Quality
pnpm lint                     # ESLint
pnpm test                     # Vitest unit tests
pnpm format                   # Prettier format
pnpm format:check             # Check formatting
pnpm dead-code                # Knip dead code detection
pnpm size-limit               # Bundle size check
pnpm test:coverage            # Tests with coverage

# Analysis
pnpm analyze                  # Source map explorer
```

## Project Structure

```
src/app/
├── core/          # Singleton services, guards, models (never import from features/ into core/)
├── shared/        # Reusable components (import into features/)
└── features/      # Feature modules (each is self-contained)
    ├── landing/
    ├── properties/
    ├── property-detail/
    ├── auth/
    ├── contact/
    ├── crm/
    └── legal/
```

## Conventions

### Components

- **OnPush change detection**: All components must use `ChangeDetectionStrategy.OnPush`
- **Signals**: Prefer Angular signals over RxJS for state management
- **Selectors**: Use `app-<feature-name>` format (e.g., `app-properties`, `app-login`)
- **Naming**: PascalCase for classes, kebab-case for files and selectors

### Styling

- **Tailwind CSS**: Use utility classes. Do not add custom CSS unless necessary.
- **Spartan NG**: Use existing Helm components (Card, Button, Input, Field, Dropdown, Tooltip, etc.)
- **SCSS**: Component styles use `.scss` files

### State

- **Services**: Singleton services in `core/services/` with `providedIn: 'root'`
- **Auth**: localStorage-based (demo only). Current user tracked via `AuthService.currentUserEmail` signal.
- **Properties**: Mock data (1200+ hardcoded properties). No real backend yet.

### Routing

- **Routes**: Defined in `src/app/app.routes.ts`
- **Server Routes**: Defined in `src/app/app.routes.server.ts` (all SSR)
- **Guards**: `authGuard` protects `/crm` route

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): description
fix(scope): description
docs(scope): description
chore(scope): description
```

Scopes: `landing`, `properties`, `property-detail`, `auth`, `crm`, `contact`, `legal`, `header`, `whatsapp`, `core`, `shared`

## Important Notes

- **No real backend**: All data is mock/hardcoded. Do not add API calls to external services.
- **Vercel deployment**: The project deploys to Vercel as a serverless function. SSR is required.
- **Security**: CSP is nonce-based per request. Do not add `'unsafe-inline'` or `'unsafe-eval'` to script-src.
- **Bundle budget**: 450 kB limit (currently ~180 kB). Run `pnpm size-limit` before committing.
- **CI must pass**: All 9 workflows must pass before merging.

## File Editing Guidelines

- **Do not modify** `server.ts` CSP middleware without understanding Vercel serverless constraints
- **Do not modify** `vercel.json` security headers without understanding their impact on the Lighthouse Best Practices score
- **Test changes**: Run `pnpm lint && pnpm test && pnpm build` before committing
- **Check bundle**: Run `pnpm size-limit` to ensure no bundle size regression
