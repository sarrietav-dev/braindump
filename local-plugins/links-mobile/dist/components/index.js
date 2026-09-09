// ../../quartz/components/styles/links.scss
var links_default = `.links ul {
  list-style: none;
  margin-top: 1rem;
  padding-left: 0;
}
.links ul > li {
  margin: 1rem 0;
}
.links ul > li .section > .desc > h3 > a {
  background-color: transparent;
}
.links ul > li .section > .meta {
  margin: 0 0 0.5rem 0;
  opacity: 0.6;
}`;

// ../shared/links.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var defaultOptions = {
  title: ""
};
var Links = ((userOpts) => {
  function Links2(_props) {
    const opts = { ...defaultOptions, ...userOpts };
    return /* @__PURE__ */ jsxs("div", { class: "links", children: [
      /* @__PURE__ */ jsx("h3", { children: opts.title }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { style: { marginTop: 0, marginBottom: 0 }, children: /* @__PURE__ */ jsx("a", { href: "/main-notes", children: "Ideas and Reflections" }) }),
          /* @__PURE__ */ jsx("i", { children: "Connected notes to develop thoughts." })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { style: { marginTop: 0, marginBottom: 0 }, children: /* @__PURE__ */ jsx("a", { href: "/tags/faith", children: "Faith" }) }),
          /* @__PURE__ */ jsx("i", { children: "Writings related to Christianity." })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { style: { marginTop: 0, marginBottom: 0 }, children: /* @__PURE__ */ jsx("a", { href: "/tags/software", children: "Programming" }) }),
          /* @__PURE__ */ jsx("i", { children: "Learnings about software engineering and development." })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { style: { marginTop: 0, marginBottom: 0 }, children: /* @__PURE__ */ jsx("a", { href: "/source-material", children: "Reference Material" }) }),
          /* @__PURE__ */ jsx("i", { children: "Notes based on books, articles, and other learning resources." })
        ] })
      ] })
    ] });
  }
  Links2.css = links_default;
  return Links2;
});
export {
  Links
};
