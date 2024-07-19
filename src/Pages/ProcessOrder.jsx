import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../constants/orderConstants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <>
      <div className=" bg-white pb-20">
        <Navbar />
        <div className=" w-full grid grid-cols-[1fr_5fr]">
          <Sidebar />
          <div className=" w-full box-border flex flex-col border-l-2 border-slate-300 py-12 mt-20">
            {loading ? (
              <Loader />
            ) : (
              <div
                className=""
                style={{
                  display: order.orderStatus === "Delivered" ? "block" : "grid",
                }}
              >
                <div>
                  <div className=" text-center mb-5  bg-white">
                    <div className="pb-3  text-xl  text-slate-900 underline underline-offset-4">
                      Shipping Info
                    </div>
                    <div className="text-base  text-slate-600 mb-6">
                      <div className=" flex justify-center items-center">
                        <p>Name:</p>
                        <span className="text-black tracking-wider ml-3">
                          {order.user && order.user.name}
                        </span>
                      </div>
                      <div className=" flex justify-center items-center">
                        <p>Phone:</p>
                        <span className="text-black tracking-wider ml-3">
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div className=" flex justify-center items-center">
                        <p>Address:</p>
                        <span className="text-black tracking-wider ml-3">
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>

                    <div className="pb-3  text-xl  text-slate-900 underline underline-offset-4">
                      Payment
                    </div>
                    <div className="text-base  text-slate-600 mb-6">
                      <div className=" flex justify-center items-center">
                        <p>Payment Status:</p>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "Paid"
                              ? "text-green-500 tracking-wider ml-3"
                              : "text-red-500 tracking-wider ml-3"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "Paid"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>

                      <div className=" flex justify-center items-center">
                        <p>Amount:</p>
                        <span className="text-black tracking-wider ml-3">
                          ₹{order.totalPrice && order.totalPrice}
                        </span>
                      </div>
                    </div>

                    <div className="pb-3  text-xl  text-slate-900 underline underline-offset-4">
                      Order Status
                    </div>
                    <div className="text-base  text-slate-600 mb-6">
                      <div className=" flex justify-center items-center">
                        <p>Delivery Status:</p>
                        <p
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "text-green-500 tracking-wider ml-3"
                              : "text-red-500 tracking-wider ml-3"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center pb-5    bg-white">
                    <div className="pb-3  text-xl  text-slate-900 underline underline-offset-4">
                      Your Cart Items:
                    </div>
                    <div className="text-base  text-slate-600 mb-6 mt-3">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div
                            key={item.product}
                            className="flex items-center justify-center mb-3"
                          >
                            <div
                              onClick={() => {
                                history.push(`/product/${item.product}`);
                              }}
                              className="text-black text-xl font-semibold tracking-wider"
                            >
                              {item.name} :
                            </div>
                            <span>
                              {item.quantity} X ₹{item.price} ={" "}
                              <b>₹{item.price * item.quantity}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="text-center pb-5  text-xl  text-slate-900  bg-white"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1 className="pb-3  text-xl  text-slate-900 underline underline-offset-4">
                      Process Order
                    </h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProcessOrder;
