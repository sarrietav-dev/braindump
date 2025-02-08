---
tags:
  - coding
  - practices
  - software
---
Link to the article: https://qntm.org/devphilo

- Avoid ground-up rewrites. This is done by avoiding avoidable causes like:
	- Compounding tech debt
	- Difficulty in documenting code
	- Difficulty in on-boarding new people
	- Few people know how parts of the system work.
	- Bugs nobody understand
- Write code takes most of the time, and polishing it also takes most of the time. By polishing it means handling edge cases, testing, documentation, demos, performance, [[serviceability]], last minute changes, etc. (If you ignore this your code becomes wonky).
- Enforce rules by automation. Because it's better than communicating those rules constantly.
- Always think about edge cases. It's our entire job, not the golden path. The code should handle *every* possibility.
- Always look for a better way to write something.
- Testable code: interfaces with minimal side effects.
- Avoid [[programming by coincidence]].