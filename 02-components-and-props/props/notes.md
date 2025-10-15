# **React Props**

### **1️⃣ What are props?**

**Props** (short for _properties_) are **inputs to React components**.
Think of them as **parameters you pass to a function**, but for components.

- They allow **parent components to send data to child components**.
- Props make components **dynamic** and **reusable** instead of hardcoded.

```jsx
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;

<Greeting name="Spidy" />;
```

Here:

- `name` is a **prop**.
- `"Spidy"` is the value passed from the parent.
- The child (`Greeting`) reads `name` and uses it.

---

### **2️⃣ How props work**

Props in React follow **unidirectional data flow**:

```
Parent Component → Child Component
```

- Child cannot directly change props.
- To communicate changes back to the parent, use **callback functions passed as props**.

---

### **3️⃣ Props are read-only**

A component **cannot modify its props**:

```jsx
const Greeting = ({ name }) => {
  // ❌ name = "Spider Man"; // Not allowed
  return <h1>Hello, {name}!</h1>;
};
```

- If you need mutable data inside a component, use **state** instead.
- Props = input, **state = internal component data**.

---

### **4️⃣ Default props**

You can give props a **default value** if the parent doesn’t pass one:

```jsx
const Greeting = ({ name = "Guest" }) => <h1>Hello, {name}!</h1>;
```

- If no `name` is passed, it shows `"Guest"`.
- Useful for optional props.

---

### **5️⃣ Props can be any JS type**

Props aren’t limited to strings — they can be:

- Numbers
- Arrays
- Objects
- Functions

```jsx
const Card = ({ title, details, tags }) => (
  <div>
    <h2>{title}</h2>
    <p>{details}</p>
    <ul>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  </div>
);

<Card
  title="React"
  details="A JS library for building UIs"
  tags={["JSX", "Components", "Props"]}
/>;
```

---

### **6️⃣ Passing functions as props**

Props can include **callbacks**, allowing children to communicate back to the parent:

```jsx
const Button = ({ onClick }) => <button onClick={onClick}>Click me</button>;

const App = () => {
  const handleClick = () => alert("Button clicked!");
  return <Button onClick={handleClick} />;
};
```

- Here, `Button` doesn’t know what `onClick` does — it just calls it.
- The parent controls the logic.

---

# **React Keys**

### **1️⃣ Why keys are needed**

When rendering a list of components (e.g., using `.map()`), React needs a **unique identifier** for each element in the DOM:

```jsx
const fruits = [
  { id: 101, name: "Apple" },
  { id: 102, name: "Banana" },
  { id: 103, name: "Cherry" },
];

const FruitList = () => (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit.id}>{fruit.name}</li>
    ))}
  </ul>
);
```

`key={index}` tells React which element corresponds to which DOM node.

---

### **2️⃣ What happens without a key**

React uses the **virtual DOM** to update efficiently. Without keys:

- React **re-renders the entire list** on every state change.
- Can **hurt performance** for large lists.
- Component state inside list items (like input values) may **reset or lose focus**.

---

### **3️⃣ How keys work**

Keys tell React:

> “This item at this position is the same as before. Only update what changed.”

✅ Allows **DOM reuse** instead of destroying and recreating elements.

---

### **4️⃣ Key rules / best practices**

- Must be **unique among siblings**, not globally.
- Prefer a **stable unique ID**: `key={card.id}`.
- Avoid using **index** if the list can change dynamically.
- Should **not change between renders** (avoid `Math.random()`).

---

## **React Keys & the Index Trap**

React uses **keys** to identify which list items have changed, been added, or removed.
Keys help React efficiently **reconcile and update** the DOM.

---

### ⚠️ Problem: Using Index as Key

Example (❌ bad):

```jsx
todos.map((todo, index) => <Todo {...todo} key={index} />);
```

**Why it’s risky:**

- When you **add, remove, or reorder** list items, React may reuse the wrong DOM elements.
- Causes **incorrect UI rendering** — wrong data, mismatched components, or lost state.
- Index-based keys break React’s internal mapping logic.

---

### ✅ Correct Approach

Each item should have a **unique and stable ID**.

Example (✅ good):

```jsx
todos.map((todo) => <Todo {...todo} key={todo.id} />);
```

If items don’t have an ID:

- Assign one when creating them:

  ```js
  let todoCounter = 1;
  function createNewTodo(text) {
    return { id: todoCounter++, text, completed: false };
  }
  ```

- Or generate one using a library:

  ```js
  import shortid from "shortid";
  function createNewTodo(text) {
    return { id: shortid.generate(), text, completed: false };
  }
  ```

---

### 🧩 When It’s _Okay_ to Use Index

Only if **all three** conditions are true:

1. The list is **static** (never changes).
2. The items **don’t have IDs**.
3. The list is **never reordered or filtered**.

Example:

- Static lists like “Terms of Service” paragraphs or contributor names.

---
