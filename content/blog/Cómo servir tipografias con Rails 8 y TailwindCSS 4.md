---
draft: "true"
---
- Agrega la tipografia en la carpeta fonts en assets
- Colocar la siguiente linea de codigo en assets/tailwind/application.css
```css
@font-face {
    font-family: "PublicSans";
    font-style: italic;
    font-display: swap;
    src: url("/PublicSans-Italic-VariableFont_wght.ttf") format("truetype"); /* Se obtiene de la URL raiz. */ 
}

@theme {
    --font-sans:
        "PublicSans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

- Usar la clase `font-sans` en el proyecto.

## Cómo funciona?

Propshaft