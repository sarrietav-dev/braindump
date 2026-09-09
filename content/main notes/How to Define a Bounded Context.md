---
modified: 2025-07-18T01:15:46-05:00
tags:
  - software
  - ddd
---
To be able to delimit the [[Bounded context]] of your project, keep the following points in mind:

- The delimitation depends on the problem to be solved
    - A small project can survive with a single bounded context.
    - A large project would benefit from having several smaller, specialized bounded contexts.
- Do not split closely related functionalities.
- Concepts that change together should be kept together.
- It's essential to observe business workflows, team interactions, and terminology use when defining bounded contexts.

# References

[[Learning Domain Driven Design]]