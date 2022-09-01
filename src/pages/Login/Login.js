import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { toast } from "react-toastify";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./firebase";

function Login({ setLoading }) {
  const state = useContext(GlobalState);
  const nav = useNavigate();
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    username: username,
    password: password,
  };
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/account/login`,
        {
          ...user,
        }
      );
      const login = {
        accesstoken: data.accesstoken,
        accountId: data.id,
        role: data.role,
        userId: data.userId,
      };
      if (JSON.parse(localStorage.getItem("cartItems"))) {
        try {
          const products = {
            products: JSON.parse(localStorage.getItem("cartItems")),
          };
          await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/cart/user/${login.userId}/products`,
            products
          );
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
      localStorage.removeItem("login");
      localStorage.setItem("login", JSON.stringify(login));
      if (data.role === 0) {
        setIsLogged(true);
        setIsAdmin(true);
        setLoading(false);
        toast.success("Login successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
        nav("/admin");
      } else {
        setIsLogged(true);
        setLoading(false);
        toast.success("Login successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
        nav("/");
      }
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleLoginGoogle = async () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        GoogleAuthProvider.credentialFromResult(result);
        const token = result.user.accessToken;
        if (token) {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/auth/google/login`,
            { headers: { "access-token": "Bearer " + token } }
          );
          const login = {
            accesstoken: data.accesstoken,
            accountId: data.accountId,
            role: data.role,
            userId: data.userId,
          };
          if (JSON.parse(localStorage.getItem("cartItems"))) {
            const products = {
              products: JSON.parse(localStorage.getItem("cartItems")),
            };
            await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/cart/user/${login.userId}/products`,
              products
            );
          }
          localStorage.removeItem("login");
          localStorage.setItem("login", JSON.stringify(login));

          setIsLogged(true);
          setLoading(false);
          toast.success("Login successfully !", {
            position: toast.POSITION.TOP_CENTER,
          });
          nav("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div className={style.container}>
      <form id={style.login} onSubmit={loginSubmit}>
        <div className={style.header}>
          <h3>Login</h3>
        </div>

        <div className={style.inputs}>
          <input
            type="username"
            placeholder="Username"
            name="username"
            id="username"
            autoFocus
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            spellCheck="false"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            spellCheck="false"
          />

          <div>
            <button type="submit" id={style.submit}>
              Login
            </button>
          </div>
          <div>
            <Link to="/forgot" className={style["forgot-password"]}>
              Forgot Password
            </Link>
          </div>
          <div className={style["login-social"]} onClick={handleLoginGoogle}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />

            <span>Sign in with Google</span>
          </div>
          <div className={style.lastLogin}>
            <p>
              Not yet member?<Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
