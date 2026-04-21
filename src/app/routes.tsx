import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Pricing from "./pages/Pricing";

function Root() {
  return (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "listings", Component: Listings },
      { path: "listings/:id", Component: ListingDetail },
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "pricing", Component: Pricing },
    ],
  },
]);