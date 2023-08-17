import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/global.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import OrderManagementPage from "../pages/dashboard/OrderManagementPage";
import CustomerManagementPage from "../pages/dashboard/CustomerManagementPage";
import AuthManagementPage from "../pages/dashboard/AuthManagementPage";

const Routing = () => {
  const lastVisitedPage = localStorage.getItem("lastVisitedPage");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="auth/dashboard/order" element={<OrderManagementPage />} />
        <Route
          path="auth/dashboard/customer"
          element={<CustomerManagementPage />}
        />
        <Route path="auth/dashboard/auth" element={<AuthManagementPage />} />

        {/* redirect if random path */}
        <Route path="*" element={<Navigate to={lastVisitedPage || "/"} />} />
      </Routes>
    </Router>
  );
};

export default Routing;
