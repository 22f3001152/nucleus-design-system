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

// Target path (.deploy/pages-bundle)
const deployRoot = path.join(rootDir, '.deploy/pages-bundle');

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

// 5. Create Framework Switcher script
const switcherJs = `
(function() {
  const isAngular = window.location.pathname.includes('/angular/');
  const targetLabel = isAngular ? 'Switch to React' : 'Switch to Angular';
  const targetFramework = isAngular ? 'react' : 'angular';
  
  // Custom button styling
  const style = \`
    #framework-switcher {
      position: fixed;
      top: 10px;
      right: 200px;
      z-index: 999999;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #framework-switcher:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0,0,0,0.3);
    }
    #framework-switcher svg {
      width: 16px;
      height: 16px;
    }
  \`;

  const btn = document.createElement('button');
  btn.id = 'framework-switcher';
  btn.innerHTML = (isAngular ? '📱 ' : '⚛️ ') + targetLabel;
  
  btn.onclick = function() {
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.search;
    const githubPagesBase = '/nucleus-design-system';
    
    if (isAngular) {
      // Angular -> React (root)
      window.location.href = githubPagesBase + '/' + searchParams;
    } else {
      // React -> Angular
      window.location.href = githubPagesBase + '/angular/' + searchParams;
    }
  };

  const styleEl = document.createElement('style');
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
  document.body.appendChild(btn);
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

console.log('[prepare-pages-bundle] ✅ Unified Storybook bundle prepared successfully!');
console.log(`[prepare-pages-bundle] 📦 Location: ${deployRoot}`);
