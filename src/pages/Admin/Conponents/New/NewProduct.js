import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewProduct({ inputs, title, isFile, setLoading }) {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);
  const [manufactures, setManufactures] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [manufacture, setManufacture] = useState("");
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
  useEffect(() => {
    if (category) {
      const getManufacture = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/manufacture/category/${category}`
          );
          setManufactures(data);
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      getManufacture();
    }
  }, [category]);

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
  const handleChangeManufacture = (e) => {
    const { value } = e.target;
    setManufacture(value);
  };
  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setCategory(value);
  };
  const handleCreateProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    let newProduct = new FormData();

    newProduct.append("file", file);
    newProduct.append("name", info.name);
    newProduct.append("price", info.Price);
    newProduct.append("description", info.Description);
    newProduct.append("nameManufacture", manufacture);
    newProduct.append("categoryId", category);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/product`,
        newProduct,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${newProduct._boundary}`,
            accept: "application/json",
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );
      setLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/admin/products");
    } catch (error) {
      console.log(error);
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
                alt="product"
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
                  gap: "30px",
                }}
              >
                <div>
                  <select name="category" onChange={handleChangeCategory}>
                    <option value="">Choose category</option>
                    {categorys.length > 0
                      ? categorys.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <select name="manufacture" onChange={handleChangeManufacture}>
                    <option value="">Choose manufacture</option>
                    {manufactures.length > 0
                      ? manufactures.map((item) => (
                          <option value={item.name} key={item.id}>
                            {item.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
              <button type="submit" onClick={handleCreateProduct}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
