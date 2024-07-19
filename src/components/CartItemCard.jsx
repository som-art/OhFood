import React from "react";
import { useHistory } from "react-router-dom";
import P3 from "../images/P3.jpg";
import Button from "../components/Button";

const CartItemCard = ({ item, deleteCartItems }) => {
  const history = useHistory();

  return (
    <div className=" block md:flex md:justify-around md:items-start box-border my-5">
      <img src={item.image} alt="item" className=" w-[200px] md:w-[180px]" />
      {/* <img src={item.image} alt="item" /> */}
      <div className=" flex flex-col justify-center m-auto">
        <div
          onClick={() => {
            history.push(`/product/${item.product}`);
          }}
          className=" cursor-pointer"
        >
          {item.name}
        </div>
        <span>{`Price: ₹${
          item.discountoffer
            ? item.price - item.price * (item.discountpercent / 100)
            : item.price
        }`}</span>
        <Button
          text="REMOVE"
          className=" border-2 rounded-lg border-black p-2 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "
          onClick={() => deleteCartItems(item.product)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
