import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../GlobalState";
import style from "./ChangePassword.module.css";

function ChangePassword({setLoading}) {
  const state = useContext(GlobalState);
  const user = state.UserAPI.user[0];
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate()
  const updatePassword = {
    password: currentPassword,
    newPassword,
  };
  const updateSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (newPassword !== ConfirmPassword) {
      setLoading(false)
      toast.warning("New Password and Confirm Password does not match.");
      return;
    }
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/account/change/${user.accountId}`,
        updatePassword,
        { headers: { "access-token": "Bearer " + user.accesstoken } }
      );
      setLoading(false)
      toast.success("Update Password successfully", {
        position: toast.POSITION.TOP_CENTER
      });
      nav('/')
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  return (
    <div className={style.container}>
      <div className={style.changepass}>
        <div className={style["changepass-left"]}>
          <div className={style["changepass-left-header"]}>
            <div className={style["changepass-left-avatar"]}>
              <img
                src={
                  user.avatar === null
                    ? "./images/Avatar/avatar.jpg"
                    : `${user.avatar}`
                }
                alt="avatar"
              />
            </div>
            <div className={style["changepass-left-username"]}>
              {user.username}
            </div>
          </div>
          <div className={style["changepass-left-body"]}>
            <div className={style["changepass-left-body-info"]}>
              <i className="fa-solid fa-user"></i>
              <Link to="/profile">My account</Link>
            </div>
            <div className={style["changepass-left-body-changePass"]}>
              <Link to="/changepass">Change Password</Link>
            </div>
          </div>
        </div>
        <div className={style["changepass-right"]}>
          <div className={style["changepass-right-header"]}>
            <h3>Change Password</h3>
            <span>
              To a safe account, please do not share your password with others
            </span>
          </div>
          <div className={style["changepass-right-body"]}>
            <form onSubmit={updateSubmit}>
              <div className={style["changepass-right-body-infomation"]}>
                <div className={style["changepass-right-body-name"]}>
                  Current Password:
                </div>
                <div className={style["changepass-right-body-input"]}>
                  <input
                    type="password"
                    spellCheck="false"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={style["changepass-right-body-infomation"]}>
                <div className={style["changepass-right-body-name"]}>
                  New Password:
                </div>
                <div className={style["changepass-right-body-input"]}>
                  <input
                    type="password"
                    spellCheck="false"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={style["changepass-right-body-infomation"]}>
                <div className={style["changepass-right-body-name"]}>
                  Confirm Password:
                </div>
                <div className={style["changepass-right-body-input"]}>
                  <input
                    type="password"
                    spellCheck="false"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={style["changepass-right-body-infomation"]}>
                <div className={style["changepass-right-body-name"]}></div>
                <div className={style.btn}>
                  <button type="submit" className={style["btn-save"]}>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
