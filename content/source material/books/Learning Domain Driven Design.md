---
tags:
  - software
  - arquitectura
  - ddd
---

# Dominios

Un dominio es el área de actividad de la empresa, el servicio que proporciona a sus clientes. Una empresa puede tener varios dominios.

Un subdominio es una parte de un dominio que, junto con otros subdominios, ayuda a la empresa a alcanzar sus objetivos y metas. Existen tres tipos de subdominios.

## Subdominio principal (Core subdomain)

- Es lo que la empresa hace diferente a la competencia.
- No puede replicarse fácilmente.
- No puede ser subcontratado.
- Altamente complejo.
- Altamente volátil.
- Se asignan los mejores ingenieros para desarrollarlo.
- No se limita solo al software.

## Subdominios genéricos (Generic subdomains)

- Lo que todas las empresas hacen de la misma manera.
- Soluciones listas para usar.
- Difícil de implementar.
- Puede convertirse en un negocio secundario.
- Idealmente, no tan volátil.

## Subdominios de apoyo (Supporting subdomains)

- No son críticos.
- No hay soluciones listas para usar.
- Se pueden subcontratar.
- No son complejos.
- Operaciones ETC/CRUD.
- No proporcionan ventaja competitiva.
- Implementación propia.
- Baja volatilidad.

# Descubriendo conocimiento del dominio

Los subdominios se enfocan en solucionar problemas específicos para el negocio.

- **Gestión de conocimiento** → Guardar y buscar información.
- **Liquidación y compensación** → Hacer transacciones financieras.
- **Finanzas y contabilidad** → Hacer seguimiento del dinero de la compañía.

El éxito de un software depende de qué tan efectiva es la **intercambio de conocimiento** entre los interesados.

El software debe **imitar el conocimiento**: cómo los expertos del dominio piensan sobre el problema, porque en ellos está el conocimiento del dominio.

## Comunicación

La comunicación es **crucial** para un proyecto de software, pero hoy en día se ve en muchos proyectos el “juego del teléfono roto”.

El experto habla con el analista, creando el documento de requerimientos. Luego el arquitecto recibe el documento y genera el diseño. Finalmente, los desarrolladores hacen el código.

En cada paso de **traducción**, hay información que se pierde.

##  Lenguaje ubicuo (Ubiquitous language)

La solución al problema de la comunicación es que todos los interesados hablen el mismo lenguaje. Todos deben usar los mismos términos para expresar algo en particular. Esto se le llama *lenguaje ubicuo*.

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

## Modelado

> Un modelo es una representación simplificada de una cosa o fenómeno que enfatiza intencionalmente ciertos aspectos mientras ignora otros. Abstracción con un uso específico en mente. — Rebecca Wirfs-Broc

Todo modelo tiene un propósito: resolver un problema. Como por ejemplo los mapas, un mapa del mundo no tiene las rutas de los buses. Los modelos solo contienen la información necesaria. Mucha o poca información hace que el modelo se vuelva inefectivo.

Y a la hora de modelar el dominio del negocio, no debemos cubrir cada posible detalle del dominio; solamente debemos enfocarnos en el problema que el software está intentando resolver. Esto es importante porque entre más complejo sea el dominio, más complejo será de modelar; y cualquier malentendido puede llevar a una mala implementación que trae consigo múltiples bugs.