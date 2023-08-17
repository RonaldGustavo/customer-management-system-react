import React from "react";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const navigate = useNavigate();

  return (
    <div className="aside">
      <ul className="menu-list">
        <li className="menu-item">
          <p
            onClick={() => {
              navigate("/auth/dashboard/order");
            }}
            id="menu_order"
          >
            Order Management
          </p>
        </li>
        <li className="menu-item">
          <p
            onClick={() => {
              navigate("/auth/dashboard/customer");
            }}
            id="menu_customer"
          >
            Customer Management
          </p>
        </li>
        <li className="menu-item">
          <p
            onClick={() => {
              navigate("/auth/dashboard/auth");
            }}
            id="menu_auth"
          >
            Auth Management
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Aside;
