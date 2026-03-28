# Quick Start Guide - Nucleus Design System

**For Team Members: Get up and running in 10 minutes**

## 🎯 What You'll Need

- Node.js 20.19+
- Azure CLI 2.50+ (for deployments)
- Ruby 4.0+ (for documentation)
- Azure account access

## 📦 First Time Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd nucleus
npm install

# 2. Configure environment
cp .env.example .env.local

# Edit .env.local and add:
# AZURE_RESOURCE_GROUP=nucleus-design-system
# AZURE_STORAGE_ACCOUNT_STORYBOOK=nucleusstorybookdev
# AZURE_STORAGE_ACCOUNT=nucleusdocsdev
# AZURE_ENV=dev

# 3. Build everything
npm run build
```

## 🚀 Daily Development

### Working on Components

```bash
# Build core components
npm run build

# Run React Storybook (auto-reload)
npm run storybook:react
# → http://localhost:6006

# Run Angular Storybook
npm run storybook:angular
# → http://localhost:6007
```

### Working on Documentation

```bash
# Run Jekyll docs (auto-reload)
npm run docs:blog
# → http://localhost:4000/nucleus-docs/
```

## 📤 Deploying to Azure

### Deploy Storybook (Unified React + Angular)

```bash
# Load environment variables
source .env.local

# Optional: Enable authentication
export SB_USER=demo
export SB_PASS=your-password

# Deploy everything
npm run deploy:storybook

# 🌐 Live at: https://nucleusstorybookdev.z22.web.core.windows.net/
```

### Deploy Documentation

```bash
# Load environment variables
source .env.local

# Deploy everything
npm run deploy:docs

# 🌐 Live at: https://nucleusdocsdev.z22.web.core.windows.net/
```

## 🧪 Testing Locally Before Deployment

### Test Unified Storybook Bundle

```bash
# 1. Build the unified bundle
npm run package-storybook

# 2. Serve locally
npm install -g http-server
cd .deploy/storybook-bundle
http-server -p 8080

# 3. Test in browser: http://localhost:8080
#    ✓ React Storybook at root
#    ✓ Angular Storybook at /angular/
#    ✓ Framework switcher on component pages
```

## 📊 What Gets Deployed

### Unified Storybook Structure
```
/                    # React Storybook (primary)
/angular/            # Angular Storybook
Both have:
  - Framework switcher button
  - Optional authentication
  - Shared navigation
```

### Key Features
- ✅ Switch between React and Angular on any component page
- ✅ Client-side authentication (optional)
- ✅ 97% cost savings vs Web App (~$1.80/month)
- ✅ Auto-generated from component code

## 🆘 Common Issues

**Build fails with TypeScript errors?**
```bash
# Remove unused imports in component files
# Check packages/nucleus/src/components/
```

**Jekyll won't start?**
```bash
# Install Ruby 4.0+
brew install ruby@4.0
cd docs && bundle install
```

**Deployment fails?**
```bash
# Make sure you're logged into Azure
az login
source .env.local  # Load environment variables
```

**Framework switcher not appearing?**
```bash
# Hard refresh browser (Cmd+Shift+R)
# Clear cache and reload
```

## �� Full Documentation

- **README.md** - Complete reference guide
- **DEPLOYMENT.md** - Detailed deployment instructions
- **Live Storybook** - https://nucleusstorybookdev.z22.web.core.windows.net/
- **Live Docs** - https://nucleusdocsdev.z22.web.core.windows.net/

## 💡 Quick Commands Reference

| Task | Command |
|------|---------|
| Build all | `npm run build` |
| React Storybook | `npm run storybook:react` |
| Angular Storybook | `npm run storybook:angular` |
| Jekyll docs | `npm run docs:blog` |
| Build unified bundle | `npm run package-storybook` |
| Deploy Storybook | `npm run deploy:storybook` |
| Deploy docs | `npm run deploy:docs` |

---

**Need Help?** Check README.md or open an issue on GitHub.
