import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../actions/userAction";

const Register = () => {
  const history = useHistory();
  
  const dispatch = useDispatch();

  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(error && error!=="Please Login to access this resource") {
      alert(error);
      setUser({
        name: "",
        email: "",
        password: "",
      });
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push("/account");
    }
  }, [dispatch, history, isAuthenticated, error]);

  return (
    <>
      <div className=" bg-white pb-40">
        <Navbar />
        <div className=" text-center w-screen h-auto text-lg text-black mt-28 hover:cursor-pointer font-light">
            <span onClick = {() => { history.push("/")}}>Home /</span><span onClick = {() => { history.push("/register")}}> Register</span>
          </div> 
        <div className="text-center w-screen h-auto text-5xl text-black mt-6 font-bold mb-12">
          Register
        </div>
        <form className=" flex flex-col h-auto w-screen justify-center items-center">
          <Input type="text" label= "Name" name="name" placeholder="Name" value={name} onChange={registerDataChange}/>
          <Input type="text" label="Email" name="email" placeholder="Email" value={email} onChange={registerDataChange}/>
          <Input type="password" label="Password" name="password" placeholder="Password" value={password} onChange={registerDataChange}/>
          <p className="text-md text-left text-slate-400 mb-3 md:w-[500px] w-[300px] font-light">Your personal data will
          be used to support your experience throughout this website, to manage access to your account, 
          and for other purposes described in our
          <b 
          onClick={() => {
            history.push("/privacy-policy");
          }}
          target="_blank" className="text-black hover:cursor-pointer"> privacy policy</b></p>
          <Button text = "REGISTER" className="  hover:border-2 hover:border-black h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "
          onClick={registerSubmit}
          />
          <div className=" flex h-auto w-screen justify-center items-center mb-5">
            <hr className=" md:w-[215px] w-[115px] border-5 bg-slate-300 border-slate-300 mr-6" ></hr>
            <p className="text-xl text-left">or</p>
            <hr className=" md:w-[215px] w-[115px] border-5 bg-slate-300 border-slate-300 ml-6" ></hr>
          </div>
          <Button text = "LOG IN" 
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

export default Register