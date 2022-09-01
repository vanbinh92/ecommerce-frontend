import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../../GlobalState";
import style from "./Header.module.css";

function Header({setCartItems}) {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;

  const nav = useNavigate();
  const searchRef = useRef(0);
  const handleSearch = () => {
    const value = searchRef.current.value;
    nav(value ? `/search/?query=${value}` : "/search");
    searchRef.current.value = "";
  };
  const user = state.UserAPI.user[0];
  const handleLogout = () => {
    localStorage.clear();
    setCartItems([])
    setIsLogged(false);
    toast.success("Logout successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    nav("/");
  };
  return (
    <div className={style.header}>
      <div className={style["header-container"]}>
        <div className={style.logo}>
          <Link to="/">
            <img src="../../../../images/Logo/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className={style.search}>
          <input
            type="text"
            placeholder="search products..."
            spellCheck={false}
            ref={searchRef}
          />

          <span className={style["btn-search"]} onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </span>
        </div>

        <ul className={style["header-right"]}>
          <li className={style.history}>
            <Link to="/history">
              <i className="fa-solid fa-landmark"></i>
            </Link>
            <Link to="/history" className={style["cart-item"]}>
              History
            </Link>
          </li>
          <li className={style.cart}>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <Link to="/cart" className={style["cart-item"]}>
              Cart
            </Link>
          </li>
          {isLogged ? (
            <li className={style.logged}>
              <Link to="#">
                <img
                  src={
                    user.avatar === null
                      ? "../../../../images/Avatar/avatar.jpg"
                      : `${user.avatar}`
                  }
                  alt="avatar"
                />
              </Link>
              Hi, {user.fullname}
              <div className={style["sub-logged"]}>
                <ul className={style["sub-logged-list"]}>
                  <li className={style["sub-logged-item"]}>
                    <Link to="/profile">My Account</Link>
                  </li>
                  <li
                    className={style["sub-logged-item"]}
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <i className="fa-solid fa-right-to-bracket"></i>
              </Link>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
