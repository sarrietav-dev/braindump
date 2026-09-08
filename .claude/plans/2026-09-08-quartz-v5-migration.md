# Quartz v4 → v5 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `sarrietav-dev/braindump` (brain.sarrietav.dev) from Quartz v4 to the real upstream Quartz v5 (branch `v5`, tag `v5.0.0`), reproducing the current site's behavior and appearance exactly, using v5's documented YAML/plugin mechanisms with no hacky workarounds.

**Architecture:** Scaffold via `npx quartz create`, then hand-author `quartz.config.yaml` for the entire site — theme, transformers/filters/emitters/page-types, and **every layout slot**, including the two bespoke, non-community components (`PageTitle`, `Links`), which are packaged as small local plugins (`local-plugins/<name>/`, symlinked in like any git-sourced plugin) so they can be placed via the same declarative `layout:` block every other component uses. `quartz.ts` is touched for exactly one thing — the `og-image` emitter's custom `imageStructure` override — because emitters use a different instantiation path than layout-placed components (confirmed by reading the loader source; see the spec's "Layout mapping" section for the full trail, including a documented false start where an `ExternalPlugin.X()`-based `quartz.ts` layout override was initially assumed possible and then disproven).

**Tech Stack:** Quartz 5 (Node ≥22, TypeScript, Preact/JSX components), YAML config, git- and locally-sourced plugin packages.

**Spec:** `.claude/specs/2026-09-08-quartz-v5-migration-design.md`

## Global Constraints

- No hacky workarounds. Where v5's declarative model can't cleanly express something v4 did, stop the task and report it instead of forcing a workaround (explicit user instruction).
- `v4` branch must remain untouched and deployable throughout — all work happens on a new `v5-migration` branch.
- Preserve current site behavior/appearance exactly wherever a clean v5 equivalent exists. Where it can't be preserved exactly (the two-instance RecentNotes gap), the already-agreed fallback is used (merge into one instance) — not re-litigated here.
- `AliasRedirects` must be enabled (SEO continuity for the uppercase→lowercase URL change).
- Real production deploy is GitHub Pages via `.github/workflows/deploy.yaml` (confirmed — this workflow is NOT gated to `jackyzha0/quartz`, unlike the other four workflows in this repo, and runs on every push to `v4`). Do not touch its branch trigger until the final cutover task, and only with explicit go-ahead.
- Baseline umami analytics config (`provider: umami`, `websiteId: 60a1ee55-e220-410d-aa67-3fb8280b5601`, no `host`) carries over verbatim — this matched v4's behavior (defaults to Umami Cloud), so no `host` field is added speculatively.
- Every layout slot is configured in `quartz.config.yaml`, not `quartz.ts` — `quartz.ts` is only ever touched for the `og-image` emitter override (Task 7). If a later task finds itself reaching for a `quartz.ts` layout override, that's a signal something has been misunderstood — stop and re-check against the spec's "Layout mapping" section rather than pushing forward.

---

## Task 1: Create migration branch from real upstream v5, scaffold, restore content

**Files:**
- Create: git branch `v5-migration`
- Create: `/tmp/quartz-v4-content-backup/` (outside repo, temporary)
- Modify: entire working tree (replaced by v5 scaffold)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a `v5-migration` branch checked out, with the v5 codebase in place, `content/` restored from the current v4 site, `npm install` completed, `npx quartz build` succeeding (even though config/layout won't match v4 yet — this task's deliverable is "v5 boots", not "v5 matches v4").

- [ ] **Step 1: Back up current content outside the repo**

```bash
cp -r content /tmp/quartz-v4-content-backup
```

- [ ] **Step 2: Verify the backup is complete**

```bash
diff -rq content /tmp/quartz-v4-content-backup
```
Expected: no output (directories identical).

- [ ] **Step 3: Add upstream remote and fetch the real v5 branch**

```bash
git remote add upstream https://github.com/jackyzha0/quartz.git 2>/dev/null || true
git fetch upstream v5
```
Expected: fetch succeeds, no errors.

- [ ] **Step 4: Create the migration branch from upstream v5**

```bash
git checkout -b v5-migration upstream/v5
```
Expected: branch created, working tree now shows v5's file layout (`quartz.config.default.yaml`, `quartz.ts`, no `quartz.layout.ts`).

- [ ] **Step 5: Install dependencies**

```bash
npm install
```
Expected: exits 0.

- [ ] **Step 6: Restore content**

```bash
rm -rf content
cp -r /tmp/quartz-v4-content-backup content
```

- [ ] **Step 7: Run the scaffolding wizard**

