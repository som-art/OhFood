import React from "react";
import Navbar from "../components/Navbar";
import Carousels from "../components/Carousels";
import Categories from "../components/Categories";
import ProductLessDetails from "../components/ProductLessDetails";
import Footer from "../components/Footer";
import HomeBanners from "../components/HomeBanners";

const Home = () => {
  return (
    <>
      <div className=" bg-white">
        <Navbar />
        <Carousels />
        <Categories />
        <ProductLessDetails />
        <HomeBanners />
      </div>
      <Footer />
    </>
  );
};

export default Home;
