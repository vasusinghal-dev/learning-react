import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AboutUs from "./components/AboutUs.js";
import Body from "./components/Body.js";
import ErrorPage from "./components/ErrorPage.js";
import MenuContainer from "./components/MenuContainer.js";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/restaurant/:resId",
        element: <MenuContainer />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
