import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Remove a class when the component mounts
    document.body.classList.remove("twocolumn-panel");

    // Retrieve user data from session storage
    const userData = sessionStorage.getItem("authUser");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);

      // Define menus for different users
      if (user.name == "kandy" || user.name == "smith") {
        setMenuItems([
          { id: "Dashboard", label: "Dashboard", icon: "mdi mdi-speedometer", link: "/create-dashboard" },
          { id: "Profile", label: "Profile", icon: "mdi mdi-account-circle", link: "/create-profile" },
          { id: "Income", label: "Income", icon: "mdi mdi-cash-multiple", link: "/create-income" },
          { id: "Liability", label: "Liability", icon: "mdi mdi-bank", link: "/create-liabilities" },
          { id: "Assets", label: "Assets", icon: "mdi mdi-domain", link: "/create-assest" },
          { id: "Networth", label: "Networth", icon: "mdi mdi-scale-balance", link: "/networth" },
          { id: "Rule Of 100", label: "Rule Of 100", icon: "mdi mdi-clipboard-check", link: "/create-planning" },
        ]);
      } else if (user.name == "admin") {
        setMenuItems([
          { id: "Default Parameter", label: "Default Parameter", icon: "mdi mdi-cog", link: "/default-parameter" },
          { id: "Profile List", label: "Profile List", icon: "mdi mdi-account-multiple", link: "/profile-list" },
          { id: "Dashboard", label: "Dashboard", icon: "mdi mdi-speedometer", link: "/create-dashboard" },
        ]);
      }
    }
  }, []);

  return (
    <React.Fragment>
      {menuItems.map((menu) => (
        <div key={menu.id}>
          <i className={menu.icon}></i>
          <a href={menu.link}>{menu.label}</a>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Navdata;
