---
modified: 2025-07-18T01:15:46-05:00
tags:
  - software
  - ddd
---
A bounded context is a boundary where a [[Ubiquitous Language]] or a [[Domain Model]] is coherent and applicable.

This is a strategic pattern that helps reduce project complexity by reducing the scope of language concepts and eliminating terminology conflicts.

The bounded context should align with team boundaries, deployment units, and modeling efforts.

# **Example of Terminology Conflict**

- In an **online store**, the concept of **Order** means different things to **Sales** and **Logistics**:
    - **Sales:** An order is a purchase with products, price, and payment method.
    - **Logistics:** An order is a request with shipping address, status, and carrier.


# References

[[Learning Domain Driven Design]]