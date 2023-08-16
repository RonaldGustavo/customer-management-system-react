import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/dashboard/Layout/Navbar";
import Aside from "../../components/dashboard/Layout/Aside";
import Content from "../../components/dashboard/Layout/Content";

const DashboardPage = () => {
  const AuthUser = localStorage.getItem("authUser");
  const [isAsideOpen, setIsAsideOpen] = useState(true); // State untuk mengontrol keadaan Aside
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthUser) {
      navigate("/");
    }
  }, [AuthUser, navigate]);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <>
      <div className={`container_dashboard ${isAsideOpen ? "aside-open" : ""}`}>
        <div className="container_wrap">
          <Navbar username={AuthUser} onToggleAside={toggleAside} />
          <div className="row">
            {/* Memeriksa apakah Aside seharusnya muncul */}
            {isAsideOpen && (
              <div className="col-lg-2 ">
                <Aside />
              </div>
            )}
            <div className={`col-lg-10 col-sm-12 ${isAsideOpen ? "aside-open" : ""}`}>
              <Content />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
