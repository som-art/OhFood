import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { UPDATE_USER_RESET } from "../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../actions/userAction";
import Loader from "../components/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
    <div className=" bg-white pb-20">
        <Navbar />
          <div className=" w-full grid grid-cols-[1fr_5fr]">
              <Sidebar />
              <div className=" border-l-2 border-slate-300 py-12 mt-20">
              {loading ? (
                <Loader />
                  ) : (
                  <>
                    <h1 className=" text-center w-[50%] p-6 mx-auto text-3xl mb-8">Update User</h1><form
                    className=" flex flex-col justify-center items-center"
                    encType="multipart/form-data"
                    >
                    <div>
                      <Input
                        type="text"
                        placeholder="Name"
                        label="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        label="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                      <select value={role} onChange={(e) => setRole(e.target.value)} className={" border-2 border-slate-200 h-12 md:w-[500px] pl-3 mt-2 mb-5 w-[300px]"}>
                        <option value="">Choose Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>

                    <Button
                      className="  hover:border-2 hover:border-black h-16 md:w-[500px] w-[300px] mt-2 mb-5 font-bold text-md hover:text-black hover:bg-white bg-black text-white  transition-all duration-700 "
                      text="UPDATE"
                      onClick={updateUserSubmitHandler}
                      disabled={
                        updateLoading ? true : false || role === "" ? true : false
                      } />
                  </form>
                </>
                )}
              </div>
            </div>
        </div>
        <Footer />
    </>
  );
};

export default UpdateUser;