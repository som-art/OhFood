import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearErrors } from "../actions/orderAction";
import Loader from "../components/Loader";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-white pb-20">
            <Navbar />
            <div className=" text-center pb-5 box-border text-2xl pt-36 text-slate-900 transition-all duration-500 bg-slate-300">
              Order #{order && order._id}
            </div>
            <div className="mt-24 flex flex-col justify-center items-center h-auto w-full">
              <div className="text-xl text-black mt-5 underline underline-offset-4 ">
                Shipping Info
              </div>
              <div>
                <div className="flex h-auto justify-center items-center mb-3 mt-5">
                  <p className=" text-gray-600 text-lg mr-2 ">Name: </p>
                  <span className=" tracking-wider font-semibold text-black">
                    {order.user && order.user.name}
                  </span>
                </div>
                <div className="flex h-auto justify-center items-center mb-3">
                  <p className=" text-gray-600 text-lg mr-2">Phone: </p>
                  <span className=" tracking-wider font-semibold text-black">
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex h-auto justify-center items-center mb-3">
                  <p className=" text-gray-600 text-lg mr-2">Address: </p>
                  <span className=" tracking-wider font-semibold text-black">
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <div className="border-b-[0.5px] border-black border-opacity-50 h-4 w-full"></div>
              <div className="text-xl text-black mt-5 underline underline-offset-4 ">
                Payment
              </div>
              <div className="flex flex-col justify-center items-center h-auto w-full">
                <div className="flex h-auto justify-center items-center mb-2">
                  <p
                    className={
                      (order.paymentInfo && order.paymentInfo.status === "Paid"
                        ? "text-green-500"
                        : "text-red-500") + " text-lg mt-5 "
                    }
                  >
                    {order.paymentInfo && order.paymentInfo.status === "Paid"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div className="flex h-auto justify-center items-center mb-3">
                  <p className=" text-gray-600 text-xl mr-2">Amount:</p>
                  <span className=" tracking-wider font-semibold text-black">
                    {order.totalPrice && order.totalPrice}
                  </span>
                </div>
              </div>
              <div className="text-xl text-black mt-2 underline underline-offset-4 ">
                Order Status
              </div>
              <div className="mt-3">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-500 text-xl"
                        : "text-red-500 text-xl"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-b-[0.5px] border-black border-opacity-50 h-4 w-full"></div>

            <div className="w-full h-auto flex flex-col justify-center items-center ">
              <div className="text-xl text-black mt-2 underline underline-offset-4 ">
                Order Items:
              </div>
              <div className="h-auto w-full text-center mt-4">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <div
                        className=" cursor-pointer tracking-wider font-semibold text-black"
                        onClick={() => {
                          history.push(`/product/${item.product}`);
                        }}
                      >
                        {item.name}
                      </div>
                      <span className="tracking-wider font-semibold text-black">
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default OrderDetails;
