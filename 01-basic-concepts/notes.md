# 01 - Basic Concepts of React

## What is React?

React is a **JavaScript library** for building **user interfaces (UI)**.  
It is **component-based**, **declarative**, and uses a **virtual DOM** for efficient updates.

---

## History

- **Created by:** Jordan Walke (Facebook engineer)
- **First public release & open-sourced:** May 29, 2013, at JSConf US
- **React versions:** Currently using **React 18**

---

## Why React?

- **Component-Based:** Build reusable UI blocks
- **Declarative:** Describe what the UI should look like
- **Virtual DOM:** Fast updates and efficient rendering
- **Large Ecosystem:** Rich community, libraries, tools

---

## Core Concepts

### JSX (JavaScript XML)

- JSX allows writing HTML-like code inside JavaScript.
- Example:

```jsx
const element = <h1>Hello World from React</h1>;
```

---

## React Elements

- Created using `React.createElement`:

```js
const heading = React.createElement(
  "h1",
  { id: "main-heading", style: { color: "blue" } },
  "Hello World from React"
);
```

- **JSX equivalent:**

```html
<h1 id="main-heading" style={{ color: "blue" }}>Hello World from React</h1>
```

- **Important:** A React element is a plain JavaScript object, not a DOM element.

**Output of:** `console.log(heading);`

```js
{
  type: "h1",
  key: null,
  ref: null,
  props: {
    id: "main-heading",
    style: { color: "blue" },
    children: "Hello World from React"
  },
  _owner: null,
  _store: { validated: false }
}
```

- **props:** An object containing all attributes and children passed to the element:

```js
{
  id: "main-heading",
  style: { color: "blue" },
  children: "Hello World from React"
}
```

---

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
