import React from "react";
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";

const Sidebar = () => {
    const history = useHistory();
  return (
    <div className=" flex flex-col p-20 bg-white">
      <div onClick={() => {history.push("/")}} className=" mb-8">
        <img src={logo} alt="OhFood" className=" w-full transition-all duration-500 hover:drop-shadow-md"/>
      </div>
      <div onClick={() => {history.push("/admin/dashboard")}} className=" text-lg p-8 hover:text-orange-600">
        <p className=" flex items-center">
          <DashboardIcon /> 
          Dashboard
        </p>
      </div>
      <div onClick={() => {history.push("/admin/products")}} className=" text-lg p-8 hover:text-orange-600">
        <p className=" flex items-center">
          <PostAddIcon />
          All Products
        </p>
      </div>
      <div onClick={() => {history.push("/admin/product")}} className=" text-lg p-8 hover:text-orange-600">
        <p className=" flex items-center">
          <AddIcon />
          Create Product
        </p>
      </div>
      <div onClick={() => {history.push("/admin/orders")}} className=" text-lg p-8 hover:text-orange-600">
        <p className=" flex items-center">
          <ListAltIcon />
          Orders
        </p>
      </div>
      <div onClick={() => {history.push("/admin/users")}} className=" text-lg p-8 hover:text-orange-600">
        <p className=" flex items-center">
          <PeopleIcon /> Users
        </p>
      </div>
    </div>
  );
};

export default Sidebar;