import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import UserProfile from "../components/User/UserProfile";
import UserAccount from "../components/User/UserAccount";




function EmployeeRoutes() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Routes>
          {/* Admin routes */}

          <Route path="/" element={<UserAccount />} />
          <Route path="/user-account" element={<UserAccount />} />
          <Route path="/user-profile" element={<UserProfile />} />

        
        </Routes>
      </div>
    </>
  );
}

export default EmployeeRoutes;
