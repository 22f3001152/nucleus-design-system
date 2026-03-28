# Nucleus Design System

Production-grade design system built with Stencil.js, SCSS tokens, React and Angular wrappers, and unified Storybook documentation with framework switching.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 10-minute setup guide for team members ⭐
- **[DOCS.md](./DOCS.md)** - Developer documentation and design system overview
- **[Live Storybook](https://22f3001152.github.io/nucleus-design-system/)** - Unified Storybook (React ⇄ Angular)

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.19+ and npm 10+
- **Ruby** 4.0+ and Bundler (for Jekyll docs)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nucleus

# Install all dependencies
npm install

# Install Jekyll dependencies (for documentation)
cd docs && bundle install && cd ..

# 3. Build all packages (core + React + Angular)
npm run build
```

### Development

```bash
# Build all packages (core + React + Angular)
npm run build

# Run React Storybook dev server
npm run storybook:react

# Run Angular Storybook dev server
npm run storybook:angular

# Run Jekyll documentation locally
npm run docs:blog
# → Opens at http://localhost:4000/nucleus-docs/
```

## 🌐 GitHub Pages Deployment

This project is automatically deployed to **GitHub Pages** on every push to `main`.

### Build Unified Storybook Bundle

To build the converged bundle (React + Angular) locally for testing:

```bash
# Build unified bundle
npm run package-storybook:pages
```

**What this does:**
- Builds React Storybook → `packages/sb-nucleus-react/storybook-static/`
- Builds Angular Storybook → `packages/sb-nucleus-angular/storybook-static/`
- Creates unified bundle at `.deploy/pages-bundle/`:
  - React at root (`/`)
  - Angular at `/angular/`
  - Injects framework switcher scripts

### Test Locally

```bash
cd .deploy/pages-bundle
npx http-server
```

## 📦 Project Structure

```
nucleus/
├── packages/
│   ├── nucleus/              # Core Stencil.js web components
│   ├── nucleus-react/        # React wrapper components
│   ├── nucleus-angular/      # Angular wrapper components
│   ├── sb-nucleus-react/     # React Storybook documentation
│   └── sb-nucleus-angular/   # Angular Storybook documentation
├── docs/                     # Jekyll documentation site
│   ├── _posts/              # Blog posts (component guides)
│   ├── _layouts/            # Jekyll layouts
│   ├── assets/              # CSS, JS, images
│   └── _site/               # Generated static site (ignored in Git)
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Available Commands

### Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build all packages (core + React + Angular) |
| `npm run lint` | Lint all packages with Biome |
| `npm run format` | Format code with Biome |
| `npm run clean:storybook:generated` | Remove generated Storybook files |

### Storybook Commands

| Command | Description |
|---------|-------------|
| `npm run storybook:react` | Run React Storybook dev server (port 6006) |
| `npm run storybook:angular` | Run Angular Storybook dev server (port 6007) |
| `npm run build-storybook:react` | Build React Storybook static files |
| `npm run build-storybook:angular` | Build Angular Storybook static files |

### Documentation Commands

| Command | Description |
|---------|-------------|
| `npm run docs:blog` | Run Jekyll dev server with live reload (localhost:4000) |
| `npm run docs:blog:build` | Build Jekyll static site |

---

## 🎯 Team Onboarding Guide

### For New Developers

**1. Clone and Setup**
```bash
git clone <repository-url>
cd nucleus
npm install
cd docs && bundle install && cd ..
```

**2. Local Development**
```bash
# Build components
npm run build

# Run Storybook for development
npm run storybook:react    # or :angular
```

**3. Create a Component**
- Add component in `packages/nucleus/src/components/`
- Build: `npm run build`
- View in Storybook: Auto-reloads
- Write stories in `packages/sb-nucleus-react/src/stories/`


---

## 🔍 Troubleshooting

### Storybook Build Failures

**Issue:** `TypeScript: 'Prop' is declared but its value is never read`

**Solution:** Remove unused imports from component files
```bash
# Components are in packages/nucleus/src/components/
# Check for unused imports: Prop, classNames, etc.
```

### Jekyll Build Failures

**Issue:** `Ruby version >= 3.0 required`

**Solution:** Upgrade Ruby
```bash
# macOS with Homebrew
brew install ruby@4.0
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
ruby --version  # Should be 4.0+
```

**Issue:** `Psych::SyntaxError in navigation.yml`

**Solution:** Fix YAML indentation in `docs/_data/navigation.yml`


## 🏗️ Architecture

### Component Development Flow

```
┌─────────────────┐
│ Stencil Core    │  Web Components (framework-agnostic)
│ (nucleus)       │
└────────┬────────┘
         │
         ├──────────────────┬─────────────────┐
         ▼                  ▼                 ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ React Wrappers  │  │ Angular Wrappers│  │ Vanilla JS      │
│ (nucleus-react) │  │(nucleus-angular)│  │ (direct usage)  │
└────────┬────────┘  └────────┬────────┘  └─────────────────┘
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌─────────────────┐
│ React Storybook │  │Angular Storybook│
│ (Port 6006)     │  │ (Port 6007)     │
└─────────────────┘  └─────────────────┘
```

---

## 📚 Additional Resources

- **[DOCS.md](./DOCS.md)** - Developer guide and architecture
- **[Stencil.js Docs](https://stenciljs.com/)** - Web component framework
- **[Storybook Docs](https://storybook.js.org/)** - Component documentation

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-component`)
3. **Build** and test locally (`npm run build && npm run storybook:react`)
4. **Commit** your changes (`git commit -m 'Add amazing component'`)
5. **Push** to the branch (`git push origin feature/amazing-component`)
6. **Open** a Pull Request

### Commit Conventions

```bash
feat: Add new Button component
fix: Resolve Toggle component state issue
docs: Update component guide
chore: Update dependencies
style: Format code with Biome
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

Built and maintained by the Nucleus Design System team.

**Questions or Issues?**
- Open an issue on GitHub
- Review [DOCS.md](./DOCS.md) for component guides

---

**Last Updated:** 2026-03-22  
**Version:** 0.2.0  
**Node:** 20.19+  
**Ruby:** 4.0+
