import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../actions/productAction";
import Button from "../components/Button";
import Input from "../components/Input";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { NEW_PRODUCT_RESET } from "../constants/productConstants";
import "../styles/CustomStyles.css";

const NewProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [discountoffer, setDiscountoffer] = useState("");
  const [discountpercent, setDiscountpercent] = useState(0);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Fruits", "Vegetables", "Dairy Products", "Meat"];

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("discountoffer", discountoffer);
    myForm.set("discountpercent", discountpercent);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    console.log(myForm);
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className=" bg-white pb-20">
        <Navbar />
        <div className=" w-full grid grid-cols-[1fr_5fr]">
          <Sidebar />
          <div className=" border-l-2 border-slate-300 py-12 mt-20">
            <h1 className=" text-center w-[50%] p-6 mx-auto text-3xl mb-8">
              Create Product
            </h1>
            <form
              encType="multipart/form-data"
              className=" flex flex-col justify-center items-center"
            >
              <div>
                <Input
                  type="text"
                  placeholder="Product Name"
                  label="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Price"
                  label="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="Message" className="text-xl text-left ">
                  Product Description
                </label>
                <br />
                <textarea
                  placeholder="Product Description"
                  value={description}
                  className=" border-2 border-slate-200 h-[300px] w-[300px] md:w-[500px] pl-3 mt-2 mb-5 "
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>

              <div>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className={
                    " border-2 border-slate-200 h-12 md:w-[500px] pl-3 mt-2 mb-5 w-[300px]"
                  }
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Stock"
                  label="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Offer Name"
                  label="Offer Name"
                  value={discountoffer}
                  onChange={(e) => setDiscountoffer(e.target.value)}
                />
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Discount Percentage"
                  label="Discount Percentage"
                  onChange={(e) => setDiscountpercent(e.target.value)}
                />
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  className=" flex p-8 ml-8"
                />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              <Button
                text="CREATE"
                className="  hover:border-2 hover:border-black h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "
                disabled={loading ? true : false}
                onClick={createProductSubmitHandler}
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewProduct;
