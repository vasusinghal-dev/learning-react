# 🧠 **React Router DOM (RRD) – Complete Notes**

---

## 1️⃣ **What is React Router DOM?**

- **React Router DOM (RRD)** is a library for **client-side routing** in React web apps.
- Allows mapping **URL paths → React components** without full page reloads (SPA behavior).
- Supports **nested routes, dynamic routes, route parameters, loaders, error boundaries, and navigation**.

**Why use it?**

- React alone doesn’t manage URLs or browser history.
- Makes **single-page apps behave like multi-page apps**.
- Supports **nested layouts, protected routes, and route-based data fetching**.

---

## 2️⃣ **Core Concepts**

| Concept         | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| Route           | Maps a path (`/about`) to a React component (`<About />`)   |
| Nested Routes   | Routes inside a parent route (`/dashboard/settings`)        |
| Outlet          | Placeholder in a layout component where child routes render |
| Link            | React-friendly navigation (`<Link>` replaces `<a>` for SPA) |
| Navigate        | Programmatic navigation (e.g., after a form submit)         |
| useParams       | Hook to get dynamic route parameters (`/user/:id`)          |
| useSearchParams | Hook to get URL query parameters (`?sort=asc`)              |
| useLocation     | Hook to get current location object                         |
| useRouteError   | Hook to get route error in `errorElement`                   |

---

## 3️⃣ **Ways to Define Routes**

### **1. `useRoutes` (array of objects)**

```jsx
import { useRoutes } from "react-router";

const routes = [
  { path: "/", element: <Home /> },
  { path: "about", element: <About /> },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "settings", element: <Settings /> },
    ],
  },
];

export default function App() {
  return useRoutes(routes);
}
```

- **Pros:** Dynamic route definitions, easy for nested routes.

---

### **2. JSX `<Routes>` + `<Route>`**

```jsx
import { Routes, Route } from "react-router";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/dashboard/*" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>;
```

- **Must add `/*`** on parent route to match nested children.
- **Pros:** Declarative and readable.

---

### **3. `createBrowserRouter` + `RouterProvider` (v7)**

