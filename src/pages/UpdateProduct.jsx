import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../actions/productAction";
import { useHistory, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import { UPDATE_PRODUCT_RESET } from "../constants/productConstants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Fruits", "Vegetables", "Dairy Products", "Meat"];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
                    <h1 className=" text-center w-[50%] p-6 mx-auto text-3xl mb-8">Update Product</h1>
                    <form
                        className=" flex flex-col justify-center items-center"
                        encType="multipart/form-data"
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
                                value={price}
                            />
                        </div>

                        <div>
                            <label htmlFor="Message" className="text-xl text-left ">
                            Product Description
                            </label><br />
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className=" border-2 border-slate-200 h-[300px] w-[300px] md:w-[500px] pl-3 mt-2 mb-5 "
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={" border-2 border-slate-200 h-12 md:w-[500px] pl-3 mt-2 mb-5 w-[300px]"}
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
                                value={stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                                className=" flex p-8 ml-8"
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                        className="  hover:border-2 hover:border-black h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "
                        text="UPDATE"
                        onClick={updateProductSubmitHandler}
                        disabled={loading ? true : false}
                        />
                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
};

export default UpdateProduct;