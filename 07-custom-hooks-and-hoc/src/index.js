import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./AppLayout.js";
import "./styles/global.css";
import ErrorPage from "./components/ErrorPage.js";
import ShimmerUI from "./components/ShimmerUI.js";

// 🧩 Lazy load heavy components
const Body = lazy(() => import("./components/Body.js"));
const AboutUs = lazy(() => import("./components/AboutUs.js"));
const MenuContainer = lazy(() => import("./components/MenuContainer.js"));

// 🌀 Simple fallback loader
const Loader = () => (
  <div style={{ textAlign: "center", marginTop: "100px", fontSize: "18px" }}>
    ⏳ Loading...
  </div>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<ShimmerUI />}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loader />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense
            fallback={
              <div style={{ margin: "0px 400px" }}>
                <ShimmerUI />
              </div>
            }
          >
            <MenuContainer />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
