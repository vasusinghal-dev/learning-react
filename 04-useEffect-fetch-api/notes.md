# **React & Web Architecture Notes**

---

### 1️⃣ **Monolith Architecture**

**What it is:**
A **single, unified codebase** where all modules (auth, UI, DB access, business logic, etc.) live together, deployed as one unit.

**Think of it like:**
A big restaurant where the chef, waiter, cashier, and dishwasher all work in one kitchen — tightly coordinated, but if the stove breaks, _nobody’s eating_.

**Pros:**

- ✅ Easier to develop initially — one project, one deploy.
- ✅ Simpler debugging (everything in one place).
- ✅ Shared memory = faster internal function calls.
- ✅ Easier to test and maintain consistency.

**Cons:**

- ❌ Hard to scale specific parts (you scale _everything_ even if only one feature needs it).
- ❌ Slower deployments — a small change means redeploying the entire app.
- ❌ Tight coupling — one bug can crash the whole system.
- ❌ Hard for big teams — merge hell, dependency chaos.

---

### 🧩 **Microservices Architecture**

**What it is:**
The app is broken into **independent services** — each handles a specific business function and communicates with others via APIs.

**Think of it like:**
A food court — each stall (auth service, payment service, etc.) runs independently. If the pizza stall breaks, the burger one still sells fries.

**Pros:**

- ✅ Scalability — scale only the services that need it.
- ✅ Independent deployment — update one service without touching others.
- ✅ Fault isolation — one crash doesn’t kill the whole system.
- ✅ Perfect for large, distributed teams.

**Cons:**

- ❌ More complex — multiple deployments, service discovery, and network overhead.
- ❌ Data consistency issues (eventual consistency).
- ❌ DevOps overhead — logging, monitoring, CI/CD for each service.
- ❌ Inter-service communication adds latency and failure points.

---

### 🥊 Monolith vs Microservices

| Aspect            | Monolith                    | Microservices           |
| ----------------- | --------------------------- | ----------------------- |
| **Structure**     | Single codebase             | Multiple small services |
| **Scaling**       | Whole app                   | Per service             |
| **Deployment**    | One unit                    | Independent             |
| **Communication** | In-memory                   | API/network             |
| **Best for**      | Small/medium apps, startups | Large, complex systems  |
| **Team size**     | Small                       | Large, distributed      |

---

## **2️⃣ CORS (Cross-Origin Resource Sharing)**

**Definition:**

- Browser security mechanism controlling cross-origin HTTP requests
- Origin = `protocol://domain:port`
- Enforces **Same-Origin Policy (SOP)**

**Why it exists:**

- Prevents malicious scripts from reading data from other origins
- Servers can **opt-in** safely for cross-origin requests

**How it works:**

1. Browser sends request with `Origin` header
2. Server responds with `Access-Control-Allow-Origin`

   - Allowed → browser accepts
   - Not allowed → browser blocks (CORS error)

**Preflight Requests:**

- Some requests (POST with custom headers) trigger `OPTIONS` request first
- Server must respond with allowed methods/headers

**React Example:**

```js
fetch("https://api.example.com/data")
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
```

**Node/Express Backend Example:**

```js
const cors = require("cors");
app.use(cors({ origin: "https://myapp.com" }));
```

---

## **3️⃣ API (Application Programming Interface)**

**Definition:**

An **API (Application Programming Interface)** is a set of rules that allows **different software applications to communicate** with each other.

💡 **Analogy:**
Think of it like a **restaurant menu**: you place an order (request), the kitchen (server) prepares the dish (response), and you get your food — **without needing to know how the kitchen works**.

---

### **Key Concepts**

| Term         | Meaning                                                                     |
| ------------ | --------------------------------------------------------------------------- |
| **Endpoint** | Specific URL you call to get data or perform actions                        |
| **Method**   | HTTP action: `GET` (fetch), `POST` (send), `PUT`/`PATCH` (update), `DELETE` |
| **Request**  | May include headers (auth, content type) and body (for POST/PUT)            |
| **Response** | Usually JSON data your frontend can use                                     |

---

### **Fetch Data from API (Default GET)**

```js
// Simple GET request (default)
fetch("https://api.example.com/restaurants")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

**Notes:**

- `fetch()` **defaults to GET** — no need to specify `method: "GET"` unless you want to be explicit.
- GET requests **retrieve data only**.
- To send or modify data, you must explicitly set `method` and usually a `body`.

---

### **Example: POST Request**

```js
fetch("https://api.example.com/restaurants", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "New Restaurant" }),
});
```

---

### **How it fits in React**

- Often used with **state (`useState`)** and **effects (`useEffect`)** to fetch and render dynamic data.
- Combined with **CORS** settings on the server, APIs allow safe cross-origin data fetching.

**Analogy:**

- Frontend = waiter
- API = menu + ordering system
- Backend = kitchen
- You never touch the kitchen directly; you just call the API (menu).

---

## **4️⃣ useEffect Hook**

**What it is:**

- React hook for **side effects** in functional components
- Runs **after render**
- Replace lifecycle methods like `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`

**Syntax:**

```jsx
useEffect(() => {
  // effect code here
  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
```

**Examples:**

1. **Run once after mount**

```jsx
useEffect(() => {
  console.log("Component mounted");
}, []);
```

2. **Run on state/prop change**

```jsx
useEffect(() => {
  console.log("Count updated:", count);
}, [count]);
```

3. **Cleanup example**

```jsx
useEffect(() => {
  const interval = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(interval);
}, []);
```

---

## **5️⃣ Fetching API Data**

**Using `fetch` inside `useEffect`:**

```jsx
import { useState, useEffect } from "react";

const RestaurantList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.example.com/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []); // run once after mount

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

**Key points:**

- `useEffect` avoids running fetch on every render
- Always handle loading state
- Provide **keys** when rendering lists

---

## **6️⃣ Conditional Rendering**

**Purpose:** Render UI **based on state or props**

**Example:**

```jsx
const UserGreeting = ({ isLoggedIn }) => {
  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in</h1>}</div>
  );
};
```

**Other ways:**

- `&&` operator: `{isLoggedIn && <p>Profile info</p>}`
- Ternary operator: `{condition ? <A /> : <B />}`
- Early return:

```jsx
if (!isLoggedIn) return <LoginForm />;
return <Dashboard />;
```

---
