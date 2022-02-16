import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import SingleProduct from "./components/Products/SingleProduct";
import dbCall from "./helpers/environment";
import AdminMain from "./components/Admin/AdminMain";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export type SetSessionToken = {
  setSessionToken: (sessionToken: string) => void;
};

export type MainProps = {
  isLoggedIn: boolean;
  sessionToken: string | null;
  clearToken: () => void;
  updateToken: (newToken: string) => void;
  setSessionToken: (sessionToken: string | null) => void;
  getProducts: () => Promise<void>;
  fetchProducts: () => Promise<void>;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>("");
  const [cartOpen, setCartOpen] = useState(false);
  const [item, setItem] = useState([] as CartItemType[]);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [reviewId, setReviewId] = useState("");
  const [reviewTotal, setReviewTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [revId, setRevId] = useState("");
  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    role: ''
  });
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState('')
 

  const fetchProducts = async (): Promise<void> => {
    await fetch(`${dbCall}/products/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("Authorization"))
      setSessionToken(localStorage.getItem("Authorization"));

    const fetchUser = async (): Promise<void> => {
      if (sessionToken !== "" && user.userId === "") {
        await fetch(`${dbCall}/user/setUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            setUser(res);
            setUserId(res.userId);
            setRole(res.role)
            setName(`${res.firstName} ${res.lastName}`)
            console.log(res);
          })
          .then(() => user)
          .catch((error) => console.log(error));
      } else if (user.userId !== "" && sessionToken === "") {
        setUser({
          userId: "",
          firstName: "",
          lastName: "",
          email: "",
          role: ''
        });
      }
    };
    fetchUser();
  }, [user, sessionToken]);

  useEffect(() => {
    fetchProducts();
reviewIdLog();
    updateReview();    
  }, [reviewId, revId]);

  const updateToken = (newToken: string) => {
    localStorage.setItem("Authorization", newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    setIsLoggedIn(false);
    setRole('');
    setUserId('')
      };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const reviewIdLog = () => {
    if (revId === "delete") {
      return deleteRev();
    }
  };

  const updateReview = () => {
    if (revId === "update" || revId === "add") {
      return fetchProducts();
    }
  };

  const deleteRev = async (): Promise<void> => {
    await fetch(`${dbCall}/review/${reviewId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      }),
    }).then((res) => {
      setReviewId("");
      setRevId("");
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Router>
        <Drawer
          anchor="bottom"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            sessionToken={sessionToken}
          />
        </Drawer>
        <button onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <ShoppingCartIcon />
          </Badge>
        </button>
        <Navbar
          clearToken={clearToken}
          setSessionToken={setSessionToken}
          sessionToken={sessionToken}
          isLoggedIn={isLoggedIn}
          role={role}
          name={name}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminMain role={role} />} />
          <Route
            path="/products"
            element={
              <Products handleClose={handleClose} setRevId={setRevId} handleAddToCart={handleAddToCart} item={item.sort()}  fetchProducts={fetchProducts}/>
            }
          />
          <Route
            path="/register"
            element={
              <Register
                updateToken={updateToken}
                sessionToken={sessionToken}
                setSessionToken={setSessionToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                updateToken={updateToken}
                sessionToken={sessionToken}
                setSessionToken={setSessionToken}
              />
            }
          />

          <Route
            path="/products/:id"
            element={
              <SingleProduct
                fetchProducts={fetchProducts}
                setReviewTotal={setReviewTotal}
                reviewId={reviewId}
                setReviewId={setReviewId}
                sessionToken={sessionToken}
                setSessionToken={setSessionToken}
                handleClose={handleClose}
                handleClickOpen={handleClickOpen}
                setOpen={setOpen}
                open={open}
                setRevId={setRevId}
                revId={revId}
                userId={userId}
                role={role}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
