import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFoundPage } from "@pages/not-found/not-found-page";
import HomePage from "@pages/home/home-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
