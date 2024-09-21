import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { useHistory } from "react-router-dom";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Profile Updated Successfully");

      history.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, history, isUpdated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" bg-white pb-40">
              <Navbar />
              <h2 className="text-center w-screen h-auto text-5xl text-black mt-40 font-bold mb-12">Update Password</h2>

              <form
                className=" flex flex-col h-auto w-screen justify-center items-center"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                  <Input
                    type="password"
                    placeholder="Old Password"
                    label="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    label="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

export default UpdatePassword;