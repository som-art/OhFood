import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Menu = ({ className }) => {
  const [showNav, setShowNav] = useState(false);
  const handleClick = () => {
    setShowNav(!showNav);
  };
  const history = useHistory();
  
  return (
    <div className={className}>
      <div onClick={handleClick} className=" xl:hidden absolute top-2">
        <GiHamburgerMenu className=" h-6 w-auto m-7 hover:cursor-pointer" />
      </div>
      <div
        onClick={handleClick}
        className={
          (showNav ? "left-0" : "-left-full") +
          " top-5 fixed h-auto w-96  bg-white drop-shadow-md transition-all duration-750 ease-in xl:hidden z-10"
        }
      >
        <div className="flex flex-col m-10 text-xl ">
          <div
            className=" p-4 hover:text-zinc-400 transition-all duration-750 ease-in hover:cursor-pointer"
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </div>
          <div
            className=" p-4 hover:text-zinc-400 transition-all duration-750 ease-in hover:cursor-pointer"
            onClick={() => {
              history.push("/products");
            }}
          >
            Shop
          </div>
          <div
            className=" p-4 hover:text-zinc-400 transition-all duration-750 ease-in hover:cursor-pointer"
            onClick={() => {
              history.push("/about-us");
            }}
          >
            About Us
          </div>
          <div
            className=" p-4 hover:text-zinc-400 transition-all duration-750 ease-in hover:cursor-pointer"
            onClick={() => {
              history.push("/contact-us");
            }}
          >
            Contact Us
          </div>
        </div>
      </div>
      <div className=" hidden h-16  justify-around items-center xl:flex text-lg ">
        <div
          className=" p-6 hover:text-zinc-400 transition-all duration-750 ease-in font-extrabold hover:cursor-pointer"
          onClick={() => {
            history.push("/");
          }}
        >
          Home
        </div>
        <div
          className=" p-6 hover:text-zinc-400 transition-all duration-750 ease-in font-extrabold hover:cursor-pointer"
          onClick={() => {
            history.push("/products");
          }}
        >
          Shop
        </div>
        <div
          className=" p-6 hover:text-zinc-400 transition-all duration-750 ease-in font-extrabold hover:cursor-pointer"
          onClick={() => {
            history.push("/about-us");
          }}
        >
          About Us
        </div>
        <div
          className=" p-6 hover:text-zinc-400 transition-all duration-750 ease-in font-extrabold hover:cursor-pointer"
          onClick={() => {
            history.push("/contact-us");
          }}
        >
          Contact Us
        </div>
      </div>
    </div>
  );
};

export default Menu;
