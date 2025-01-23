import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌲 Sebastian",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "brain.sarrietav.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Playfair Display",
        body: "Lato",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#f4f8f3",
          lightgray: "#dfe5e1",
          gray: "#a3b3ad",
          darkgray: "#5e736c",
          dark: "#2c3e3b",
          secondary: "#4b6d63" /* Primary accent: Deep Forest Green */,
          tertiary: "#84a59d" /* Secondary accent: Muted Sage */,
          highlight: "rgba(75, 107, 95, 0.15)" /* Soft green highlight */,
          textHighlight: "#c6d9cf" /* Hover Effect: Brightened Sage */,
        },
        darkMode: {
          light: "#1a2420",
          lightgray: "#3c4d46",
          gray: "#697c74",
          darkgray: "#ccd4ce",
          dark: "#e4ece8",
          secondary: "#5a7b6f" /* Primary accent: Deep Forest Green */,
          tertiary: "#84a59d" /* Secondary accent: Muted Sage */,
          highlight: "rgba(75, 107, 95, 0.2)" /* Soft green highlight for dark mode */,
          textHighlight: "#a1c2b2" /* Misty Teal for hover text highlight */,
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
