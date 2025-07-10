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
              <a href="/blog">Blog</a>
            </h3>
            <i>More elaborate articles that connect ideas and delve into a topic.</i>
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
