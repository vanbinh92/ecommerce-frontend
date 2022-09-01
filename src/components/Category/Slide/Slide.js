import React, {useEffect, useState } from "react";
import style from "./Slide.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import HalfRating from "../../Rating/HalfRating";

function Slide({ handleAddProducts, title, id }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/product/pagination/category/${id}?limit=10&page=1&manufacture=0&sort=&rate=0`
        );
        setProducts(data.rows);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {products.length > 0 && (
        <div className={style.wrapper}>
          <div className={style.head}>
            <h3>{title}</h3>
            <Link to={`/category/${id}`}>
              See all
              <i className="fa fa-angle-double-right"></i>
            </Link>
          </div>
          <Slider {...settings}>
            {products.length > 0
              ? products.map((product, index) => (
                  <div className={style.item} key={index}>
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
                ))
              : null}
          </Slider>
        </div>
      )}
    </div>
  );
}

export default Slide;
