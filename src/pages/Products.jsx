import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../actions/productAction";
import ProductCard from "../components/ProductCard";
import { useParams, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import "../styles/CustomStyles.css";
import Slider from "@material-ui/core/Slider";
import Typography from "@mui/material/Typography";
import { clearErrors } from "../actions/productAction";
import ban10 from "../images/ban10.jpg";

const Products = () => {
  const categories = ["Fruits", "Vegetables", "Dairy Products", "Meat"];

  const dispatch = useDispatch();
  let { keyword } = useParams();
  const { search } = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, productsCount, resultPerPage, error } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    const query = new URLSearchParams(search);
    if (query.get("category")) {
      setCategory(query.get("category"));
    }
  }, [search]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <>
      <div className=" bg-white pb-96">
        <Navbar />
        <div className=" relative flex flex-col justify-center items-center">
          <img src={ban10} alt={"banner"} className=" w-full h-auto" />
          <h3 className=" absolute top-1/2 left-20 z-20 text-black text-5xl font-black hover:cursor-pointer parent">
            Shop
          </h3>
        </div>
        {/* <h2 className=" flex justify-center items-center text-5xl text-black font-black mt-32 mb-10">
          Shop
        </h2> */}

        <div className=" block md:flex md:justify-center mt-32 ">
          <div className=" w-3/4 flex flex-col h-auto md:w-1/4 px-20 ">
            <div>
              <div className=" mb-4 text-xl hover-underline-animation">
                {" "}
                Filters
              </div>
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={1000}
              />

              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>
          </div>
          <div className=" border-l-[0.4px] border-gray-400 border-opacity-25 w-full md:w-3/4">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2 justify-items-center mx-5">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {resultPerPage < productsCount && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
