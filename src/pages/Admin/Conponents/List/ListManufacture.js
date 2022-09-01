import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import style from "./List.module.css";
import { toast } from "react-toastify";
import axios from "axios";

function ListManufacture({ columns, title, setLoading }) {
  const [manufactureAll, setManufactureAll] = useState([]);

  const [isDlt, setDlt] = useState(false);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login")) || null;
    const getManufacture = async () => {
      if (login) {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/manufacture`,
            {
              headers: { "access-token": "Bearer " + login.accesstoken },
            }
          );
          setManufactureAll(data);
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    };
    getManufacture();
  }, [isDlt]);

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
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/manufacture/${id}`,
        {
          headers: {
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );
      setDlt(!isDlt);
      setLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={style["list"]}>
      <div className={style["list-head"]}>
        <div className={style["list-head-title"]}>{title}</div>
        <Link to="new" className={style["list-head-link"]}>
          Add New
        </Link>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={manufactureAll}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default ListManufacture;
