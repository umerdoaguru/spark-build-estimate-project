import React from "react";

import {  Route, Routes } from "react-router-dom";

import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminProfile from "../components/Admin/AdminProfile";
import MainHeader from "../pages/MainHeader";




function AdminRoutes() {

  return (
    <>
   
      <Routes>
        {/* Admin routes */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
