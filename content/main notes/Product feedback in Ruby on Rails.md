---

tags:

- projects
- software
- rails draft: true

---

Por algún tiempo he querido aprender Ruby on Rails, tal vez por su simplicidad o tal vez porque quiero ver al padre de Laravel. Hice un proyecto llamado Product Feedback, cuyo diseño está comprado (¿prestado?) de la gran página Front-end Mentor. Aquí están mis pensamientos:

# Lenguaje

Aunque realmente no me gustan los lenguajes de programación sin tipado, terminé disfrutando Ruby.

Primero, me sorprendió el hecho de que los métodos pueden ser llamados sin paréntesis. Como estos dos son iguales:

```rb
def foo
end

def bar
	foo :baz
	foo(:baz)
end
```

Segundo, los símbolos. No conozco ningún lenguaje de programación que tenga esta característica. Lo que entiendo es que se utilizan principalmente como claves en los mapas hash y como valores en otros lugares.

```rb
:hey
```

También me gustó esa convención que tiene Ruby de nombrar métodos que devuelven booleanos con un signo de interrogación al final. Por lo tanto, no es `myStr.isBlank` sino `myStr.blank?`.

Entiendo por qué los Rubyistas quieren quedarse en Ruby. Es un lenguaje simple, elegante y poderoso.

# Rails

## Convención sobre configuración

La mejor característica de Rails para mí es la Convención sobre Configuración. Todo simplemente tiene que ir donde necesita ir, nombrado como debe ser nombrado, y está listo. ¡Tan simple!

## Filosofía sin compilación 👍

Apoyo la idea de simplemente enviar toda tu base de código tal como está a un servidor y ejecutar `rails server`. No hay transpilación de JSX ni ningún paso de compilación ejecutable. No es que esas cosas sean malas, pero es mucho más conveniente no tener un paso de compilación (¡gracias DHH!).

## No me gustan Turbo Frames/Streams