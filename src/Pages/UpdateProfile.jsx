import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { useHistory } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, history, user, isUpdated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" bg-white pb-40">
              <Navbar />
              <h2 className="text-center w-screen h-auto text-5xl text-black mt-40 font-bold mb-12">Update Profile</h2>

              <form
                className=" flex flex-col h-auto w-screen justify-center items-center"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                  <Input
                    type="text"
                    placeholder="Name"
                    label="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    label="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

export default UpdateProfile;