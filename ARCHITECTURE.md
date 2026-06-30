# Architecture

This document describes the high-level architecture of MTconnect-BR.

## Feature-First Structure

The project follows a **feature-first** architecture pattern. Each feature is a self-contained module with its own component, template, styles, and tests.

```
src/
├── app/
│   ├── core/                          # Singleton services, guards, models
│   │   ├── guards/
│   │   │   └── auth.guard.ts          # Route guard for protected routes
│   │   ├── models/
│   │   │   └── property.model.ts      # Property interface & types
│   │   └── services/
│   │       ├── auth.service.ts        # Authentication (localStorage-based)
│   │       ├── properties.service.ts  # Property data & filtering
│   │       └── theme.service.ts       # Theme management
│   │
│   ├── shared/                        # Reusable components across features
│   │   └── components/
│   │       ├── header/                # Navigation header (SPA-style menu)
│   │       └── whatsapp-button/       # Floating WhatsApp contact button
│   │
│   └── features/                      # Feature modules
│       ├── landing/                   # Home page: hero, search, carousel, stats
│       ├── properties/                # Property listing with filters & map
│       ├── property-detail/           # Single property view with Leaflet map
│       ├── auth/
│       │   ├── login.ts               # Login page
│       │   └── signup.ts              # Signup page
│       ├── contact/                   # Contact page (WhatsApp redirect)
│       ├── crm/                       # CRM dashboard (auth-protected)
│       └── legal/
│           ├── terms.ts               # Terms of Service
│           └── privacy.ts             # Privacy Policy
│
├── server.ts                          # Express SSR server (CSP middleware)
├── main.ts                            # Client bootstrap
└── main.server.ts                     # Server bootstrap
```

## Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Mock Data  │────▶│   Services   │────▶│  Components  │
│  (1200+     │     │  (Properties │     │  (OnPush +   │
│  properties)│     │   AuthService│     │   Signals)   │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                                         ┌──────▼──────┐
                                         │     SSR      │
                                         │  (Angular    │
                                         │   Universal) │
                                         └──────┬──────┘
                                                │
                                         ┌──────▼──────┐
                                         │   Vercel     │
                                         │  Serverless  │
                                         │   Function   │
                                         └─────────────┘
```

### Key Patterns

- **Mock Data**: All property data is hardcoded (1200+ mock properties). No real backend.
- **Services**: `PropertiesService` handles filtering, searching, and data access. `AuthService` manages localStorage-based auth with SHA-256 hashed passwords.
- **Components**: All use `ChangeDetectionStrategy.OnPush` and Angular Signals for reactive state.
- **SSR**: Angular Universal renders pages server-side via Express, deployed as Vercel serverless functions.

## SSR Pipeline

```
Request → Vercel Edge → Express (server.ts) → Angular SSR → HTML Response
                              │
                              ├── CSP Middleware (nonce-based)
                              └── Static File Serving (/browser)
```

1. **Vercel Edge** routes all requests to the serverless function
2. **Express** processes the request through middleware (CSP nonce generation)
3. **Angular SSR** renders the component tree to HTML
4. **Response** is sent back with security headers

## Security Architecture

### Content Security Policy (CSP)

- **Nonce-based**: A unique nonce is generated per request via `crypto.randomBytes(16)`
- **Trusted Types**: `require-trusted-types-for 'script'` prevents DOM injection attacks
- **Directives**: `default-src 'none'`, `script-src 'self' 'nonce-...'`, `style-src 'self' 'unsafe-inline'`

### Security Headers (vercel.json)

| Header | Value |
|--------|-------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-XSS-Protection` | `1; mode=block` |

### Route Protection

- `/crm` is protected by `authGuard` (redirects to `/auth/login` if not authenticated)
- Auth state is stored in `localStorage` (demo only — Supabase planned for production)

## Routing

| Path | Component | SSR | Auth Required |
|------|-----------|-----|---------------|
| `/` | Landing | ✅ | No |
| `/properties` | Properties | ✅ | No |
| `/properties/:slug` | PropertyDetail | ✅ | No |
| `/auth/login` | Login | ✅ | No |
| `/auth/signup` | Signup | ✅ | No |
| `/contact` | Contact | ✅ | No |
| `/crm` | Crm | ✅ | Yes |
| `/terms` | Terms | ✅ | No |
| `/privacy` | Privacy | ✅ | No |
| `**` | Redirect to `/` | ✅ | No |

## Testing Strategy

| Type | Tool | Command |
|------|------|---------|
| Unit Tests | Vitest | `pnpm test` |
| E2E Tests | Playwright | `ng e2e` |
| Linting | ESLint + Angular ESLint | `pnpm lint` |
| Formatting | Prettier + Tailwind CSS plugin | `pnpm format` |
| Dead Code | Knip | `pnpm dead-code` |
| Bundle Size | Size Limit | `pnpm size-limit` |
| Coverage | Vitest + v8 | `pnpm test:coverage` |
| Performance | Lighthouse CI | Automated in CI |
| Security | OpenSSF Scorecard | Automated in CI |

## Monorepo Structure

The project uses **Nx 23** for monorepo management:

- **Single project**: `meu-app` (not a multi-project workspace)
- **Plugins**: `@nx/angular/plugin`, `@nx/eslint/plugin`
- **Caching**: Build, lint, and test targets are cached by Nx
- **Workspace**: pnpm workspaces via `pnpm-workspace.yaml`

## Component Design Patterns

- **Spartan NG Helm**: All UI components use Spartan NG's headless primitives (Card, Button, Input, Field, Dropdown, Tooltip, etc.)
- **Tailwind CSS 4**: Utility-first styling with `tw-animate-css` for animations
- **Lucide Icons**: All icons from `@ng-icons/lucide`
- **Signal-based State**: Components use Angular signals for reactive state management
- **OnPush Change Detection**: All components use `ChangeDetectionStrategy.OnPush`
