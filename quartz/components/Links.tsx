// Thank you Ellie https://github.com/ellie/notes/blob/v4/quartz/components/Links.tsx

import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/links.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"

interface Options {
  title: string
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  title: "",
})

export default ((userOpts?: Partial<Options>) => {
  function Links({ allFiles, fileData, displayClass, cfg }: QuartzComponentProps) {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    return (
      <div class={`links ${displayClass ?? ""}`}>
        <h3>{opts.title}</h3>
        <ul>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/main-notes">Ideas y Reflexiones</a>
            </h3>
            <i>Notas conectadas para desarrollar pensamientos.</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/tags/fe">Fe</a>
            </h3>
            <i>escritos relacionados con el cristianismo</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/tags/software">Programación</a>
            </h3>
            <i>aprendizajes sobre ingeniería de software y desarrollo</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/blog">Blog</a>
            </h3>
            <i>artículos más elaborados que conectan ideas y profundizan en un tema</i>
          </li>
          <li>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/source-material">Material de referencia</a>
            </h3>
            <i>notas basadas en libros, artículos y otros recursos de aprendizaje</i>
          </li>
        </ul>
      </div>
    )
  }

  Links.css = style
  return Links
}) satisfies QuartzComponentConstructor
