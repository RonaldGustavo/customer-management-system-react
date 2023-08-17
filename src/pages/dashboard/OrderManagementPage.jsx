import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Navbar from "../../components/dashboard/Layout/Navbar";
import Aside from "../../components/dashboard/Layout/Aside";
import OrderDataComponent from "../../components/dashboard/orderManagement/OrderComponent";

const OrderManagementPage = () => {
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
              <OrderDataComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderManagementPage;
