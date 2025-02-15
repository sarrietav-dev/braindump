---
tags:
  - projects
  - software
  - rails
draft: true
---
For some time I wanted to learn Ruby on Rails, maybe because of its simplicity or maybe because I want to see Laravel's dad. I made a project called Product Feedback, whose design is bought (borrowed?) from the great page Front-end Mentor. Here are my thoughts:

# Language

Even though I pretty much dislike untyped programming languages, I ended up liking Ruby.

First, it caught me by surprise the fact that methods can be called without parenthesis. Like these two are the same:

```rb
def foo
end

def bar
	foo :baz
	foo(:baz)
end
```

Second, symbols. I don't know any programming language that has this thing. What I understand is that hey are mostly used as keys in hash maps and as values in other places.

```rb
:hey
```

I also liked that convention Ruby has of naming boolean returning methods with a question mark at the end. Therefore, it's not `myStr.isBlank` but `myStr.blank?`.

I understand why Rubyists want to stay in Ruby. It's a simple, elegant and powerful language.

# Rails

## Convention over configuration

The best feature of Rails for me is the Convention over Configuration. Everything just has to go where it needs to go, named as it should be named, and it's done. So simple!

## No build philosophy 👍

I support the idea of just sending your whole codebase as is it to a server and running `rails server`. There's no JSX transpiling or any executable compilation step. Not that those things are bad, but it's so much convenient to have no build step (thanks DHH!).

## I dislike Turbo Frames/Streams
