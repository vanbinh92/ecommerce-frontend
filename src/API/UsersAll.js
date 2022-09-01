import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalState } from "../GlobalState";


function UsersAll() {
  const state = useContext(GlobalState);
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const [usersAll, setUsersAll] = useState([]);
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getAll`, {
        headers: { "access-token": "Bearer " + login.accesstoken },
      });
      setUsersAll(data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isAdmin) {
      getUsers();
    }
  }, [isAdmin]);
  return {
    usersAll: [usersAll, setUsersAll],
  };
}

export default UsersAll;
