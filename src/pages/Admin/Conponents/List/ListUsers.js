import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import style from "./List.module.css";
import axios from "axios";
import { toast } from "react-toastify";

function ListUsers({ columns, title,setLoading }) {
  
  const [usersAll, setUsersAll] = useState([]);
  const [isDlt,setIsDlt] = useState(false)
  
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login")) || null;
    const getUsers = async () => {
      try {
        if (login) {
          const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getAll`, {
            headers: { "access-token": "Bearer " + login.accesstoken },
          });
          setUsersAll(data);
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getUsers();
  }, [isDlt]);

  const nav = useNavigate();

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.cellAction}>
            <Link
              to={`view/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={style.viewButton}>Update</div>
            </Link>
            <div
              className={style.deleteButton}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const handleDelete = async (id) => {
    setLoading(true)
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/user/${id}/deleteInfor`,
        {
          headers: {
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );
      setLoading(false)
      setIsDlt(!isDlt)
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/admin/users");
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={style["list"]}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={usersAll}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default ListUsers;
