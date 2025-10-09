## Nesting & Siblings in React Elements

- React elements can contain other React elements as children.
- Multiple children (siblings) are passed as an array.

Example using `React.createElement`:

```js
const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I'm an h1 tag"),
    React.createElement("h2", {}, "I'm an h2 tag"),
  ])
);
```

- **Hierarchy:**

```
div#parent
 └─ div#child
     ├─ h1 "I'm an h1 tag"
     └─ h2 "I'm an h2 tag"
```

- **JSX equivalent:**

```
<div id="parent">
  <div id="child">
    <h1>I'm an h1 tag</h1>
    <h2>I'm an h2 tag</h2>
  </div>
</div>
```

- **Output of:** `console.log(parent);`

```js
{
  type: "div",
  key: null,
  ref: null,
  props: {
    id: "parent",
    children: {
      type: "div",
      key: null,
      ref: null,
      props: {
        id: "child",
        children: [
          { type: "h1", props: { children: "I'm an h1 tag" }, ... },
          { type: "h2", props: { children: "I'm an h2 tag" }, ... }
        ]
      },
      ...
    }
  },
  ...
}
```

### Key Points:

- **Parent** → holds child elements

- **Children** → can be a single element or an array (for multiple siblings)