```bash
npx quartz create
```
When prompted: choose the `default` template, and when asked about content strategy, choose the option that keeps the existing `content/` directory in place (do not let it overwrite what was just restored — if the wizard's "copy" strategy expects a separate source path, point it at `/tmp/quartz-v4-content-backup` instead and let it write into `content/`). This step's job is only to get `quartz.lock.json`, `.quartz/plugins/`, and `.gitignore` entries initialized correctly — the config it generates will be fully replaced in later tasks.

- [ ] **Step 8: Verify baseline build**

```bash
npx quartz build
```
Expected: exits 0, produces a `public/` directory.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Scaffold Quartz v5 from upstream v5 branch, restore v4 content"
```

---

## Task 2: Author `quartz.config.yaml` — general configuration and theme

**Files:**
- Modify: `quartz.config.yaml` (replace wizard-generated content)

**Interfaces:**
- Consumes: nothing new
- Produces: `configuration:` block other tasks' plugin entries get appended under

- [ ] **Step 1: Replace the `configuration:` section**

Open `quartz.config.yaml` and replace its `configuration:` block with:

```yaml
# yaml-language-server: $schema=./quartz/plugins/quartz-plugins.schema.json
configuration:
  pageTitle: "Sebas' knowledge garden"
  pageTitleSuffix: ""
  enableSPA: true
  enablePopovers: true
  analytics:
    provider: umami
    websiteId: "60a1ee55-e220-410d-aa67-3fb8280b5601"
  locale: en-US
  baseUrl: brain.sarrietav.dev
  ignorePatterns:
    - private
    - templates
    - .obsidian
  theme:
    fontOrigin: googleFonts
    cdnCaching: true
    typography:
      header: Merriweather
      body: Bricolage Grotesque
      code: Fira Code
    colors:
      lightMode:
        light: "#e8f0e8"
        lightgray: "#cfd8d3"
        gray: "#8a9b95"
        darkgray: "#4e5e58"
        dark: "#2c3e3b"
        secondary: "#4b6d63"
        tertiary: "#748c85"
        highlight: "rgba(75, 107, 95, 0.1)"
        textHighlight: "#b0c4b8"
      darkMode:
        light: "#1a2420"
        lightgray: "#3c4d46"
        gray: "#697c74"
        darkgray: "#ccd4ce"
        dark: "#e4ece8"
        secondary: "#5a7b6f"
        tertiary: "#748c85"
        highlight: "rgba(75, 107, 95, 0.15)"
        textHighlight: "#8fb3a3"
plugins: []
```

(Leave `plugins: []` as a placeholder array — Task 3 fills it in. Every subsequent task appends entries to this array; none of them replace it wholesale.)

- [ ] **Step 2: Validate YAML syntax and schema**

```bash
npx quartz build 2>&1 | head -50
```
Expected: fails (no plugins configured yet is fine at this point — content-page/transformer errors are expected), but must NOT show a YAML parse error or a JSON-schema validation error about the `configuration` block itself. If it does, the error message will name the offending field — fix it before proceeding.

- [ ] **Step 3: Commit**

```bash
git add quartz.config.yaml
git commit -m "Configure quartz.config.yaml general configuration and theme"
```

---

## Task 3: Author `quartz.config.yaml` — transformers, filters, emitters, page types

**Files:**
- Modify: `quartz.config.yaml` (fill in the `plugins:` array)

**Interfaces:**
- Consumes: `configuration:` block from Task 2
- Produces: a working v5 site whose markdown-processing pipeline (frontmatter, dates, syntax highlighting, Obsidian/GFM markdown, TOC transformer, crawl-links, description, latex, drafts, page types, sitemap/RSS, favicon, alias redirects) matches v4 exactly. Visual layout (left/right/beforeBody/afterBody/footer columns) is handled in Tasks 4-5.

- [ ] **Step 1: Replace `plugins: []` with the full transformer/filter/emitter/page-type list**

```yaml
plugins:
  - source: "@quartz-community/note-properties"
    enabled: true
    order: 5
    options:
      includeAll: false
      includedProperties:
        - description
        - tags
        - aliases
      excludedProperties: []
      hidePropertiesView: true
      delimiters: "---"
      language: yaml
    layout:
      position: beforeBody
      priority: 15
  - source: "@quartz-community/created-modified-date"
    enabled: true
    order: 10
    options:
      defaultDateType: modified
      priority:
        - frontmatter
        - git
        - filesystem
  - source: "@quartz-community/syntax-highlighting"
    enabled: true
    order: 20
    options:
      theme:
        light: github-light
        dark: github-dark
      keepBackground: false
  - source: "@quartz-community/obsidian-flavored-markdown"
    enabled: true
    order: 30
    options:
      enableInHtmlEmbed: false
  - source: "@quartz-community/github-flavored-markdown"
    enabled: true
    order: 40
  - source: "@quartz-community/table-of-contents"
    enabled: true
    order: 50
    layout:
      position: right
      priority: 30
      display: desktop-only
  - source: "@quartz-community/crawl-links"
    enabled: true
    order: 60
    options:
      markdownLinkResolution: shortest
  - source: "@quartz-community/description"
    enabled: true
    order: 70
  - source: "@quartz-community/latex"
    enabled: true
    order: 80
    options:
      renderEngine: katex
  - source: "@quartz-community/remove-draft"
    enabled: true
  - source: "@quartz-community/alias-redirects"
    enabled: true
  - source: "@quartz-community/content-index"
    enabled: true
    options:
      enableSiteMap: true
      enableRSS: true
  - source: "@quartz-community/favicon"
    enabled: true
  - source: "@quartz-community/content-page"
    enabled: true
  - source: "@quartz-community/folder-page"
    enabled: true
  - source: "@quartz-community/tag-page"
    enabled: true
```

Note: `hidePropertiesView: true` on `note-properties` is a deliberate, verified choice — that plugin's default (`false`) renders a new "Properties" panel on every page that v4 never had. Setting it `true` preserves v4's plain frontmatter-parsing-only behavior with no visible panel, while keeping the plugin itself enabled (it's marked `required: true` upstream — Quartz breaks without it).

`og-image` is intentionally NOT listed here yet — Task 7 adds it alongside the `quartz.ts` override its custom `imageStructure` needs. v4's `CustomOgImages` was config'd for `NODE_ENV=production` only, as a dev-build-speed optimization; per the design doc this conditional is dropped and it will just always be enabled once wired up in Task 7.

- [ ] **Step 2: Install the newly-referenced plugins**

```bash
npx quartz plugin install --from-config
```
Expected: exits 0, plugins appear under `.quartz/plugins/`.

- [ ] **Step 3: Build and verify the pipeline runs**

```bash
npx quartz build 2>&1 | tail -40
```
Expected: build completes (layout will look broken/empty since Tasks 4-5 haven't wired up left/right/beforeBody/afterBody/footer yet — that's fine for this task). No transformer/emitter errors.

- [ ] **Step 4: Verify sitemap, RSS, and favicon were emitted**

```bash
ls public/sitemap.xml public/index.xml public/static/favicon.ico
```
Expected: all three files exist.

- [ ] **Step 5: Verify AliasRedirects generated redirects for uppercase-named content**

```bash
find content -name "*[A-Z]*" -type f | head -5
```
Note the paths this prints (should include e.g. `content/main notes/Bounded context.md`). Then:

```bash
find public -iname "*bounded*context*"
```
Expected: both the canonical lowercase page and at least one redirect page (containing `<meta http-equiv="refresh">` — spot-check one with `grep -l "refresh" public/**/*.html` or by opening it) exist.

- [ ] **Step 6: Commit**

```bash
git add quartz.config.yaml
git commit -m "Configure transformers, filters, emitters, and page types"
```

---

## Task 4: Author `quartz.config.yaml` — right column, beforeBody, footer

**Files:**
- Modify: `quartz.config.yaml` (append more entries to `plugins:`, add top-level `layout:` section)

**Interfaces:**
- Consumes: plugin list from Task 3
- Produces: right sidebar (Graph, desktop-only TableOfContents already added in Task 3, Backlinks), beforeBody row (Breadcrumbs, ArticleTitle, ContentMeta, TagList excluded on folder/tag pages), and footer, all rendering correctly on a content page — matching v4's `defaultContentPageLayout.right`/`beforeBody` and `sharedPageComponents.footer`.

- [ ] **Step 1: Append the right-column and beforeBody plugin entries**

```yaml
  - source: "@quartz-community/graph"
    enabled: true
    layout:
      position: right
      priority: 10
    options:
      localGraph:
        fontSize: 0.5
      globalGraph:
        repelForce: 3
        fontSize: 0.4
  - source: "@quartz-community/backlinks"
    enabled: true
    layout:
      position: right
      priority: 50
  - source: "@quartz-community/breadcrumbs"
    enabled: true
    layout:
      position: beforeBody
      priority: 5
      condition: not-index
  - source: "@quartz-community/article-title"
    enabled: true
    layout:
      position: beforeBody
      priority: 20
  - source: "@quartz-community/content-meta"
    enabled: true
    layout:
      position: beforeBody
      priority: 30
  - source: "@quartz-community/tag-list"
    enabled: true
    layout:
      position: beforeBody
      priority: 40
  - source: "@quartz-community/footer"
    enabled: true
    options:
      links:
        GitHub: https://github.com/sarrietav-dev
        Twitter: https://twitter.com/sarrietav
        LinkedIn: https://www.linkedin.com/in/sarrietav/
        Email: mailto:brain+sarrietav@protonmail.com
    layout:
      position: footer
      priority: 50
```

`graph`'s `localGraph.fontSize: 0.5` and `globalGraph: { repelForce: 3, fontSize: 0.4 }` match v4's `Component.Graph({ localGraph: { fontSize: 0.5 }, globalGraph: { repelForce: 3, fontSize: 0.4 } })` exactly — every other graph option keeps the plugin's documented default.

- [ ] **Step 2: Add the top-level `layout:` section to exclude TagList from folder/tag pages**

Append at the end of `quartz.config.yaml` (top level, sibling of `configuration:` and `plugins:`):

```yaml
layout:
  byPageType:
    folder:
      exclude:
        - tag-list
    tag:
      exclude:
        - tag-list
```

This matches v4's `defaultListPageLayout.beforeBody`, which omits `TagList` (only `Breadcrumbs` + `ArticleTitle` + `ContentMeta`). Task 5 adds two more names to each of these `exclude` lists.

- [ ] **Step 3: Build and visually inspect a content page**

```bash
npx quartz build --serve
```
Open a content page (e.g. `http://localhost:8080/main-notes/bounded-context`) in a browser. Verify: right sidebar shows Graph then Backlinks (TableOfContents appears only if the page has headings, per its `minEntries` default); beforeBody shows a breadcrumb trail (not on the homepage), the article title, content meta (date/reading time), and tags; footer shows the four custom links.

- [ ] **Step 4: Verify TagList is excluded on a folder page**

Navigate to a folder listing page (e.g. `/main-notes/`) and confirm no tag-list block appears in beforeBody, matching v4.

- [ ] **Step 5: Stop the dev server, commit**

```bash
git add quartz.config.yaml
git commit -m "Configure right column, beforeBody, and footer layout"
```

---

## Task 5: Package custom `PageTitle`/`Links` as local plugins; configure left/afterBody layout

**Files:**
- Create: `local-plugins/page-title/package.json`
- Create: `local-plugins/page-title/components.tsx`
- Create: `local-plugins/shared/links.tsx`
- Create: `local-plugins/links-desktop/package.json`
- Create: `local-plugins/links-desktop/components.tsx`
- Create: `local-plugins/links-mobile/package.json`
- Create: `local-plugins/links-mobile/components.tsx`
- Create: `quartz/components/styles/links.scss`
- Modify: `quartz.config.yaml` (append `search`, `darkmode`, `reader-mode`, `spacer`, `page-title`, `links-desktop`, `links-mobile`, `recent-notes`, `comments` entries; extend the `byPageType` excludes from Task 4)

**Interfaces:**
- Consumes: `QuartzComponentConstructor`/`QuartzComponentProps` from `quartz/components/types`, `GlobalConfiguration` from `quartz/cfg` (both confirmed present in v5 core, importable via relative path from a local plugin directory — Node resolves a symlink's real path before resolving its relative imports, so `../../quartz/...` from `local-plugins/<name>/` correctly reaches the repo's `quartz/` tree)
- Produces: every remaining layout slot (`left`, `afterBody`) configured, entirely in YAML — no `quartz.ts` involvement at all for this task

Local plugins get symlinked into `.quartz/plugins/<name>` by `installPlugin()`'s local-source branch (confirmed by reading `quartz/plugins/loader/gitLoader.ts`) exactly like a git-cloned plugin, then placed via the same `layout:` block mechanism as any community plugin. This is why this task needs no `quartz.ts` changes — see the Global Constraints note above if that stops being true partway through.

- [ ] **Step 1: Create the shared `Links` component implementation**

```bash
mkdir -p local-plugins/shared quartz/components/styles
```

`local-plugins/shared/links.tsx`:
```tsx
// Thank you Ellie https://github.com/ellie/notes/blob/v4/quartz/components/Links.tsx

import { QuartzComponentConstructor, QuartzComponentProps } from "../../quartz/components/types"
import { GlobalConfiguration } from "../../quartz/cfg"
import style from "../../quartz/components/styles/links.scss"

interface Options {
  title: string
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  title: "",
})

export const Links = ((userOpts?: Partial<Options>) => {
  function Links({ cfg }: QuartzComponentProps) {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    return (
      <div class="links">
        <h3>{opts.title}</h3>
        <ul>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/main-notes">Ideas and Reflections</a>
            </h3>
            <i>Connected notes to develop thoughts.</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/tags/faith">Faith</a>
            </h3>
            <i>Writings related to Christianity.</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/tags/software">Programming</a>
            </h3>
            <i>Learnings about software engineering and development.</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/source-material">Reference Material</a>
            </h3>
            <i>Notes based on books, articles, and other learning resources.</i>
          </li>
        </ul>
      </div>
    )
  }

  Links.css = style
  return Links
}) satisfies QuartzComponentConstructor
```

Two deliberate differences from the v4 source: (1) dropped the unused `displayClass` destructure/interpolation — this component is always placed via the YAML `display:` field now (Step 6 below), never needs to read it itself; (2) dropped the unused `FullSlug`/`SimpleSlug`/`resolveRelative`/`QuartzPluginData`/`byDateAndAlphabetical`/`Date`/`getDate` imports v4 had (grep the v4 source first to confirm none are actually referenced in the component body — they aren't; this was v4 dead-import residue. If review finds one actually used, keep it and fix its import path instead of dropping it).

- [ ] **Step 2: Copy the stylesheet**

```bash
git show v4:quartz/components/styles/links.scss > quartz/components/styles/links.scss
```
(`v4` here is the local branch, not the upstream remote — confirm it still exists with `git branch --list v4` before running, since the working tree is currently on `v5-migration`.)

- [ ] **Step 3: Create the two `Links` local-plugin wrappers**

```bash
mkdir -p local-plugins/links-desktop local-plugins/links-mobile
```

`local-plugins/links-desktop/package.json`:
```json
{
  "name": "links-desktop",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./components.tsx",
    "./components": "./components.tsx"
  },
  "quartz": {
    "name": "links-desktop",
    "displayName": "Links (desktop)",
    "description": "Custom nav block, desktop placement.",
    "version": "1.0.0",
    "category": "component",
    "components": {
      "Links": {
        "name": "Links",
        "displayName": "Links",
        "description": "Custom nav block linking to main-notes, tags/faith, tags/software, and source-material."
      }
    }
  }
}
```

`local-plugins/links-desktop/components.tsx`:
```tsx
export { Links } from "../shared/links"
```

`local-plugins/links-mobile/package.json` — identical except `name`/`displayName`/`description` say "mobile" instead of "desktop":
```json
{
  "name": "links-mobile",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./components.tsx",
    "./components": "./components.tsx"
  },
  "quartz": {
    "name": "links-mobile",
    "displayName": "Links (mobile)",
    "description": "Custom nav block, mobile placement.",
    "version": "1.0.0",
    "category": "component",
    "components": {
      "Links": {
        "name": "Links",
        "displayName": "Links",
        "description": "Custom nav block linking to main-notes, tags/faith, tags/software, and source-material."
      }
    }
  }
}
```

`local-plugins/links-mobile/components.tsx`:
```tsx
export { Links } from "../shared/links"
```

- [ ] **Step 4: Create the `PageTitle` local plugin**

```bash
mkdir -p local-plugins/page-title
```

`local-plugins/page-title/package.json`:
```json
{
  "name": "page-title",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./components.tsx",
    "./components": "./components.tsx"
  },
  "quartz": {
    "name": "page-title",
    "displayName": "Custom Page Title",
    "description": "Site logo and title, linking home.",
    "version": "1.0.0",
    "category": "component",
    "components": {
      "PageTitle": {
        "name": "PageTitle",
        "displayName": "PageTitle",
        "description": "Renders the site logo and title as a home link."
      }
    }
  }
}
```

`local-plugins/page-title/components.tsx` (port of v4's `quartz/components/PageTitle.tsx`, adjusted for the new directory depth):
```tsx
import { pathToRoot } from "../../quartz/util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "../../quartz/components/types"
import { classNames } from "../../quartz/util/lang"
import { i18n } from "../../quartz/i18n"

export const PageTitle = (() => {
  function PageTitle({ fileData, cfg, displayClass }: QuartzComponentProps) {
    const title = cfg?.pageTitleSuffix
      ? `${cfg.pageTitle} ${cfg.pageTitleSuffix}`
      : (cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title)
    const baseDir = pathToRoot(fileData.slug!)
    return (
      <h2 class={classNames(displayClass, "page-title")}>
        <a href={baseDir} style={{ display: "flex", alignItems: "center", gap: "0.7em" }}>
          <img
            src={"/static/icon.svg"}
            alt="Knowledge Garden Icon"
            style={{
              height: "2.2em",
              verticalAlign: "middle",
              background: "none",
              opacity: 1,
              filter:
                "drop-shadow(0 1px 4px rgba(0,0,0,0.10)) drop-shadow(0 1px 4px rgba(255,255,255,0.10))",
            }}
          />
          <span>{title}</span>
        </a>
      </h2>
    )
  }
  return PageTitle
}) satisfies QuartzComponentConstructor
```

Before saving, run `cat` on the actual v5 `quartz/components/types.ts`/`quartz/util/lang.ts`/`quartz/i18n/index.ts` (whichever path `i18n` actually resolves from — grep `quartz/i18n` for its real export path if this guessed path is wrong) to confirm these three import paths are correct relative to `local-plugins/page-title/components.tsx`; adjust if the real file layout differs from what this plan assumed.

- [ ] **Step 5: Declare all `left`/`afterBody` plugins in `quartz.config.yaml`**

Append to the `plugins:` list:

```yaml
  - source: ./local-plugins/page-title
    enabled: true
    layout:
      position: left
      priority: 5
  - source: "@quartz-community/search"
    enabled: true
    layout:
      position: left
      priority: 20
      group: toolbar
      groupOptions:
        grow: true
  - source: "@quartz-community/darkmode"
    enabled: true
    layout:
      position: left
      priority: 30
      group: toolbar
  - source: "@quartz-community/reader-mode"
    enabled: true
    layout:
      position: left
      priority: 35
      group: toolbar
  - source: "@quartz-community/spacer"
    enabled: true
    layout:
      position: left
      priority: 25
      display: mobile-only
  - source: ./local-plugins/links-desktop
    enabled: true
    layout:
      position: left
      priority: 40
      display: desktop-only
  - source: "@quartz-community/recent-notes"
    enabled: true
    options:
      title: "Recent notes"
      limit: 6
      hideTagPages: true
      hideFolderPages: true
    layout:
      position: left
      priority: 50
      display: desktop-only
  - source: ./local-plugins/links-mobile
    enabled: true
    layout:
      position: afterBody
      priority: 10
      display: mobile-only
  - source: "@quartz-community/comments"
    enabled: true
    options:
      provider: giscus
      options:
        repo: sarrietav-dev/braindump
        repoId: R_kgDONO2PUw
        category: Announcements
        categoryId: DIC_kwDONO2PU84Cndyn
        lang: en
        themeUrl: https://brain.sarrietav.dev/static/giscus
    layout:
      position: afterBody
      priority: 20
```

Add the top-level `layout.groups.toolbar` entry (sibling of `byPageType` from Task 4):
```yaml
layout:
  groups:
    toolbar:
      direction: row
      gap: 0.5rem
  byPageType:
    folder:
      exclude:
        - tag-list
    tag:
      exclude:
        - tag-list
```

`recent-notes`'s options here are the agreed merge of v4's two blocks ("Recent ideas" from `main-notes/`, "Topics I've been learning" from `source-material/") into one, since v5 only supports one configured instance of a plugin per the spec's decision 7. The exact title/limit are a reasonable default, not architecturally load-bearing — mention to the user once the site is running, in case they'd prefer different wording/count.

- [ ] **Step 6: Extend the folder/tag `exclude` lists from Task 4** so list pages match v4's shorter left column (no `Links`, no `RecentNotes` — v4's `defaultListPageLayout.left` only has `PageTitle` + the toolbar):

```yaml
layout:
  byPageType:
    folder:
      exclude:
        - tag-list
        - links-desktop
        - recent-notes
    tag:
      exclude:
        - tag-list
        - links-desktop
        - recent-notes
```

(This replaces the `layout.byPageType` block from Task 4/this task's Step 5 — one final version, not three separate stacked blocks; `quartz.config.yaml` has exactly one top-level `layout:` key.) Note `links-mobile`/`comments` are `afterBody`, unaffected by folder/tag `left`-column exclusions — v4 didn't hide the mobile Links block or comments on folder/tag pages either (`sharedPageComponents.afterBody` in v4 applied to all page types uniformly), so leave them included.

- [ ] **Step 7: Install the local and newly-declared community plugins**

```bash
npx quartz plugin install --from-config
```
Expected: exits 0. Confirm the local ones actually symlinked:
```bash
ls -la .quartz/plugins/page-title .quartz/plugins/links-desktop .quartz/plugins/links-mobile
```
Expected: each shows as a symlink (`l` permission bit) pointing back into `local-plugins/`.

- [ ] **Step 8: Type-check**

```bash
npx tsc --noEmit
```
Expected: exits 0. If it reports errors inside `local-plugins/`, they're most likely import-path mistakes from Step 4's unverified paths — fix them against the real file layout, don't suppress with `any`/`ts-ignore`.

- [ ] **Step 9: Build and visually verify the full left column on a content page**

```bash
npx quartz build --serve
```
Open a content page. Verify, top to bottom in the left column: logo+title (linking home), then on mobile width a spacer, then the search/darkmode/readermode toolbar row, then (desktop only) the `Links` nav block, then (desktop only) the merged "Recent notes" block.

- [ ] **Step 10: Verify the folder/tag page's shorter left column**

Open `/main-notes/` (a folder page). Verify the left column shows only logo+title and the toolbar — no `Links` block, no `RecentNotes` block.

- [ ] **Step 11: Verify `afterBody`**

At a narrow viewport width, verify the `Links` block appears again below the content on mobile, followed by the Giscus comment widget (full parity check on the Comments plugin's exact behavior is Task 6, next).

- [ ] **Step 12: Stop dev server, commit**

```bash
git add local-plugins quartz/components/styles/links.scss quartz.config.yaml
git commit -m "Package custom PageTitle/Links as local plugins; configure left/afterBody layout"
```

---

## Task 6: Verify Comments (Giscus) plugin parity — resolve or report the open item

**Files:**
- Possibly modify: none, if the community plugin already matches. If not, this task stops and reports rather than patching the plugin.

**Interfaces:**
- Consumes: the `afterBody` Comments entry from Task 5
- Produces: a confirmed-working Giscus comment widget using the site's custom theme CSS, OR a written report of the mismatch if one exists

- [ ] **Step 1: Inspect the installed plugin's actual DOM output for the Giscus container**

With the dev server running (`npx quartz build --serve`) and a content page open, use the browser devtools to inspect the rendered `<div>` that becomes the Giscus container (it carries the `data-*` attributes the plugin's inline script reads). Check what attribute the script reads for the custom theme URL — v4's fork specifically renamed `data-theme-url` to `data-theme` to make `themeUrl: "https://brain.sarrietav.dev/static/giscus"` actually take effect (the original v4 upstream code had a naming mismatch between the rendered attribute and the attribute the inline script read).

- [ ] **Step 2: Confirm the giscus iframe actually loads the custom theme**

Open the browser's Network tab, reload, and find the request to `giscus.app` (or the iframe's embedded request) for the theme CSS. It should request `https://brain.sarrietav.dev/static/giscus/light.css` (or `dark.css`), not `https://giscus.app/themes/light.css`.

- [ ] **Step 3a: If the custom theme loads correctly** — no code change needed. Commit nothing new; note in the task's completion report that the community plugin already matches v4's fixed behavior.

- [ ] **Step 3b: If the custom theme does NOT load** (falls back to the default giscus.app theme) — this confirms the community plugin has the same attribute-naming issue v4's fork fixed. Do not silently patch the installed plugin under `.quartz/plugins/` (those files are managed by the plugin installer and would be overwritten by `npx quartz plugin install --latest`). Instead: stop, and report back to the user with exactly what was found (which attribute the rendered container has vs. which one the inline script reads), and recommend either (a) filing/checking for an upstream issue on `quartz-community/comments`, or (b) as a last resort, forking just that one plugin locally as a `source: { repo: ..., ref: ... }` pointing at a patched fork — but do not do this without the user's explicit sign-off, since it reintroduces exactly the "carrying a local patch to a community plugin" maintenance burden the migration was trying to get away from.

- [ ] **Step 4: Copy the giscus theme CSS files** (needed regardless of the outcome above, since the theme files themselves are unaffected by which attribute name is used)

```bash
mkdir -p quartz/static/giscus
git show v4:quartz/static/giscus/dark.css > quartz/static/giscus/dark.css
git show v4:quartz/static/giscus/light.css > quartz/static/giscus/light.css
```

- [ ] **Step 5: Commit**

```bash
git add quartz/static/giscus
git commit -m "Add custom Giscus theme CSS files"
```

---

## Task 7: Port custom OG image generation

**Files:**
- Create: `quartz/components/custom/Og.tsx`
- Modify: `quartz.ts`
- Modify: `quartz.config.yaml`

**Interfaces:**
- Consumes: `GlobalConfiguration` from `quartz/cfg`, `QuartzPluginData` from `quartz/plugins/vfile` (both confirmed present in v5 core at the same paths)
- Produces: `createOgImage`, a function matching the installed `og-image` plugin's `SocialImageOptions["imageStructure"]` type, wired into the emitter via the documented override pattern — this IS the one legitimate use of `quartz.ts` in this migration (emitters like `og-image` don't get placed via `layout:` blocks at all, so there's no YAML equivalent to reach for here)

- [ ] **Step 1: Install the plugin first, before writing any code against its types**

```bash
npx quartz plugin add github:quartz-community/og-image
```

- [ ] **Step 2: Read the plugin's actual shipped types to find the real import path**

```bash
find .quartz/plugins/og-image -iname "*.d.ts" -o -iname "*.ts" | grep -v node_modules
grep -rn "SocialImageOptions\|defaultImage" .quartz/plugins/og-image --include="*.ts" --include="*.d.ts"
```
`docs/plugins/CustomOgImages.md`'s own example (`import { defaultImage } from "./quartz/plugins/emitters/ogImage"`) does not match v5 core's actual file layout — that file doesn't exist in `jackyzha0/quartz` core, so this import must resolve to something inside the installed plugin package itself. Use whatever path this step's `grep` actually finds; do not guess.

- [ ] **Step 3: Create `quartz/components/custom/Og.tsx`**, using the import path found in Step 2 (shown below as `<VERIFIED_IMPORT_PATH>` — replace with the real path before saving):

```tsx
import { GlobalConfiguration } from "../../cfg"
import { QuartzPluginData } from "../../plugins/vfile"
import type { SocialImageOptions } from "<VERIFIED_IMPORT_PATH>"

export const createOgImage: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  userOpts: { colorScheme: "lightMode" | "darkMode" },
  title: string,
  description: string,
  fonts: unknown,
  fileData: QuartzPluginData,
) => {
  const { colorScheme } = userOpts
  const fontBreakPoint = 32
  const useSmallerFont = title.length > fontBreakPoint
  const iconPath = `https://${cfg.baseUrl}/static/icon.svg`
  const titleFont = cfg.theme.typography.header.toString()
  const descriptionFont = cfg.theme.typography.body.toString()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: cfg.theme.colors[colorScheme].light,
        gap: "2rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        paddingLeft: "5rem",
        paddingRight: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          flexDirection: "row",
          gap: "2.5rem",
        }}
      >
        <img src={iconPath} width={135} height={135} />
        <p
          style={{
            color: cfg.theme.colors[colorScheme].dark,
            fontSize: useSmallerFont ? 70 : 82,
            fontFamily: titleFont,
          }}
        >
          {title}
        </p>
      </div>
      <p
        style={{
          color: cfg.theme.colors[colorScheme].dark,
          fontSize: 44,
          lineClamp: 3,
          fontFamily: descriptionFont,
        }}
      >
        {description}
      </p>
    </div>
  )
}
```

This preserves the v4 rendering exactly, including the pre-existing quirk of setting `fontFamily` to a raw CSS font-family string (`cfg.theme.typography.header.toString()`) rather than threading satori's `fonts` array through — v4 never used the `fonts` parameter either, so satori has always rendered this with its own fallback font, not the site's actual configured header/body font. Preserving that as-is per the "exact behavior" constraint; note it to the user as a pre-existing (not migration-introduced) minor visual quirk they may want fixed separately.

The function signature changed from v4's single object-destructured argument (`{ cfg, userOpts, title, description, fileData, iconBase64 }`) to v5's positional-argument shape, because `SocialImageOptions["imageStructure"]`'s type itself changed between v4 and v5 (confirmed by comparing v4's `quartz/util/og.ts` type against the positional signature shown throughout `docs/plugins/CustomOgImages.md`'s examples). The unused `iconBase64` parameter from v4 is dropped — grep the v4 source confirms it was never referenced in the function body.

- [ ] **Step 4: Wire it into `quartz.ts`**

Open `quartz.ts` (still at its scaffolded default at this point — this is the only task that touches it) and edit it to:

```ts
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"
import { createOgImage } from "./quartz/components/custom/Og"

