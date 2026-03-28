---
layout: page
title: Quick Reference
permalink: /pages/quick-reference/
---

## Core commands

```bash
npm run build
npm run lint
npm run test
npm run build-storybook:bundle
npm run build-and-serve-storybook:bundle:protected
```

## Key paths

- `packages/nucleus/stencil.config.ts`
- `packages/nucleus/src/styles/tokens/`
- `packages/nucleus/src/styles/_custom-properties.scss`
- `packages/nucleus/src/components/`
- `packages/sb-nucleus-react/.storybook/`
- `packages/sb-nucleus-angular/.storybook/`

## Stencil decorators

- `@Component`, `@Prop`, `@State`, `@Event`, `@Listen`, `@Watch`, `@Element`

## Naming conventions

- Component tag: `nucleus-*`
- CSS custom properties: `--nucleus-*`
- Storybook categories: `ATOMS`, `MOLECULES`, `ELEMENTS`
