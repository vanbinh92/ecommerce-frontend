import React, { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import style from "./DefaultLayout.module.css";
import { Link } from "react-router-dom";

export default function DefaultLayout({ children, cartItems,setCartItems }) {
  const [quantity,setQuantity] = useState(0)
  useEffect(() => {
    const getTotal = () => {
      const tt = cartItems?.reduce((prev, item) => {
        return prev + item.quantityProduct;
      }, 0);
      setQuantity(tt);
    };
    getTotal();
  }, [cartItems]);
  return (
    <div>
      <Header setCartItems={setCartItems} />
      <div className={style.container}>
        {children}
        {cartItems?.length > 0 && (
          <div className={style["cart-fixed"]}>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <b>{quantity}</b>
            </Link>
          </div>
        )}
        <div className={style["message-fixed"]}>
          <a href="https://www.messenger.com/t/100791439412241" target="_blank" rel="noreferrer">
            <i className="fa-solid fa-comment"></i>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
