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

# Comunicación

La comunicación es **crucial** para un proyecto de software, pero hoy en día se ve en muchos proyectos el "juego del teléfono".

El experto habla con el analista, creando el documento de requerimientos. Luego el arquitecto recibe el documento y genera el diseño. Finalmente, los desarrolladores hacen el código.

En cada paso de **traducción**, hay información que se pierde.