# Contributing to MTconnect-BR

Thank you for your interest in contributing to MTconnect-BR! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Found a Bug?](#found-a-bug)
- [Missing a Feature?](#missing-a-feature)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)
- [Coding Rules](#coding-rules)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior via [GitHub DM @mmdj04](https://github.com/mmdj04).

## Found a Bug?

If you find a bug in the source code, please [open a bug report](https://github.com/MTconnect-BR/meu-app/issues/new?template=bug-report.yml). Before creating a bug report, please check [existing issues](https://github.com/MTconnect-BR/meu-app/issues) to avoid duplicates.

When filing a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Your environment (OS, browser, Node.js version, pnpm version)
- A link to a minimal reproduction if possible

## Missing a Feature?

If you have a feature request, please [open a feature request](https://github.com/MTconnect-BR/meu-app/issues/new?template=feature-request.yml). For major features, we recommend first opening an issue to discuss the proposal before implementing.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v24+
- [pnpm](https://pnpm.io/) v11.9+
- [Angular CLI](https://angular.dev/tools/cli) v22+

### Setup

1. Fork the repository on GitHub

2. Clone your fork:

```bash
git clone https://github.com/your-username/meu-app.git
cd meu-app
```

3. Install dependencies:

```bash
pnpm install
```

4. Start the development server:

```bash
pnpm start
```

5. Open your browser to `http://localhost:4200/`

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start development server |
| `pnpm build` | Production build |
| `pnpm test` | Run unit tests |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting |
| `pnpm dead-code` | Detect dead code with Knip |
| `pnpm size-limit` | Check bundle size |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm analyze` | Analyze bundle with source-map-explorer |

## Submitting Changes

### Pull Request Process

1. Create a feature branch from `main`:

```bash
git checkout -b feat/my-feature
```

2. Make your changes following the [coding rules](#coding-rules)

3. Write or update tests as needed

4. Ensure all checks pass:

```bash
pnpm lint
pnpm test
pnpm build
```

5. Commit your changes following the [commit message guidelines](#commit-message-guidelines)

6. Push to your fork and open a Pull Request

7. Fill out the PR template completely

8. Wait for CI checks to pass and request a review

### What We Look For

- Clear, focused changes (one feature or fix per PR)
- Tests for new functionality
- Updated documentation if applicable
- No breaking changes (or clearly documented in the PR)
- Clean commit history

## Coding Rules

- **OnPush change detection** — use `ChangeDetectionStrategy.OnPush` on all components
- **Signals over RxJS** — prefer Angular signals where possible
- **Feature-first architecture** — new features go in `src/app/features/<feature-name>/`
- **Spartan NG components** — use existing Spartan NG Helm components, do not add new UI libraries
- **Tailwind CSS** — use Tailwind utility classes for styling
- **TypeScript strict mode** — no `any` types
- **Component naming** — use PascalCase for component classes, kebab-case for selectors (`app-feature-name`)

## Commit Message Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/). All commit messages must match the format:

```
<type>(<scope>): <subject>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only changes |
| `style` | Code style changes (formatting, missing semicolons, etc.) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Changes to build process or tools |
| `ci` | Changes to CI configuration |
| `chore` | Other changes that don't modify src or test files |
| `revert` | Reverts a previous commit |

### Scope

The scope should be the affected feature or module:

- `landing` — Landing page
- `properties` — Properties listing
- `property-detail` — Property detail page
- `auth` — Authentication (login/signup)
- `crm` — CRM dashboard
- `contact` — Contact page
- `legal` — Terms and privacy pages
- `header` — Header component
- `whatsapp` — WhatsApp button
- `core` — Core services, guards, models
- `shared` — Shared components

### Examples

```
feat(properties): add filter by price range
fix(auth): prevent duplicate login session
docs(readme): update quick start instructions
refactor(header): extract menu logic to service
test(properties): add unit tests for filter component
chore(deps): update Angular to 22.0.5
```

### Breaking Changes

If your commit introduces a breaking change, add `!` after the type/scope and include a `BREAKING CHANGE:` footer:

```
feat(api)!: change property response format

BREAKING CHANGE: The property API response now wraps data in a `data` field.
Update all API calls to use `response.data` instead of `response`.
```

## Questions?

If you have questions about contributing, feel free to [open a discussion](https://github.com/MTconnect-BR/meu-app/discussions) or reach out via [GitHub DM @mmdj04](https://github.com/mmdj04).
