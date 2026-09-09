import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { build } from "esbuild"
import { sassPlugin } from "esbuild-sass-plugin"

const root = path.dirname(fileURLToPath(import.meta.url))
const pluginName = process.argv[2]
const exportName = {
  "page-title": "PageTitle",
  "links-desktop": "Links",
  "links-mobile": "Links",
}[pluginName]

if (!exportName) {
  throw new Error(`Unknown local plugin: ${pluginName}`)
}

const pluginDir = path.join(root, pluginName)
const componentsDir = path.join(pluginDir, "dist", "components")
const constructorType =
  exportName === "Links"
    ? "QuartzComponentConstructor<{ title: string }>"
    : "QuartzComponentConstructor"
const declaration = `import type { QuartzComponentConstructor } from "@quartz-community/types"\n\ndeclare const ${exportName}: ${constructorType}\nexport { ${exportName} }\n`

await fs.rm(path.join(pluginDir, "dist"), { recursive: true, force: true })
await fs.mkdir(componentsDir, { recursive: true })

await build({
  entryPoints: [path.join(pluginDir, "components.tsx")],
  outfile: path.join(componentsDir, "index.js"),
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2022",
  jsx: "automatic",
  jsxImportSource: "preact",
  packages: "external",
  plugins: [sassPlugin({ type: "css-text", cssImports: true })],
})

await fs.writeFile(path.join(componentsDir, "index.d.ts"), declaration)
await fs.writeFile(
  path.join(pluginDir, "dist", "index.js"),
  `export { ${exportName} } from "./components/index.js"\n`,
)
await fs.writeFile(path.join(pluginDir, "dist", "index.d.ts"), declaration)
