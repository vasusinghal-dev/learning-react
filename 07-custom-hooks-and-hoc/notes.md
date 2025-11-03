# 🧠 **Custom Hooks (Reusability)**

### 🧩 What Are They?

Custom hooks are **your own functions** that start with `use` and **reuse React logic** (mainly state, effects, or context).

They’re like:

> “Extracted logic that multiple components can share without repeating code.”

---

### ✨ Example

```jsx
// useOnlineStatus.js
import { useState, useEffect } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return isOnline;
}
```

Usage:

```jsx
import { useOnlineStatus } from "./hooks/useOnlineStatus";

function StatusBanner() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? "✅ Online" : "❌ Offline"}</p>;
}
```

---

### 💡 Why Use Custom Hooks?

- Removes **duplicated logic**
- Keeps components **clean and readable**
- Promotes **separation of concerns**
- Makes complex apps **easier to debug and test**

---

### 🧩 Common Examples

| Hook              | Purpose                        |
| ----------------- | ------------------------------ |
| `useLocalStorage` | Sync state with localStorage   |
| `useDebounce`     | Delay actions (e.g. API calls) |
| `useFetch`        | Data fetching                  |
| `useToggle`       | On/Off state toggle            |
| `useOnlineStatus` | Track network connectivity     |

---

# 🧩 **Higher-Order Components (HOC)**

### 💡 Concept

A **function that takes a component and returns an enhanced component**.

---

### ⚙️ Syntax

```jsx
const withLogger = (WrappedComponent) => {
  return (props) => {
    console.log("Rendered:", WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
};
```

✅ **Old Use Cases**

- Code reuse and logic sharing
- Conditional rendering
- Wrapping for permissions or themes

⚠️ **Problems**

- “Wrapper hell” (nested HOCs)
- Harder debugging
- Breaks component hierarchy
- **Hooks now replace HOCs**

---

### 🧩 **Modern Status (2025)**

> 🔹 **Legacy pattern** — understand it for maintaining older code, but don’t build new ones.

---

### ⚔️ Old Way — HOC Example

```jsx
const withLoader = (WrappedComponent) => {
  return function WithLoader({ isLoading, ...props }) {
    if (isLoading) return <div>Loading...</div>;
    return <WrappedComponent {...props} />;
  };
};
```

```jsx
const UserList = ({ users }) => (
  <ul>
    {users.map((u) => (
      <li key={u.id}>{u.name}</li>
    ))}
  </ul>
);

export default withLoader(UserList);
```

---

### ⚡ New Way — Custom Hook

```jsx
export function useLoader(fetchFn) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFn().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [fetchFn]);

  return { data, loading };
}
```

```jsx
function UserList({ fetchUsers }) {
  const { data: users, loading } = useLoader(fetchUsers);
  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

✅ **Hooks > HOCs**

- No wrapping hell
- Easier composition
- Clearer data flow
- Reusable anywhere

> 🧠 “HOCs _enhance_ from outside — Hooks _empower_ from within.”

---

# ⚡ **Chunking (Code Splitting / Lazy Loading)**

### 🚀 What It Is

**Chunking** = Splitting your app’s bundle into smaller pieces (chunks)
So that the browser loads **only what’s needed**, not the entire code at once.

In React, it’s mainly done using **`React.lazy()` + `Suspense`**.

---

### 💻 Example

```jsx
import { Suspense, lazy } from "react";

