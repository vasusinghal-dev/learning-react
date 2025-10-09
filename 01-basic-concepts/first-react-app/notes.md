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
