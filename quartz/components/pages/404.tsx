import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <h1>Oops! This page doesn't exist... yet.</h1>
      <p>
        It looks like this page doesn't exist (yet). Maybe I haven't written about this topic, or there's an error in the URL.
      </p>
      <p>🔍 What's next?</p>
      <ul>
        <li>Check the URL to make sure there are no mistakes.</li>
        <li>
          <a href={baseDir}>Return to the homepage</a> and explore other topics.
        </li>
        <li>
          If you think something should be here, {" "}
          <a href="mailto:blog@sarrietav.dev">let me know.</a>
        </li>
      </ul>
      <p>Happy exploring! 🚀</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