const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
```

---

### 🎯 Why It Matters

| Advantage              | Description                                |
| ---------------------- | ------------------------------------------ |
| ⏱ Faster initial load | Only loads the current page’s code         |
| 📦 Smaller bundle      | Big apps stay performant                   |
| 🧠 Smarter caching     | Browser caches only what’s needed          |
| 💰 Real-world benefit  | Saves bandwidth, improves Lighthouse score |

---

### 🧠 Bonus Tip: Dynamic Imports

```js
import("./utils/heavyLib.js").then((module) => module.run());
```

---

### 🔄 Custom Hook + Chunking Example

```jsx
// useFetchData.js
import { useState, useEffect } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  return data;
};
```

```jsx
const DataPage = lazy(() => import("./pages/DataPage"));
```

> Clean code structure (custom hook) + faster loading (chunking)

---

# 🧠 **Lifting State Up**

When two or more components need to **share or sync the same data**,
you **move the state** into their **nearest common ancestor**,
so everyone reads from _one source of truth_.

---

### 💡 Example (Temperature Converter)

❌ **Before (unsynced):**

```jsx
function CelsiusInput() {
  const [celsius, setCelsius] = useState("");
}
function FahrenheitInput() {
  const [fahrenheit, setFahrenheit] = useState("");
}
```

✅ **After (lifted):**

```jsx
function TemperatureCalculator() {
  const [temperature, setTemperature] = useState("");

  return (
    <>
      <CelsiusInput value={temperature} onChange={setTemperature} />
      <FahrenheitInput value={temperature} onChange={setTemperature} />
    </>
  );
}
```

Now both components share the same `temperature` state.

---

### ⚙️ Why Lift State Up?

- Keep **data in sync**
- Avoid **duplicate states**
- Centralize **logic and calculations**
- Simplify **debugging**

---

### 🧩 When to Lift State

| Situation                          | Lift?                   |
| ---------------------------------- | ----------------------- |
| Only one component uses it         | ❌ No                   |
| Parent + child both need it        | ✅ Yes                  |
| Sibling components both need it    | ✅ Yes (lift to parent) |
| Needed globally (e.g. theme, auth) | ⬆️ Use Context or Redux |

---

### 🧠 Real Example (Accordion Group)

```jsx
function AccordionGroup() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {accordions.map((a, i) => (
        <Accordion
          key={i}
          title={a.title}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </>
  );
}
```

Now the **parent controls** which accordion is open — classic “lifted state.”

---

### ⚖️ Quick Rule

> 🔺 If many components need it → Lift it
> 🔹 If one component needs it → Keep local
> 🔸 If everyone needs it → Use Context/Redux

---

# 🪣 **Prop Drilling**

### 💡 Concept

When you pass data **through multiple layers** just so a deep child can access it.

> "A prop relay race nobody asked for." 🏃➡️🏃➡️🏃

---

### ⚙️ Problem Example

```jsx
function App() {
  const user = { name: "Vasu" };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  return <h1>Hello, {user.name}!</h1>;
}
```

Every component just passes props — messy & fragile.

---

### 💡 Solutions

#### ✅ 1. **React Context**

```jsx
import { createContext, useContext } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

function App() {
  const user = { name: "Vasu" };
  return (
    <UserContext.Provider value={user}>
      <GrandChild />
    </UserContext.Provider>
  );
}

function GrandChild() {
  const user = useUser();
  return <h1>Hello, {user.name}!</h1>;
}
```

---

#### ✅ 2. **State Management (Large Apps)**

Use **Redux Toolkit**, **Zustand**, or **Jotai** for shared state
→ avoids prop drilling _and_ overusing Context.

---

#### ✅ 3. **Component Composition**

```jsx
function Layout({ header, content }) {
  return (
    <div>
      <header>{header}</header>
      <main>{content}</main>
    </div>
  );
}

<Layout header={<Navbar />} content={<Dashboard />} />;
```

---

### 🧠 Quick Summary

| Problem                  | Solution        |
| ------------------------ | --------------- |
| Too many prop layers     | Context API     |
| Multiple global states   | Redux / Zustand |
| Props just for structure | Composition     |

---

🪄 **Rule of Thumb:**

> “If you’re passing the same prop more than twice down the tree — lift it up or use Context.”

---

# 🧠 React Context API

### 💡 Concept

A built-in React feature that lets you **share data globally** across the component tree
— without prop drilling (passing props down multiple levels).

---

### ⚙️ Syntax

```jsx
// 1️⃣ Create
const UserContext = createContext({ logged: "Guest" });

// 2️⃣ Provide (usually high in tree)
<UserContext.Provider value={{ logged: "Vasu" }}>
  <Profile />
</UserContext.Provider>;

// 3️⃣ Consume (function component)
const { logged } = useContext(UserContext);

// or in class components
<UserContext.Consumer>
  {({ logged }) => <h2>{logged}</h2>}
</UserContext.Consumer>;
```

---

### 🧩 When to Use

✅ Global state needed across many components <br>
✅ Theming (dark/light mode) <br>
✅ Auth or user info (logged in user) <br>
✅ Cart, language, or app-wide settings

---

### ⚠️ When **Not** to Use

🚫 For small, local component state <br>
🚫 When only one or two components need the data <br>
🚫 When frequent updates cause unnecessary re-renders

---

# 🎛️ **Controlled vs Uncontrolled Components**

### 💡 Controlled Components

React **controls** the input via state.

```jsx
<input value={name} onChange={(e) => setName(e.target.value)} />
```

✅ Pros:

- Easy validation
- Full React control

⚠️ Cons:

- Slightly more boilerplate
- Re-renders on each input

---

### 💡 Uncontrolled Components

The **DOM** manages input state; React accesses via `ref`.

```jsx
const nameRef = useRef();
<form onSubmit={() => console.log(nameRef.current.value)}>
  <input ref={nameRef} />
</form>;
```

✅ Pros:

- Simple for quick forms
- Fewer re-renders

⚠️ Cons:

- Harder validation
- React unaware of input state

---

### 🧠 Comparison

| Feature              | Controlled      | Uncontrolled         |
| -------------------- | --------------- | -------------------- |
| Data source          | React state     | DOM                  |
| Real-time validation | ✅ Easy         | ❌ Hard              |
| Code simplicity      | ❌ More         | ✅ Less              |
| Sync with UI         | ✅ Full control | ⚠️ Limited           |
| Best for             | Dynamic forms   | Simple static inputs |

---
