import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFoundPage } from "@pages/not-found/not-found-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
