import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../actions/productAction";
import { getAllOrders } from "../actions/orderAction";
import { getAllUsers } from "../actions/userAction";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/CustomStyles.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
      <>
        <div className=" bg-white pb-20">
            <Navbar />
            <div className=" w-full grid grid-cols-[1fr_5fr]">
            <Sidebar />

            <div className=" border-l-2 border-slate-300 py-12 mt-20">
                <div className=" text-center w-[50%] p-6 mx-auto text-3xl">Dashboard</div>

                <div className=" m-8">
                    <div className=" flex justify-center">
                        <p className=" bg-blue-400 text-white text-xl text-center p-6 w-full mx-8">
                        Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className=" flex justify-center">
                        <div onClick={() => {history.push("/admin/products")}} className=" text-2xl text-center bg-red-400 p-6 m-6 w-40 h-40 rounded-full flex flex-col justify-center items-center">
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </div>
                        <div onClick={() => {history.push("/admin/orders")}} className=" text-2xl text-center bg-yellow-400 p-6 m-6 w-40 h-40 rounded-full flex flex-col justify-center items-center">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </div>
                        <div onClick={() => {history.push("/admin/users")}} className=" text-2xl text-center bg-blue-400 p-6 m-6 w-40 h-40 rounded-full flex flex-col justify-center items-center">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </div>
                    </div>
                </div>

                <div className="lineChart">
                    <Chart type="line" data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Chart type="doughnut" data={doughnutState} />
                </div>
            </div>
            </div>
        </div>
        <Footer />
    </> 
  );
};

export default Dashboard;