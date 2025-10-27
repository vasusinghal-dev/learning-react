# ⚛️ React Class Components & Lifecycle

---

## 🧩 1. What is a Class Component?

A **class component** is an ES6 class that:

- Extends `React.Component`
- Has a `render()` method that returns JSX
- Can hold **state** and **lifecycle methods**

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return <h1>{this.state.count}</h1>;
  }
}
```

---

## ⚙️ 2. Key Features

| Feature                            | Description                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| **State**                          | Internal data managed within the component (`this.state`)            |
| **Props**                          | External data passed from parent (`this.props`)                      |
| **Lifecycle Methods**              | Special methods triggered at specific points in the component’s life |
| **Refs**                           | Direct access to DOM elements or React elements                      |
| **Class Fields / Arrow Functions** | For auto-binding methods                                             |

---

## 🧠 3. Component Lifecycle Overview

Every class component goes through **three main phases**:

1. **Mounting** → Component is created and inserted into DOM
2. **Updating** → Component re-renders due to props or state changes
3. **Unmounting** → Component is removed from DOM

---

## 🧩 4. Mounting Phase

| Method                                            | When it Runs        | Purpose                              |
| ------------------------------------------------- | ------------------- | ------------------------------------ |
| **constructor(props)**                            | Before render       | Initialize state, bind methods       |
| **static getDerivedStateFromProps(props, state)** | Before render       | Sync state with props (rarely used)  |
| **render()**                                      | During render phase | Return JSX (pure, no side-effects)   |
| **componentDidMount()**                           | After DOM inserted  | Ideal for API calls, DOM ops, timers |

### **Mounting Flow:**

```
constructor → render → child constructors/renders → commit DOM → child didMount → parent didMount
```

---

### 🧩 Example: Understanding Mounting Order

Here’s a practical example showing the **exact order** in which parent and child lifecycle methods run.

```jsx
class Child extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.name, "constructor called");
  }

  componentDidMount() {
    console.log(this.props.name, "mounted");
  }

  render() {
    console.log(this.props.name, "rendered");
    return <div>{this.props.name}</div>;
  }
}

class Parent extends React.Component {
  constructor() {
    super();
    console.log("Parent constructor called");
  }

  componentDidMount() {
    console.log("Parent mounted");
  }

  render() {
    console.log("Parent rendered");

    return (
      <>
        <Child name="First child" />
        <Child name="Second child" />
      </>
    );
  }
}
```

**Console Output (in order):**

```
Parent constructor called
Parent rendered
First child constructor called
First child rendered
Second child constructor called
Second child rendered
First child mounted
Second child mounted
Parent mounted
```

**Why this order?**

React’s internal mounting steps:

1. **Constructors** → top-down
2. **Render()** → top-down
3. **DOM insertion (commit)** → children first
4. **componentDidMount()** → bottom-up

That’s why **children finish mounting before the parent’s `componentDidMount()`**.

---

## 🔁 5. Updating Phase

Triggered when:

- `setState()` is called
- New props are received
- Parent re-renders

| Method                                                 | When it Runs        | Purpose                                 |
| ------------------------------------------------------ | ------------------- | --------------------------------------- |
| **static getDerivedStateFromProps(props, state)**      | Before render       | Update state based on new props         |
| **shouldComponentUpdate(nextProps, nextState)**        | Before render       | Optimize re-renders (return true/false) |
| **render()**                                           | During render phase | Return new JSX                          |
| **getSnapshotBeforeUpdate(prevProps, prevState)**      | Before DOM update   | Capture info (e.g., scroll pos)         |
| **componentDidUpdate(prevProps, prevState, snapshot)** | After DOM update    | React to DOM or data changes            |

🧠 **Order of Execution (Update):**

```
getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → commit → componentDidUpdate
```

---

## 🧹 6. Unmounting Phase

| Method                     | When it Runs                 | Purpose                                                  |
| -------------------------- | ---------------------------- | -------------------------------------------------------- |
| **componentWillUnmount()** | Just before removal from DOM | Cleanup: remove listeners, clear timers, cancel requests |

---

## 🚨 7. Deprecated Methods (avoid in modern React)

- `componentWillMount()` ❌
- `componentWillReceiveProps()` ❌
- `componentWillUpdate()` ❌

→ Replaced by **`getDerivedStateFromProps`** and **`getSnapshotBeforeUpdate`**

---

## ⚡ 8. Common Real-World Uses

| Task                           | Lifecycle Method            |
| ------------------------------ | --------------------------- |
| Fetch API data                 | `componentDidMount()`       |
| Cleanup intervals or sockets   | `componentWillUnmount()`    |
| DOM measurements (scroll/size) | `getSnapshotBeforeUpdate()` |
| Optimize re-renders            | `shouldComponentUpdate()`   |

---

You can use this image for understanding **“React Lifecycle Flow Summary”**:

![Image](https://miro.medium.com/v2/resize:fit:1400/1*cPwvUhZrnB1dtZnjBEfXfA.png)

---
