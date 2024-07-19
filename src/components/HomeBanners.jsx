import React from 'react';
import ban4 from "../images/ban4.jpg";
import ban5 from "../images/ban5.jpg";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";

const HomeBanners = () => {
    const history = useHistory();  
  return (
    <>
        <div className=" flex flex-col justify-center items-center m-20">
          <h3 className=" text-2xl my-2">We provide fresh groceries.</h3>
          <p className=" text-lg text-slate-400 tracking-wider my-2 text-center">Looks so Good on the Outside, It'll Make You Feel Good Inside</p>
          <Button text = "SHOP NOW" className="  hover:border-2 hover:border-black h-16 w-[300px] mt-3 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700" onClick = {() => { history.push("/products")}}/>
        </div>
        <div className=" block md:flex justify-center items-center w-screen h-auto mt-20">
          <div className=" flex justify-center relative w-screen md:w-1/2 ">
            <img src={ban4} alt={"banner"}/>
            <div className=" z-10 absolute top-4 right-10">
              <h3 className="text-right text-3xl my-5 text-white">Visit Us</h3>
              <p className="text-right text-xl text-white">Head Office<br />
                16 Boulevard Saint-Germain<br />
                75005 Paris</p><br />
              <p onClick = {() => { history.push("/contact-us")}}
              className="text-right text-xl text-white hover:cursor-pointer underline underline-offset-4">Contact Us</p>
            </div>
          </div>
          <div className=" flex justify-center relative w-screen md:w-1/2 ">
            <img src={ban5} alt={"banner"}/>
            <div className=" z-10 absolute top-4 right-10">
              <h3 className="text-right text-3xl my-10 text-black">Follow Our Store <br />On Instagram</h3>
              <p onClick = {() => { history.push("/contact-us")}}
              className="text-right text-xl text-black hover:cursor-pointer underline underline-offset-4">@ohfood22</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default HomeBanners;