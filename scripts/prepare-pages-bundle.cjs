/**
 * prepare-pages-bundle.cjs
 * 
 * This script merges React and Angular Storybook static builds into a single
 * unified bundle for GitHub Pages deployment.
 * 
 * Structure:
 * - / (React Storybook - primary)
 * - /angular/ (Angular Storybook)
 * 
 * It also injects a framework switcher button into the index.html of both apps.
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

console.log('[prepare-pages-bundle] 🚀 Starting unified bundle preparation for GitHub Pages...');

// 1. Clean and create deployment directory
if (fs.existsSync(deployRoot)) {
  console.log(`[prepare-pages-bundle] 🗑️ Cleaning existing directory: ${deployRoot}`);
  fs.rmSync(deployRoot, { recursive: true, force: true });
}
fs.mkdirSync(deployRoot, { recursive: true });

// 2. Helper function to copy directories
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 3. Copy React Storybook (Primary - Root)
if (fs.existsSync(reactStaticDir)) {
  console.log('[prepare-pages-bundle] 📦 Copying React Storybook to root...');
  copyRecursiveSync(reactStaticDir, deployRoot);
} else {
  console.error('[prepare-pages-bundle] ❌ Error: React Storybook static files not found!');
  process.exit(1);
}

// 4. Copy Angular Storybook (Secondary - /angular/)
const angularDeployDir = path.join(deployRoot, 'angular');
if (fs.existsSync(angularStaticDir)) {
  console.log('[prepare-pages-bundle] 📦 Copying Angular Storybook to /angular/ folder...');
  copyRecursiveSync(angularStaticDir, angularDeployDir);
} else {
  console.error('[prepare-pages-bundle] ❌ Error: Angular Storybook static files not found!');
  process.exit(1);
}

// 4.5 Copy Jekyll Blog (Subpath - /blog/)
if (fs.existsSync(jekyllStaticDir)) {
  console.log('[prepare-pages-bundle] 📦 Copying Jekyll Blog to /blog/ folder...');
  copyRecursiveSync(jekyllStaticDir, blogDeployDir);
} else {
  console.warn('[prepare-pages-bundle] ⚠️ Warning: Jekyll Blog static files not found at ' + jekyllStaticDir);
}

// 5. Create Framework Switcher script
const switcherJs = `
(function() {
  function initSwitcher() {
    const isAngular = window.location.pathname.includes('/angular/');
    const isBlog = window.location.pathname.includes('/blog/');
    const targetLabel = isAngular ? 'Switch to React' : 'Switch to Angular';
    const targetFramework = isAngular ? 'react' : 'angular';
    
    // Custom button styling
    const style = \`
      #nucleus-toolbar {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000000;
        display: flex;
        gap: 12px;
        background: rgba(15, 23, 42, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 8px 8px 8px 16px;
        border-radius: 40px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: white;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      #nucleus-toolbar:hover {
        transform: translateY(-4px);
        background: rgba(15, 23, 42, 0.95);
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
      }
      .toolbar-label {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        opacity: 0.7;
      }
      .toolbar-btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 30px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
      }
      .toolbar-btn:hover {
        background: white;
        color: #0f172a;
      }
      .toolbar-btn.primary {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      }
      .toolbar-btn.primary:hover {
        opacity: 0.9;
        transform: scale(1.02);
        color: white;
      }
    \`;

    const toolbar = document.createElement('div');
    toolbar.id = 'nucleus-toolbar';
    
    const label = document.createElement('span');
    label.className = 'toolbar-label';
    label.innerText = 'Nucleus';
    toolbar.appendChild(label);

    const switchBtn = document.createElement('button');
    switchBtn.className = 'toolbar-btn primary';
    switchBtn.innerHTML = (isAngular ? '⚛️ ' : '🅰️ ') + targetLabel;
    
    switchBtn.onclick = function() {
      const currentUrl = new URL(window.location.href);
      const searchParams = currentUrl.search;
      
      // Smart detection of base path
      const pathParts = window.location.pathname.split('/');
      // If we are in '/nucleus-design-system/angular/' -> base is '/nucleus-design-system'
      // If we are in '/angular/' -> base is ''
      let base = '';
      if (pathParts.includes('nucleus-design-system')) {
        base = '/nucleus-design-system';
      }

      const newPath = isAngular ? base + '/' : base + '/angular/';
      window.location.href = newPath + searchParams;
    };
    toolbar.appendChild(switchBtn);

    const blogBtn = document.createElement('a');
    blogBtn.className = 'toolbar-btn';
    blogBtn.href = (window.location.pathname.includes('nucleus-design-system') ? '/nucleus-design-system' : '') + '/blog/';
    blogBtn.innerHTML = '📝 Blog';
    toolbar.appendChild(blogBtn);

    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
    document.body.appendChild(toolbar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwitcher);
  } else {
    initSwitcher();
  }
})();
`;

fs.writeFileSync(path.join(deployRoot, 'framework-switcher.js'), switcherJs.trim());
fs.writeFileSync(path.join(angularDeployDir, 'framework-switcher.js'), switcherJs.trim());

// 6. Inject scripts into index.html files
const reactIndexPath = path.join(deployRoot, 'index.html');
const angularIndexPath = path.join(angularDeployDir, 'index.html');

if (fs.existsSync(reactIndexPath)) {
  let html = fs.readFileSync(reactIndexPath, 'utf8');
  if (!html.includes('framework-switcher.js')) {
    html = html.replace('</head>', '<script src="./framework-switcher.js"></script></head>');
    fs.writeFileSync(reactIndexPath, html);
  }
}

if (fs.existsSync(angularIndexPath)) {
  let html = fs.readFileSync(angularIndexPath, 'utf8');
  if (!html.includes('framework-switcher.js')) {
    html = html.replace('</head>', '<script src="./framework-switcher.js"></script></head>');
    fs.writeFileSync(angularIndexPath, html);
  }
}

// 7. Prevent Jekyll from processing the site (important for Storybook assets with underscores)
fs.writeFileSync(path.join(deployRoot, '.nojekyll'), '');

console.log('[prepare-pages-bundle] ✅ Unified Storybook bundle prepared successfully!');
console.log(`[prepare-pages-bundle] 📦 Location: ${deployRoot}`);
