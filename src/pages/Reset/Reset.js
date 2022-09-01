import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import style from "./Reset.module.css";

function Reset({setLoading}) {
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTempToken, setIsTempToken] = useState(true);
  const param = useParams().tempToken;
  const tokenAccount = JSON.parse(localStorage.getItem("tempToken"));
  const nav = useNavigate();

  if (param !== tokenAccount.tempToken) {
    setIsTempToken(false);
  }

  const handlerSubmit = async () => {
    setLoading(true)
    if (password !== confirmPassword) {
      setLoading(false)
      toast.error("Password and Confirm Password does not match.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    
    const newPwd = {
      newPassword: password,
    };

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/account/reset_password/${tokenAccount.accountId}`,
        {
          ...newPwd,
        }
      );
      setLoading(false)
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/login");
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      {isTempToken ? (
        <div className={style.reset}>
          <div className={style["reset-container"]}>
            <div className={style["reset-head"]}>
              <div className={style["reset-head-title"]}>
                <h3>Reset Password</h3>
              </div>
              <div className={style["reset-head-description"]}>
                <p>Enter a new password for BK shop</p>
              </div>
            </div>

            <div className={style["reset-body"]}>
              <div className={style["reset-body-input"]}>
                <input
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  spellCheck="false"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={style["reset-body"]}>
              <div className={style["reset-body-input"]}>
                <input
                  value={confirmPassword}
                  type="password"
                  placeholder="Confirm your password"
                  spellCheck="false"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={style["reset-btn"]}>
              <button type="submit" onClick={handlerSubmit}>
                Reset Password
              </button>
            </div>
            <div className={style["reset-back-login"]}>
              <div className={style["reset-back-icon"]}>
                <Link to="/login">
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </div>
              <Link to="/login">Back to login</Link>
            </div>
          </div>
        </div>
      ) : (
        <ForgotPassword isTempToken={isTempToken} />
      )}
    </div>
  );
}
export default Reset;
