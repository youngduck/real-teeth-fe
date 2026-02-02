import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFoundPage } from "@pages/not-found/not-found-page";
import HomePage from "@pages/home/home-page";
import WeatherDetailPage from "@pages/weather-detail/weather-detail-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/weather/:address",
    element: <WeatherDetailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
