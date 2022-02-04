import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Reviews from "./components/Reviews/Reviews";


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

export type AppProps = {
  isLoggedIn: boolean;
  sessionToken: string | null;
  clearToken: () => void;
  updateToken: (newToken: string) => void;
  setSessionToken: (sessionToken: string | null) => void;
  getProducts: () => Promise<void>;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>("");
  const [cartOpen, setCartOpen] = useState(false);
  const [item, setItem] = useState([] as CartItemType[]);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  // !! THIS NEEDS TO BE THE FETCH FOR REVIEWS. 

  // const fetchReviews = async (): Promise<void> => {
  //   await fetch(`http://localhost:3000/products/`, {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setItem(data);
  //       console.log(item);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const fetchProducts = async (): Promise<void> => {
    await fetch(`http://localhost:3000/products/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        console.log(item);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    setIsLoggedIn(false);
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
          />
        </Drawer>
        <button onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </button>
        <Navbar
          clearToken={clearToken}
          setSessionToken={setSessionToken}
          sessionToken={sessionToken}
          isLoggedIn={isLoggedIn}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <Products
                handleAddToCart={handleAddToCart}
                item={item.sort()}
              />
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
            path="/reviews"
            element={
              <Reviews
              item={item.sort()}
              />
            }
          />
        </Routes>

      </Router>
    </>
  );
};

export default App;
