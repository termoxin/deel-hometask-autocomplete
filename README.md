# Awesome AutoComplete component

This application shows how

This includes Next.js' built-in support for Global CSS, CSS Modules and TypeScript.

## 🚀 Quick start

In your terminal, run the following command:

```bash
# Set proper Yarn version
> yarn set version berry

# Install dependencies
> yarn

# Install SDKs
> yarn dlx @yarnpkg/sdks vscode

## Copy .env.example and create .env.local to load environment variables

> cp .env.example .env.local

## Credentials that are saved in .env.example are public, so it's safe to have them in there, but in case you're gonna have your own credentials, DON'T store them in .env.example

# Start app in dev
> yarn dev

# Build and start production build
> yarn build
> yarn start
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

## Run Jest Tests

```bash
yarn test
```
