---
modified: 2025-07-17T12:29:01-05:00
tags:
  - software
  - architecture
  - ddd
---
Link to the book: [Learning Domain-Driven Design](https://amzn.to/3FeI16o)

# Domains

A domain is the area of activity of a business, the service it provides to its customers. A business can have multiple domains.

A subdomain is a part of a domain that, together with other subdomains, helps the business achieve its goals and objectives. There are three types of subdomains.

## Core Subdomain

- It is what the business does differently from competitors.
- It cannot be easily replicated.
- It cannot be outsourced.
- Highly complex.
- Highly volatile.
- The best engineers are assigned to develop it.
- Not limited to software alone.

## Generic Subdomain

- What all businesses do in the same way.
- Off-the-shelf solutions.
- Hard to implement from scratch.
- Could become a secondary line of business.
- Ideally, not very volatile.

## Supporting Subdomain

- Not critical.
- No off-the-shelf solutions available.
- Can be outsourced.
- Not complex.
- CRUD operations.
- Does not provide competitive advantage.
- Custom implementation.
- Low volatility.

# Discovering Domain Knowledge

Subdomains focus on solving specific business problems:

- **Knowledge management** → Storing and retrieving information.
- **Settlement and clearing** → Handling financial transactions.
- **Finance and accounting** → Tracking company funds.

Software success depends on how effectively **knowledge is exchanged** among stakeholders.

Software must **reflect domain knowledge**: how domain experts think about the problem, because that is where the real expertise lies.

## Communication

Communication is **crucial** for a software project, yet many projects suffer from a “telephone game” effect.

The expert talks to the analyst, who creates the requirements document. The architect reviews the document and designs the solution. Then developers write the code.

At each **translation** step, information is lost.

## Ubiquitous Language

The solution is for all stakeholders to speak the same language. Everyone must use the same terms to express concepts. This is called a **ubiquitous language**.

“Ubiquitous” means present everywhere; in this context, it refers to a language used consistently throughout the project: in code, meetings, documentation, and design artifacts.

Importantly, this language must be the language of the business, understood by domain experts—no technical jargon!

| Business Language                                           | Technical Language                                                                                                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| A task cannot be deleted if it is already in process.        | You cannot delete records from the tasks table if the status column has the value 2 (foreign key to the “In Progress” status in the states table). |

Language must be consistent—no ambiguous terms or synonyms. For example:

- “Customer” can mean either a person buying products or a service consuming the system's API (ambiguous).
- “User” can mean different roles (visitor, admin, account) unless clearly defined in the project.

## Modeling

> A model is a simplified representation of a thing or phenomenon that intentionally emphasizes certain aspects while ignoring others. Abstraction with a specific purpose in mind. — Rebecca Wirfs-Brock

Every model has a purpose: to solve a problem. For example, a world map excludes bus routes. Models contain only necessary information, and too much or too little makes them ineffective.

When modeling the business domain, focus on the problem the software aims to solve—not on every domain detail. Complex domains require careful modeling: any misunderstanding leads to bugs.

# Bounded Contexts

## What is a Bounded Context?

A **Bounded Context** is a strategic pattern that defines where a model or language is consistent and applicable within a system. It reduces complexity when the same concept has different meanings in different parts of the business.

Bounded Contexts prevent terminology conflicts by dividing the system into well-defined zones.

### Why Strategic?

How you define contexts depends on the problem:

- In a **small project**, a single context may suffice.
- In a **large project**, one context can create conflicts and maintenance issues.

A Bounded Context should be:

- Not so large as to be unmanageable.
- Not so small as to cause integration challenges.

## Benefits of Bounded Contexts

Dividing a system into Bounded Contexts provides:

- Independent teams per context.
- Separate deployment cycles.
- Reduced cognitive load by smaller, focused codebases.

Bounded Contexts also define physical boundaries, e.g.:

- Team responsibilities.
- Separate code repositories.
- Dedicated services or machines per context.

**Key Rule:** Concepts that change together stay together.

## Bounded Context vs. Subdomain

A **Subdomain** is discovered within the business—an existing structure categorizing responsibilities.

A **Bounded Context** is designed for developer clarity and system manageability.

Ideally, a single team owns a Bounded Context, though a team may own multiple contexts.

## Example: Online Store System

In an online clothing store, **Order** means different things:

1. **Sales Context:** An Order is a purchase—customer, items, total, payment method.
2. **Shipping Context:** An Order is a shipment—address, carrier, tracking number.

Sharing a single Order model causes confusion, complex queries, and coupling issues.

### Solution: Separate Contexts

- **Sales.Order** in the Sales module.
- **Shipping.Order** in the Shipping module.

This can extend to microservices per context, ensuring models do not cross boundaries.