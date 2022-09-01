import React, { useEffect, useState } from "react";
import style from "./New.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ViewUser({ title, isFile, setLoading }) {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const id = useParams().id;
  const nav = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/user/${id}/getInfor/admin`,
          {
            headers: {
              "access-token":
                "Bearer " +
                JSON.parse(localStorage.getItem("login")).accesstoken,
            },
          }
        );

        if (data.User) {
          setUsername(data.User["account.username"]);
          setFullName(data.User.fullName);
          setAddress(data.User.address);
          setEmail(data.User.email);
          setPhone(data.User.phone);
          setFile(data.User["avatarUser.image"]);
          setRole(data.User["account.role"]);
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getData();
  }, [id]);
  const userUpdate = {
    fullName,
    address,
    role,
  };
  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/user/${id}/updateInfor/admin`,
        userUpdate,
        {
          headers: {
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );
      setLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/admin/users");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={style.new}>
      <div className={style.newContainer}>
        <div className={style.top}>
          <h1>{title}</h1>
        </div>
        <div className={style.bottom}>
          {isFile && (
            <div className={style.left}>
              <img
                src={
                  file
                    ? `${file}`
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="user"
              />
            </div>
          )}
          <div className={style.right}>
            <form>
              <div className={style.formInput}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  disabled
                />
              </div>

              <div className={style.formInput}>
                <label>Fullname</label>
                <input
                  type="text"
                  placeholder="Enter Fullname"
                  name="fullName"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  value={fullName}
                  disabled
                />
              </div>
              <div className={style.formInput}>
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                  disabled
                />
              </div>
              <div className={style.formInput}>
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  disabled
                />
              </div>
              <div className={style.formInput}>
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Enter Phone"
                  name="phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  disabled
                />
              </div>
              <div className={style.formInput}>
                <label>Role</label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  name="role"
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  value={role}
                />
              </div>
              <button type="submit" onClick={handleUpdate}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
