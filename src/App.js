import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Reset from "./pages/Reset/Reset";
import {
  productInputs,
  categoryInputs,
  manufactureInputs,
} from "./pages/Admin/formInput";
import AdminLayout from "./Layout/Admin/AdminLayout";
import {
  columnsUsers,
  columnsProducts,
  columnsCategory,
  columnsManufacture,
  columnsOrder,
  columnsHistory,
} from "./pages/Admin/Conponents/Table/Columns";
import { useEffect, useState } from "react";
import axios from "axios";
import NewCategory from "./pages/Admin/Conponents/New/NewCategory";
import Category from "./pages/Category/Category";
import NewManufacture from "./pages/Admin/Conponents/New/NewManufacture";
import NewProduct from "./pages/Admin/Conponents/New/NewProduct";
import ListUsers from "./pages/Admin/Conponents/List/ListUsers";
import ListProducts from "./pages/Admin/Conponents/List/ListProducts";
import ListCategory from "./pages/Admin/Conponents/List/ListCategory";
import ListManufacture from "./pages/Admin/Conponents/List/ListManufacture";
import ViewUser from "./pages/Admin/Conponents/View/ViewUser";
import ViewProduct from "./pages/Admin/Conponents/View/ViewProduct";
import { toast, ToastContainer } from "react-toastify";
import ViewCategory from "./pages/Admin/Conponents/View/ViewCategory";
import ViewManufacture from "./pages/Admin/Conponents/View/ViewManufacture";
import Search from "./pages/Search/Search";
import ListOrders from "./pages/Admin/Conponents/List/ListOrders";
import FadeLoader from "react-spinners/FadeLoader";
import Checkout from "./components/Checkout/Checkout";
import History from "./pages/History/History";