ExternalPlugin.CustomOgImages({
  colorScheme: "darkMode",
  width: 1200,
  height: 630,
  excludeRoot: false,
  imageStructure: createOgImage,
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
```

`ExternalPlugin.CustomOgImages({...})` must be called before `loadQuartzConfig()` — this is documented and confirmed for emitters specifically: the call is a void, side-effecting registration (merges these options into a global override bag keyed by plugin name), consumed later when `loadQuartzConfig()` auto-instantiates the `og-image` emitter declared in YAML (Step 5). This is a different, legitimate mechanism from the layout-placement path used everywhere else in this migration — see the spec's "Layout mapping" section for why the two are not interchangeable. `colorScheme: "darkMode"` matches v4's `Plugin.CustomOgImages({ colorScheme: "darkMode", ... })` call exactly. `loadQuartzLayout()` is called with no arguments — there is nothing left for it to override.

- [ ] **Step 5: Declare `og-image` in `quartz.config.yaml`** (no `options:` needed — the TS override above supplies everything; this entry exists purely so the plugin is tracked/pinned)

```yaml
  - source: "@quartz-community/og-image"
    enabled: true
```

- [ ] **Step 6: Build and verify an OG image is generated**

```bash
npx quartz build
find public -path "*og-image*" -o -iname "*social*" | head -5
```
Open one of the generated images and visually compare against a v4 OG image for the same page (check a currently-deployed page's `<meta property="og:image">` URL, or run `npx quartz build` on the `v4` branch in a separate worktree/checkout to compare) — confirm layout, colors, and text match (font rendering may differ due to the pre-existing quirk noted above).

- [ ] **Step 7: Commit**

```bash
git add quartz/components/custom/Og.tsx quartz.ts quartz.config.yaml
git commit -m "Port custom OG image generation"
```

---

## Task 8: Port remaining static assets and core-file patches (Head, 404)

**Files:**
- Modify: `quartz/components/Head.tsx` (core file, same v4-style direct patch)
- Modify: `quartz/components/pages/404.tsx` (core file, same v4-style direct patch)
- Create/modify: `quartz/static/favicon.svg`, `quartz/static/icon.svg`, `quartz/static/icon.png`, `quartz/static/og-image.png`

**Interfaces:**
- Consumes: nothing new
- Produces: favicon, 404 page copy, and static image assets matching v4

- [ ] **Step 1: Verify the `favicon` plugin's expected icon filename**

```bash
grep -rn "icon\.\(png\|svg\)" .quartz/plugins/favicon --include="*.ts" --include="*.d.ts"
```
Per `docs/plugins/Favicon.md`, this plugin resizes `quartz/static/icon.png` — confirm this is really hardcoded (no path option) by reading the grep output.

- [ ] **Step 2a: If the plugin only reads `icon.png`** — the clean fix is naming the site's icon file `icon.png` (matching what the plugin expects) rather than patching the plugin. Copy the v4 icon in under that exact name:

```bash
git show v4:quartz/static/icon.png > quartz/static/icon.png
```

(v4's `Head.tsx` and `favicon.ts` patches both changed the icon path to `favicon.svg` specifically to introduce a separate SVG favicon distinct from the large `icon.png` used elsewhere — e.g. for the OG image and the local `PageTitle` plugin's logo. Since the v5 `favicon` plugin doesn't take a path option, this task keeps `icon.png` as the source the favicon plugin resizes, and keeps `favicon.svg` only for the places v4 explicitly wired it — see Steps 3-4.)

- [ ] **Step 2b: If the plugin does take a path/name option** — use it to point at `favicon.svg` directly, matching v4 exactly, and skip the `icon.png` rename in Step 2a.

- [ ] **Step 3: Copy `favicon.svg`, `icon.svg`, and `og-image.png`**

```bash
git show v4:quartz/static/favicon.svg > quartz/static/favicon.svg
git show v4:quartz/static/icon.svg > quartz/static/icon.svg
git show v4:quartz/static/og-image.png > quartz/static/og-image.png
```

- [ ] **Step 4: Patch `Head.tsx`'s favicon reference**

Open `quartz/components/Head.tsx` (core file — same direct-edit pattern v4 uses) and find the line building `iconPath`. Change:
```ts
const iconPath = joinSegments(baseDir, "static/icon.png")
```
to:
```ts
const iconPath = joinSegments(baseDir, "static/favicon.svg")
```
(This only affects the `<link rel="icon">` tag Head renders in `<head>` — separate from whatever file the `favicon` plugin itself resizes into `favicon.ico`, resolved in Steps 1-2 above.)

- [ ] **Step 5: Patch `404.tsx`'s copy**

Open `quartz/components/pages/404.tsx` first (`cat quartz/components/pages/404.tsx`) to see its current v5 import paths and export shape, then replace its returned JSX with v4's custom copy, adjusting the snippet below only if the real file's imports/exports differ from what's assumed here:

```tsx
import { QuartzComponent, QuartzComponentProps } from "../types"
import { pathToRoot } from "../../util/path"
import { i18n } from "../../i18n"

const NotFound: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)

  return (
    <article class="popover-hint">
      <h1>Oops! This page doesn't exist... yet.</h1>
      <p>
        It looks like this page doesn't exist (yet). Maybe I haven't written about this topic, or
        there's an error in the URL.
      </p>
      <p>🔍 What's next?</p>
      <ul>
        <li>Check the URL to make sure there are no mistakes.</li>
        <li>
          <a href={baseDir}>Return to the homepage</a> and explore other topics.
        </li>
        <li>
          If you think something should be here, <a href="mailto:blog@sarrietav.dev">let me know.</a>
        </li>
      </ul>
      <p>Happy exploring! 🚀</p>
    </article>
  )
}

