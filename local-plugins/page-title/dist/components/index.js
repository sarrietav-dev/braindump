// components.tsx
import { classNames } from "@quartz-community/utils/lang";
import { pathToRoot } from "@quartz-community/utils/path";
import { jsx, jsxs } from "preact/jsx-runtime";
var PageTitle = (() => {
  function PageTitle2({ fileData, cfg, displayClass }) {
    const title = cfg?.pageTitleSuffix ? `${cfg.pageTitle} ${cfg.pageTitleSuffix}` : cfg?.pageTitle ?? "Untitled";
    const baseDir = pathToRoot(fileData.slug);
    return /* @__PURE__ */ jsx("h2", { class: classNames(displayClass, "page-title"), children: /* @__PURE__ */ jsxs("a", { href: baseDir, style: { display: "flex", alignItems: "center", gap: "0.7em" }, children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/static/icon.svg",
          alt: "Knowledge Garden Icon",
          style: {
            height: "2.2em",
            verticalAlign: "middle",
            background: "none",
            opacity: 1,
            filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.10)) drop-shadow(0 1px 4px rgba(255,255,255,0.10))"
          }
        }
      ),
      /* @__PURE__ */ jsx("span", { children: title })
    ] }) });
  }
  PageTitle2.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`;
  return PageTitle2;
});
export {
  PageTitle
};
