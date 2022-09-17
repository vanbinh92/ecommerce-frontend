import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Category.module.css";

function CategoryProduct({ categoryList }) {
  const [scroll, setScroll] = useState(false);
  const [isClick, setIsClick] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 106) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, [scroll]);
  
  const handleClick = () => {
    setIsClick(!isClick);
  };
  return (
    <div
      className={
        scroll
          ? `l-10 ${style["scroll-header-menu"]}`
          : `l-10 ${style["header-menu"]}`
      }
    >
      <div className="row no-gutters">
        <div className={style.menu}>
          <div
            className={style["menu-left"]}
            onClick={() => {
              handleClick();
            }}
          >
            <i className="fas fa-bars"></i>
            Category
          </div>
          <div
            className={
              // scroll ? `${style["menu-nav-none"]}` : `${style["menu-nav"]}`
              scroll && isClick
                ? `${style["menu-nav"]}`
                : scroll
                ? `${style["menu-nav-none"]}`
                : `${style["menu-nav"]}`
            }
          >
            <ul className={style["menu-list"]}>
              {categoryList.length > 0
                ? categoryList.map((item) => (
                    <li className={style["menu-item"]} key={item.id}>
                      {item.name === "Laptop" && (
                        <img src={`./images/Icon/laptop.png`} alt="icon" />
                      )}
                      {item.name === "Apple Center" && (
                        <img src={`./images/Icon/apple.png`} alt="icon" />
                      )}
                      {item.name === "Monitors" && (
                        <img src={`./images/Icon/monitor.png`} alt="icon" />
                      )}
                      <Link to={`/category/${item.id}`}>{item.name}</Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
