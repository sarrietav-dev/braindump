// Thank you Ellie https://github.com/ellie/notes/blob/v4/quartz/components/Links.tsx

import type { QuartzComponentConstructor, QuartzComponentProps } from "@quartz-community/types"
import style from "../../quartz/components/styles/links.scss"

interface Options {
  title: string
}

const defaultOptions: Options = {
  title: "",
}

export const Links = ((userOpts?: Partial<Options>) => {
  function Links(_props: QuartzComponentProps) {
    const opts = { ...defaultOptions, ...userOpts }
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
