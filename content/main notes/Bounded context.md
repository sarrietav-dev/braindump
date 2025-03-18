---
tags:
  - software
  - ddd
---
Un bounded context (o contexto delimitado) son límites donde un [[Lenguaje Ubicuo]] o un [[Modelo]] es coherente y aplicable.

Este es un patrón estratégico que ayuda a reducir la complejidad de un proyecto al reducir el alcance de los conceptos del lenguaje y eliminar conflictos en terminología.

# **Ejemplo de Conflicto de Terminología**

- En una **tienda en línea**, el concepto de **Orden** significa cosas diferentes para **Ventas** y **Logística**:
    - **Ventas:** Una orden es una compra con productos, precio y método de pago.
    - **Logística:** Una orden es un pedido con dirección de envío, estado y transportista.


# Referencias

[[Learning Domain Driven Design]]