```jsx
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "about", element: <About /> },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

- **Pros:** Cleaner for large apps, supports **loaders, actions, errorElements**.
- No need for `/*` in parent route.

---

## 4️⃣ **Nested Routes and Layouts**

- Use **`<Outlet />`** in parent layouts:

```jsx
import { Outlet, Link } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

- Children render automatically inside `<Outlet />`.

---

## 5️⃣ **Routing Hooks**

| Hook                | Usage                                                |
| ------------------- | ---------------------------------------------------- |
| `useParams()`       | Get dynamic route params `/user/:id` → `{id: '123'}` |
| `useSearchParams()` | Read/write URL query parameters                      |
| `useLocation()`     | Get current location object (`pathname`, `search`)   |
| `useNavigate()`     | Navigate programmatically (`navigate("/home")`)      |
| `useRoutes()`       | Convert route config array to element                |
| `useRouteError()`   | Access route error inside `errorElement`             |

---

## 6️⃣ **Error Handling**

- **`errorElement`** → route-level fallback for loader/action errors.
- **ErrorBoundary** → React-level rendering errors.

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ path: "about", element: <About /> }],
  },
]);
```

- `errorElement` works **within its route subtree**.
- Root-level `errorElement` can catch unmatched routes.

---

## 7️⃣ Route-based Code Splitting (Lazy + Suspense)

### `React.lazy()`

- Dynamically loads component **only when needed**
- Reduces initial bundle size → faster app load

```js
import { lazy } from "react";

const About = lazy(() => import("./About"));
```

### `Suspense`

- Wraps lazy components to handle **loading state**
- `fallback` = UI shown while lazy component loads

```jsx
import { Suspense } from "react";

<Suspense fallback={<div>Loading...</div>}>
  <About />
</Suspense>;
```

### Key Points

- Lazy → defer loading component
- Suspense → handle waiting UI
- Fallback → what user sees while loading

---

### Using Lazy + Suspense with `<Routes>` / `<Route>`

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const DashboardHome = lazy(() => import("./DashboardHome"));
const Settings = lazy(() => import("./Settings"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
```

---

### Using Lazy + Suspense with `createBrowserRouter` + `RouterProvider`

```jsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const DashboardLayout = lazy(() => import("./DashboardLayout"));
const DashboardHome = lazy(() => import("./DashboardHome"));
const Settings = lazy(() => import("./Settings"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading Home...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<div>Loading About...</div>}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Dashboard Home...</div>}>
            <DashboardHome />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<div>Loading Settings...</div>}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## 8️⃣ 🧩 **`<a>` vs `<Link>` vs `<NavLink>` in React Router**

---

### 1️⃣ `<a>` — The Traditional HTML Anchor

**Behavior:**

- Reloads the entire page when clicked.
- Browser makes a **new request** to the server.
- React app **loses all state** and rerenders from scratch.

**Use Case:**
✅ External links (GitHub, Docs, PDFs, etc.)

**Example:**

```jsx
<a href="https://github.com" target="_blank" rel="noreferrer">
  GitHub
</a>
```

**❌ Don’t use** `<a href="/about">About</a>` for internal routes in React — it’ll kill your SPA performance.

---

### 2️⃣ `<Link>` ⚛️ — The React Router Workhorse

**Behavior:**

- Prevents page reload.
- Updates the URL **client-side**.
- React Router handles the route change — **no network request**.
- Keeps React app, state, and data in memory.

**Use Case:**
✅ Internal navigation within your React app (e.g., `/home`, `/dashboard`, `/settings`)

**Example:**

```jsx
import { Link } from "react-router-dom";

<Link to="/dashboard">Dashboard</Link>;
```

**Flow:**

- Click → React Router intercepts → renders `<Dashboard />` instantly → smooth SPA experience.

---

### 3️⃣ `<NavLink>` 🧭 — The Smart `<Link>`

**Behavior:**

- Works just like `<Link>`, **but** it also lets you **detect if the link is active**.
- Automatically adds an `active` class or lets you style active links conditionally.

**Use Case:**
✅ Navigation menus, sidebars, headers, where you want the current page highlighted.

**Example:**

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/dashboard"
  className={({ isActive }) => (isActive ? "active-link" : "")}
>
  Dashboard
</NavLink>;
```

**Flow:**

- If current URL = `/dashboard` → adds `"active-link"` class.
- Useful for auto-styling active menu items.

---

## ⚡ TL;DR Comparison Table

| Tag         | Reloads Page? | Keeps State? | Detects Active? | Typical Use Case |
| ----------- | ------------- | ------------ | --------------- | ---------------- |
| `<a>`       | ✅ Yes        | ❌ No        | ❌ No           | External links   |
| `<Link>`    | ❌ No         | ✅ Yes       | ❌ No           | Internal routes  |
| `<NavLink>` | ❌ No         | ✅ Yes       | ✅ Yes          | Navigation menus |

---

# ⚔️ Client-Side Routing vs Server-Side Routing

| Feature                  | **Server-Side Routing**                                                                                          | **Client-Side Routing**                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Who handles routing?** | 🧱 The **server** (e.g., Express, Apache, Django)                                                                | ⚛️ The **browser + JS framework** (React, Vue, etc.)                                                               |
| **How it works**         | Each time you click a link → browser sends an HTTP request to the server → server responds with a new HTML page. | The app loads **once** → subsequent navigation is handled **inside the browser** using JS and the **History API**. |
| **Page reloads?**        | 🔁 Yes — full reload every navigation.                                                                           | 🚫 No — content swaps dynamically.                                                                                 |
| **Speed**                | ⏳ Slower (network + render time for every route).                                                               | ⚡ Faster (only updates part of the UI).                                                                           |
| **SEO (Search Engines)** | 🟢 Excellent by default (every page has its own HTML).                                                           | ⚠️ Needs extra setup (SSR or pre-rendering) for SEO.                                                               |
| **Initial Load**         | ⚡ Fast first load, since only one page is fetched.                                                              | 🐢 Slightly slower first load (loads full JS bundle).                                                              |
| **Browser History**      | Managed by the browser naturally.                                                                                | Managed by React Router via the **History API** (`pushState`, `popState`).                                         |
| **Example**              | `https://example.com/about` → request → new HTML page from server.                                               | `/about` → React Router renders `<About />` instantly in browser.                                                  |

---
