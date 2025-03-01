import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.MobileOnly(Component.Links()),
    Component.Comments({
      provider: "giscus",
      options: {
        // from data-repo
        repo: "sarrietav-dev/braindump",
        // from data-repo-id
        repoId: "R_kgDONO2PUw",
        // from data-category
        category: "Announcements",
        // from data-category-id
        categoryId: "DIC_kwDONO2PU84Cndyn",
        lang: "es",
        loading: "lazy",
        themeUrl: "https://sarrietav.dev/static/giscus",
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/sarrietav-dev",
      Twitter: "https://twitter.com/sarrietav",
      LinkedIn: "https://www.linkedin.com/in/sarrietav/",
      Email: "mailto:sebas@sarrietav.dev",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Links()),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Ideas recientes",
        limit: 4,
        filter: (f) =>
          f.slug!.startsWith("main-notes/") &&
          f.slug! !== "main-notes/index" &&
          !f.frontmatter?.noindex,
        linkToMore: "main-notes/" as SimpleSlug,
      }),
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Temas que he estado aprendiendo",
        limit: 2,
        filter: (f) =>
          f.slug!.startsWith("source-material/") &&
          !f.slug!.includes("index") &&
          !f.frontmatter?.noindex,

        linkToMore: "source-material/" as SimpleSlug,
      }),
    ),
  ],
  right: [
    Component.DesktopOnly(
      Component.Graph({
        localGraph: {
          fontSize: 0.5,
        },
        globalGraph: {
          repelForce: 3,
          fontSize: 0.5,
        },
      }),
    ),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [],
}
