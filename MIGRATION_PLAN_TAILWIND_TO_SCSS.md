# Migration Plan: Tailwind CSS → SCSS with Design Tokens

> **Goal**: Replace all Tailwind `@apply`-based CSS with a design-token-driven SCSS architecture so that component styling is driven by overridable variables (CSS custom properties).

---

## Current State

| Aspect | Details |
|--------|---------|
| Components | 15 Stencil web components in `packages/nucleus/src/components/` |
| Styling | Each component has a `.css` file using `@tailwind` directives and `@apply` |
| Tailwind config | 4 custom colors (`primary`, `primary-hover`, `secondary`, `secondary-hover`), 1 custom font |
| Build pipeline | `postcss-import` → `tailwindcss` → `autoprefixer` → (prod: `purgecss` + `cssnano`) in `stencil.config.ts` |
| SCSS readiness | `@stencil/sass` already installed as devDependency |
| Shadow DOM | Disabled (`shadow: false`) on all components |
| Class composition | `classnames` library used in TSX — stays unchanged |
| Consumers | React storybook imports compiled `nucleus.css`; Angular storybook uses web component defaults |

---

## Phase 1: Foundation — SCSS Token System & Architecture

### 1.1 Create design token files

Create directory: `packages/nucleus/src/styles/tokens/`

#### `_colors.scss`

```scss
// Brand
$nucleus-color-primary: #1fb6ff !default;
$nucleus-color-primary-hover: #2b6cb0 !default;
$nucleus-color-secondary: #7e5bef !default;
$nucleus-color-secondary-hover: #7b1fa2 !default;

// Neutral (gray scale — matches Tailwind's default palette)
$nucleus-color-gray-50: #f9fafb !default;
$nucleus-color-gray-100: #f3f4f6 !default;
$nucleus-color-gray-200: #e5e7eb !default;
$nucleus-color-gray-300: #d1d5db !default;
$nucleus-color-gray-400: #9ca3af !default;
$nucleus-color-gray-500: #6b7280 !default;
$nucleus-color-gray-600: #4b5563 !default;
$nucleus-color-gray-700: #374151 !default;
$nucleus-color-gray-800: #1f2937 !default;
$nucleus-color-gray-900: #111827 !default;

// Semantic
$nucleus-color-error: #ef4444 !default;
$nucleus-color-error-light: #fecaca !default;
$nucleus-color-success: #22c55e !default;
$nucleus-color-warning: #f59e0b !default;

// Base
$nucleus-color-white: #ffffff !default;
$nucleus-color-black: #000000 !default;
```

> **Best practice**: All variables use `!default` so consumers can override them before importing, if they compile from source.

#### `_spacing.scss`

```scss
$nucleus-spacing-0: 0 !default;
$nucleus-spacing-0-5: 0.125rem !default;  // 2px
$nucleus-spacing-1: 0.25rem !default;     // 4px
$nucleus-spacing-1-5: 0.375rem !default;  // 6px
$nucleus-spacing-2: 0.5rem !default;      // 8px
$nucleus-spacing-2-5: 0.625rem !default;  // 10px
$nucleus-spacing-3: 0.75rem !default;     // 12px
$nucleus-spacing-3-5: 0.875rem !default;  // 14px
$nucleus-spacing-4: 1rem !default;        // 16px
$nucleus-spacing-5: 1.25rem !default;     // 20px
$nucleus-spacing-6: 1.5rem !default;      // 24px
$nucleus-spacing-8: 2rem !default;        // 32px
$nucleus-spacing-10: 2.5rem !default;     // 40px
$nucleus-spacing-12: 3rem !default;       // 48px
$nucleus-spacing-16: 4rem !default;       // 64px
```

#### `_typography.scss`

```scss
// Font families
$nucleus-font-family-sans: 'Comic Neue', sans-serif !default;

// Font sizes
$nucleus-font-size-xs: 0.75rem !default;    // 12px
$nucleus-font-size-sm: 0.875rem !default;   // 14px
$nucleus-font-size-base: 1rem !default;     // 16px
$nucleus-font-size-lg: 1.125rem !default;   // 18px
$nucleus-font-size-xl: 1.25rem !default;    // 20px

// Line heights
$nucleus-line-height-tight: 1.25 !default;
$nucleus-line-height-normal: 1.5 !default;
$nucleus-line-height-relaxed: 1.75 !default;

// Font weights
$nucleus-font-weight-normal: 400 !default;
$nucleus-font-weight-medium: 500 !default;
$nucleus-font-weight-semibold: 600 !default;
$nucleus-font-weight-bold: 700 !default;
```

