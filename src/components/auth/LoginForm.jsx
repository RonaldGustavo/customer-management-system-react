import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//image
import imageBackground from "../../assets/images/login/backgroundLogin.jpeg";
import logoCompany from "../../assets/images/LogoCompany.png";

//Data Dummy Users
import DataUser from "../../data/Datauser";

// alert
import Swal from "sweetalert2";

const LoginForm = () => {
  const [dataUsername, setDataUsername] = useState("");
  const [dataPassword, setDataPassword] = useState("");

  const navigate = useNavigate();

  const AuthUser = localStorage.getItem("authUser");
  useEffect(() => {
    if (AuthUser) {
      navigate("/auth/dashboard/order");
    }
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(DataUser.name);
    const user = DataUser.find(
      (user) => user.username === dataUsername && user.password === dataPassword
    );

    if (user) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Success Login, Welcome ${dataUsername} `,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.setItem("authUser", dataUsername);
        navigate("/auth/dashboard/order");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Invalid username or password",
      });
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={imageBackground}
                      alt="login form"
                      className="img-fluid img-form"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form method="post" onSubmit={handleLogin}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img
                            src={logoCompany}
                            alt="logo-company"
                            className="logo-company"
                          />
                          <span className="h1 fw-bold mb-0">DBO CMS</span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign In
                        </h5>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="inputUsername">
                            Username
                          </label>
                          <input
                            type="text"
                            id="inputUsername"
                            className="form-control form-control-lg"
                            name="username"
                            onChange={(e) => {
                              setDataUsername(e.target.value);
                            }}
                            value={dataUsername}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="inputPassword">
                            Password
                          </label>
                          <input
                            type="password"
                            id="inputPassword"
                            className="form-control form-control-lg"
                            name="password"
                            onChange={(e) => {
                              setDataPassword(e.target.value);
                            }}
                            value={dataPassword}
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "var(--primary-color)" }}
                        >
                          dont have an account?{" "}
                          <Link
                            to="/register"
                            style={{ color: "var(--primary-color)" }}
                          >
                            Register here
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
