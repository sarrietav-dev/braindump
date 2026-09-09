import type { QuartzComponentConstructor, QuartzComponentProps } from "@quartz-community/types"
import { classNames } from "@quartz-community/utils/lang"
import { pathToRoot } from "@quartz-community/utils/path"

export const PageTitle = (() => {
  function PageTitle({ fileData, cfg, displayClass }: QuartzComponentProps) {
    const title = cfg?.pageTitleSuffix
      ? `${cfg.pageTitle} ${cfg.pageTitleSuffix}`
      : (cfg?.pageTitle ?? "Untitled")
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
  PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`
  return PageTitle
}) satisfies QuartzComponentConstructor
