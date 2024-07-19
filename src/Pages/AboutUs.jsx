import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ban8 from "../images/ban8.png";
import ban9 from "../images/ban9.jpg";
import map from "../images/map.jpg";
import "../styles/CustomStyles.css";
import { FaShippingFast } from "react-icons/fa";
import { SiGlitch } from "react-icons/si";
import { BsFillAwardFill } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";

const AboutUs = () => {
  const [counter, setCounter] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCounter((counter) => {
        if (counter <= 1000) {
          return counter + 1;
        }
        return counter;
      });
    }, 100);
    setInterval(() => {
      setCounter1((counter1) => {
        if (counter1 <= 25) {
          return counter1 + 1;
        }
        return counter1;
      });
    }, 300);
    setInterval(() => {
      setCounter2((counter2) => {
        if (counter2 <= 100) {
          return counter2 + 1;
        }
        return counter2;
      });
    }, 200);
    setInterval(() => {
      setCounter3((counter3) => {
        if (counter3 <= 13) {
          return counter3 + 1;
        }
        return counter3;
      });
    }, 250);
  }, []);

  return (
    <>
      <div className=" bg-white pb-5">
        <Navbar />

        <div className=" relative flex flex-col justify-center items-center">
          <img src={ban9} alt={"banner"} className=" w-full h-auto" />
          <h3 className=" absolute top-1/2 left-20 z-20 text-black text-5xl font-black hover:cursor-pointer parent">
            About Us
          </h3>
        </div>
        <div className=" lg:flex justify-center items-center relative my-20">
          <div className=" z-10 w-screen h-auto lg:w-1/2 px-20 lg:-mr-32">
            <h3 className=" text-black text-4xl font-black my-10">
              Why should I use OH!Food?
            </h3>
            <p>
              OH!Food (Innovative Retail Concepts Private Limited) is India’s
              largest online food and grocery store. With over 18,000 products
              and over a 1000 brands in our catalogue you will find everything
              you are looking for. Right from fresh Fruits and Vegetables, Rice
              and Dals, Spices and Seasonings to Packaged products, Beverages,
              Personal care products, Meats – we have it all.
            </p>
            <br />
            <p>
              Choose from a wide range of options in every category, exclusively
              handpicked to help you find the best quality available at the
              lowest prices. Select a time slot for delivery and your order will
              be delivered right to your doorstep, anywhere in Bangalore,
              Hyderabad, Mumbai, Pune, Chennai, Delhi, Noida, Mysore,
              Coimbatore, Vijayawada-Guntur, Kolkata, Ahmedabad-Gandhinagar,
              Lucknow-Kanpur, Gurgaon, Vadodara, Visakhapatnam, Surat, Nagpur,
              Patna, Indore and Chandigarh Tricity You can pay online using your
              debit / credit card or by cash / sodexo on delivery.
            </p>
            <br />
            <p>We guarantee on time delivery, and the best quality!</p>
          </div>
          <div className=" w-screen h-auto lg:w-1/2 px-20">
            <img src={map} alt={"banner"} />
          </div>
        </div>

        <div className=" grid md:grid-cols-2 lg:grid-cols-4 justify-items-center mb-20">
          <div className="flex flex-col justify-center items-center my-5">
            <FaShippingFast className=" text-7xl my-5 text-zinc-700" />
            <h3 className=" text-2xl font-bold text-zinc-700">Free Shipping</h3>
          </div>
          <div className="flex flex-col justify-center items-center my-5">
            <SiGlitch className=" text-7xl my-5 text-zinc-700" />
            <h3 className=" text-2xl font-bold text-zinc-700">Always Fresh</h3>
          </div>
          <div className="flex flex-col justify-center items-center my-5">
            <BsFillAwardFill className=" text-7xl my-5 text-zinc-700" />
            <h3 className=" text-2xl font-bold text-zinc-700">
              Superior Quality
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center my-5">
            <MdSupportAgent className=" text-7xl my-5 text-zinc-700" />
            <h3 className=" text-2xl font-bold text-zinc-700">24/7 Support</h3>
          </div>
        </div>

        <div className=" block md:relative md:flex md:justify-start md:items-center md:mb-60">
          <img src={ban8} alt={"banner"} className=" w-full md:w-2/3 h-auto" />
          <div className=" w-full md:w-1/3 h-auto bg-zinc-300 z-10 ">
            <div className=" grid grid-cols-2 justify-items-center py-20">
              <div className=" flex flex-col justify-center items-center my-10">
                <h3 className=" text-5xl text-black font-bold">{counter}</h3>
                <p className=" text-xl text-black font-light">
                  Happy Customers
                </p>
              </div>
              <div className=" flex flex-col justify-center items-center my-10">
                <h3 className=" text-5xl text-black font-bold">{counter1}</h3>
                <p className=" text-xl text-black font-light">Branches</p>
              </div>
              <div className=" flex flex-col justify-center items-center my-10">
                <h3 className=" text-5xl text-black font-bold">{counter2}</h3>
                <p className=" text-xl text-black font-light">Partners</p>
              </div>
              <div className=" flex flex-col justify-center items-center my-10">
                <h3 className=" text-5xl text-black font-bold">{counter3}</h3>
                <p className=" text-xl text-black font-light">Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
