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




function AdminRoutes() {

  return (
    <>
   
      <Routes>
        {/* Admin routes */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sub-categories" element={<Sub_Categories />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/items" element={<Items />} />
        <Route path="/user-selections" element={<User_Selections />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
