import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌲 Sebas",
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
          light: "#e8f0e8",
          lightgray: "#cfd8d3",
          gray: "#8a9b95",
          darkgray: "#4e5e58",
          dark: "#2c3e3b",
          secondary: "#4b6d63" /* Primary accent: Deep Forest Green */,
          tertiary: "#748c85" /* Secondary accent: Muted Sage */,
          highlight: "rgba(75, 107, 95, 0.1)" /* Softer green highlight */,
          textHighlight: "#b0c4b8" /* Softer hover effect */,
        },
        darkMode: {
          light: "#1a2420",
          lightgray: "#3c4d46",
          gray: "#697c74",
          darkgray: "#ccd4ce",
          dark: "#e4ece8",
          secondary: "#5a7b6f" /* Primary accent: Deep Forest Green */,
          tertiary: "#748c85" /* Secondary accent: Muted Sage */,
          highlight: "rgba(75, 107, 95, 0.15)" /* Softer green highlight for dark mode */,
          textHighlight: "#8fb3a3" /* Softer hover text highlight */,
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
