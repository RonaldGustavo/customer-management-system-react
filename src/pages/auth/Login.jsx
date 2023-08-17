import React, { useEffect } from "react";

// components
import LoginForm from "../../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // direct ke last halaman terakir
  useEffect(() => {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    if (lastVisitedPage) {
      // Add a delay before navigating
      setTimeout(() => {
        navigate(lastVisitedPage);
      }, 500); // Delay of 500 milliseconds
    }
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
