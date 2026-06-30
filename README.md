<div align="center">

# MTconnect-BR

**Plataforma imobiliária Angular 22 com SSR para compra e aluguel de imóveis em todo o Brasil.**

[![CI](https://github.com/MTconnect-BR/meu-app/actions/workflows/ci.yml/badge.svg)](https://github.com/MTconnect-BR/meu-app/actions/workflows/ci.yml)
[![Lighthouse CI](https://github.com/MTconnect-BR/meu-app/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/MTconnect-BR/meu-app/actions/workflows/lighthouse.yml)
[![Size Limit](https://img.shields.io/badge/Size%20Limit-5.13%20kB-brightgreen)](https://github.com/ai/size-limit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Angular 22 with SSR |
| **Monorepo** | Nx 23 |
| **Package Manager** | pnpm 11.9 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | Spartan NG Helm |
| **Maps** | Leaflet (ngx-leaflet) |
| **Carousel** | Embla Carousel |
| **Icons** | ng-icons (Lucide) |
| **Testing** | Vitest + Playwright (E2E) |
| **Analytics** | Vercel Analytics + Speed Insights |
| **Deployment** | Vercel (SSR Serverless) |

## Architecture

```mermaid
graph TB
    subgraph "Client Browser"
        A[Angular 22 SPA] --> B[Router]
        B --> C[Landing]
        B --> D[Properties]
        B --> E[Property Detail]
        B --> F[CRM Dashboard]
        B --> G[Auth]
        B --> H[Contact]
    end

    subgraph "Vercel Edge"
        I[CDN / Edge Network]
        I --> J[Serverless Function]
        J --> K[Express SSR]
        K --> L[Angular Universal]
        L --> M[HTML Response]
    end

    A -->|"HTTP Request"| I
    M -->|"Hydration"| A

    subgraph "Data Layer"
        N[Mock Properties Service]
        O[AuthService - localStorage]
        P[Vercel Analytics]
    end

    C --> N
    D --> N
    E --> N
    G --> O
    A --> P
```

## Project Structure

```mermaid
graph LR
    subgraph "src/app/"
        subgraph "core/"
            A[guards/auth.guard.ts]
            B[services/auth.ts]
            C[services/properties.ts]
            D[models/property.ts]
        end

        subgraph "shared/"
            E[components/header/]
            F[components/whatsapp-button/]
        end

        subgraph "features/"
            G[landing/]
            H[properties/]
            I[property-detail/]
            J[auth/]
            K[contact/]
            L[crm/]
            M[legal/]
        end
    end

    G --> C
    H --> C
    I --> C
    J --> B
    L --> A
    M --> G
```

## CI/CD Pipeline

```mermaid
graph TD
    A[Push to main] --> B{Workflows}
    B --> C[CI - Lint, Test, Build]
    B --> D[Lighthouse CI - Performance Audit]
    B --> E[Size Limit - Bundle Check]
    B --> F[CodeQL - Security Analysis]
    B --> G[OpenSSF Scorecard]

    C --> H[All Pass?]
    D --> H
    E --> H
    F --> H
    G --> H

    H -->|Yes| I[Deploy to Vercel]
    H -->|No| J[Block PR]

    I --> K[Vercel Serverless]
    K --> L[SSR + Client Hydration]

    subgraph "PR Checks"
        M[semantic-pr] --> N[Conventional Commits]
        O[labeler] --> P[Auto Label PRs]
        Q[merge-conflict-labeler] --> R[Label Conflicts]
    end
```

## Component Tree

```mermaid
graph TD
    ROOT[app-root] --> HEADER[app-header]
    ROOT --> OUTLET[router-outlet]
    ROOT --> WA[app-whatsapp-button]

    HEADER --> BURGER[Burger Menu]
    HEADER --> MENU[Nav Menu - MindMarket Style]

    MENU --> M1[Inicio]
    MENU --> M2[Terminos]
    MENU --> M3[Privacidade]
    MENU --> M4[Fale Conosco]
    MENU --> M5[Entrar / Sair]

    OUTLET --> LANDING[app-landing]
    OUTLET --> PROPS[app-properties]
    OUTLET --> DETAIL[app-property-detail]
    OUTLET --> AUTH[app-login / app-signup]
    OUTLET --> CONTACT[app-contact]
    OUTLET --> CRM[app-crm]

    LANDING --> SEARCH[Search Bar]
    LANDING --> STATS[Stats Section]
    LANDING --> CAROUSEL[Embla Carousel]

    PROPS --> FILTERS[Property Filters]
    PROPS --> GRID[Property Grid]
    PROPS --> MAP[Leaflet Map]

    DETAIL --> GALLERY[Image Gallery]
    DETAIL --> INFO[Property Info]
    DETAIL --> MAP2[Location Map]
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v24+
- [pnpm](https://pnpm.io/) v11.9+

### Setup

```bash
git clone https://github.com/MTconnect-BR/meu-app.git
cd meu-app
pnpm install
pnpm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start development server |
| `pnpm build` | Production build |
| `pnpm test` | Run unit tests |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm dead-code` | Detect dead code with Knip |
| `pnpm size-limit` | Check bundle size |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm analyze` | Analyze bundle size |

## Project Architecture

```
src/
├── app/
│   ├── core/                    # Singleton services, guards, models
│   │   ├── guards/              # Route guards (auth)
│   │   ├── models/              # TypeScript interfaces (Property)
│   │   └── services/            # Singleton services (auth, properties, theme)
│   ├── shared/                  # Reusable components
│   │   └── components/
│   │       ├── header/          # Navigation header
│   │       └── whatsapp-button/ # WhatsApp floating button
│   └── features/                # Feature modules
│       ├── landing/             # Home page with search & stats
│       ├── properties/          # Property listing with filters
│       ├── property-detail/     # Single property view
│       ├── auth/                # Login & signup
│       ├── contact/             # Contact via WhatsApp
│       ├── crm/                 # CRM dashboard (guarded)
│       └── legal/               # Terms & privacy pages
├── server.ts                    # Express SSR server with CSP
├── main.ts                      # Client bootstrap
└── main.server.ts               # Server bootstrap
```

## CI/CD Pipeline

This project uses **9 GitHub Actions workflows** for continuous integration and delivery:

| Workflow | Description |
|----------|-------------|
| `ci.yml` | Lint, test, build (Socket.dev + Codecov) |
| `lighthouse.yml` | Lighthouse CI audits (3 runs) |
| `size-limit.yml` | Bundle size checks (450 kB limit) |
| `semantic-pr.yml` | Conventional commit PR titles |
| `codeql.yml` | GitHub CodeQL security analysis |
| `scorecard.yml` | OpenSSF Scorecard security audit |
| `labeler.yml` | Auto-label PRs by file changes |
| `merge-conflict-labeler.yml` | Label PRs with conflicts |
| `dependabot-auto-merge.yml` | Auto-merge Dependabot PRs |

## Lighthouse Scores

| Metric | Score |
|--------|-------|
| Performance | 98 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## Security

- **Nonce-based Content Security Policy** (CSP) per request
- **Trusted Types** for DOM injection protection
- **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options, COOP, Permissions-Policy
- **OpenSSF Scorecard** continuous security monitoring

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a PR.

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m 'feat(scope): add new feature'`)
4. Push to the branch (`git push origin feat/my-feature`)
5. Open a Pull Request

See the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © [Matheus Moraes](https://github.com/mmdj04)
