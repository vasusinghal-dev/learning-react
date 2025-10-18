# **React State & Hooks Notes**

---

## 1️⃣ **What is State?**

- **State** = component’s **memory**; stores values that can **change over time**.
- Changing state → **React re-renders the component** → UI updates automatically.
- Think of it as **“internal data”** that the component controls.

**Key line:**

> Any dynamic data that affects the UI must live in **state** (or props).

---

## 2️⃣ **State vs Props**

| Concept | What it does                   | Controlled by    | Changes re-render?     |
| ------- | ------------------------------ | ---------------- | ---------------------- |
| Props   | Data passed **from parent**    | Parent component | Yes, if parent updates |
| State   | Data **internal to component** | Component itself | Yes, when updated      |

---

## 3️⃣ **React Hooks for State & References**

### **`useState`**

- Hook for adding **state** to functional components.

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

---

### **`useRef`**

- Hook for storing a **mutable reference** that **does not trigger re-render**.
- Common use cases:

  1. Access **DOM elements** directly
  2. Store **persistent values** between renders (like a timer or previous state)

```jsx
import { useRef } from "react";

const InputFocus = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus(); // directly focus input element
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};
```

**Key points:**

- `useRef` does **not cause re-render** when updated
- `.current` holds the value or DOM element
- Perfect for **keeping values between renders** without triggering updates

---

### **`forwardRef`**

- Used to **pass refs from parent to child components**
- Enables parent to access **child’s DOM or component instance**

```jsx
import React, { forwardRef, useRef } from "react";

const FancyInput = forwardRef((props, ref) => (
  <input ref={ref} placeholder="Forward Ref Input" />
));

const Parent = () => {
  const inputRef = useRef(null);

  const focusChildInput = () => {
    inputRef.current.focus(); // Access child input directly
  };

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={focusChildInput}>Focus Input</button>
    </div>
  );
};
```

**Key points:**

- `forwardRef` **wraps the child component**
- Allows **parent to control child’s DOM**
- Works well for reusable input components, modals, sliders, etc.

---

## 4️⃣ **State Lifecycle**

1. **Initialization**

   - State is created when the component **mounts**
   - Example: `useState(0)` → initial value is `0`

2. **Update**

   - Use **setter function** (`setCount`) to update state
   - React **re-renders component** with new state

3. **Persistence**

   - State exists **only in memory** while component is alive
   - Refresh page → state **resets to initial value**

4. **Destruction / Unmount**

   - Component unmount → state is **destroyed**
   - Optional: save state externally (`localStorage`, backend) to persist

---

## 5️⃣ **Important Rules**

- Never **mutate state directly**:

  ```jsx
  count++; // ❌
  ```

  Instead, always use setter:

  ```jsx
  setCount(count + 1); // ✅
  ```

- State updates are **asynchronous**

- For **derived state** (depends on previous state), use function form:

  ```jsx
  setCount((prev) => prev + 1);
  ```

---

# ⚛️ **React Reconciliation, Fiber & Virtual DOM**

---

## **1️⃣ Virtual DOM — The Core Idea**

The **Virtual DOM (VDOM)** is just a **JavaScript object representation** of the actual DOM.

When you write JSX like this:

```jsx
const element = <h1 className="title">Hello Shadow</h1>;
```

React internally turns it into:

```js
const element = {
  type: "h1",
  props: {
    className: "title",
    children: "Hello Shadow",
  },
};
```

This is **not HTML** — it’s a lightweight **JS structure** describing what the UI should look like.

### 🧠 Why React Uses Virtual DOM

- Real DOM updates are **slow**
- Virtual DOM updates are **fast and cheap**
- React keeps a copy of the UI tree in memory, **compares it with the new one**, and **only updates changed parts** of the real DOM

| Concept       | Description                        |
| ------------- | ---------------------------------- |
| Virtual DOM   | JS object describing UI            |
| Real DOM      | Browser-rendered structure         |
| Purpose       | Minimize costly real DOM updates   |
| Controlled by | React (via Reconciliation + Fiber) |

