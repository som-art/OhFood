import React, { useEffect } from "react";
// import P1 from "../images/P1.jpg";
// import P2 from "../images/P2.jpg";
// import P3 from "../images/P3.jpg";
// import P4 from "../images/P4.jpg";
// import P5 from "../images/P5.jpg";
// import P6 from "../images/P6.jpg";
// import P7 from "../images/P7.jpg";
// import P8 from "../images/P8.jpg";
import "../styles/CustomStyles.css";
import ProductCard from "./ProductCard";
import { getProduct, clearErrors } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

const ProductLessDetails = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  // const products1 = [
  //   {
  //     id: "asdfasdf",
  //     name: "Apples",
  //     price: "Rs 70",
  //     images: P1,
  //   },
  //   {
  //     id: "asdfasdf",
  //     name: "Onions",
  //     price: "Rs 35",
  //     images: P2,
  //   },
  //   {
  //     id: "asdfasdf",
  //     name: "Oranges",
  //     price: "Rs 35",
  //     images: P3,
  //   },
  //   {
  //     id: "asdfasdf",
  //     name: "Cheese",
  //     price: "Rs 120",
  //     images: P4,
  //   },
  //   {
  //     id: "asdfasdf",
  //     name: "Broccoli",
  //     price: "Rs 200",
  //     images: P5,
  //   },
  //   {
  //     id: "asdfasdf",
  //     name: "Eggs",
  //     price: "Rs 8",
  //     images: P6,
  //   },
  //   {
  //     id: "asdfasdf",
  //     name: "Fish",
  //     price: "Rs 300",
  //     images: P7,
  //   },
  //   {
  //     id: "asdfasdf",
  //     name: "Chicken",
  //     price: "Rs 200",
  //     images: P8,
  //   },
  // ];
  return (
    <>
      <div className=" flex justify-center items-center m-20">
        <h3 className=" text-5xl">Products</h3>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-2 justify-items-center ml-5 mr-5">
        {products.map((product, i) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </>
  );
};

export default ProductLessDetails;
