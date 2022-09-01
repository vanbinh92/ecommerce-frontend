import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./ForgotPassword.module.css";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword({ isTempToken,setLoading }) {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handlerSubmit = async () => {
    setLoading(true)
    const dataSend = {
      email: email,
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/account/forgot_password`,
        dataSend
      );
      const tempToken = {
        tempToken:data.tempToken,
        accountId:data.accountId
      }
      localStorage.setItem("tempToken", JSON.stringify(tempToken));
      setIsSubmit(true);
      setLoading(false)
      toast.warning("A link has been sent to your email", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  return (
    <div className={style.forgot}>
      <div className={style["forgot-container"]}>
        <div className={style["forgot-head"]}>
          <div className={style["forgot-head-title"]}>
            <h3>Forgot Password</h3>
          </div>
          {isTempToken === false && (
            <div className={style.token}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>Your password reset link has expired or not exist</p>
            </div>
          )}
          {isSubmit && (
            <div className={style["forgot-head-send"]}>
              <p>A link has been sent to your email</p>
            </div>
          )}
          {!isSubmit && (
            <div className={style["forgot-head-description"]}>
              <p>No worries. We'll send you a link to reset you password</p>
            </div>
          )}
        </div>

        <div className={style["forgot-body"]}>
          <div className={style["forgot-body-input"]}>
            <input
              value={email}
              type="text"
              placeholder="Enter your email"
              spellCheck="false"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={style["forgot-btn"]}>
          <button type="submit" onClick={handlerSubmit}>
            Reset Password
          </button>
        </div>
        <div className={style["forgot-back-login"]}>
          <div className={style["forgot-back-icon"]}>
            <Link to="/login">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
