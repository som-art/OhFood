import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ban7 from "../images/ban7.jpg";
import Button from "../components/Button";
import {
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";

const ContactUs = () => {
  return (
    <>
      <div className=" bg-white pb-20">
        <Navbar />
        <div className=" block md:flex items-top">
          <div className="block w-full md:w-2/3">
            <img src={ban7} alt={"banner"} className=" w-full h-auto top-0" />
          </div>
          <div className=" px-20 mt-40">
            <h3 className=" text-5xl mt-5 text-black font-black mb-20">
              Contact
            </h3>
            <p className=" text-xl text-black font-bold my-5">Address</p>
            <p className=" text-xl text-black font-light mb-10">
              16 Boulevard Saint-Germain
              <br />
              75005 Paris,
              <br />
              France
            </p>
            <p className=" text-xl text-black font-bold my-5">Email</p>
            <p className=" text-xl text-black font-light mb-10">
            oh_food@yahoo.com
            </p>
            <p className=" text-xl text-black font-bold my-5">Telephone</p>
            <p className=" text-xl text-black font-light mb-10">
              +33 (0) 31-305-210
              <br />
              mo – fri: 09:00 – 17:00
            </p>
            <div className=" flex justify-start items-center">
              <AiFillTwitterCircle className=" text-4xl mx-3 hover:text-zinc-400 hover:cursor-pointer" />
              <AiFillInstagram className=" text-4xl mx-3 hover:text-zinc-400 hover:cursor-pointer" />
              <AiFillFacebook className=" text-4xl mx-3 hover:text-zinc-400 hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
