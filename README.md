# Awesome AutoComplete component

This Next.js application shows an example of React autocomplete component.
Next.js is used as a server to hide the source of data. In a real production application, I would use `X-Application-Key` header to detect the frontend client. In case `X-Application-Key` header is absent then the backend is not gonna send anything to this client. One thing, `X-Application-Key` should know only our frontend client and other trusted clients.

The component has a great UX and developer experience, but there are always room for improvement. For instance:

- Make this component fully compliant with WAI-ARIA (even though this component can be detected and interacted with by screen readers)
- Improve tests coverage and quality
- Provide better type safety
- Add multiple occurrences in highlighting
- Get rid of redundant re-renders (e.g. leverage `useReducer` hook to set a few pieces of state in one action)
- Custom "Nothing is found" text label
- Create documentation for components and functions
- Custom Spinner icon
- Multiselection of items
- Optionally available internal caching of elements
- And so many other features ⭐

<a href="https://awesome-autocomplete.vercel.app" target="_blank">DEMO</a>

## 🚀 Quick start

In your terminal, run the following command:

```bash
# Install Node.js v16.15.1
> nvm install v16.15.15

# Use Node.js v16.15.1 in the project
> nvm use

# Set Yarn 3 version since the project uses PnP (Plug'n'Play)
> yarn set version berry

# Install dependencies
> yarn

# Install SDKs
> yarn dlx @yarnpkg/sdks vscode

## Copy .env.example and create .env.local to load environment variables
> cp .env.example .env.local

## Credentials that are saved in .env.example are public, so it's safe to have them in there,
## but in case you're gonna have your own credentials, DON'T store them in .env.example

# Start app in dev
> yarn dev

# Create production build
> yarn build

# Start production build
> yarn start

```

## VScode set up

To make VScode working properly with TypeScript press `Command + Shift + P` select `TypeScript: Select TypeScript Version...` and click on `Use Workspace Version`

## Run Jest tests

```bash
yarn test
```

## Run Storybook

If you would like to take a look at the documentation of components or you want to play around with components isolated from the outside world you can run:

```bash
yarn storybook
```

## 📄 Task

1. You cannot use any 3rd party libraries - only pure React and internal DOM functions.
2. You should use typescript and write proper interfaces and types.
3. The function to filter the data should be asynchronous. You can use mock data (such as a JSON array), but the function which uses it should be asynchronous (similar to a real REST call).
4. It should have basic working CSS. No need for anything fancy (such as drop- shadows etc), but should look decent.
5. You need to handle all non-standard/edge use-cases - it should have a perfect user-experience.
6. Highlight the matching part of the text, in addition to showing it.
7. No external state management libraries (refer to #1 as well), only native React method.
8. Use only functional component with hooks.
9. Shortcuts and hacks are perfectly ok - but you have to add comments on what are you doing there and why. You should either write production ready code or include comments on what needs to be changed for production.
10. Add a README.md file explaining how to run the project.
11. Bonus #1: load data using a real API call to some resource.

## ❓ Questions

[Show answered questions](./questions.md)
