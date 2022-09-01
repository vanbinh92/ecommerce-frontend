import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination/Pagination";
import HalfRating from "../../components/Rating/HalfRating";
import style from "./Category.module.css";
import SelectManu from "./SelectManu";
import SelectPrice from "./SelectPrice";
import SelectRate from "./SelectRate";

function Category({ handleAddProducts }) {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const [limit, setLimit] = useState(5);
  const [totalPages, setToTalPages] = useState(0);

  const { page, manufacture, sort, rate } = useMemo(() => {
    let page = new URLSearchParams(search).get("page") || 1;
    const manufacture = new URLSearchParams(search).get("manufacture") || 0;
    const sort = new URLSearchParams(search).get("sort") || "";
    const rate = new URLSearchParams(search).get("rate") || "";
    return {
      page: Number(page),
      manufacture: Number(manufacture),
      sort: sort,
      rate: Number(rate),
    };
  }, [search]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/product/pagination/category/${params.id}?manufacture=${manufacture}&limit=${limit}&page=${page}&sort=${sort}&rate=${rate}`
        );
        const total = Math.ceil(data.count / limit);
        setToTalPages(total);
        setProducts(data.rows);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getProducts();
  }, [page, manufacture, sort, rate]);

  return (
    <div className={style.category}>
      <div className={`${style.container}`}>
        <div className={`${style["category-head"]}`}>
          <div className={style["category-head-select-manu"]}>
            <SelectManu
              categoryId={params.id}
              sort={sort}
              rate={rate}
            />
          </div>
          <div className={style["category-head-select-price"]}>
            <SelectPrice page={page} manufacture={manufacture} rate={rate} />
          </div>
          <div className={style["category-head-select-rate"]}>
            <SelectRate manufacture={manufacture} sort={sort} />
          </div>
        </div>
        <div className={`${style["category-content"]} row `}>
          {products.length > 0
            ? products.map((product, index) => (
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
        <Pagination
          totalPages={totalPages}
          page={page}
          manufacture={manufacture}
          sort={sort}
          rate={rate}
        />
      </div>
    </div>
  );
}

export default Category;
