# Questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

React.Component and React.PureComponent are similar but differ only in the `shouldComponentUpdate` life cycle method, which is implemented by default in PureComponent. You can use `shouldComponentUpdate` in React.Component and implement the same logic to make it behave the same as PureComponent.

Honestly, I don't think PureComponent will break the application, but since PureComponent uses shallow comparison and only checks values and references to objects it can cause some misleading stuff.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

It's dangerous since components as consumers re-renders when their provider data updates. Also, shouldComponentUpdate hook doesn't work on Consumers

To get around and solve this problem you need to create a new component that's gonna take consumers' props and implement `shouldComponentUpdate`

Honestly, I can be wrong since I haven't used the `shouldComponentUpdate` life cycle method for a year or two 🙂

## 3. Describe 3 ways to pass information from a component to its PARENT.

1. Context API with setter function
2. Callbacks. For example, a parent passes a callback function to a child and the child invokes the callback and passes specific arguments and then these arguments can be used to communicate with the parent or set its state
3. Forwarding ref
4. Bonus: State management libraries (Redux, MobX, XState, and so on)

## 4. Give 2 ways to prevent components from re-rendering.

1. PureComponent or `shouldComponentUpdate` in React.Component with custom checks
2. `React.memo` HOC for functional components `memo(({ prop }) => <span>{prop}</span>)`
3. Bonus: `useCallback` with according dependencies when you don't need to re-create a function on each re-render which passed to a child component
4. Bonus: `useMemo` with according dependencies when you don't need to re-calculate a value on each re-render which passed to a child component

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

It's a React wrapper that helps to get together a few elements without creating additional dom elements. For instance, if you want to add an additional dom element without creating a new dom element, you can use `React.Fragment` or its good-looking shortcut <></>

It also can be used to pass ref for a group of components without a parent.

Fortunately, I don't remember cases where fragment brakes my app, but I remember the case when I was using the UI library and styles wasn't applied before to list items until I removed fragment. So, I think there were some problems with the UI library because it didn't handle the case

## 6. Give 3 examples of the HOC pattern.

1. `React.memo` for memoizing results. It can boost performance and prevent re-renders
2. `withTheme` in styled-components library
3. `connect` in Redux
4. Bonus: `withLoadingSpinner` for class components

```tsx
interface WithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props;
      return loading ? <LoadingSpinner /> : <Component {...(props as P)} />;
    }
  };
```

Personally, I prefer React hooks over HOCs, but there is always legacy code out here that uses class components 😜

## 7. What's the difference in handling exceptions in promises, callbacks, and async...await.

1. In promises we have a reject function that should be handled by the developer in `.catch` method
2. In callbacks we use try-catch for handling exceptions
3. In async...await it depends you can use both `.catch` method and try-catch for handling exceptions

## 8. How many arguments does setState take and why is it async.

setState takes two arguments: first is the new state, and the second is a function that will run after changing the state

You can also pass a function like this: (oldState) => {} instead of the new state, for getting the latest state and changing it

`setState` is async since it doesn't update state instantly. It creates queues and processes them step by step asynchronously (simply, it waits for all `setState` calls)

Also, it's an optimization thing. React sets state asynchronously since setting state can be an expensive operation. Asynchronous setState batches calls and makes a better user experience and performance

\*If you need an up-to-date state you can use setState with function as the first argument

## 9. List the steps needed to migrate a Class to Function Component.

1. Replace class components with functions
2. Remove the constructor and move the state to useState/useReducer hook

I would prefer to use `useReducer` hook if there is more than one `useState` hook is used since with `useReducer` it's easier to predict state and make some optimization to get rid of redundant re-renders

3. Replace class life cycles with `useEffect`
4. Remove render() method and replace it with `return`
5. Change methods to functions and get rid of `this`
6. Optional: replace HOCs with hooks usually hooks are more developer-friendly as HOCs
7. Bonus: memoize function and calculation with `useCallback` and `useMemo` to boost performance

## 10. List a few ways styles can be used with components.

1. CSS-in-JS: styled-components, emotion
2. Old-school CSS without loaders and stuff that is imported to HTML document as CSS file and accessible by class name)
3. With loaders in bundler: CSS/SASS modules, pre-processors like SASS/Stylus/
4. Inline styles

```tsx
<p style={{ color: "#1F4592" }}>Paragraph</p>
```

## 11. How to render an HTML string coming from the server.

This can be done with the `dangerouslySetInnerHTML` attribute like dangerouslySetInnerHTML={ \_\_html: someEscapedHTML } for the parent element, it'll show your HTML from the server in children. But it's not a safe solution.

I'd rather recommend some well-tested and well-known third-party solutions (React Server Components, Next.js)
