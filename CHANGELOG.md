# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2026-06-30

### Added

- **Landing Page**: Hero section with search, stats carousel, and feature highlights
- **Properties Listing**: Filterable property grid with type, price range, bedrooms, and amenities filters
- **Property Detail**: Individual property view with Leaflet map integration
- **Authentication**: Login and signup with localStorage-based auth (SHA-256 hashed passwords)
- **CRM Dashboard**: Protected route for property management (auth required)
- **Contact Page**: WhatsApp integration for direct contact
- **Legal Pages**: Terms of Service and Privacy Policy
- **Header**: SPA-style navigation with mobile menu
- **WhatsApp Button**: Floating contact button on public pages

### Security

- Nonce-based Content Security Policy (CSP) per request
- Trusted Types for DOM injection protection
- Security headers: HSTS, X-Frame-Options, X-Content-Type-Options, COOP, Permissions-Policy
- OpenSSF Scorecard continuous security monitoring
- CodeQL static analysis

### Performance

- Angular 22 SSR with Express for server-side rendering
- Vercel serverless deployment (iaD1 region)
- Bundle size limit: 450 kB (currently ~180 kB)
- Lighthouse scores: Performance 98, Accessibility 100, Best Practices 100, SEO 100

### Developer Experience

- Nx 23 monorepo with build caching
- Vitest for fast unit testing
- Playwright for E2E testing
- ESLint + Prettier with Tailwind CSS plugin
- Knip dead code detection
- Size Limit bundle analysis
- 9 GitHub Actions workflows (CI, Lighthouse, CodeQL, Scorecard, Semantic PR, Size Limit, Labeler, Merge Conflict, Dependabot Auto-merge)
- Renovate for automated dependency updates
- Issue templates (bug report, feature request)
- Pull request template
- Contributing guide and Code of Conduct

[Unreleased]: https://github.com/MTconnect-BR/meu-app/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/MTconnect-BR/meu-app/releases/tag/v0.1.0
