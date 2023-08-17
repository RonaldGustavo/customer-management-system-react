import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Navbar from "../../components/dashboard/Layout/Navbar";
import Aside from "../../components/dashboard/Layout/Aside";
import CustomerComponent from "../../components/dashboard/customerManagement/CustomerComponent";

const CustomerManagementPage = () => {
  const AuthUser = localStorage.getItem("authUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthUser) {
      navigate("/");
    }
    localStorage.setItem("lastVisitedPage", window.location.pathname);
  }, [AuthUser, navigate]);

  return (
    <>
      <div className="container_dashboard">
        <div className="container_wrap">
          <Navbar username={AuthUser} />
          <div className="row">
            <div className="col-lg-2 ">
              <Aside />
            </div>

            <div className="col-lg-10 col-sm-12">
              <CustomerComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerManagementPage;
