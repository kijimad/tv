import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import StatisticsPrint from "../pages/StatisticsPrint";
import Timeline from "../pages/Timeline";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "timeline", element: <Timeline /> },
    ],
  },
  {
    path: "/statistics/report",
    element: <StatisticsPrint />,
  },
]);
