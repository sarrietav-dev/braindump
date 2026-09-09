---
modified: 2025-07-17T12:29:01-05:00
tags:
  - projects
  - software
draft: "true"
---

For some time, I wanted to learn Ruby on Rails, maybe because of its simplicity or maybe because I wanted to see the father of Laravel. I made a project called Product Feedback, whose design is bought (borrowed?) from the great site Front-end Mentor. Here are my thoughts:

# Language

Although I really don't like untyped programming languages, I ended up enjoying Ruby.

First, I was surprised by the fact that methods can be called without parentheses. Like these two are the same:

```rb
def foo
end

def bar
	foo :baz
	foo(:baz)
end
```

Second, symbols. I don't know any other programming language that has this feature. What I understand is that they are mainly used as keys in hash maps and as values elsewhere.

```rb
:hey
```

I also liked Ruby's convention of naming methods that return booleans with a question mark at the end. So, it's not `myStr.isBlank` but `myStr.blank?`.

I understand why Rubyists want to stick with Ruby. It's a simple, elegant, and powerful language.

# Rails

## Convention over configuration

The best feature of Rails for me is Convention over Configuration. Everything just has to go where it needs to go, named as it should be named, and it's ready. So simple!

## No-compile philosophy 👍

I support the idea of just sending your entire codebase as-is to a server and running `rails server`. There's no JSX transpilation or any executable build step. Not that those things are bad, but it's much more convenient not to have a build step (thanks DHH!).

## I don't like Turbo Frames/Streams