function App() {
  const [categoryAll, setCategoryAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isPm, setIsPm] = useState(false);
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const override = {
    display: "block",
    margin: "0 auto",
  };
  useEffect(() => {}, [loading]);
  useEffect(() => {
    if (login) {
      const getCart = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/cart/user/${login.userId}`
          );
          
          setCartItems(data.newCarts);
          localStorage.setItem("cartItems", JSON.stringify(data.newCarts));
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      getCart();
    } else {
      if (JSON.parse(localStorage.getItem("cartItems"))) {
        setCartItems(JSON.parse(localStorage.getItem("cartItems")));
      }
    }
  }, [isPm, login?.userId]);
  const handleAddProducts = async (product) => {
    if (login) {
      const findExxist = cartItems.findIndex((item) => {
        return item.id === product.id;
      });
      if (findExxist >= 0) {
        try {
          const { data } = await axios.put(
            `${process.env.REACT_APP_SERVER_URL}/cart/user/${login.userId}/product/${product.id}`
          );

          cartItems[findExxist] = {
            ...cartItems[findExxist],
            quantityProduct: data.newQuantity,
          };
          setCartItems([...cartItems]);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          toast.info("Increased product quantity", {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          toast.error(error.response.res.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        const quantity = {
          quantityProduct: 1,
        };
        try {
          await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/cart/user/${login.userId}/product/${product.id}`,
            quantity
          );
          setCartItems([...cartItems, { ...product, quantityProduct: 1 }]);
          toast.success("Product added to cart", {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } else {
      const findExxist = cartItems.findIndex((item) => {
        return item.id === product.id;
      });
      if (findExxist >= 0) {
        try {
          cartItems[findExxist] = {
            ...cartItems[findExxist],
            quantityProduct: cartItems[findExxist].quantityProduct + 1,
          };
          setCartItems([...cartItems]);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          toast.info("Increased product quantity", {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          toast.error(error.response.res.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        let item = { ...product, quantityProduct: 1 };
        cartItems.push(item);
        setCartItems([...cartItems]);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        toast.success("Product added to cart", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/category`
      );
      setCategoryAll(data);
      setLoading(false)
    };
    getCategory();
  }, []);

  const Layout = DefaultLayout;
  const LayoutAdmin = AdminLayout;
  return (
    <DataProvider>
      {loading ? (
        <FadeLoader
          color="red"
          loading={loading}
          cssOverride={override}
          size={150}
        />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Home
                    categoryList={categoryAll}
                    handleAddProducts={handleAddProducts}
                  />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Register setLoading={setLoading} />
                </Layout>
              }
            />
            <Route
              path="/checkout-success"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Checkout />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Login setLoading={setLoading} />
                </Layout>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <DetailProduct
                    handleAddProducts={handleAddProducts}
                    setLoading={setLoading}
                  />
                </Layout>

              }
            />
            <Route
              path="/category/:id"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Category handleAddProducts={handleAddProducts} />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    isPm={isPm}
                    setIsPm={setIsPm}
                    setLoading={setLoading}
                  />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Search handleAddProducts={handleAddProducts} />
                </Layout>
              }
            />
            <Route
              path="/history"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <History columns={columnsHistory} title="Order" />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Profile setLoading={setLoading} />
                </Layout>
              }
            />
            <Route
              path="/changepass"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <ChangePassword setLoading={setLoading} />
                </Layout>
              }
            />
            <Route
              path="/forgot"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <ForgotPassword setLoading={setLoading} />
                </Layout>
              }
            />
            <Route
              path="/reset/:tempToken"
              element={
                <Layout cartItems={cartItems} setCartItems={setCartItems}>
                  <Reset setLoading={setLoading} />
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <LayoutAdmin>
                  <Admin />
                </LayoutAdmin>
              }
            />
            <Route path="admin/users">
              <Route
                index
                element={
                  <LayoutAdmin>
                    <ListUsers
                      columns={columnsUsers}
                      title="Users"
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />

              <Route
                path="view/:id"
                element={
                  <LayoutAdmin>
                    <ViewUser
                      title="Update User"
                      isFile={true}
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
            </Route>
            <Route path="admin/products">
              <Route
                index
                element={
                  <LayoutAdmin>
                    <ListProducts
                      columns={columnsProducts}
                      title="Products"
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
              <Route
                path="new"
                element={
                  <LayoutAdmin>
                    <NewProduct
                      inputs={productInputs}
                      title="Add New Product"
                      isFile={true}
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
              <Route
                path="view/:id"
                element={
                  <LayoutAdmin>
                    <ViewProduct
                      title="Update Product"
                      isFile={true}
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
            </Route>
            <Route path="admin/category">
              <Route
                index
                element={
                  <LayoutAdmin>
                    <ListCategory
                      columns={columnsCategory}
                      title="Category"
                      categoryAll={categoryAll}
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
              <Route
                path="new"
                element={
                  <LayoutAdmin>
                    <NewCategory
                      inputs={categoryInputs}
                      title="Add New Category"
                      isFile={false}
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
              <Route
                path="view/:id"
                element={
                  <LayoutAdmin>
                    <ViewCategory
                      title="Update Category"
                      isFile={false}
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
            </Route>
            <Route path="admin/manufacture">
              <Route
                index
                element={
                  <LayoutAdmin>
                    <ListManufacture
                      columns={columnsManufacture}
                      title="Manufacture"
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
              <Route
                path="new"
                element={
                  <LayoutAdmin>
                    <NewManufacture
                      inputs={manufactureInputs}
                      title="Add New Manufacture"
                      isFile={false}
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
              <Route
                path="view/:id"
                element={
                  <LayoutAdmin>
                    <ViewManufacture
                      title="Update Manufacture"
                      isFile={false}
                      setLoading={setLoading}
                    />
                  </LayoutAdmin>
                }
              />
            </Route>
            <Route path="admin/orders">
              <Route
                index
                element={
                  <LayoutAdmin>
                    <ListOrders columns={columnsOrder} title="Order" />
                  </LayoutAdmin>
                }
              />
            </Route>
          </Routes>
        </Router>
      )}

      <ToastContainer position="top-center" newestOnTop autoClose={1000} />
    </DataProvider>
  );
}

export default App;
