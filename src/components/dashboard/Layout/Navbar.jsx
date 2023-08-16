import React from "react";
import logoCompany from "../../../assets/images/LogoCompany.png";

// alert
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

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
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-header">
        <div className="container-fluid">
          <img src={logoCompany} className="logoNavbar" />
          <a className="navbar-brand" href="#">
            DBO CMS
          </a>
          <div className="navbar-text ms-auto">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {props.username}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <a className="dropdown-item" onClick={HandleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
