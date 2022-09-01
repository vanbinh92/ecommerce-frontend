import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewManufacture({ inputs, title, isFile, setLoading }) {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/category`
        );
        setCategorys(data);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getCategory();
  }, []);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setCategory(value);
  };
  const handleCreateManufacture = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newManufacture = {
      name: info.name,
      nameCategory: category,
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/manufacture`,
        newManufacture,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );
      setLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/admin/manufacture");
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
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="manufacture"
              />
            </div>
          )}
          <div className={style.right}>
            <form>
              {isFile && (
                <div className={style.formInput}>
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {inputs.length > 0
                ? inputs.map((input, index) => (
                    <div className={style.formInput} key={index}>
                      <label>{input.label}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        name={input.name}
                        onChange={handleOnChange}
                      />
                    </div>
                  ))
                : null}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <select name="category" onChange={handleChangeCategory}>
                  <option value="">Choose category</option>
                  {categorys.length > 0
                    ? categorys.map((item) => (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <button type="submit" onClick={handleCreateManufacture}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewManufacture;
