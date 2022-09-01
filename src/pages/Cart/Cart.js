import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../GlobalState";
import style from "./Cart.module.css";

function Cart({ cartItems, setCartItems, setLoading, isPm, setIsPm }) {
  const [total, setTotal] = useState(0);
  const [method, setMethod] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const login = JSON.parse(localStorage.getItem("login")) || null;
  const state = useContext(GlobalState);
  const user = state.UserAPI.user[0];
  const nav = useNavigate();
  useEffect(() => {
    if (login) {
      setFullName(`${user.fullname}`);
      setAddress(user.address);
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    const getTotal = () => {
      const tt = cartItems?.reduce((prev, item) => {
        return prev + item.price * item.quantityProduct;
      }, 0);
      setTotal(tt);
    };
    getTotal();
  }, [cartItems]);

  const increase = (id) => {
    cartItems.forEach((element) => {
      if (element.id === id) {
        element.quantityProduct += 1;
      }
    });
    setCartItems([...cartItems]);
  };

  const decrease = (id) => {
    cartItems.forEach((element) => {
      if (element.id === id) {
        element.quantityProduct === 1
          ? (element.quantityProduct = 1)
          : (element.quantityProduct -= 1);
      }
    });
    setCartItems([...cartItems]);
  };

  const handleDelete = async (id) => {
    if (login) {
      if (window.confirm("Do you want to delete this product?")) {
        setLoading(true);
        try {
          const { data } = await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}/cart/user/${login.userId}/product/${id}`
          );
          cartItems.forEach((item, index) => {
            if (item.id === id) {
              cartItems.splice(index, 1);
            }
          });
          setLoading(false);
          setCartItems([...cartItems]);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } else {
      if (window.confirm("Do you want to delete this product?")) {
        const newCartItems = cartItems.filter((item) => {
          return item.id !== id;
        });
        setCartItems(newCartItems);
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        toast.success("Remove your cart successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const handlePayment = async () => {
    if (!login) {
      toast.warning("Please login before taking this action", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!method) {
      toast.warning("Please select method payment", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setLoading(true);
    const newPayment = {
      products: cartItems,
      userId: login.userId,
      totalPrice: total,
      method: method,
      email: user.email,
      fullName: fullName,
      phone: phone,
      address: address,
    };
    try {
      if (method === "Ship Cod") {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/payment`,
          newPayment
        );
        setLoading(false);
        setIsPm(!isPm);
        nav("/checkout-success");
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/stripe/create-checkout-seasion`,
          newPayment
        );
        setIsPm(!isPm);
        setLoading(false);
        window.location.href = data.url;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={style.cart}>
      {cartItems.length > 0 ? (
        <div className={style.container}>
          <div className={`${style["list-orders"]} row`}>
            {cartItems.length > 0
              ? cartItems.map((cart) => (
                  <div
                    className={`${style["list-orders-item"]} `}
                    key={cart.id}
                  >
                    <div className={`${style["list-orders-item-img"]} `}>
                      <img src={`${cart["imageProduct.image"]}`} alt="cart" />
                    </div>
                    <div className={`${style["list-orders-item-content"]}  `}>
                      <span className={style.name}>{cart.name}</span>
                      <span className={`${style.description}`}>
                        {cart.description}
                      </span>
                    </div>

                    <div className={`${style["list-orders-item-price"]} `}>
                      <span>${cart.price}</span>
                    </div>
                    <div className={`${style["list-orders-item-quantity"]}  `}>
                      <div className={style["list-orders-item-up-down"]}>
                        <span
                          className={style["quantity-change"]}
                          onClick={() => {
                            decrease(cart.id);
                          }}
                        >
                          -
                        </span>
                        <span className={style["quantity"]}>
                          {cart.quantityProduct}
                        </span>
                        <span
                          className={style["quantity-change"]}
                          onClick={() => {
                            increase(cart.id);
                          }}
                        >
                          +
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          handleDelete(cart.id);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))
              : null}

            <div className={style["list-orders-total"]}>
              <span className={style["total-left"]}>Total: </span>
              <span className={style["total-right"]}>${total}</span>
            </div>
          </div>
          <div className={style["select-payment"]}>
            <h3>Select Method Payment</h3>
            <form>
              <input
                type="radio"
                id="cart"
                name="payMethod"
                value="Visa/Master Cart"
                onChange={(e) => {
                  setMethod(e.target.value);
                }}
              />
              <label htmlFor="cart">Visa/Master Cart</label>
              <input
                type="radio"
                id="cod"
                name="payMethod"
                value="Ship Cod"
                onChange={(e) => {
                  setMethod(e.target.value);
                }}
              />
              <label htmlFor="cod">Ship COD</label>
            </form>
          </div>
          {method === "Ship Cod" ? (
            <div className={style["info-payment"]}>
              <h2>Customer Information</h2>
              <form>
                <input
                  placeholder="Enter Full Name"
                  spellCheck="false"
                  value={fullName||""}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
                <input
                  placeholder="Enter Phone Number"
                  spellCheck="false"
                  value={phone||""}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <input
                  placeholder="Enter Address"
                  spellCheck="false"
                  value={address||""}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </form>
            </div>
          ) : null}
          <div className={style.checkout} onClick={handlePayment}>
            <span>Purchase</span>
          </div>
        </div>
      ) : (
        <div className={style["no-cart"]}>
          <div className={style["no-cart-img"]}>
            <img src="../images/no-cart/null-gio-hang.png" alt="no-cart" />
          </div>
          <div className={style["no-cart-title"]}>
            <p>There are no products in your cart</p>
          </div>
          <Link to="/">SHOP NOW</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
