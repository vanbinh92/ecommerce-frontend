import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={`${style.footer}`}>
      <div className="row no-gutters ">
        <div className={`${style["footer-col"]} col l-3 m-6 c-12`}>
          <h3 className={style["f-title"]}>General information</h3>
          <ul className={style["f-list"]}>
            <li>
              <Link to="#">Introduce about BK Tenology</Link>
            </li>
            <li>
              <Link to="#">Recruitment</Link>
            </li>
            <li>
              <Link to="#">News</Link>
            </li>
            <li>
              <Link to="#">Promotion information</Link>
            </li>
          </ul>
        </div>
        <div className={`${style["footer-col"]} col l-3 m-6 c-12`}>
          <h3 className={style["f-title"]}>Customer support</h3>
          <ul className={style["f-list"]}>
            <li>
              <Link to="#">Learn about installment purchase</Link>
            </li>
            <li>
              <Link to="#">Shipping Policy</Link>
            </li>
            <li>
              <Link to="#">Warranty Policy</Link>
            </li>
            <li>
              <Link to="#">Exchange policy</Link>
            </li>
          </ul>
        </div>
        <div className={`${style["footer-col"]} col l-3 m-6 c-12`}>
          <h3 className={style["f-title"]}>BK Danang</h3>
          <div className="f-info">
            <div className={style["f-info-item"]}>
              <strong>Working time: </strong>
              <span>07h30 - 20h30</span>
            </div>
            <div className={style["f-info-item"]}>
              <strong>Showroom: </strong>
              <span>152 Ham Nghi, Thanh Khue District, Da Nang</span>
            </div>
            <div className={style["f-info-item"]}>
              <strong>Tell: </strong>
              <span>(0236) 3 888 000</span>
            </div>
            <div className={style["f-info-item"]}>
              <strong>Email: </strong>
              <span>danang@bk.com.vn</span>
            </div>
          </div>
        </div>
        <div className={`${style["footer-col"]} col l-3 m-6 c-12`}>
          <h3 className={style["f-title"]}>Customer care</h3>
          <div className="f-info">
            <div className={style["f-info-item"]}>
              <strong>Service and Repair Center: </strong>
              <span>3rd floor - 152 Ham Nghi, Da Nang </span>
            </div>
            <div className={style["f-info-item"]}>
              <strong>Call for repair: </strong>
              <span>(0236)3 655 000</span>
            </div>
            <div className={style["f-info-item"]}>
              <strong>Tell: </strong>
              <span>(0236) 3 888 000</span>
            </div>
            <div className={style["f-info-item"]}>
              <strong>Technical call: </strong>
              <span>(0236)3 872 000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
