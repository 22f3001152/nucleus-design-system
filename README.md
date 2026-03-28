# Nucleus Design System

Production-grade design system built with Stencil.js, SCSS tokens, React and Angular wrappers, unified Storybook documentation with framework switching, and Azure deployment automation.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 10-minute setup guide for team members ⭐
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide for Azure infrastructure
- **[DOCS.md](./DOCS.md)** - Developer documentation and design system overview  
- **[Live Storybook](https://nucleusstorybookdev.z22.web.core.windows.net/)** - Unified Storybook (React ⇄ Angular)
- **[Live Documentation](https://nucleusdocsdev.z22.web.core.windows.net/)** - Jekyll documentation site

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.19+ and npm 10+
- **Azure CLI** 2.50+ (for deployment)
- **Ruby** 4.0+ and Bundler (for Jekyll docs)
- **Azure Account** with active subscription

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nucleus

# Install all dependencies
npm install

# Install Jekyll dependencies (for documentation)
cd docs && bundle install && cd ..

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Azure credentials
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

## 🌐 Deployment Guide

This project deploys to **Azure Blob Storage** for both Storybook and documentation, achieving **97% cost reduction** compared to traditional web app hosting (~$1.80/month vs ~$50/month).

### 📋 Deployment Prerequisites

1. **Azure CLI** installed and authenticated:
   ```bash
   az login
   az account show  # Verify correct subscription
   ```

2. **Environment Variables** configured (see section below)

3. **Azure Resource Group** created:
   ```bash
   az group create --name nucleus-design-system --location westus
   ```

---

## 🎨 Unified Storybook Deployment

The unified Storybook deployment includes **both React and Angular** in a single site with a framework switcher button on component pages.

### Architecture

```
https://nucleusstorybookdev.z22.web.core.windows.net/
├── /                          # React Storybook (primary)
│   ├── index.html
│   ├── framework-switcher.js  # "Switch to Angular" button
│   ├── auth.js               # Optional authentication
│   └── login.html            # Login page (if auth enabled)
└── /angular/                  # Angular Storybook
    ├── index.html
    └── framework-switcher.js  # "Switch to React" button
```

### Build Unified Storybook Bundle

```bash
# 1. Set environment variables (see Environment Variables section)
export AZURE_RESOURCE_GROUP=nucleus-design-system
export AZURE_STORAGE_ACCOUNT_STORYBOOK=nucleusstorybookdev
export AZURE_ENV=dev

# 2. Optional: Enable authentication
export SB_USER=demo
export SB_PASS=your-secure-password

# 3. Build unified bundle
npm run package-storybook
```

**What this does:**
- Builds React Storybook → `packages/sb-nucleus-react/storybook-static/`
- Builds Angular Storybook → `packages/sb-nucleus-angular/storybook-static/`
- Creates unified bundle at `.deploy/storybook-bundle/`:
  - React at root (`/`)
  - Angular at `/angular/`
  - Injects framework switcher scripts
  - Adds authentication (if `SB_USER` and `SB_PASS` are set)

### Test Locally (Unified Bundle)

After building the bundle, test it locally with a simple HTTP server:

```bash
# Install http-server (if not already installed)
npm install -g http-server

# Serve the unified bundle
cd .deploy/storybook-bundle
http-server -p 8080

# Open in browser: http://localhost:8080
```

**What to test:**
1. ✅ Login page appears (if authentication enabled)
2. ✅ React Storybook loads at root
3. ✅ Navigate to any component docs page (e.g., `/path=/docs/atoms-button--docs`)
4. ✅ "Switch to Angular" button appears in top-right
5. ✅ Click button → navigates to `/angular/?path=/docs/atoms-button--docs`
6. ✅ "Switch to React" button appears on Angular version
7. ✅ Click button → returns to React version

### Deploy Storybook to Azure

```bash
# Full deployment (infrastructure + app)
npm run deploy:storybook

# OR deploy separately:

# 1. Deploy infrastructure only (first time)
npm run deploy:storybook:infra

# 2. Deploy app only (subsequent updates)
npm run deploy:storybook:app
```

**Deployment process:**
1. Creates Azure Storage Account with static website hosting
2. Uploads unified bundle to `$web` container
3. Sets correct content types for CSS/JS files
4. Enables CORS for cross-origin requests
5. Outputs public URL

**Deployment URL:** https://nucleusstorybookdev.z22.web.core.windows.net/

---

## 📖 Jekyll Documentation Deployment

### Build Documentation

```bash
# 1. Set environment variables
export AZURE_RESOURCE_GROUP=nucleus-design-system
export AZURE_STORAGE_ACCOUNT=nucleusdocsdev
export AZURE_ENV=dev

# 2. Build Jekyll site
npm run docs:blog:build
```

**Output:** `docs/_site/` (Jekyll static files)

### Test Locally (Jekyll)

```bash
# Run Jekyll development server with live reload
npm run docs:blog

# Opens at: http://localhost:4000/nucleus-docs/
```

**What to test:**
1. ✅ Homepage loads with navigation
2. ✅ All blog posts are accessible
3. ✅ Mermaid diagrams render correctly
4. ✅ Code syntax highlighting works
5. ✅ Internal links work (navigation menu)

### Deploy Documentation to Azure

```bash
# Full deployment (infrastructure + app)
npm run deploy:docs

# OR deploy separately:

# 1. Deploy infrastructure only (first time)
npm run deploy:docs:infra

# 2. Deploy app only (subsequent updates)
npm run deploy:docs:app
```

**Deployment URL:** https://nucleusdocsdev.z22.web.core.windows.net/

---

## 🔐 Environment Variables

### Required Variables (All Deployments)

Create `.env.local` file in project root:

```bash
# Azure Configuration
AZURE_RESOURCE_GROUP=nucleus-design-system
AZURE_ENV=dev  # or prod

# Storybook Deployment
AZURE_STORAGE_ACCOUNT_STORYBOOK=nucleusstorybookdev

# Documentation Deployment
AZURE_STORAGE_ACCOUNT=nucleusdocsdev
```

### Optional Variables (Storybook Authentication)

Add these to enable client-side authentication:

```bash
# Storybook Authentication (optional)
SB_USER=demo
SB_PASS=your-secure-password
```

**When authentication is enabled:**
- Login page appears at `/login.html`
- Credentials stored in sessionStorage (12-hour timeout)
- Users must authenticate to view Storybook

**⚠️ Security Note:** Client-side authentication provides **basic protection only**. Credentials are Base64-encoded (not encrypted) and visible in browser dev tools. For production security, consider Azure CDN with authentication (~$20/month).

### Loading Environment Variables

```bash
# Option 1: Source from file
source .env.local

# Option 2: Export individually
export AZURE_RESOURCE_GROUP=nucleus-design-system
export AZURE_STORAGE_ACCOUNT_STORYBOOK=nucleusstorybookdev
# ... etc

# Option 3: Use in npm scripts
SB_USER=demo SB_PASS=password npm run package-storybook
```

---

## 💰 Cost Breakdown

| Service | SKU | Monthly Cost | Purpose |
|---------|-----|--------------|---------|
| Azure Blob Storage (Storybook) | Standard LRS | ~$0.90 | Unified Storybook hosting |
| Azure Blob Storage (Docs) | Standard LRS | ~$0.90 | Jekyll documentation hosting |
| **Total** | | **~$1.80** | |

**Previous cost (Azure Web App):** ~$50/month  
**Savings:** $49.10/month (97% reduction)

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
├── infra/                    # Azure Bicep infrastructure templates
│   ├── storybook-static.bicep
│   ├── docs-static.bicep
│   ├── modules/
│   └── params/              # Environment-specific parameters
├── scripts/                  # Deployment automation scripts
│   ├── deploy-storybook-to-blob.cjs
│   ├── prepare-storybook-blob-package.cjs
│   └── deploy-docs-to-blob.cjs
├── .deploy/                  # Generated deployment bundles (ignored in Git)
│   └── storybook-bundle/    # Unified React + Angular bundle
├── .env.example             # Example environment variables
├── .env.local               # Your environment variables (ignored in Git)
└── DEPLOYMENT.md            # Detailed deployment guide
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
| `npm run build-storybook:bundle` | Build both React and Angular Storybooks |
| `npm run package-storybook` | Build unified bundle with framework switcher |

### Documentation Commands

| Command | Description |
|---------|-------------|
| `npm run docs:blog` | Run Jekyll dev server with live reload (localhost:4000) |
| `npm run docs:blog:build` | Build Jekyll static site |

### Deployment Commands

| Command | Description |
|---------|-------------|
| `npm run deploy:storybook` | Deploy Storybook (infrastructure + app) |
| `npm run deploy:storybook:infra` | Deploy Storybook Azure infrastructure only |
| `npm run deploy:storybook:app` | Deploy Storybook app bundle only |
| `npm run deploy:docs` | Deploy documentation (infrastructure + app) |
| `npm run deploy:docs:infra` | Deploy documentation Azure infrastructure only |
| `npm run deploy:docs:app` | Deploy documentation app bundle only |

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

### For DevOps / Deployment Team

**1. Azure Setup**
```bash
# Login to Azure
az login

# Create resource group (first time only)
az group create --name nucleus-design-system --location westus

# Configure environment
cp .env.example .env.local
# Edit .env.local with Azure details
```

**2. Deploy Storybook**
```bash
source .env.local
npm run deploy:storybook
```

**3. Deploy Documentation**
```bash
source .env.local
npm run deploy:docs
```

**4. Monitor Deployments**
- Storybook: https://nucleusstorybookdev.z22.web.core.windows.net/
- Docs: https://nucleusdocsdev.z22.web.core.windows.net/
- Azure Portal: Check blob storage metrics

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

### Deployment Failures

**Issue:** `AZURE_RESOURCE_GROUP environment variable not set`

**Solution:**
```bash
source .env.local
# OR
export AZURE_RESOURCE_GROUP=nucleus-design-system
```

**Issue:** `Storage account not found`

**Solution:** Deploy infrastructure first
```bash
npm run deploy:storybook:infra
# or
npm run deploy:docs:infra
```

**Issue:** Framework switcher button not appearing

**Solution:** Clear browser cache and hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)

### Local Testing Issues

**Issue:** Authentication loop in local unified bundle

**Solution:** Clear sessionStorage
```javascript
// In browser console:
sessionStorage.clear();
location.reload();
```

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
         │                    │
         └──────────┬─────────┘
                    ▼
         ┌─────────────────────┐
         │  Unified Bundle      │
         │  - React (root)      │
         │  - Angular (/angular)│
         │  - Framework Switcher│
         │  - Optional Auth     │
         └─────────────────────┘
```

### Unified Storybook Structure

```
https://nucleusstorybookdev.z22.web.core.windows.net/
│
├── index.html                    # React Storybook entry
├── framework-switcher.js         # React → Angular toggle
├── auth.js                       # Authentication library (optional)
├── login.html                    # Login page (optional)
├── assets/                       # React Storybook assets
├── sb-manager/                   # Storybook manager (React)
├── sb-preview/                   # Storybook preview (React)
│
└── angular/                      # Angular Storybook
    ├── index.html                # Angular Storybook entry
    ├── framework-switcher.js     # Angular → React toggle
    ├── assets/                   # Angular Storybook assets
    ├── sb-manager/               # Storybook manager (Angular)
    └── sb-preview/               # Storybook preview (Angular)
```

**Framework Switcher Behavior:**
- Appears only on component documentation pages (`?path=/docs/`)
- Preserves component context when switching (same component, different framework)
- Fixed position button in top-right corner
- React → Purple gradient with 📱 icon
- Angular → Blue gradient with ⚛️ icon

### Deployment Architecture

```
┌─────────────────┐
│   Developer     │
│   Local Build   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│   npm run package-storybook     │
│   ├── Build React Storybook     │
│   ├── Build Angular Storybook   │
│   ├── Create unified bundle     │
│   ├── Inject framework switcher │
│   └── Add auth (if enabled)     │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  .deploy/storybook-bundle/      │
│  (Local unified bundle)         │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ npm run deploy:storybook:app    │
│ ├── Upload to Azure Blob        │
│ ├── Set content types           │
│ └── Enable static website       │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Azure Blob Storage ($web)      │
│  Static Website Hosting         │
│  ~$0.90/month                   │
└─────────────────────────────────┘
         │
         ▼
   Public URL:
   https://nucleusstorybookdev.z22.web.core.windows.net/
```

---

## 📚 Additional Resources

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment instructions
- **[DOCS.md](./DOCS.md)** - Developer guide and architecture
- **[Live Storybook](https://nucleusstorybookdev.z22.web.core.windows.net/)** - Production Storybook
- **[Live Documentation](https://nucleusdocsdev.z22.web.core.windows.net/)** - Production docs
- **[Stencil.js Docs](https://stenciljs.com/)** - Web component framework
- **[Storybook Docs](https://storybook.js.org/)** - Component documentation
- **[Azure Blob Storage Docs](https://learn.microsoft.com/en-us/azure/storage/blobs/)** - Hosting platform

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
docs: Update deployment guide
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
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides
- Review [Live Documentation](https://nucleusdocsdev.z22.web.core.windows.net/) for component guides

---

**Last Updated:** 2026-03-22  
**Version:** 0.2.0  
**Node:** 20.19+  
**Azure CLI:** 2.50+  
**Ruby:** 4.0+
