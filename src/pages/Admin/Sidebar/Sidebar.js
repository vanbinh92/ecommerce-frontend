import React, { useContext } from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import CategoryIcon from "@mui/icons-material/Category";
// import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { Link, useNavigate } from "react-router-dom";
import style from "./Sidebar.module.css";
import { GlobalState } from "../../../GlobalState";
import { toast } from "react-toastify";

function Sidebar() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLogged(false);
    toast.success("Logout successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    nav("/");
  };
  return (
    <div className={style.main}>
      <div className={style.sidebar}>
        <ul>
          <p className={style.title}>MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              {/* <DashboardIcon className={style.icon} /> */}
              <span>Dashboard</span>
            </li>
          </Link>
          <p className={style.title}>LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              {/* <PersonOutlineIcon className={style.icon} /> */}
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <li>
              {/* <StoreIcon className={style.icon} /> */}
              <span>Products</span>
            </li>
          </Link>
          <Link to="/admin/category" style={{ textDecoration: "none" }}>
            <li>
              {/* <CategoryIcon className={style.icon} /> */}
              <span>Category</span>
            </li>
          </Link>
          <Link to="/admin/manufacture" style={{ textDecoration: "none" }}>
            <li>
              {/* <PrecisionManufacturingIcon className={style.icon} /> */}
              <span>Manufacture</span>
            </li>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <li>
              {/* <CreditCardIcon className={style.icon} /> */}
              <span>Orders</span>
            </li>
          </Link>

          <p className={style.title}>USER</p>
          <li>
            {/* <ExitToAppIcon className={style.icon} /> */}
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
