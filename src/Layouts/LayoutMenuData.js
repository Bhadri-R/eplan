import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userData = sessionStorage.getItem("authUser");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
  }, [history, iscurrentState]);

  let menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: "mdi mdi-speedometer", link: "/dashboard" },
    { id: "Profile", label: "Profile", icon: "mdi mdi-account-circle", link: "/create-profile" },
    { id: "Income", label: "Income", icon: "mdi mdi-cash-multiple", link: "/create-income" },
    { id: "Liability", label: "Liability", icon: "mdi mdi-bank", link: "/create-liabilities" },
    { id: "Assets", label: "Assets", icon: "mdi mdi-domain", link: "/create-assets" },
    { id: "Networth", label: "Networth", icon: "mdi mdi-scale-balance", link: "/networth" },
    { id: "Rule Of 100", label: "Rule Of 100", icon: "mdi mdi-clipboard-check", link: "/rule-of-hundred"},
  ];
  if (userRole === "Admin") {
    menuItems = [
      { id: "Dashboard", label: "Dashboard", icon: "mdi mdi-speedometer", link: "/dashboard" },
      { id: "Default Parameter", label: "Default Parameter", icon: "mdi mdi-cog", link: "/default-parameter" },
      { id: "Profile List", label: "Profile List", icon: "mdi mdi-account-multiple", link: "/profile-list" },
    ];
  }

  return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;
