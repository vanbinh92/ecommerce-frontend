import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./DetailProduct.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import HalfRating from "../../components/Rating/HalfRating";
import ProductsAll from "../../API/ProductsAll";

function DetailProduct({ handleAddProducts, setLoading }) {
  const [rating, setRating] = useState(5);
  const [productDetail, setProductDetail] = useState([]);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [star, setStar] = useState("");
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const products = ProductsAll().productsAll;
  const id = useParams().id;
  useEffect(() => {
    if (id) {
      const getOneProduct = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/product/${id}`
          );
          setProductDetail(data.product);
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      getOneProduct();
    }
  }, [id]);
  useEffect(() => {
    const getReview = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/review/product/${id}`
        );
        setReviews(data.found);
        setStar(data.star);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getReview();
  }, [star.avgRating, star.totalRating]);
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
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  const handleWriteRating = () => {
    if (!login) {
      toast.warning("Please login before taking this action", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const review = document.getElementById("review-content");
    review.style.display = "block";
  };

  const handleReview = async () => {
    setLoading(true);
    const newReview = {
      rating,
      comment,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/review/user/${login.userId}/product/${id}`,
        newReview
      );
      setLoading(false);
      toast.success("Review successfully", {
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
    <div className={style.detail}>
      <div className={`${style.container}`}>
        <div className={`${style.content} row no-gutters`}>
          <div className={`${style["container-left"]} l-6 m-6 c-12`}>
            {productDetail["imageProduct.image"] && (
              <img
                src={`${productDetail["imageProduct.image"]}`}
                alt="product"
              />
            )}
          </div>
          <div className={`${style["container-right"]} l-6 m-6 c-12`}>
            <h3 className={style["container-right-title"]}>
              {productDetail.name}
            </h3>
            <div className={style["rating-avg"]}>
              <div className={style.star}>
                <HalfRating
                  size="small"
                  readOnly={true}
                  value={star.avgRating}
                />
              </div>
              <div className={style["rating-number"]}>
                <span>{star.totalRating} global ratings</span>
              </div>
            </div>
            <div className={style["container-right-description"]}>
              <ul>
                {productDetail
                  ? productDetail.description
                    ? productDetail.description
                        .split(",")
                        .map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })
                    : null
                  : null}
              </ul>
            </div>
            <p className={style["container-right-price"]}>
              {`$${productDetail.price}`}
            </p>
            <button
              className={style["container-right-btn"]}
              onClick={() => {
                handleAddProducts(productDetail);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
        <div className={`${style["content-review"]} row no-gutters`}>
          <div className={`${style.review} l-6 m-6 c-12`}>
            <h2>Customer reviews</h2>
            <div className={style["rating-avg"]}>
              <div className={style.star}>
                <HalfRating
                  size="large"
                  readOnly={true}
                  value={star.avgRating}
                />
              </div>
              <div className={style["number-avg"]}>
                <span>{star.avgRating} out of 5</span>
              </div>
            </div>
            <div className={style["rating-number"]}>
              <span>{star.totalRating} global ratings</span>
            </div>
            <div className={style["table-rating"]}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>5 star</span>
                    </td>
                    <td>
                      <span>
                        <div className={`${style.meter}`}>
                          <div
                            className={`${style["meter-bar"]} ${style.meter}`}
                            style={{ width: `${star.percent5star}%` }}
                          ></div>
                        </div>
                      </span>
                    </td>
                    <td>
                      <span>{star.percent5star}%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>4 star</span>
                    </td>
                    <td>
                      <span>
                        <div className={`${style.meter}`}>
                          <div
                            className={`${style["meter-bar"]} ${style.meter}`}
                            style={{ width: `${star.percent4star}%` }}
                          ></div>
                        </div>
                      </span>
                    </td>
                    <td>
                      <span>{star.percent4star}%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>3 star</span>
                    </td>
                    <td>
                      <span>
                        <div className={`${style.meter}`}>
                          <div
                            className={`${style["meter-bar"]} ${style.meter}`}
                            style={{ width: `${star.percent3star}%` }}
                          ></div>
                        </div>
                      </span>
                    </td>
                    <td>
                      <span>{star.percent3star}%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>2 star</span>
                    </td>
                    <td>
                      <span>
                        <div className={`${style.meter}`}>
                          <div
                            className={`${style["meter-bar"]} ${style.meter}`}
                            style={{ width: `${star.percent2star}%` }}
                          ></div>
                        </div>
                      </span>
                    </td>
                    <td>
                      <span>{star.percent2star}%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>1 star</span>
                    </td>
                    <td>
                      <span>
                        <div className={`${style.meter}`}>
                          <div
                            className={`${style["meter-bar"]} ${style.meter}`}
                            style={{ width: `${star.percent1star}%` }}
                          ></div>
                        </div>
                      </span>
                    </td>
                    <td>
                      <span>{star.percent1star}%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={`${style["write-review"]} l-6 m-6 c-12`}>
            <div className={style["button-review"]}>
              <h2>Review this product</h2>
              <button onClick={handleWriteRating}>
                Write a customer review
              </button>
            </div>
            <div className={style["write-review-content"]} id="review-content">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                }}
              >
                <span style={{ marginRight: "8px" }}>Ratings:</span>
                <div className={style.star}>
                  <HalfRating
                    size="medium"
                    readOnly={false}
                    setRating={setRating}
                    value="5"
                  />
                </div>
              </div>
              <textarea
                placeholder="Enter your comment"
                spellCheck="false"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
              />
              <button className={style.send} onClick={handleReview}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className={style["list-review"]}>
          {reviews.length > 0
            ? reviews.map((review) => {
                return (
                  <div className={style["list-item"]} key={review.id}>
                    <div className={style["list-review-info"]}>
                      <img
                        src={
                          review["user.avatarUser.image"] === null
                            ? "../../../../images/Avatar/avatar.jpg"
                            : `${review["user.avatarUser.image"]}`
                        }
                        alt="avatar"
                      />
                      <span>{review["user.fullName"]}</span>
                    </div>
                    <div className={style["list-review-star"]}>
                      <HalfRating
                        size="small"
                        readOnly={true}
                        value={review.rating}
                      />
                    </div>
                    <div className={style["list-review-cmt"]}>
                      <span>{review.comment}</span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className={style.wrapper}>
        <div className={style.head}>
          <h3>Related Products</h3>
        </div>
        <div className={style["listItem"]}>
          <Slider {...settings}>
            {products.length > 0
              ? products.map((product, index) =>
                  product["category.name"] === productDetail["category.name"] && product.id !== productDetail.id ? (
                    <div className={style.item} key={index}>
                      <Link
                        to={`/detail/${product.id}`}
                        className={style["item-image"]}
                      >
                        <img
                          src={`${product["imageProduct.image"]}`}
                          alt="product"
                        />
                      </Link>
                      <span className={style["item-manufactory"]}>
                        {productDetail["manufacture.name"] === "Asus" && (
                          <img
                            src="../../../../images/Manufactory/asus.PNG"
                            alt=""
                          />
                        )}
                        {productDetail["manufacture.name"] === "Dell" && (
                          <img
                            src="../../../../images/Manufactory/dell.PNG"
                            alt=""
                          />
                        )}
                        {productDetail["manufacture.name"] === "Macbook" && (
                          <img
                            src="../../../../images/Manufactory/apple.png"
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
                  ) : null
                )
              : null}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
