import React, { useEffect } from "react";

// components
import RegisterForm from "../../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  // direct ke last halaman terakir
  useEffect(() => {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    if (lastVisitedPage) {
      navigate(lastVisitedPage);
    }
  });
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
