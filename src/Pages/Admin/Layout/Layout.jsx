import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useData } from "../../../Context/UserContext";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import LoadingHome from "../../../Components/LoadingHome";

const Layout = ({ children }) => {
  const { isAuthorized, setisAuthorized, setUser } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/auth");
    }
  }, [isAuthorized]);

  return (
    <div>
      <Navbar />
      <div className="pt-24">{children}</div>
    </div>
  );
};

export default Layout;
