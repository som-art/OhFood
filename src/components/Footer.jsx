import React from "react";
import {
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import Pay from "../images/Pay.jpg";

const Footer = () => {
  return (
    <div className=" flex flex-col  w-screen h-32 mt-10 md:flex-row justify-around items-center sticky bottom-0 -z-10">
      <div className=" flex justify-center items-center">
        <AiFillTwitterCircle className=" text-2xl mx-3 hover:text-zinc-400 hover:cursor-pointer" />
        <AiFillInstagram className=" text-2xl mx-3 hover:text-zinc-400 hover:cursor-pointer" />
        <AiFillFacebook className=" text-2xl mx-3 hover:text-zinc-400 hover:cursor-pointer" />
      </div>
      <div className="font-light tracking-wider mt-4">
        2022 <span className=" font-bold">Oh!Food</span> all rights reserved.
      </div>
      <div>
        <img src={Pay} alt={"Cards"} className=" h-14" />
      </div>
    </div>
  );
};

export default Footer;
