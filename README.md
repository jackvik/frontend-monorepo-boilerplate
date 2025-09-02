# 🏗️ Frontend Architect - Modern Monorepo Boilerplate

A production-ready monorepo setup for modern frontend development with Next.js, TypeScript, and comprehensive tooling.

## ✨ Features

- 🏢 **Monorepo Architecture** - Organized workspace with apps and packages
- ⚡ **Next.js 15** - Latest Next.js with App Router
- 🔷 **TypeScript** - Full type safety across the monorepo
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧪 **Testing** - Vitest for unit tests, Playwright for E2E
- 🔧 **ESLint & Prettier** - Code quality and formatting
- 🚀 **CI/CD** - GitHub Actions pipeline
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🎯 **Husky** - Git hooks for code quality
- 📊 **Build System** - tsup for packages, Next.js for apps

## 🏗️ Project Structure

```
frontend-architect/
├── apps/
│   └── web/                    # Next.js application
│       ├── app/               # App Router pages
│       ├── public/            # Static assets
│       └── package.json
├── packages/
│   ├── ui/                    # Shared UI components
│   │   ├── src/
│   │   └── package.json
│   └── utils/                 # Utility functions
│       ├── src/
│       └── package.json
├── tests/
│   └── e2e/                   # Playwright E2E tests
├── .github/
│   └── workflows/
│       └── ci.yml             # CI/CD pipeline
└── package.json               # Root package configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/jackvik/frontend-monorepo-boilerplate.git
cd frontend-monorepo-boilerplate

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📜 Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev                    # Start Next.js dev server
pnpm build                  # Build all packages and apps
pnpm clean                  # Clean all build artifacts

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix              # Fix ESLint issues
pnpm type-check            # Run TypeScript type checking

# Testing
pnpm test:unit             # Run unit tests with Vitest
pnpm test:e2e              # Run E2E tests with Playwright
pnpm test:e2e:ui           # Run E2E tests with UI
```

### Package-Specific Commands

```bash
# Build individual packages
pnpm --filter @frontend-architect/ui run build
pnpm --filter @frontend-architect/utils run build
pnpm --filter ./apps/web run build

# Run commands in specific workspace
pnpm --filter ./apps/web dev
```

## 🛠️ Development Workflow

### 1. Adding New Dependencies

```bash
# Add to root (dev dependencies)
pnpm add -D <package-name>

# Add to specific package
pnpm --filter @frontend-architect/ui add <package-name>

# Add to app
pnpm --filter ./apps/web add <package-name>
```

### 2. Creating New Packages

```bash
# Create new package directory
mkdir packages/new-package
cd packages/new-package

# Initialize package.json
pnpm init

# Add to workspace (already configured in pnpm-workspace.yaml)
```

### 3. Git Workflow

```bash
# Pre-commit hooks automatically run:
# - ESLint (with auto-fix)
# - Prettier (formatting)
# - Type checking

# Commit changes
git add .
git commit -m "feat: add new feature"
git push origin main
```

## 🧪 Testing

### Unit Tests (Vitest)

```bash
# Run all tests
pnpm test:unit

# Run tests in watch mode
pnpm test:unit --watch

# Run tests with coverage
pnpm test:unit --coverage
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Run specific test
pnpm test:e2e tests/e2e/home.spec.ts
```

## 🏗️ Build System

### Package Builds (tsup)

Packages use `tsup` for building:
- **ESM** output (`.mjs`)
- **CommonJS** output (`.js`)
- **TypeScript** declarations (`.d.ts`)
- **Source maps** for debugging

### App Builds (Next.js)

The web app uses Next.js build system:
- **Static generation** for optimal performance
- **Code splitting** and optimization
- **Image optimization**

## 🔧 Configuration

### ESLint

- **Flat config** format (ESLint 9+)
- **TypeScript** support with type checking
- **React** and **Next.js** specific rules
- **Prettier** integration

### Prettier

- **ES module** configuration
- **Consistent formatting** across the monorepo
- **Ignore patterns** for build artifacts

### TypeScript

- **Strict mode** enabled
- **Path mapping** for package imports
- **Shared base config** across packages

## 🚀 CI/CD Pipeline

The GitHub Actions workflow includes:

1. **Setup** - Node.js 20, pnpm installation
2. **Dependencies** - Install with frozen lockfile
3. **Type Check** - TypeScript validation
4. **Linting** - ESLint code quality checks
5. **Build** - Compile all packages and apps
6. **Unit Tests** - Run Vitest test suite
7. **E2E Tests** - Run Playwright tests
8. **Artifacts** - Upload test reports

## 📦 Package Management

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Package Scoping

All packages use the `@frontend-architect/` scope:
- `@frontend-architect/ui` - UI components
- `@frontend-architect/utils` - Utility functions

### Import Examples

```typescript
// Import from UI package
import { Button } from '@frontend-architect/ui';

// Import from utils package
import { formatDate } from '@frontend-architect/utils';
```

## 🎯 Best Practices

### Code Organization

- **Feature-based** structure in apps
- **Domain-driven** package organization
- **Consistent naming** conventions
- **Clear separation** of concerns

### Git Workflow

- **Conventional commits** for clear history
- **Pre-commit hooks** for code quality
- **Branch protection** (optional)
- **Pull request** reviews

### Performance

- **Tree shaking** for optimal bundles
- **Code splitting** at route level
- **Image optimization** with Next.js
- **Lazy loading** for components

## 🔍 Troubleshooting

### Common Issues

1. **Lockfile out of sync**
   ```bash
   pnpm install
   git add pnpm-lock.yaml
   git commit -m "chore: update lockfile"
   ```

2. **TypeScript errors**
   ```bash
   pnpm type-check
   ```

3. **ESLint issues**
   ```bash
   pnpm lint:fix
   ```

4. **Build failures**
   ```bash
   pnpm clean
   pnpm build
   ```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Vitest Guide](https://vitest.dev/guide/)
- [Playwright Testing](https://playwright.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with modern frontend tools
- Inspired by industry best practices
- Designed for scalability and maintainability

---

**Happy coding! 🚀**