---

## **1️⃣ What is Reconciliation?**

- React’s **process of updating the DOM efficiently** when a component’s state or props change.
- Compares **new virtual DOM** with **old virtual DOM** → applies only **necessary changes** to the real DOM.

**Key point:** Minimal DOM updates = better performance.

---

## **2️⃣ Why Reconciliation Matters**

- Direct DOM updates are **slow**.
- React uses **Virtual DOM + Fiber** to optimize UI rendering.
- Enables **incremental and prioritized rendering** → smooth UI even during heavy updates.

---

## **3️⃣ React Fiber – Overview**

- **React Fiber** = React’s **reimplementation of the rendering engine** (React 16+).
- Purpose: **make rendering flexible, efficient, and interruptible**.
- Think of Fiber as the **engine behind React** controlling **when and how updates happen**.

---

### **3.1 Why Fiber Was Needed**

| Before Fiber                                    | Problem                                                        | Fiber Fix / Solution                                                  |
| ----------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------- |
| Stack reconciliation → synchronous updates only | Big updates could block the main thread, causing UI lag        | Break work into small units (Fibers) → allows interruptible rendering |
| Hard to prioritize tasks                        | Animations, typing, or network updates couldn’t be prioritized | Schedule updates by priority → high-priority tasks first              |
| No async rendering support                      | Large renders could freeze UI                                  | Support async rendering → smooth UI even under heavy load             |

---

## **4️⃣ How Reconciliation Works**

### **Render Phase (Diffing)**

1. React creates a **new virtual DOM tree**.
2. Compares it with the **old virtual DOM** using the **diffing algorithm**.
3. Fiber splits this work into **small units**, which can be **paused/resumed**.

**Diffing Rules:**

- **Element type same:** update props
- **Element type different:** remove old DOM node, create new one
- **Lists:** keys identify elements → helps React **reuse DOM nodes efficiently**

### **Commit Phase**

- Fiber applies **calculated changes to the real DOM**.
- This phase is **synchronous** → cannot be interrupted.

---

## **5️⃣ Keys and Lists**

- Keys give React a **stable identity** for each list item.
- Without keys → React may **re-render the entire list**, causing:

  - Performance issues
  - Losing component state (e.g., input focus)

**Best Practice:**

```jsx
{
  itemsArray.map((item) => <Item item={item} key={item.id} />);
}
```

---

## **6️⃣ Reconciliation with Components**

| Component Type | Behavior During Reconciliation                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------ |
| Functional     | Re-render on state/props change; Fiber can pause/resume updates                                  |
| Class          | Re-render on state/props change; can use lifecycle methods (`shouldComponentUpdate`) to optimize |

---

## **7️⃣ Fiber Concepts**

- **Fiber Node:** Internal representation of a React element/component
- **Incremental Rendering:** Rendering can pause, resume, or abort
- **Prioritization:** High-priority tasks first, low-priority later
- **Virtual DOM + Fiber:** Minimal DOM updates
- **Commit Phase:** Applies changes to real DOM

---

## **8️⃣ Benefits of Fiber**

- Smooth UI updates even during heavy rendering
- Prioritized rendering → responsive user interactions
- Concurrency support → split rendering into chunks
- Supports modern React features like **Suspense** and **Concurrent Mode**

---

## 🧩 Separation of Concerns in React

React divides its architecture into **three key layers**:

| Layer          | Responsibility                                    | Example                 |
| -------------- | ------------------------------------------------- | ----------------------- |
| **Reconciler** | Figures out _what_ changed in the virtual DOM.    | React Fiber algorithm   |
| **Renderer**   | Knows _how_ to apply those changes to a platform. | React DOM, React Native |
| **Scheduler**  | Decides _when_ to perform work for best UX.       | React Scheduler         |

---
