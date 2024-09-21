import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useHistory, useLocation } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../actions/userAction";
import Loader from "../components/Loader";

const Login = () => {
  const history = useHistory();
  // const { search } = useLocation();

  const dispatch = useDispatch();

  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => { 
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  }

  // const query = new URLSearchParams(search);
  // const redirect = query? query.get("redirect") : "/account";

  useEffect(() => {
    if(error && error!=="Please Login to access this resource") {
      alert(error);
      setLoginEmail("");
      setLoginPassword("");
      dispatch(clearErrors());
    }
    
    if (isAuthenticated) {
      history.push("/account");
    }
  }, [dispatch, history, isAuthenticated, error]);

  return (
    <>
      {loading ? (
          <Loader />
        ) : (
        <>
          <div className=" bg-white pb-40">
            <Navbar />
            <div className=" text-center w-screen h-auto text-lg text-black mt-28 hover:cursor-pointer font-light">
              <span onClick = {() => { history.push("/")}}>Home /</span><span onClick = {() => { history.push("/login")}}> Account</span>
            </div> 
            <div className="text-center w-screen h-auto text-5xl text-black mt-6 font-bold mb-12">
              Log in
            </div>
            <form className=" flex flex-col h-auto w-screen justify-center items-center">
              <Input type="text" label="Email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
              <Input type="password" label="Password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
              <p onClick={() => {
                history.push("/password/forgot");
              }}
              className="text-xl text-left mb-3 hover:cursor-pointer">Forgot your password?</p>
              <Button text = "LOG IN" className="  hover:border-2 hover:border-black h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "
              onClick = {loginSubmit}
              />
              <div className=" flex h-auto w-screen justify-center items-center mb-5">
                <hr className=" md:w-[215px] w-[115px] border-5 bg-slate-300 border-slate-300 mr-6" ></hr>
                <p className="text-xl text-left">or</p>
                <hr className=" md:w-[215px] w-[115px] border-5 bg-slate-300 border-slate-300 ml-6" ></hr>
              </div>
              <Button text = "CREATE AN ACCOUNT" 
              onClick={() => {
                history.push("/register");
              }}
              className="  border-2 border-slate-200 h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md text-black  hover:bg-black hover:text-white hover:border-black transition-all duration-700 "/>
            </form>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Login;
