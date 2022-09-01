import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "./OrderDetail.module.css";

function OrderDetail({ close, id }) {
  const [products, setProducts] = useState([]);
  const login = JSON.parse(localStorage.getItem("login")) || null;
  useEffect(() => {
    if (login) {
      const getData = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/orderDetail/order/${id}`,
            {
              headers: {
                "access-token":
                  "Bearer " +
                  JSON.parse(localStorage.getItem("login")).accesstoken,
              },
            }
          );
          setProducts(data);
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      getData();
    }
  }, [id]);
  return (
    <div className={style.modal}>
      <button className={style.close} onClick={close}>
        &times;
      </button>
      <div className={style.header}> Order Detail </div>
      <div className={style.content}>
        <table>
          <thead className={style["content-head"]}>
            <tr className="row no-gutters">
              <th className={`${style.id} col l-1 m-1`}>id</th>
              <th className={`${style.quantity} col l-1 m-1`}>quantity</th>
              <th className={`${style.vat} col l-1 m-1`}>VAT</th>
              <th className={`${style.name} col l-1 m-1`}>name</th>
              <th className={`${style.price} col l-1 m-1`}>price</th>
              <th className={`${style.description} col l-3 m-3`}>
                description
              </th>
              <th className={`${style.image} col l-1 m-1`}>image</th>
              <th className={`${style.nameCategory} col l-1 m-1`}>category</th>
              <th className={`${style.nameManufacture} col l-1 m-1`}>
                manufacture
              </th>
            </tr>
          </thead>
          <tbody className={style["content-body"]}>
            {products.length > 0
              ? products.map((product) => {
                  return (
                    <tr className="row no-gutters" key={product.id}>
                      <td className={`col l-1 m-1`}>{product.id}</td>
                      <td className={`col l-1 m-1`}>
                        {product.quantityProduct}
                      </td>
                      <td className={`col l-1 m-1`}>{product.VAT}</td>
                      <td className={`col l-1 m-1`}>
                        {product["product.name"]}
                      </td>
                      <td className={`col l-1 m-1`}>
                        ${product["product.price"]}
                      </td>
                      <td className={`col l-3 m-3`}>
                        {product["product.description"]}
                      </td>
                      <td className={`col l-1 m-1`}>
                        <img
                          src={`${product["product.imageProduct.image"]}`}
                          alt="product"
                        />
                      </td>
                      <td className={`col l-1 m-1`}>
                        {product["product.category.name"]}
                      </td>
                      <td className={`col l-1 m-1`}>
                        {product["product.manufacture.name"]}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetail;