export default (() => NotFound) satisfies (() => QuartzComponent)
```

- [ ] **Step 6: Build and verify**

```bash
npx quartz build --serve
```
Visit `/static/favicon.svg` directly in the browser and confirm it 200s. Visit a nonexistent path (e.g. `/this-page-does-not-exist`) and confirm the custom 404 copy renders.

- [ ] **Step 7: Commit**

```bash
git add quartz/components/Head.tsx quartz/components/pages/404.tsx quartz/static/favicon.svg quartz/static/icon.svg quartz/static/icon.png quartz/static/og-image.png
git commit -m "Port favicon path patch, custom 404 copy, and static assets"
```

---

## Task 9: Full verification pass

**Files:** none (verification only)

**Interfaces:**
- Consumes: everything from Tasks 1-8
- Produces: a go/no-go signal for Task 10 (CI update) and the eventual cutover

- [ ] **Step 1: Full clean build**

```bash
rm -rf public .quartz/cache 2>/dev/null
npx quartz plugin install --from-config
npm run check
```
Expected: both exit 0. `npm run check` runs `tsc --noEmit && npx prettier . --check` — fix any reported type or formatting issues before proceeding.

- [ ] **Step 2: Production build**

```bash
NODE_ENV=production npx quartz build
```
Expected: exits 0.

- [ ] **Step 3: Side-by-side comparison against v4**

In a separate directory, check out `v4` and build it for comparison:
```bash
git worktree add /tmp/quartz-v4-compare v4
cd /tmp/quartz-v4-compare && npm ci && npx quartz build && cd -
```
Serve both (`npx quartz build --serve` on `v5-migration` on one port, and `cd /tmp/quartz-v4-compare && npx quartz build --serve` on another) and compare, page by page:
- Homepage
- A content note under `main-notes/` and one under `source-material/`
- A folder listing page
- A tag page
- The 404 page
- Dark mode / light mode toggle
- Search (open it, type a query, confirm results appear)
- Graph view (local graph on a note, global graph if exposed)
- Comments widget on a note
- An OG image (fetch `<meta property="og:image">`'s URL for the same page on both builds)

Record any visual discrepancy found. For each one, trace it back to the relevant task above and decide: fix now (if it's a straightforward miss) or add as a new open item to report to the user (if it needs a product decision, like the RecentNotes merge did).

- [ ] **Step 4: Clean up the comparison worktree**

```bash
git worktree remove /tmp/quartz-v4-compare
```

- [ ] **Step 5: Commit any fixes found in Step 3**

(Only if fixes were needed — commit them individually with descriptive messages, don't bundle unrelated fixes into one commit.)

---

## Task 10: Update the GitHub Pages deploy workflow (prepared, not yet cut over)

**Files:**
- Modify: `.github/workflows/deploy.yaml`

**Interfaces:**
- Consumes: nothing new
- Produces: a deploy workflow that would work correctly if triggered on `v5-migration`, WITHOUT actually changing what triggers production deploys yet

- [ ] **Step 1: Add the plugin-install step**

Open `.github/workflows/deploy.yaml`. Between the "Install Dependencies" step and the "Build Quartz" step, add:

```yaml
      - name: Install Quartz plugins
        run: npx quartz plugin install
