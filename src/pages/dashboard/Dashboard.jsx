import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import ListDataOrder from "../../components/dashboard/ListDataOrder";

// alert
import Swal from "sweetalert2";

const DashboardPage = () => {
  const AuthUser = localStorage.getItem("authUser");

  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthUser) {
      navigate("/");
    }
  });

  const HandleLogout = () => {
    localStorage.removeItem("authUser");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Success Logout",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  };

  const HandleAddData = () => {
    navigate("/auth/dashboard/adddata");
  };

  return (
    <>
      <div className="container_dashboard">
        <div className="container_wrap">
          <h1 className="heading_dashboard">Welcome! {AuthUser}</h1>
          <button className="btn-logout" onClick={HandleLogout}>
            Logout
          </button>
          <button className="btn-addData" onClick={HandleAddData}>
            Add Data
          </button>
          <ListDataOrder />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
