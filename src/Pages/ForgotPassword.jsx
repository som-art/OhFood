import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../actions/userAction";

const ResetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert(message);
      setEmail("");
    }
  }, [dispatch, error, message]);

  return (
    <>  
      <div className=" bg-white pb-40">
        <Navbar /> 
        <div className="text-center w-screen h-auto text-5xl text-black mt-40 font-bold">
          Enter Email
        </div>
        <div className="text-center md:w-screen w-300px h-auto text-md text-slate-400 mt-3 mb-12 font-light">
        We will send you an email to reset your password.
        </div>
        <form className=" flex flex-col h-auto w-screen justify-center items-center" onSubmit={forgotPasswordSubmit}>
          <Input type="text" label="Email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Button text = "SEND" className="  hover:border-2 hover:border-black h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "/>
          <div className=" flex h-auto w-screen justify-center items-center mb-5">
            <hr className=" md:w-[215px] w-[115px] border-5 bg-slate-300 border-slate-300 mr-6" ></hr>
            <p className="text-xl text-left">or</p>
            <hr className=" md:w-[215px] w-[115px] border-5 bg-slate-300 border-slate-300 ml-6" ></hr>
          </div>
          <Button text = "CANCEL" 
          onClick={() => {
            history.push("/login");
          }}
          className="  border-2 border-slate-200 h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md text-black  hover:bg-black hover:text-white hover:border-black transition-all duration-700 "/>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default ResetPassword