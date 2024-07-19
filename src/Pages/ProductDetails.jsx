import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactStars from "react-rating-stars-component";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../actions/productAction";
import { addItemsToCart } from "../actions/cartAction";
import { useParams } from "react-router-dom";
import { NEW_REVIEW_RESET } from "../constants/productConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, error } = useSelector((state) => state.productDetails);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    edit: false,
    precision: 0.5,
    color: "gray",
    activeColor: "#800000",
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  // const [discountprice, setDiscountprice] = useState(0);

  // const calculatediscount = () => {
  //   const p = product.price - (product.price * product.discountpercent) / 100;
  //   setDiscountprice(p);
  // };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (product.stock >= 1) {
      dispatch(addItemsToCart(id, quantity));
      alert("Item Added To Cart");
    } else {
      alert("Out of Stock");
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <>
      <div className=" bg-white">
        <Navbar />
        <div className=" block md:flex md:justify-center md:items-center mt-20">
          {product.images &&
            product.images.map((item, i) => (
              <img
                key={i}
                src={item.url}
                alt={`${i} Slide`}
                className=" w-full md:w-1/2 p-20"
              />
            ))}
          <div className=" p-20">
            <h3 className=" text-4xl font-extrabold">{product.name}</h3>
            <h2>₹ {product.price}</h2>
            {product.discountoffer != "" ? (
              <div>
                <h2 className="text-xl text-orange-700">
                  {product.discountoffer}
                </h2>
                <h2 className="text-xl text-orange-700">
                  {product.discountpercent}% Off
                </h2>
                <h1>
                  Discount Price: ₹{" "}
                  {product.price -
                    (product.price * product.discountpercent) / 100}
                </h1>
              </div>
            ) : (
              ""
            )}
            <div>
              <ReactStars
                edit={true}
                size={20}
                color="gray"
                activeColor="red"
                value={product.ratings}
              />
              <Button
                text="ADD RATING"
                onClick={submitReviewToggle}
                className=" border-2 rounded-lg border-black w-full p-2 font-bold text-md text-black bg-white hover:bg-black hover:text-white  transition-all duration-700 my-5"
              />
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="flex flex-col">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    text="CANCEL"
                    onClick={submitReviewToggle}
                    className=" border-2 rounded-lg border-black w-full p-2 font-bold text-md text-black bg-white hover:bg-black hover:text-white  transition-all duration-700 "
                  />
                  <Button
                    text="SUBMIT"
                    onClick={reviewSubmitHandler}
                    className=" border-2 rounded-lg border-black w-full p-2 font-bold text-md text-black bg-white hover:bg-black hover:text-white  transition-all duration-700 "
                  />
                </DialogActions>
              </Dialog>
            </div>
            <div className=" flex justify-left items-center">
              <button
                onClick={decreaseQuantity}
                className=" bg-slate-400 px-3 cursor-pointer text-white transition-all duration-500 hover:bg-slate-700"
              >
                -
              </button>
              <input
                readOnly
                type="number"
                value={quantity}
                className=" p-2 text-center font-bold w-14"
              />
              <button
                onClick={increaseQuantity}
                className=" bg-slate-400 px-3 cursor-pointer text-white transition-all duration-500 hover:bg-slate-700"
              >
                +
              </button>
            </div>
            <p>
              Status:
              <b
                className={
                  product.stock < 1 ? " text-red-500" : " text-green-600"
                }
              >
                {product.stock < 1 ? " Out Of Stock" : " In Stock"}
              </b>
            </p>
            <p className=" my-5">{product.description}</p>
            <Button
              onClick={addToCartHandler}
              text="ADD TO CART"
              className=" border-2 rounded-lg border-black w-full p-2 font-bold text-md text-black bg-white hover:bg-black hover:text-white  transition-all duration-700 "
            />
          </div>
        </div>
        <div className=" text-center block w-screen border-y-[1.2px] border-slate-600 h-20 border-opacity-40 md:flex md:justify-center md:items-center">
          <div className=" mt-3 md:m-10">
            <span className=" font-bold">Brand : </span>
            <span className=" text-gray-500">Oh!Food</span>
          </div>
          <div className=" mt-3 md:m-10">
            <span className=" font-bold">Category : </span>
            <span className=" text-gray-500">{product.category}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
