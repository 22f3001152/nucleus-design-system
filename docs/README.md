# Nucleus Design System Documentation

This directory contains the Jekyll-based developer documentation blog for the Nucleus Design System.

## Prerequisites

- **Ruby 4.0+** (Homebrew: `brew install ruby`)
- **Bundler** (Included with Ruby 4)

Note: System Ruby (2.6) is not compatible with modern gems. Use Homebrew Ruby.

## Local Development

```bash
# From repository root
npm run docs:blog

# Or manually from this directory
/opt/homebrew/opt/ruby/bin/bundle install
/opt/homebrew/opt/ruby/bin/bundle exec jekyll serve
```

Visit [http://localhost:4000/nucleus-docs/](http://localhost:4000/nucleus-docs/)

## Build Only

```bash
npm run docs:blog:build
```

Output: `_site/` directory

## Content Structure

- **`_posts/`**: 15-part series (690-1210 words each, avg 810 words)
  - Part 1-3: Introduction, Setup, Stencil fundamentals
  - Part 4-7: Component development and framework wrappers
  - Part 8-10: Storybook and Atomic Design
  - Part 11-12: Advanced tokens and auto-docs
  - Part 13-15: Tooling, deployment, and reference
- **`_plugins/mermaid.rb`**: Custom plugin to render Mermaid diagrams (13 total diagrams across posts)
- **`pages/`**: About, Glossary, Quick Reference, Series navigation
- **`_layouts/`**: Post templates with TOC and Mermaid support
- **`_includes/`**: Reusable partials (TOC, Mermaid script loader)
- **`_data/navigation.yml`**: Site navigation menu

## Mermaid Diagram Support

The custom `_plugins/mermaid.rb` plugin converts:
- ` ```mermaid` code blocks → `<div class="mermaid">` elements
- Mermaid.js CDN loaded via `_includes/mermaid.html`
- Diagrams render on page load with default theme

## Adding New Posts

1. Create file in appropriate `_posts/{series}/` directory
2. Use format: `YYYY-MM-DD-title-slug.md`
3. Include front matter:
   ```yaml
   ---
   layout: post
   title: "Part X: Your Title"
   categories: [category-name]
   tags: [tag1, tag2]
   series: "Building a Design System from Scratch"
   series_part: X
   excerpt: "Brief description"
   toc: true
   ---
   ```
4. Write content (aim for 500-750 words)
5. Add Mermaid diagrams:
   ````markdown
   ```mermaid
   graph TB
       A --> B
   ```
   ````
6. Wrap code blocks containing `{{ "{{" }}` with `{% raw %}...{% endraw %}` to prevent Liquid parsing

## GitHub Pages Deployment

Automated via `.github/workflows/deploy-docs.yml` on push to `main` branch.

## Content Quality Standards

- **Target audience**: Junior developers
- **Word count**: 500-750 words per post (avg: 810 words achieved)
- **Diagrams**: Include Mermaid flowcharts/graphs for architecture and workflows
- **Code examples**: Real working code from the repository
- **Explanations**: Step-by-step with "why" not just "how"
