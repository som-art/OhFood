import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../actions/orderAction";
import { DELETE_ORDER_RESET } from "../constants/orderConstants";
import "../styles/CustomStyles.css"

const OrderList = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { 
      field: "id", 
      headerName: "Order ID", 
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 200, 
      flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 150,
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
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      type: "number",
      minWidth: 170,
      flex: 0.4,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div onClick={() =>{history.push(`/admin/order/${params.getValue(params.id, "id")}`)}}>
              <EditIcon />
            </div>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
        <div className=" bg-white pb-20">
            <Navbar />
            <div className=" w-full grid grid-cols-[1fr_5fr]">
                <Sidebar />
                <div className=" w-full box-border flex flex-col border-l-2 border-slate-300 py-12 mt-20">
                    <h1 className=" text-center w-[50%] p-6 mx-auto text-3xl mb-8">All Orders</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className=" bg-white border-none"
                        autoHeight
                    />
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
};

export default OrderList;