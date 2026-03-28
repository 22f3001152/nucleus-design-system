# Quick Start Guide - Nucleus Design System

**For Team Members: Get up and running in 10 minutes**

## 🎯 What You'll Need

- Node.js 20.19+
- Ruby 4.0+ (for documentation)

## 📦 First Time Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd nucleus
npm install

# 2. Build everything
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

## �� Full Documentation

- **README.md** - Complete reference guide

## 💡 Quick Commands Reference

| Task | Command |
|------|---------|
| Build all | `npm run build` |
| React Storybook | `npm run storybook:react` |
| Angular Storybook | `npm run storybook:angular` |
| Jekyll docs | `npm run docs:blog` |

---

**Need Help?** Check README.md or open an issue on GitHub.
