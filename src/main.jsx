import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import { Toaster } from "sonner";
import MyTrips from "./my-trips/index.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HotelRoutePage from "./view-trip/components/HotelRoutePage.jsx";
import AddTravelLog from "./view-trip/components/AddTravelLog.jsx";
import ViewTravelLogs from "./view-trip/components/ViewTravelLog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },

  {
    path: "/routes",
    element: <HotelRoutePage />,
  },
  { path: "/add-log", element: <AddTravelLog /> },
  { path: "/view-logs", element: <ViewTravelLogs /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
