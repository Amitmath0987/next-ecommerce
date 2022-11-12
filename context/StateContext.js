import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();
const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct, index;
  const returnUpdatedProductQtyItem = (id, value) => {
    let newUpdatedCartItems = cartItems?.map((item) => {
      if (item._id == id) {
        return {
          ...item,
          quantity: value == "inc" ? item.quantity + 1 : item.quantity - 1,
        };
      }
      return {
        ...item,
      };
    });
    return newUpdatedCartItems;
  };
  const toggleCartItemQty = (id, value) => {
    foundProduct = cartItems.find((item) => item._id == id);
    index = cartItems.findIndex((item) => item._id == id);
    if (value === "inc") {
      setCartItems([...returnUpdatedProductQtyItem(id, value)]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevQty) => prevQty + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([...returnUpdatedProductQtyItem(id, value)]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevQty) => prevQty - 1);
      }
    }
  };
  const onRemoveProduct = (id) => {
    foundProduct = cartItems.find((item) => item._id == id);
    const filteredCartProducts = cartItems.filter((item) => item._id !== id);
    setCartItems([...filteredCartProducts]);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.quantity * foundProduct.price
    );
    setTotalQuantities(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct?.quantity
    );
  };
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) {
        return 1;
      }
      return prevQty - 1;
    });
  };

  const addProductToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductInCart) {
      setCartItems([...returnUpdatedProductQtyItem(product._id, "inc")]);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const showCartHandler = (isVisible) => {
    setShowCart(isVisible);
  };
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        addProductToCart,
        showCartHandler,
        toggleCartItemQty,
        onRemoveProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;

export const useStateContext = () => useContext(Context);
