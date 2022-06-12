# Frontend code review and refactoring task

### Note to the casual viewer: this is deliberately terrible code, and part of an interview exercise to aide in discussions on pairing, technical debt and code quality. This isn't representative of how we do things at Mention Me!

## The scenario

A new React developer has approached you with the code in this repo as a pull request to some larger project.

They were asked to create a 'order entry' feature that:

- Lets you add new orders
- Lets you mark orders as shipped
- Has some basic styling

## The exercise

Make appropriate amendments to get it into a state that you believe represents a decent reflection of best-practice frontend development & the requirements defined above.

You're free to introduce any new dependencies you like.

**Note**: We have intentionally introduced _numerous_ mistakes in the code, typos, bugs, bad practice and everything in between.

### Things to consider

- What opportunities for refactoring exist?
- How is TypeScript being used in the component?
- What React related bugs might exist in the implementation?
- What's the test coverage like? What tests should be in place?
- How is styling implemented?
- How is the project structured?

### Time limit

Please do not spend more than 2 hours on this task. We will discuss your changes in our follow up interview, and so we encourage and welcome you to talk about changes you'd make if you had more time. Take a few minutes at the end (or during) to just write down the sorts of changes you would make if you had additional time.

Please record roughly how long you took on the exercise so that we can discuss your approach in a clearer context.

### Assumptions

For the purposes of the exercise, you can assume:

- That the visual appearance of the component is acceptable
- That our Jenkins/Github actions will block any merge with failing tests
- That the component is functionally complete, but buggy - we'll pretend that the purely in-memory state for the order list is acceptable for now

### Commands

`yarn install` and `yarn start` should get you up and running on `localhost:3000`

### Submission / Editing

You're welcome to edit and submit the code in a tool of your choosing. CodeSandbox.io is an easy way for us to share the code with you, but if you'd prefer to create a repo, share a zip, or edit in any other application please go for it!