#### `_borders.scss`

```scss
// Border radius
$nucleus-radius-none: 0 !default;
$nucleus-radius-sm: 0.125rem !default;   // 2px
$nucleus-radius-md: 0.375rem !default;   // 6px
$nucleus-radius-lg: 0.5rem !default;     // 8px
$nucleus-radius-xl: 0.75rem !default;    // 12px
$nucleus-radius-full: 9999px !default;

// Border widths
$nucleus-border-width-default: 1px !default;
$nucleus-border-width-2: 2px !default;

// Border colors
$nucleus-border-color-default: $nucleus-color-gray-300 !default;
$nucleus-border-color-light: $nucleus-color-gray-200 !default;
```

> **Note**: `_borders.scss` depends on `_colors.scss`. Use `@use 'colors' as colors;` and reference `colors.$nucleus-color-gray-300`.

#### `_shadows.scss`

```scss
$nucleus-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !default;
$nucleus-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) !default;
$nucleus-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1) !default;
```

#### `_transitions.scss`

```scss
$nucleus-transition-duration-fast: 150ms !default;
$nucleus-transition-duration-base: 200ms !default;
$nucleus-transition-duration-slow: 300ms !default;

$nucleus-transition-easing-default: ease-in-out !default;
$nucleus-transition-easing-out: ease-out !default;
```

#### `_z-index.scss`

```scss
$nucleus-z-dropdown: 30 !default;
$nucleus-z-sticky: 40 !default;
$nucleus-z-overlay: 50 !default;
$nucleus-z-modal: 60 !default;
$nucleus-z-tooltip: 70 !default;
```

#### `_index.scss` (barrel file)

```scss
@forward 'colors';
@forward 'spacing';
@forward 'typography';
@forward 'borders';
@forward 'shadows';
@forward 'transitions';
@forward 'z-index';
```

---

### 1.2 Create CSS custom properties (theming layer)

Create: `packages/nucleus/src/styles/_custom-properties.scss`

```scss
@use 'tokens/colors' as colors;
@use 'tokens/spacing' as spacing;
@use 'tokens/typography' as typography;
@use 'tokens/borders' as borders;
@use 'tokens/shadows' as shadows;
@use 'tokens/transitions' as transitions;
@use 'tokens/z-index' as z;

:root {
  // Colors
  --nucleus-color-primary: #{colors.$nucleus-color-primary};
  --nucleus-color-primary-hover: #{colors.$nucleus-color-primary-hover};
  --nucleus-color-secondary: #{colors.$nucleus-color-secondary};
  --nucleus-color-secondary-hover: #{colors.$nucleus-color-secondary-hover};

  --nucleus-color-gray-50: #{colors.$nucleus-color-gray-50};
  --nucleus-color-gray-100: #{colors.$nucleus-color-gray-100};
  --nucleus-color-gray-200: #{colors.$nucleus-color-gray-200};
  --nucleus-color-gray-300: #{colors.$nucleus-color-gray-300};
  --nucleus-color-gray-400: #{colors.$nucleus-color-gray-400};
  --nucleus-color-gray-500: #{colors.$nucleus-color-gray-500};
  --nucleus-color-gray-600: #{colors.$nucleus-color-gray-600};
  --nucleus-color-gray-700: #{colors.$nucleus-color-gray-700};
  --nucleus-color-gray-800: #{colors.$nucleus-color-gray-800};
  --nucleus-color-gray-900: #{colors.$nucleus-color-gray-900};

  --nucleus-color-error: #{colors.$nucleus-color-error};
  --nucleus-color-error-light: #{colors.$nucleus-color-error-light};
  --nucleus-color-success: #{colors.$nucleus-color-success};
  --nucleus-color-warning: #{colors.$nucleus-color-warning};

  --nucleus-color-white: #{colors.$nucleus-color-white};
  --nucleus-color-black: #{colors.$nucleus-color-black};

  // Typography
  --nucleus-font-family-sans: #{typography.$nucleus-font-family-sans};
  --nucleus-font-size-xs: #{typography.$nucleus-font-size-xs};
  --nucleus-font-size-sm: #{typography.$nucleus-font-size-sm};
  --nucleus-font-size-base: #{typography.$nucleus-font-size-base};
  --nucleus-font-size-lg: #{typography.$nucleus-font-size-lg};
  --nucleus-font-size-xl: #{typography.$nucleus-font-size-xl};

  // Spacing (expose commonly overridden ones)
  --nucleus-spacing-1: #{spacing.$nucleus-spacing-1};
  --nucleus-spacing-2: #{spacing.$nucleus-spacing-2};
  --nucleus-spacing-3: #{spacing.$nucleus-spacing-3};
  --nucleus-spacing-4: #{spacing.$nucleus-spacing-4};

  // Borders
  --nucleus-radius-md: #{borders.$nucleus-radius-md};
  --nucleus-radius-lg: #{borders.$nucleus-radius-lg};
  --nucleus-radius-full: #{borders.$nucleus-radius-full};
  --nucleus-border-color: #{colors.$nucleus-color-gray-300};

  // Shadows
  --nucleus-shadow-sm: #{shadows.$nucleus-shadow-sm};
  --nucleus-shadow-md: #{shadows.$nucleus-shadow-md};

  // Transitions
  --nucleus-transition-fast: #{transitions.$nucleus-transition-duration-fast};
  --nucleus-transition-base: #{transitions.$nucleus-transition-duration-base};
}
```

