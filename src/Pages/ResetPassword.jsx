import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../actions/userAction";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { token } = useParams();
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token, myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert("Password Updated Successfully");
  
        history.push("/login");
      }
    }, [dispatch, error, history, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" bg-white pb-40">
              <Navbar />
              <h2 className="text-center w-screen h-auto text-5xl text-black mt-40 font-bold mb-12">Reset Password</h2>

              <form
                className=" flex flex-col h-auto w-screen justify-center items-center"
                encType="multipart/form-data"
                onSubmit={resetPasswordSubmit}
              >
                  <Input
                    type="password"
                    placeholder="New Password"
                    label="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                <Button text = "UPDATE" className="  hover:border-2 hover:border-black h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "/>
              </form>
            </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ResetPassword;