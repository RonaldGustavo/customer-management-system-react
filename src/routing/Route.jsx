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
import DashboardPage from "../pages/dashboard/Dashboard";
import EditDataOrder from "../components/dashboard/EditDataOrder";
import AddDataOrder from "../components/dashboard/AddDataOrder";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="auth/dashboard" element={<DashboardPage />} />
        <Route
          path="auth/dashboard/editdata/:dataid"
          element={<EditDataOrder />}
        />
        <Route path="auth/dashboard/adddata" element={<AddDataOrder />} />

        {/* redirect automatic to "/" if random path */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Routing;
