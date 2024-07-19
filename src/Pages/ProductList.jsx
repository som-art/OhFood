import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../actions/productAction";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../components/Sidebar";
import { DELETE_PRODUCT_RESET } from "../constants/productConstants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/CustomStyles.css"

const ProductList = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [deleteError, dispatch, error, history, isDeleted]);

  const columns = [
    { 
        field: "id", 
        headerName: "Product ID", 
        headerClassName: " bg-orange-600 border-none text-white font-extrabold",
        minWidth: 200, 
        flex: 0.5 
    },

    {
      field: "name",
      headerName: "Name",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 250,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 270,
      flex: 0.5,
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
            <div onClick={() => {history.push(`/admin/product/${params.getValue(params.id, "id")}`)}}>
              <EditIcon />
            </div>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
        <div className=" bg-white pb-20">
            <Navbar />
            <div className=" w-full grid grid-cols-[1fr_5fr]">
                <Sidebar />
                <div className=" w-full box-border flex flex-col border-l-2 border-slate-300 py-12 mt-20">
                <h1 className=" text-center w-[50%] p-6 mx-auto text-3xl mb-8">All Products</h1>

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

export default ProductList;