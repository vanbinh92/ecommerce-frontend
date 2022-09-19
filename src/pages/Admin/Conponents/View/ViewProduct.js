import React, { useEffect, useState } from "react";
import style from "./New.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast} from "react-toastify";


function ViewProduct({ title, isFile,setLoading }) {
  const id = useParams().id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [nameManufacture, setNameManufacture] = useState("");
  const [file, setFile] = useState(null);

  const nav = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const {data} =  await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/product/${id}`,
          {
            headers: {
              "access-token":
                "Bearer " +
                JSON.parse(localStorage.getItem("login")).accesstoken,
            },
          }
        );
        
        if(data.product) {
          setName(data.product.name)
          setPrice(data.product.price)
          setDescription(data.product.description)
          setNameCategory(data.product["category.name"])
          setNameManufacture(data.product["manufacture.name"])
          setFile(data.product.image)
        }

      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    };
    getData();
  }, [id]);
  const productUpdate = {
    name,
    price,
    description,
    nameCategory,
    nameManufacture
  }
  const handleUpdate = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/product/${id}`,
        productUpdate,
        {
          headers: {
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );
      setLoading(false)
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      return nav('/admin/products')
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
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
                alt="product"
              />
            </div>
          )}
          <div className={style.right}>
            <form>

              <div className={style.formInput}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                
                />
              </div>
              <div className={style.formInput}>
                <label>Price</label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                />
              </div>
              <div className={style.formInput}>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
              <div className={style.formInput}>
                <label>Category</label>
                <input
                  type="text"
                  placeholder="Enter Category"
                  name="nameCategory"
                  onChange={(e) => {
                    setNameCategory(e.target.value);
                  }}
                  value={nameCategory}
                />
              </div>
              <div className={style.formInput}>
                <label>Manufacture</label>
                <input
                  type="text"
                  placeholder="Enter Manufacture"
                  name="nameManufacture"
                  onChange={(e) => {
                    setNameManufacture(e.target.value);
                  }}
                  value={nameManufacture}
                 
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

export default ViewProduct;
