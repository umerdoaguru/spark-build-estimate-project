import React from "react";

import {  Route, Routes } from "react-router-dom";

import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminProfile from "../components/Admin/AdminProfile";
import MainHeader from "../pages/MainHeader";
import Categories from "../components/Admin/Categories";
import Sub_Categories from "../components/Admin/Sub_Categories";
import Items from "../components/Admin/Items";
import User_Selections from "../components/Admin/User_Selections";
import UserManagement from "../components/Admin/UserManagement";
import UserProfileEdit from "../components/Admin/UserProfileEdit";
import DiscountBar from "../components/Admin/DiscountBar";
import Headline from "../components/Admin/Headline";
import Comment from "../components/Admin/Comment";





function AdminRoutes() {

  return (
    <>
 
      <Routes>
        {/* Admin routes */}
        <Route path="/" element={<Categories />} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sub-categories" element={<Sub_Categories />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/items" element={<Items />} />
        <Route path="/user-selections" element={<User_Selections />} />
        <Route path="/user-profile-data/:id" element={<UserProfileEdit />} />
        <Route path="/discount-bar" element={<DiscountBar />} />
        <Route path="/headline" element={<Headline />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
