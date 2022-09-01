import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination/Pagination";
import HalfRating from "../../components/Rating/HalfRating";
import style from "./Search.module.css";

function Search({ handleAddProducts }) {
  const [showResult, setShowResult] = useState([]);
  const [limit, setLimit] = useState(5);
  const [totalPages, setToTalPages] = useState(0);
  const { search } = useLocation();
  const { query, page } = useMemo(() => {
    const query = new URLSearchParams(search).get("query") || "";
    const page = new URLSearchParams(search).get("page") || 1;
    return {
      query: query,
      page: Number(page),
    };
  }, [search]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/product/search?query=${query}&page=${page}&limit=${limit}`
        );
        const total = Math.ceil(data.count / limit);
        setToTalPages(total);
        setShowResult(data.rows);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getProducts();
  }, [query, page]);

  return (
    <div className={style.search}>
      <div className={style.container}>
        <div className={`${style.content} row`}>
          {showResult.length > 0
            ? showResult.map((product, index) => (
                <div
                  className={`${style.cover} col l-2-4 m-6 c-12`}
                  key={index}
                >
                  <div className={`${style.item} `}>
                    <Link
                      to={`/detail/${product.id}`}
                      className={style["item-image"]}
                    >
                      <img
                        src={`${product["imageProduct.image"]}`}
                        alt="Apple"
                      />
                    </Link>
                    <span className={style["item-manufactory"]}>
                      {product["manufacture.name"] === "Asus" && (
                        <img
                          src="../../../images/Manufactory/asus.PNG"
                          alt=""
                        />
                      )}
                      {product["manufacture.name"] === "Dell" && (
                        <img
                          src="../../../images/Manufactory/dell.PNG"
                          alt=""
                        />
                      )}
                      {product["manufacture.name"] === "Macbook" && (
                        <img
                          src="../../../images/Manufactory/apple.PNG"
                          alt=""
                        />
                      )}
                      {product["manufacture.name"] === "Sam Sung" && (
                        <img
                          src="../../../images/Manufactory/samsung.PNG"
                          alt=""
                        />
                      )}
                    </span>
                    <h4 className={style["item-name"]}>{product.name}</h4>
                    <div className={style["rating-avg"]}>
                      <div className={style.star}>
                        <HalfRating
                          size="small"
                          readOnly={true}
                          value={product.avgRating}
                        />
                      </div>
                      <div className={style["rating-number"]}>
                        <span>{product.totalRating} review</span>
                      </div>
                    </div>
                    <span className={style["item-description"]}>
                      {product.description}
                    </span>
                    <span className={style["item-price"]}>
                      ${product.price}
                    </span>
                    <span
                      className={style["btn-addCart"]}
                      onClick={() => {
                        handleAddProducts(product);
                      }}
                    >
                      Add To Cart
                    </span>
                  </div>
                </div>
              ))
            : null}
        </div>
        <Pagination totalPages={totalPages} page={page} />
      </div>
    </div>
  );
}

export default Search;
