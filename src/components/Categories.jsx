import React from "react";
import C1 from "../images/C1.jpg";
import C2 from "../images/C2.jpg";
import C3 from "../images/C3.jpg";
import C4 from "../images/C4.jpg";
import "../styles/CustomStyles.css";
import { useHistory } from "react-router-dom";

const Categories = () => {
  const history = useHistory();
  const categories = [
    {
      id: "a",
      name: "Vegetables",
      price: "Rs 70",
      images: C1,
    },
    {
      id: "b",
      name: "Fruits",
      price: "Rs 35",
      images: C2,
    },
    {
      id: "c",
      name: "Dairy Products",
      price: "Rs 35",
      images: C3,
    },
    {
      id: "d",
      name: "Meat",
      price: "Rs 120",
      images: C4,
    }
  ];
  return (
    <>
      <div className=" flex justify-center items-center m-20">
        <h3 className=" text-5xl">Categories</h3>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-2 justify-items-center ml-5 mr-5">
        {categories.map((category, i) => {
          return (
            <div className=" m-4 relative drop-shadow-xl">
              <div className=" z-20 absolute top-10 left-3 text-md lg:text-2xl hover-underline-animation hover:cursor-pointer"
              onClick={() => {history.push(`/products?category=${category.name}`)}}
              >
                {category.name}
              </div>
              <img
                src={category.images}
                alt="category"
                className=" w-full md:w-[400px] h-auto hover:cursor-pointer parent"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
