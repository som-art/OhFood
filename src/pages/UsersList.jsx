import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../actions/userAction";
import { DELETE_USER_RESET } from "../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, history, isDeleted, message]);

  const columns = [
    { 
        field: "id",
        headerName: "User ID", 
        headerClassName: " bg-orange-600 border-none text-white font-extrabold",
        minWidth: 120, 
        flex: 0.6 
    },

    {
      field: "email",
      headerName: "Email",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      headerClassName: " bg-orange-600 border-none text-white font-extrabold",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <div onClick={() =>{history.push(`/admin/user/${params.getValue(params.id, "id")}`)}}>
              <EditIcon />
            </div>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
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
                    <h1 className=" text-center w-[50%] p-6 mx-auto text-3xl mb-8">All Users</h1>

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

export default UsersList;