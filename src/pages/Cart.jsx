import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import "../styles/CustomStyles.css";
import CartItemCard from "../components/CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartAction";
import { MdRemoveShoppingCart } from "react-icons/md";
import Button from "../components/Button";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      history.push("/shipping");
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <div className=" bg-white pb-20">
        <Navbar />
        <div className=" mt-40">
        <div className="text-center w-screen h-auto text-5xl text-black mt-6 font-bold mb-12">
              Cart
        </div>
          {cartItems.length === 0 ? (
            <div className=" m-auto text-center p-[100px] h-96 flex flex-col justify-center items-center">
              <MdRemoveShoppingCart className=" text-9xl" />
              <div className=" text-2xl">No Product in Your Cart</div>
              <Button
                onClick={() => {
                  history.push("/products");
                }}
                text="VIEW PRODUCTS"
                className=" mt-2 border-2 rounded-lg border-black w-full p-2 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "
              />
            </div>
          ) : (
            <div>
              <div className=" md:p-[100px]">
                <div className=" pl-2 py-2 bg-slate-300 w-[90%] box-border m-auto grid md:grid-cols-[4fr_1fr_1fr] grid-cols-[3fr_1fr_1fr]">
                  <p className=" px-3">Product</p>
                  <p className=" px-3">Quantity</p>
                  <p className=" px-3 text-right">Subtotal</p>
                </div>

                {cartItems &&
                  cartItems.map((item) => (
                    <div
                      className=" w-[90%] m-auto grid md:grid-cols-[4fr_1fr_1fr] grid-cols-[3fr_1fr_1fr]"
                      key={item.product}
                    >
                      <CartItemCard
                        item={item}
                        deleteCartItems={deleteCartItems}
                      />
                      <div className=" flex items-start flex-col justify-center">
                        <div className=" flex justify-center items-center">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.product, item.quantity)
                            }
                            className=" bg-slate-400 px-3 cursor-pointer text-white transition-all duration-500 hover:bg-slate-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            readOnly
                            className=" p-2 text-center font-bold w-14"
                          />
                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                            className=" bg-slate-400 px-3 cursor-pointer text-white transition-all duration-500 hover:bg-slate-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className=" flex flex-col justify-center items-end pr-6">{`₹${
                        item.discountoffer
                          ? (item.price -
                              item.price * (item.discountpercent / 100)) *
                            item.quantity
                          : item.price * item.quantity
                      }`}</p>
                    </div>
                  ))}

                <div className=" flex flex-col justify-center items-center">
                  <div className=" border-t-2 mt-10 mx-auto px-12 md:px-40 box-border pt-16 pb-5 flex justify-center">
                    <p className=" text-xl px-2">Gross Total: </p>
                    <p className=" text-xl px-2">{`₹${cartItems.reduce(
                      (acc, item) =>
                        acc +
                        item.quantity *
                          (item.discountoffer
                            ? item.price -
                              item.price * (item.discountpercent / 100)
                            : item.price),
                      0
                    )}`}</p>
                  </div>
                  <Button
                    text="CHECK OUT"
                    onClick={checkoutHandler}
                    className=" border-2 rounded-lg border-black p-2 font-bold text-md text-black bg-white hover:bg-black hover:text-white transition-all duration-700 "
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
