# **JSX Fundamentals**

---

## **1. What is JSX?**

- **JSX (JavaScript XML)** is a _syntax extension_ for JavaScript.
- It lets you write code that looks like HTML inside JavaScript.
- It is **not pure JavaScript** — browsers can’t understand JSX directly.
- JSX code must be **transpiled first before reaching the JavaScript engine.**

💡 Example:

```jsx
const element = <h1>Hello World</h1>;
```

This is **invalid JS** until it’s transpiled.

JSX **looks like HTML**, but it’s just _syntactic sugar_ for **JavaScript function call** to `React.createElement()`.

So:

- **JSX ≠ JavaScript**
- **JSX ≠ HTML**
- **JSX ➜ React’s sugar syntax written in JavaScript**

**When you call `root.render(element)` (via ReactDOM), React converts the React element into real DOM nodes in the browser. The DOM now displays the UI as actual HTML elements.**

---

## **3. How JSX Works Under the Hood**

- JSX is **converted to JavaScript** before execution.
- Each JSX tag becomes a call to `React.createElement()`.

💬 Example:

```jsx
const element = <h1>Hello</h1>;
```

Transpiles to:

```js
const element = React.createElement("h1", null, "Hello");
```

So, JSX is not HTML — it’s a **more readable way to create React elements**.

---

## **4. Relationship Between JSX, JS, and React**

- JSX isn’t a separate language — it’s **part of React’s ecosystem**.
- It works **only** because React knows how to interpret it.
- Without React, JSX is meaningless code.

🧩 Think of JSX as:

> “A bridge syntax connecting JavaScript to React’s Virtual DOM.”

---

## **5. JSX Transpilation**

- Bundlers (like **Parcel**, **Vite**, or **Webpack**) automatically use **Babel** to transpile JSX into plain JavaScript.
- The transpiler converts JSX into plain JavaScript the browser (`JS Engine`) can understand.
- By the time code reaches the browser, there’s **no JSX left — only pure JS remains**.

💬 Example:

```
JSX → Babel → React.createElement → Plain JS → Browser
```

---

# **Babel**

**Definition:**
Babel is a **JavaScript transpiler** — it converts modern JavaScript (ES6+), JSX, and other next-gen features into **browser-compatible JavaScript**.

**Purpose:**

- Allows you to use **latest JS syntax** in any browser.
- Converts **JSX → React.createElement** for React apps.
- Supports optional plugins for experimental JS features.

**Key Facts:**

