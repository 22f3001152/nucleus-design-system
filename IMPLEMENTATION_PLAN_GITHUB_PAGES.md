# Implementation Plan - GitHub Pages Deployment

I will implement a pipeline to deploy a converged Storybook (React + Angular) to GitHub Pages.

## 1. Build Framework
*   **React Storybook**: Hosted at root (`/nucleus-design-system/`).
*   **Angular Storybook**: Hosted at `/nucleus-design-system/angular/`.
*   **Framework Switcher**: A script to toggle between them while keeping context (e.g., component path).

## 2. Convergence Script
I'll create `scripts/prepare-pages-bundle.cjs` (restoring the logic I removed but tuned for GitHub Pages) to:
*   Merge static outputs into `.deploy/pages-bundle`.
*   Inject the framework switcher button into `index.html` files.

## 3. Workflow Implementation
Create `.github/workflows/deploy-pages.yml` with:
*   `npm ci` and `npm run build` (core).
*   Correct base paths for both Storybooks using internal env variables.
*   Artifact upload and GitHub Pages deployment.

## 4. package.json Cleanup
Restore build-storybook commands needed for the converged bundle.
