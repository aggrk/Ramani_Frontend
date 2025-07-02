import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AppLayout from "./layout/AppLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";
import AuthLayout from "./auth/AuthLayout";
import DashboardLayout from "./dashboard/DashboardLayout";
import Profile from "./dashboard/user/Profile";
import SiteList from "./dashboard/site/SiteList";
import SiteDetails from "./dashboard/site/SiteDetails";
import MyApplications from "./dashboard/application/MyApplications";
import { Toaster } from "react-hot-toast";
import Hardware from "./dashboard/shop/Hardware";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sites" element={<SiteList />} />
          <Route path="sites/:id" element={<SiteDetails />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="hardware" element={<Hardware />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 5000, style: { width: "400px" } }}
      />
    </BrowserRouter>
  );
}