> **This is the consumer-facing API.** Users override these at runtime:
> ```css
> :root {
>   --nucleus-color-primary: #e63946;
>   --nucleus-radius-lg: 0;
> }
> ```

---

### 1.3 Create shared mixins

Create directory: `packages/nucleus/src/styles/mixins/`

#### `_disabled.scss`

```scss
@mixin disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

#### `_focus.scss`

```scss
@mixin focus-ring($color: var(--nucleus-color-primary), $width: 2px, $opacity: 0.3) {
  outline: none;
  box-shadow: 0 0 0 $width rgba($color, $opacity);

  // Fallback for CSS custom property colors (rgba won't work with var())
  // Use a separate property for the ring color
  &:focus-visible {
    outline: $width solid $color;
    outline-offset: 2px;
  }
}

@mixin focus-ring-var($color-var, $ring-color-var) {
  &:focus {
    border-color: var(#{$color-var});
    box-shadow: 0 0 0 3px var(#{$ring-color-var});
  }
}
```

#### `_visually-hidden.scss`

```scss
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

#### `_transition.scss`

```scss
@mixin transition($properties: all, $duration: var(--nucleus-transition-fast), $easing: ease-in-out) {
  transition-property: $properties;
  transition-duration: $duration;
  transition-timing-function: $easing;
}
```

#### `_sizing.scss`

```scss
// Size maps for consistent xs/sm/md/lg/xl patterns
$size-padding-x: (
  xs: var(--nucleus-spacing-2),
  sm: var(--nucleus-spacing-3),
  md: var(--nucleus-spacing-3),
  lg: var(--nucleus-spacing-4),
  xl: var(--nucleus-spacing-4),
) !default;

$size-padding-y: (
  xs: var(--nucleus-spacing-1),
  sm: var(--nucleus-spacing-1-5),
  md: var(--nucleus-spacing-2),
  lg: var(--nucleus-spacing-2-5),
  xl: var(--nucleus-spacing-3),
) !default;

$size-font: (
  xs: var(--nucleus-font-size-xs),
  sm: var(--nucleus-font-size-sm),
  md: var(--nucleus-font-size-base),
  lg: var(--nucleus-font-size-base),
  xl: var(--nucleus-font-size-lg),
) !default;

@mixin size-variant($size) {
  padding: map-get($size-padding-y, $size) map-get($size-padding-x, $size);
  font-size: map-get($size-font, $size);
}
```

#### `_index.scss` (barrel file)

```scss
@forward 'disabled';
@forward 'focus';
@forward 'visually-hidden';
@forward 'transition';
@forward 'sizing';
```

---

### 1.4 Create global styles entry point

Replace `packages/nucleus/src/styles/styles.css` with `packages/nucleus/src/styles/styles.scss`:

```scss
@use 'custom-properties';

// Minimal reset (replaces @tailwind base)
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--nucleus-font-family-sans);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Font face
@font-face {
  font-family: 'Comic Neue';
  src: url('/dist/nucleus/fonts/ComicNeue-Regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

> **Delete** `packages/nucleus/src/styles/styles.css` after creating `styles.scss`.

---

## Phase 2: Build Configuration Changes

### 2.1 Update `packages/nucleus/stencil.config.ts`

**Before:**
```ts
import { postcss } from "@stencil-community/postcss";
import autoprefixer from "autoprefixer";

// ... purgecss block ...

export const config: Config = {
  globalStyle: "./src/styles/styles.css",
  plugins: [
    postcss({
      plugins: [
        require("postcss-import"),
        require("tailwindcss")("./tailwind.config.js"),
        autoprefixer(),
        ...(process.env.NODE_ENV === "production"
          ? [purgecss, require("cssnano")]
          : []),
      ],
    }),
  ],
};
```

**After:**
```ts
import { sass } from "@stencil/sass";

export const config: Config = {
  globalStyle: "./src/styles/styles.scss",
  plugins: [
    sass({
      includePaths: ["./src/styles"],
    }),
  ],
};
```

**Changes:**
- Remove `@stencil-community/postcss` import
- Remove `autoprefixer` import
- Remove `purgecss` const
- Add `@stencil/sass` import
- Replace entire `plugins` array
- Update `globalStyle` path

### 2.2 Update `packages/nucleus/package.json` devDependencies

**Remove:**
```json
"@fullhuman/postcss-purgecss": "^5.0.0",
"@stencil-community/postcss": "^2.2.0",
"autoprefixer": "^10.4.16",
"cssnano": "^6.0.1",
"postcss-import": "^15.1.0",
"tailwindcss": "^3.3.6"
```

**Keep:**
```json
"@stencil/sass": "^3.0.7",
"classnames": "^2.3.2"
```

### 2.3 Delete file

```
packages/nucleus/tailwind.config.js
```

---

## Phase 3: Component Migration

### Migration checklist — repeat for each component

- [ ] Rename `.css` → `.scss`
- [ ] Update `styleUrl` in `.tsx` (`'nucleus-button.css'` → `'nucleus-button.scss'`)
- [ ] Remove `@tailwind base; @tailwind components; @tailwind utilities;`
- [ ] Add `@use` imports for tokens and mixins
- [ ] Replace every `@apply` with explicit SCSS/CSS properties using tokens and CSS custom properties
- [ ] Namespace any generic class names (`.toggle` → `.nucleus-toggle-track`, `.primary` → `.nucleus-toggle-primary`, etc.)
- [ ] Update corresponding class names in `.tsx` if renamed
- [ ] Run `npm run test` to verify specs still pass

### Component list

| # | Component | CSS File | Complexity | Notes |
|---|-----------|----------|------------|-------|
| 1 | `nucleus-accordion` | Empty | Simple | Just rename |
| 2 | `nucleus-accordion-body` | Has CSS | Simple | |
| 3 | `nucleus-accordion-header` | Has CSS | Simple | |
| 4 | `nucleus-radio-group` | No CSS file | Simple | Create empty `.scss` or skip |
| 5 | `nucleus-pill` | Has CSS | Simple | |
| 6 | `nucleus-avatar` | Has CSS | Medium | Size variants, shape variants |
| 7 | `nucleus-button` | Has CSS | Medium | Size + type variants, disabled, rounded |
| 8 | `nucleus-input` | Has CSS | Medium | Size + variant + focus + disabled + invalid |
| 9 | `nucleus-checkbox` | Has CSS | Medium | Checked states, size variants |
| 10 | `nucleus-progress` | Has CSS | Medium | Size variants, indeterminate animation |
| 11 | `nucleus-radio` | Has CSS | Medium | Similar to checkbox |
| 12 | `nucleus-textarea` | Has CSS | Medium | Similar to input |
| 13 | `nucleus-toggle` | Has CSS | Complex | Pseudo-elements for track/thumb, rename generic classes |
| 14 | `nucleus-dropdown` | Has CSS | Complex | Positioning, z-index, chevron rotation |
| 15 | `nucleus-header` | Has CSS | Complex | Layout, responsive |
| 16 | `nucleus-footer` | Has CSS | Complex | Layout |
| 17 | `nucleus-multiselect` | Has CSS | Complex | Dropdown + multi-selection |

### Example migration: `nucleus-button`

**Before** (`nucleus-button.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.btn {
    @apply font-sans py-2 px-4;
}
.btn-primary {
    @apply bg-primary text-white hover:bg-primary-hover focus:bg-primary-hover rounded-lg;
}
.btn-xs {
    @apply px-3 py-2 text-xs font-medium;
}
/* ... */
```

**After** (`nucleus-button.scss`):
```scss
@use '../../styles/tokens' as tokens;
@use '../../styles/mixins' as mixins;

.btn {
  font-family: var(--nucleus-font-family-sans);
  padding: tokens.$nucleus-spacing-2 tokens.$nucleus-spacing-4;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: tokens.$nucleus-font-weight-medium;
  @include mixins.transition(background-color, var(--nucleus-transition-fast));
}

.btn-primary {
  background-color: var(--nucleus-color-primary);
  color: var(--nucleus-color-white);
  border-radius: var(--nucleus-radius-lg);

  &:hover,
  &:focus {
    background-color: var(--nucleus-color-primary-hover);
  }
}

.btn-secondary {
  background-color: var(--nucleus-color-secondary);
  color: var(--nucleus-color-gray-100);
  border: tokens.$nucleus-border-width-default solid var(--nucleus-border-color);
  border-radius: var(--nucleus-radius-lg);

  &:hover,
  &:focus {
    background-color: var(--nucleus-color-secondary-hover);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(tokens.$nucleus-color-secondary, 0.3);
  }
}

// Size variants
.btn-xs {
  padding: tokens.$nucleus-spacing-2 tokens.$nucleus-spacing-3;
  font-size: var(--nucleus-font-size-xs);
}

.btn-sm {
  padding: tokens.$nucleus-spacing-2 tokens.$nucleus-spacing-3;
  font-size: var(--nucleus-font-size-sm);
}

.btn-md {
  padding: tokens.$nucleus-spacing-2-5 tokens.$nucleus-spacing-5;
  font-size: var(--nucleus-font-size-base);
}

.btn-lg {
  padding: tokens.$nucleus-spacing-3 tokens.$nucleus-spacing-5;
  font-size: var(--nucleus-font-size-base);
}

.btn-xl {
  padding: tokens.$nucleus-spacing-3-5 tokens.$nucleus-spacing-6;
  font-size: var(--nucleus-font-size-lg);
}

.rounded {
  border-radius: var(--nucleus-radius-full);
}

.disabled {
  @include mixins.disabled;
}
```

**TSX change** (only `styleUrl`):
```tsx
@Component({
  tag: "nucleus-button",
  styleUrl: "nucleus-button.scss",  // was .css
  shadow: false,
})
```

---

## Phase 4: Consumer / Storybook Updates

### 4.1 React storybook (`sb-nucleus-react`)

**No changes required.** The `App.scss` imports `../../nucleus/dist/nucleus/nucleus.css` — the compiled output filename remains the same after migration.

### 4.2 Angular storybook (`sb-nucleus-angular`)

**Verify only.** The `styles.css` in `angular.json` doesn't import nucleus directly. Web components load their own styles.

### 4.3 Documentation — add to `nucleus-dev-docs`

Create a **Theming Guide** page that covers:

1. **Available CSS custom properties** — full list of `--nucleus-*` variables with default values
2. **How to override** — examples:
   ```css
   /* Custom brand colors */
   :root {
     --nucleus-color-primary: #e63946;
     --nucleus-color-primary-hover: #c1121f;
     --nucleus-color-secondary: #457b9d;
     --nucleus-radius-lg: 0; /* sharp corners */
   }
   ```
3. **Scoped overrides** — override per component instance:
   ```css
   .my-special-section nucleus-button {
     --nucleus-color-primary: #2a9d8f;
   }
   ```
4. **Dark mode recipe**:
   ```css
   [data-theme="dark"] {
     --nucleus-color-primary: #90e0ef;
     --nucleus-color-gray-900: #f3f4f6;
     --nucleus-color-white: #1f2937;
   }
   ```

---

## Phase 5: Verification

### Automated checks

| # | Command | What it verifies |
|---|---------|------------------|
| 1 | `cd packages/nucleus && npm run build` | Stencil compiles all `.scss` without errors |
| 2 | `cd packages/nucleus && npm run test` | All spec tests pass (TSX logic unchanged) |
| 3 | `npm run build-storybook:react` | React storybook builds successfully |
| 4 | `npm run build-storybook:angular` | Angular storybook builds successfully |
| 5 | Inspect `dist/nucleus/nucleus.css` | No `@tailwind`, no Tailwind utility classes remain |
| 6 | `grep -r "tailwind" packages/nucleus/src/` | No Tailwind references in source |

### Manual / visual checks

- [ ] Compare storybook screenshots before/after for each component — ensure visual parity
- [ ] Test CSS variable override: set `--nucleus-color-primary: red` on `:root` and verify button, avatar, toggle change color
- [ ] Test scoped override: override color on a specific section and verify only that section changes
- [ ] Confirm no console errors in browser dev tools
- [ ] Verify fonts still load correctly

---

## Recommended Class Name Cleanup (do during Phase 3)

Some components use generic class names that will collide with consumer CSS:

| Component | Current | Recommended |
|-----------|---------|-------------|
| `nucleus-toggle` | `.toggle` | `.nucleus-toggle-track` |
| `nucleus-toggle` | `.primary` | `.nucleus-toggle-primary` |
| `nucleus-toggle` | `.secondary` | `.nucleus-toggle-secondary` |
| `nucleus-toggle` | `.xs`, `.sm`, `.md`, `.lg`, `.xl` | `.nucleus-toggle-xs`, etc. |
| `nucleus-button` | `.rounded` | `.nucleus-btn-rounded` |
| `nucleus-button` | `.disabled` | `.nucleus-btn-disabled` |

> Update both the `.scss` class names and the `classNames()` calls in the `.tsx` files.

---

## Best Practices Checklist for Design System Styling

### Token architecture
- [x] Single source of truth for all design values (colors, spacing, typography, etc.)
- [x] SCSS variables as compile-time defaults with `!default` flag
- [x] CSS custom properties as runtime theming API
- [x] Tokens organized by category in separate files
- [x] Barrel files for clean imports

### Component styling
- [x] Each component owns its stylesheet (co-located `.scss` file)
- [x] No inline styles in JSX — all styling via class names
- [x] Consistent naming convention with namespace prefix (`nucleus-*`)
- [x] Size variants follow consistent scale (xs/sm/md/lg/xl)
- [x] State styles (hover, focus, disabled, invalid) handled consistently via mixins
- [x] No magic numbers — all values from tokens

### Theming & customization
- [x] CSS custom properties for all consumer-facing values
- [x] Scoped overrides possible (per-section, per-component)
- [x] Dark mode achievable via variable swap on a selector
- [x] Forward-compatible with Shadow DOM (CSS custom properties cross shadow boundaries)

### Build & DX
- [x] `@use`/`@forward` module system (no deprecated `@import`)
- [x] Shared mixins to reduce duplication
- [x] No runtime CSS-in-JS overhead
- [x] Tree-shakeable — unused component styles aren't loaded if component isn't used
- [x] Compiled output is a single CSS file consumers import

### Accessibility
- [x] Focus states always visible (focus-ring mixin)
- [x] Screen-reader-only mixin for hidden-but-accessible content
- [x] No `outline: none` without replacement focus indicator
- [x] `prefers-reduced-motion` respected in transition mixin (add as enhancement)

---

## Files Summary

### Files to CREATE

```
packages/nucleus/src/styles/tokens/_colors.scss
packages/nucleus/src/styles/tokens/_spacing.scss
packages/nucleus/src/styles/tokens/_typography.scss
packages/nucleus/src/styles/tokens/_borders.scss
packages/nucleus/src/styles/tokens/_shadows.scss
packages/nucleus/src/styles/tokens/_transitions.scss
packages/nucleus/src/styles/tokens/_z-index.scss
packages/nucleus/src/styles/tokens/_index.scss
packages/nucleus/src/styles/_custom-properties.scss
packages/nucleus/src/styles/mixins/_disabled.scss
packages/nucleus/src/styles/mixins/_focus.scss
packages/nucleus/src/styles/mixins/_visually-hidden.scss
packages/nucleus/src/styles/mixins/_transition.scss
packages/nucleus/src/styles/mixins/_sizing.scss
packages/nucleus/src/styles/mixins/_index.scss
packages/nucleus/src/styles/styles.scss
```

### Files to MODIFY

```
packages/nucleus/stencil.config.ts          — replace PostCSS plugin with Sass plugin
packages/nucleus/package.json               — remove Tailwind deps
packages/nucleus/src/components/*/          — rename .css → .scss, rewrite styles
packages/nucleus/src/components/*/*.tsx     — update styleUrl to .scss
```

### Files to DELETE

```
packages/nucleus/tailwind.config.js
packages/nucleus/src/styles/styles.css      — replaced by styles.scss
```

---

## Execution Order

```
Phase 1.1  Create token files
Phase 1.2  Create custom properties file
Phase 1.3  Create mixin files
Phase 1.4  Create new global styles.scss
     ↓
Phase 2.1  Update stencil.config.ts
Phase 2.2  Update package.json (remove deps)
Phase 2.3  Delete tailwind.config.js
Phase 2.4  Delete styles.css
Phase 2.5  npm install (refresh lock file)
     ↓
Phase 3    Migrate components (can parallelize — all independent)
     ↓
Phase 4    Verify storybooks, update docs
     ↓
Phase 5    Full verification pass
```
