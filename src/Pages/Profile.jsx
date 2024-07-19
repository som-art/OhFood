import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userAction";
import { useHistory } from "react-router-dom";
import profile from "../images/profile.jpg";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
  }

  return (
    <>
      <div className=" bg-white pb-10">
        <Navbar />
        <div className=" block md:flex">
          <div className="block w-full md:w-1/2">
            <img src={profile} alt={"banner"} className=" md:relative w-full h-auto md:top-1/2 md:-translate-y-1/2" />
          </div>
          <div className=" px-20 mt-40">
          <h3 className=" text-5xl mt-5 text-black font-black pb-5">
            My Profile
          </h3>
          <h3
            onClick={() => {
              history.push("/me/update");
            } }
            className=" text-lg mb-3 text-gray-600 underline underline-offset-1 cursor-pointer"
          >
            Edit Profile
          </h3>
        
          <p className=" text-xl text-black font-bold my-5">Name</p>
          <p className=" text-2xl text-black font-light mb-10">
            {user.name}
          </p>
          <p className=" text-xl text-black font-bold my-5">Email</p>
          <p className=" text-2xl text-black font-light mb-10">
            {user.email}
          </p>
          <p className=" text-xl text-black font-bold my-5">Joined on</p>
          <p className=" text-2xl text-black font-light mb-10">
            {String(user.createdAt).substr(0, 10)}
          </p>
        <h3
          onClick={() => {
            history.push("/orders");
          } }
          className=" underline underline-offset-1 cursor-pointer text-gray-600 text-lg mb-3"
        >
          My Orders
        </h3>
        {user.role === "admin" && (
          <h3
            onClick={() => {
              history.push("/admin/dashboard");
            } }
            className=" underline underline-offset-1 cursor-pointer text-gray-600 text-lg mb-3"
          >
            Dashboard
          </h3>
        )}
        <h3
          onClick={() => {
            history.push("/password/update");
          } }
          className=" underline underline-offset-1 cursor-pointer text-gray-600 text-lg mb-3"
        >
          Change Password
        </h3>

        <Button
          text="LOG OUT" 
          className=" border-2 rounded-lg border-black p-2 font-bold text-md hover:text-black hover:bg-white bg-black text-white transition-all duration-700 "
          onClick={logoutUser} />
      </div>
      </div>
      </div>
    <Footer />
    </>
  );
};

export default Profile;
