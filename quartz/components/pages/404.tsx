import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <h1>¡Vaya! Esta página no existe... por ahora.</h1>
      <p>
        Parece que esta página no existe (todavía). Tal vez no he escrito sobre este tema, o hay un
        error en la URL.
      </p>
      <p>🔍 ¿Qué sigue?</p>
      <ul>
        <li>Verifica la URL para asegurarte de que no haya errores.</li>
        <li>
          <a href={baseDir}>Regresa a la página principal</a> y explora otros temas.
        </li>
        <li>
          Si crees que algo debería estar aquí,{" "}
          <a href="mailto:blog@sarrietav.dev">házmelo saber.</a>
        </li>
      </ul>
      <p>¡Feliz exploración! 🚀</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
