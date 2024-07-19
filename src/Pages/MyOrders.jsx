import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../actions/orderAction";
import Loader from "../components/Loader";
import { useHistory } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", 
    headerName: "Order ID", 
    headerClassName: " bg-orange-600 border-none text-white font-extrabold",
    minWidth: 300, 
    flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            onClick={() =>
              history.push(`/order/${params.getValue(params.id, "id")}`)
            }
          >
            <LaunchIcon />
          </div>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" bg-white pb-20">
            <Navbar />
            <div className=" text-center pb-5 box-border text-2xl pt-36 text-slate-900 transition-all duration-500 bg-slate-300">
              {user.name}'s Orders
            </div>

            <div className=" w-full mt-10 px-16 box-border bg-white  flex flex-col">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className=" bg-white"
                autoHeight
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default MyOrders;
