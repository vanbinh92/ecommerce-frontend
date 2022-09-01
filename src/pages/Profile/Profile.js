import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import style from "./Profile.module.css";
import FormData from "form-data";
import { toast } from "react-toastify";

function Profile({setLoading}) {
  const state = useContext(GlobalState);
  const [user, setUser] = state.UserAPI.user;
  
  const nav = useNavigate();
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    setFullname(user.fullname);
    setAddress(user.address);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);
  const newUser = {
    fullname: fullname,
    address,
    email,
    phone,
  };
  const updateSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/user/${user.accountId}/updateInfor/`,
        newUser,
        { headers: { "access-token": "Bearer " + user.accesstoken } }
      );
      setLoading(false)
      setUser({...user,fullname,address})
      toast.success("Update successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/profile");
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const uploadImage = () => {
    document.getElementById("update-img").click();
  };

  const changeImage = async (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const updateAvatar = async () => {
        let newAvatar = new FormData();

        newAvatar.append("file", file);
        try {
          const { data } = await axios.put(
            `${process.env.REACT_APP_SERVER_URL}/user/upload/${user.userId}/users`,
            newAvatar,
            {
              headers: {
                "Content-Type": `multipart/form-data; boundary=${newAvatar._boundary}`,
                accept: "application/json",
              },
            }
          );
          setUser({ ...user, avatar: data.avatar });
          toast.success("Update successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      updateAvatar();
    }
  }, [file]);
  return (
    <div className={style.container}>
      <div className={style.profile}>
        <div className={style["profile-left"]}>
          <div className={style["profile-left-header"]}>
            <div className={style["profile-left-avatar"]}>
              <img
                src={
                  user.avatar === null
                    ? "../../../../images/Avatar/avatar.jpg"
                    : `${user.avatar}`
                }
                alt="avatar"
              />
            </div>
            <div className={style["profile-left-username"]}>
              {user.fullname}
            </div>
          </div>
          <div className={style["profile-left-body"]}>
            <div className={style["profile-left-body-info"]}>
              <i className="fa-solid fa-user"></i>
              <span>My account</span>
            </div>
            <div className={style["profile-left-body-changePass"]}>
              <Link to="/changepass">Change Password</Link>
            </div>
          </div>
        </div>
        <div className={style["profile-right"]}>
          <div className={style["profile-right-header"]}>
            <h3>My profile</h3>
            <span>Manage profile information for account security</span>
          </div>
          <div className={style["profile-right-body"]}>
            <div className={style["profile-right-body-left"]}>
              <form onSubmit={updateSubmit}>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>
                    Username:
                  </div>
                  <div className={style["profile-right-body-info"]}>
                    {user.username}
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>
                    Fullname:
                  </div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      type="text"
                      spellCheck="false"
                      value={fullname||""}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>
                    Address:
                  </div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      type="text"
                      spellCheck="false"
                      value={address||""}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>Email:</div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      disabled
                      type="text"
                      spellCheck="false"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>Phone:</div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      disabled
                      type="text"
                      spellCheck="false"
                      value={phone||""}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style.btn}>
                  <button type="submit" className={style["btn-save"]}>
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className={style["profile-right-body-right"]}>
              <div className={style["profile-right-body-file"]}>
                <input
                  type="file"
                  id="update-img"
                  accept=".jpg,.jpeg,.png"
                  name="file"
                  onChange={changeImage}
                />
                <img
                  src={
                    user.avatar === null
                      ? "../../../../images/Avatar/avatar.jpg"
                      : `${user.avatar}`
                  }
                  alt="avatar"
                />
                <button
                  className={style["select-img"]}
                  type="button"
                  onClick={uploadImage}
                >
                  Select Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