```

- [ ] **Step 2: Add plugin caching** (recommended by the official migration guide, keyed off the lockfile)

Add alongside the existing dependency-cache step:

```yaml
      - name: Cache Quartz plugins
        uses: actions/cache@v5
        with:
          path: .quartz/plugins
          key: ${{ runner.os }}-plugins-${{ hashFiles('quartz.lock.json') }}
          restore-keys: |
            ${{ runner.os }}-plugins-
```

- [ ] **Step 3: Do NOT change the `on: push: branches:` trigger yet**

Leave it pointed at `v4` for now. This task's deliverable is a workflow file that's ready to go, verified by manually triggering it (Step 4) — not a live cutover, which needs its own explicit go-ahead from the user (Task 11).

- [ ] **Step 4: Verify the updated workflow works, without touching production**

Temporarily add `workflow_dispatch:` to the `on:` block if not already present, push `v5-migration` to `origin`, and manually trigger the workflow against `v5-migration` via `gh workflow run deploy.yaml --ref v5-migration` (or the Actions UI). Confirm the run succeeds end-to-end (plugin install → build → Pages artifact upload). This does NOT deploy anything to production Pages since Pages only serves whatever the most recent successful run targeting its configured source produced — check `gh run view` output rather than the live site to confirm success, and do not merge or repoint the trigger yet.

- [ ] **Step 5: Revert the temporary `workflow_dispatch:` addition if it wasn't already there**, keeping only the plugin-install and caching changes.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/deploy.yaml
git commit -m "Add plugin install step to GitHub Pages deploy workflow"
```

---

## Task 11: Cutover (requires explicit user go-ahead — do not execute automatically)

This task is intentionally last and is a checklist for a human decision point, not something to run through automatically even if all prior tasks pass. Present this checklist to the user and wait for explicit confirmation before doing any of it:

- [ ] Confirm Task 9's verification pass had no unresolved discrepancies.
- [ ] Confirm Task 6's Comments parity item resolved cleanly (or that the user has explicitly accepted whatever gap remained).
- [ ] Merge `v5-migration` into `v4` (or, per the official migration guide's recommended pattern, change the GitHub repository's default branch to `v5-migration`/rename it to `v5` — ask the user which they prefer; the guide's own recommendation is a default-branch switch rather than a merge, so both `v4` and `v5` branch names stay meaningful going forward).
- [ ] Update `.github/workflows/deploy.yaml`'s `on: push: branches:` to whichever branch will now be the deploy source.
- [ ] Push and confirm the live GitHub Pages deploy run succeeds and `brain.sarrietav.dev` serves the new build correctly.
- [ ] Spot-check a few previously-indexed uppercase-cased URLs in production to confirm `AliasRedirects` is serving redirects correctly (not 404ing).
- [ ] Keep the old `v4` branch around afterward as a fallback, per the official migration guide.
