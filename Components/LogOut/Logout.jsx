import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  localStorage.removeItem("email");
  navigate("/");

  return null;
};

export default Logout;