- **Created by:** Sebastian McKenzie (2014)
- **Original name:** 6to5 (`ES6 to ES5`)
- **Open-source:** Yes, widely used in the JavaScript ecosystem.
- **Website:** [https://babeljs.io](https://babeljs.io)

**Note:** Babel is independent of Facebook — React adopted it to handle JSX easily.

---

## **Timeline: JavaScript → React → JSX → Babel**

| Year           | Event                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| **1995**       | JavaScript created by Brendan Eich at Netscape.                                                               |
| **2009**       | ECMAScript 5 (ES5) standard released — modern JS starts evolving.                                             |
| **2010–2015**  | ES6/ES2015 and later versions introduce classes, arrow functions, modules, `let`/`const`.                     |
| **2013 (Mar)** | **React** first released internally by Facebook.                                                              |
| **2013 (May)** | React **open-sourced** to the public.                                                                         |
| **2014**       | JSX starts gaining popularity with React examples.                                                            |
| **2014**       | **Babel** launched (originally called “6to5”) — to transpile ES6 → ES5.                                       |
| **2015–2016**  | Babel adds **JSX plugin**, making React JSX widely usable in browsers.                                        |
| **2017+**      | Modern bundlers (Webpack, Parcel, Vite) integrate Babel for JSX and ESNext features.                          |
| **2020+**      | Babel supports latest JS syntax (optional chaining, nullish coalescing, etc.) + JSX remains a React standard. |

---

💡 **Key Takeaways**

- Babel existed **before JSX**, primarily for **modern JS → old JS** compatibility.
- JSX was created by Facebook for React. Babel later added a plugin to **support JSX transpilation**.
- Today, Babel is used for both: **modern JavaScript + JSX**.

---

# ⚛️ **React Components — The Building Blocks of UI**

---

## **1. What are Components in React?**

- A **component** is a **reusable, self-contained piece of UI** — like a button, navbar, or form.
- Think of them as **functions that return UI** (JSX).
- React apps are basically **trees of components** — each handling its own logic and rendering.

💬 Example:

```jsx
function Welcome() {
  return <h1>Hello, Shadow!</h1>;
}
```

> Components let you **split the UI into small, isolated, reusable parts.**

---

## **2. Types of Components**

There are **two main types**:

### 🧩 **A. Functional Components (Modern Standard)**

- **JavaScript functions** that return JSX.
- Can use **React Hooks** (e.g., `useState`, `useEffect`).
- Simpler, faster, and preferred for all new React apps.

💡 Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

✅ **Pros:**

- Clean and easy to read
- Less boilerplate
- Hooks = powerful logic reuse
- Better performance with fewer lifecycle complications

---

### 🧱 **B. Class-based Components (Legacy / Older Style)**

- **ES6 classes** extending `React.Component`.
- Use lifecycle methods like `componentDidMount`, `componentDidUpdate`, etc.
- Before Hooks, this was the only way to manage **state** and **side effects**.

💡 Example:

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

⚠️ **Note:** Class components still work, but **Hooks replaced most of their use cases**.

---

## **3. Component Composition**

🧠 **Concept:**
Composition means **building complex UIs by combining smaller components** — just like Lego blocks.

💬 Example:

```jsx
function Avatar() {
  return <img src="/user.png" alt="User" />;
}

function UserInfo() {
  return (
    <div className="user-info">
      <Avatar />
      <h2>Shadow</h2>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserInfo />
      <p>Welcome to the dashboard!</p>
    </div>
  );
}
```

> Composition = combining multiple smaller components into one larger, more meaningful UI.

✅ **Benefits:**

- Reusability ♻️
- Better maintainability
- Easier debugging & testing
- Cleaner architecture

---

## **4. Summary Table**

| Type            | Definition                            | Can Use Hooks? | Has Lifecycle Methods? | Recommended?        |
| --------------- | ------------------------------------- | -------------- | ---------------------- | ------------------- |
| **Functional**  | JS functions returning JSX            | ✅ Yes         | ⚡ With Hooks          | ✅ **Yes (Modern)** |
| **Class-based** | ES6 classes extending React.Component | ❌ No          | ✅ Yes                 | ⚠️ Legacy only      |

---

# What is XSS (Cross-Site Scripting)?

**XSS** = attacker gets malicious code executed in _someone else’s browser_ by injecting untrusted data into a page.

**Main types (one-liners)**

- **Stored XSS:** attacker’s payload is saved on server (comments, profiles) → many victims.
- **Reflected XSS:** payload in URL/form reflected immediately in response → used in phishing links.
- **DOM XSS:** client-side JS dangerously injects untrusted data into DOM (e.g., `innerHTML` from `location.hash`).

**Quick prevention checklist**

- Escape output by default (`textContent` / framework interpolation)
- Validate & whitelist inputs server-side
- Sanitize any HTML you must render (server preferred; DOMPurify client-side)
- Use `HttpOnly` cookies and a strict `Content-Security-Policy` (CSP)
- Avoid `eval()`, `new Function()`, `innerHTML`, and inline event handlers

---

# JSX auto-sanitization (React) — what it does and when it doesn’t

**Short answer:**
Yes — **React auto-escapes** strings inserted with `{}` in JSX, so interpolated user data is rendered as _text_, not executed HTML/JS.

**Safe (default)**

```jsx
const userInput = "<img src=x onerror=alert('XSS') />";
return <div>{userInput}</div>;
// Renders the literal string "<img src=x onerror=alert('XSS') />"
// — React escapes it, so no script runs.
```

**Unsafe (you opt in)**

```jsx
// VERY DANGEROUS if html comes from untrusted source
return <div dangerouslySetInnerHTML={{ __html: userHtml }} />;
```

`dangerouslySetInnerHTML` injects raw HTML into the DOM **without** escaping. If `userHtml` contains `<script>` or `onerror`, it will run.

**Rules of thumb**

- `{value}` in JSX = safe (React escapes)
- `dangerouslySetInnerHTML` = raw HTML → sanitize first (use DOMPurify or server-side sanitizer)
- Prefer server-side sanitization and CSP + HttpOnly cookies for defense-in-depth

---
