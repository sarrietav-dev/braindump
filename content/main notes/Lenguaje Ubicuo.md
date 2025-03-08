---
tags:
  - software
  - ddd
---
La solución al [[El intercambio de información es crucial para el éxito de un software|problema de la comunicación]] es que todos los interesados hablen el mismo lenguaje. Todos deben usar los mismos términos para expresar algo en particular. Esto se le llama *lenguaje ubicuo*.

La palabra ubicuo en el español (que sería la traducción directa de *ubiquitous*) se usa describir algo que está en todo lugar y en todo momento. 

En este contexto, podríamos entenderlo como un lenguaje que se usa constantemente a lo largo del proyecto: sea en el código, o en las reuniones, en la documentación, hasta en diseños de Figma.

Lo más importante es que este lenguaje pueda ser usado por los expertos del dominio, por tanto, debe ser el lenguaje del negocio. ¡Nada de términos técnicos!

Por ejemplo:

| Lenguaje del negocio                                         | Lenguaje técnico                                                                                                                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Una tarea no puede eliminarse si ya se encuentra en proceso. | No se pueden eliminar los registros de la tabla de tareas si la columna estado tiene el valor 2 (una llave foranea al registro de "En progreso" de la tabla de estados). |

También debe ser un lenguaje consistente. No puede haber términos ambiguos ni sinónimos. Por ejemplo:

- La palabra cliente puede significar tanto una persona que compra productos de la empresa, o un servicio que consume la API del sistema (término ambiguo).
- La palabra “usuario” se usa mucho en software, pero para un experto en el dominio puede significar cosas distintas. A veces se confunde con términos como “visitante”, “administrador” o “cuenta”, lo que puede causar confusión si no se aclara bien su significado en el proyecto (términos sinónimos).

# Referencias

[[Learning Domain Driven Design]]