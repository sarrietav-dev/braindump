---
tags:
  - software
  - ddd
---
The solution to the [[Information exchange is crucial for software success|communication problem]] is that all stakeholders speak the same language. Everyone must use the same terms to express something in particular. This is called a *ubiquitous language*.

In this context, we could understand it as a language that is used constantly throughout the project: whether in the code, in meetings, in documentation, even in Figma designs.

The most important thing is that this language can be used by domain experts, therefore, it must be the business language. No technical terms!

For example:

| Business language                                      | Technical language                                                                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| A task cannot be deleted if it is already in progress. | Task table records cannot be deleted if the status column has the value 2 (a foreign key to the "In progress" record in the status table). |

It must also be a consistent language. There cannot be ambiguous terms or synonyms. For example:

- The word "client" can mean both a person who buys products from the company, or a service that consumes the system's API (ambiguous term).
- The word “user” is used a lot in software, but for a domain expert it can mean different things. Sometimes it is confused with terms like “visitor,” “administrator,” or “account,” which can cause confusion if its meaning is not clarified in the project (synonymous terms).

A strong ubiquitous language bridges the gap between code and business logic, making the model understandable and sustainable for both developers and domain experts.

It should be clarified that a ubiquitous language is only valid within a [[Bounded context]].

# References

[[Learning Domain Driven Design]]