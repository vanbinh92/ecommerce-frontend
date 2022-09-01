import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UserAPI() {
  const [isLogged, setIsLogged] = useState(false);
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    address: "",
    avatar: "",
    email: "",
    fullname: "",
    phone: "",
    username: "",
    userId: "",
  });
  useEffect(() => {
    if (login) {
      const getUser = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/user/${login.accountId}/getInfor`,
            { headers: { "access-token": "Bearer " + login.accesstoken } }
          );
          if (data.inforUser.avatar === null) {
            setUser({
              address: data.inforUser.address,
              avatar: data.inforUser["avatarUser.image"],
              email: data.inforUser.email,
              fullname: data.inforUser.fullName,
              phone: data.inforUser.phone,
              username: login.username,
              accountId: login.accountId,
              accesstoken: login.accesstoken,
              userId: data.inforUser.id,
              role: login.role,
            });
          } else {
            setUser({
              address: data.inforUser.address,
              avatar: data.inforUser["avatarUser.image"],
              email: data.inforUser.email,
              fullname: data.inforUser.fullName,
              phone: data.inforUser.phone,
              username: login.username,
              accountId: login.accountId,
              accesstoken: login.accesstoken,
              userId: data.inforUser.id,
              role: login.role,
            });
          }
          if (login.role === 0) {
            setIsAdmin(true);
          }
          setIsLogged(true);
        } catch (error) {
          localStorage.clear();
          toast.error("session out, please login again", {
            position: toast.POSITION.TOP_CENTER,
          });

        }
      };

      getUser();
    }
  }, [login?.accesstoken]);

  return {
    isLogged: [isLogged, setIsLogged],
    user: [user, setUser],
    isAdmin: [isAdmin, setIsAdmin],
  };
}

export default UserAPI;
