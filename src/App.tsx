import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Show from "./pages/Show";
import New from "./pages/New";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":id",
        element: <Show />,
      },
      {
        path: "new",
        element: <New />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
