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
import Products from "./dashboard/shop/Products";
import ProductDetails from "./dashboard/shop/ProductDetails";
import Cart from "./dashboard/cart/Cart";
import UpdateProfile from "./dashboard/user/UpdateProfile";
import AddSite from "./dashboard/site/AddSite";
import EditSite from "./dashboard/site/EditSite";
import ReceivedApplications from "./dashboard/site/ReceivedApplications";
import SettingsLayout from "./dashboard/settings/SettingsLayout";
import Notifications from "./dashboard/settings/Notifications";
import UpdatePassword from "./dashboard/user/UpdatePassword";
import UpdateAccountDetails from "./dashboard/settings/UpdateAccountDetails";
import ApprovedApplications from "./dashboard/application/ApprovedApplications";
import PendingApplications from "./dashboard/application/PendingApplications";
import RejectedApplications from "./dashboard/application/RejectedApplications";
import MyShops from "./dashboard/hardware/MyShops";
import UsersList from "./dashboard/admin/UsersList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="update/:field" element={<UpdateProfile />} />
          </Route>
          <Route path="sites">
            <Route index element={<SiteList />} />
            <Route path=":id">
              <Route index element={<SiteDetails />} />
              <Route path="edit-site" element={<EditSite />} />
            </Route>
          </Route>
          <Route path="applications" element={<MyApplications />} />
          <Route
            path="approved-applications"
            element={<ApprovedApplications />}
          />
          <Route
            path="pending-applications"
            element={<PendingApplications />}
          />
          <Route
            path="rejected-applications"
            element={<RejectedApplications />}
          />
          <Route
            path="received-applications"
            element={<ReceivedApplications />}
          />
          <Route path="users" element={<UsersList />} />
          <Route path="add-site" element={<AddSite />} />
          <Route path="hardware">
            <Route index element={<Hardware />} />
            <Route path=":id">
              <Route path="products" element={<Products />} />
              <Route path="products/:productId" element={<ProductDetails />} />
            </Route>
          </Route>
          <Route path="my-shops" element={<MyShops />} />
          <Route path="cart" element={<Cart />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<UpdateAccountDetails />} />
            <Route path="change-password" element={<UpdatePassword />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
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
