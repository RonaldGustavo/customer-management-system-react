import React, { useEffect } from "react";

// components
import RegisterForm from "../../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const AuthUser = localStorage.getItem("authUser");

  // direct ke last halaman terakir
  useEffect(() => {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    if (lastVisitedPage && AuthUser) {
      // Add a delay before navigating
      setTimeout(() => {
        navigate(lastVisitedPage);
      }, 500); // Delay of 500 milliseconds
    }
  }, []);
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
