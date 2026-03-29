/**
 * prepare-pages-bundle.cjs
 * 
 * This script merges React and Angular Storybook static builds into a single
 * unified bundle for GitHub Pages deployment.
 * 
 * It also applies a unified "Ant Design" theme with Roboto fonts and 
 * a framework switcher.
 */

const fs = require('fs');
const path = require('path');

// Root of the repository
const rootDir = path.resolve(__dirname, '..');

// Source paths
const reactStaticDir = path.join(rootDir, 'packages/sb-nucleus-react/storybook-static');
const angularStaticDir = path.join(rootDir, 'packages/sb-nucleus-angular/storybook-static');
const jekyllStaticDir = path.join(rootDir, 'docs/_site');

// Target path (.deploy/pages-bundle)
const deployRoot = path.join(rootDir, '.deploy/pages-bundle');
const blogDeployDir = path.join(deployRoot, 'blog');

console.log('[prepare-pages-bundle] 🚀 Starting unified bundle preparation...');

// 1. Clean and create deployment directory
if (fs.existsSync(deployRoot)) {
  fs.rmSync(deployRoot, { recursive: true, force: true });
}
fs.mkdirSync(deployRoot, { recursive: true });

// 2. Helper function to copy directories
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 3. Copy React Storybook (Root)
if (fs.existsSync(reactStaticDir)) {
  console.log('[prepare-pages-bundle] 📦 Copying React Storybook to root...');
  copyRecursiveSync(reactStaticDir, deployRoot);
}

// 4. Copy Angular Storybook (/angular/)
const angularDeployDir = path.join(deployRoot, 'angular');
if (fs.existsSync(angularStaticDir)) {
  console.log('[prepare-pages-bundle] 📦 Copying Angular Storybook to /angular/...');
  copyRecursiveSync(angularStaticDir, angularDeployDir);
}

// 4.5 Copy Jekyll Blog (/blog/)
if (fs.existsSync(jekyllStaticDir)) {
  console.log('[prepare-pages-bundle] 📦 Copying Jekyll Blog to /blog/...');
  copyRecursiveSync(jekyllStaticDir, blogDeployDir);
}

// 5. Create Framework Switcher & Theme script
// Using backticks carefully here. We'll use a different approach to avoid escaping hell.
const switcherJs = `
(function() {
  function initSwitcher() {
    if (document.getElementById('nucleus-toolbar')) return;

    const isAngular = window.location.pathname.includes('/angular/');
    const targetLabel = isAngular ? 'Switch to React' : 'Switch to Angular';
    
    const styleContent = \`
      /* --- GLOBAL STORYBOOK THEMING (ANT DESIGN INSPIRED) --- */
      @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

      body, .sidebar-container, .sidebar-item, button, span, div, a, p, h1, h2, h3 {
        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif !important;
      }

      /* Hide All Sidebar Icons and Chevrons */
      .sidebar-item svg, 
      [data-name="expand"], 
      [id*="explorer-"] svg, 
      button > svg,
      .sidebar-item span svg {
        display: none !important;
      }
      
      /* Reset sidebar layout since icons are gone */
      .sidebar-item {
        padding-left: 16px !important;
        padding-right: 16px !important;
        margin: 2px 0 !important;
        border-radius: 0 !important;
        color: rgba(0, 0, 0, 0.88) !important;
        font-size: 14px !important;
        height: 40px !important;
        display: flex !important;
        align-items: center !important;
        transition: all 0.2s !important;
        position: relative !important;
        background: transparent !important;
      }

      .sidebar-item:hover {
        background: rgba(0, 0, 0, 0.04) !important;
      }

      /* Active Sidebar Item */
      .sidebar-item[aria-selected="true"] {
        background: #e6f4ff !important;
        color: #1677ff !important;
        font-weight: 600 !important;
      }

      /* Ant Design blue bar */
      .sidebar-item[aria-selected="true"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 3px;
        background: #1677ff;
      }

      .sidebar-subheading {
        font-weight: 600 !important;
        color: rgba(0, 0, 0, 0.45) !important;
        text-transform: uppercase !important;
        font-size: 11px !important;
        letter-spacing: 0.1em !important;
        padding: 16px 16px 8px !important;
      }

      /* Platform Switcher Toolbar */
      #nucleus-toolbar {
        position: fixed;
        bottom: 12px;
        left: 12px;
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        gap: 6px;
        background: white;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #f0f0f0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        min-width: 160px;
      }
      .toolbar-title {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        color: #1677ff;
        margin-bottom: 4px;
      }
      .toolbar-btn {
        background: #1677ff;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-weight: 500;
        font-size: 13px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        display: block;
      }
      .toolbar-btn:hover { background: #4096ff; }
      .toolbar-btn.secondary {
        background: transparent;
        color: rgba(0,0,0,0.45);
        border: 1px solid #d9d9d9;
        margin-top: 2px;
      }
      .toolbar-btn.secondary:hover { border-color: #1677ff; color: #1677ff; }
    \`;

    const styleEl = document.createElement('style');
    styleEl.innerHTML = styleContent;
    document.head.appendChild(styleEl);

    const toolbar = document.createElement('div');
    toolbar.id = 'nucleus-toolbar';
    toolbar.innerHTML = \`
      <div class="toolbar-title">Platform</div>
      <button class="toolbar-btn" id="switch-btn">\${targetLabel}</button>
      <a class="toolbar-btn secondary" id="docs-btn">Documentation</a>
    \`;
    document.body.appendChild(toolbar);

    document.getElementById('switch-btn').onclick = function() {
      const pathParts = window.location.pathname.split('/');
      let base = pathParts.includes('nucleus-design-system') ? '/nucleus-design-system' : '';
      window.location.href = (isAngular ? base + '/' : base + '/angular/') + window.location.search;
    };

    const base = window.location.pathname.includes('nucleus-design-system') ? '/nucleus-design-system' : '';
    document.getElementById('docs-btn').href = base + '/blog/';
  }

  setTimeout(initSwitcher, 1000);
})();
`;

fs.writeFileSync(path.join(deployRoot, 'framework-switcher.js'), switcherJs.trim());
fs.writeFileSync(path.join(angularDeployDir, 'framework-switcher.js'), switcherJs.trim());

const fontLinks = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
`;

function injectIntoHtml(filePath) {
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');
    if (!html.includes('framework-switcher.js')) {
      html = html.replace('</head>', `${fontLinks}<script src="./framework-switcher.js"></script></head>`);
      fs.writeFileSync(filePath, html);
    }
  }
}

injectIntoHtml(path.join(deployRoot, 'index.html'));
injectIntoHtml(path.join(angularDeployDir, 'index.html'));

fs.writeFileSync(path.join(deployRoot, '.nojekyll'), '');
console.log('[prepare-pages-bundle] ✅ Bundle prepared successfully!');
