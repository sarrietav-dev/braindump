import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitleSuffix ? `${cfg.pageTitle} ${cfg.pageTitleSuffix}` : cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
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
            filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.10)) drop-shadow(0 1px 4px rgba(255,255,255,0.10))"
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

export default (() => PageTitle) satisfies QuartzComponentConstructor
