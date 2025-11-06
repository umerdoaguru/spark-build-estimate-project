import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import UserProfile from "../components/User/UserProfile";
import UserAccount from "../components/User/UserAccount";
import SelectedCategories from "../components/User/SelectedCategories";
import SelectedSub_Categories from "../components/User/SelectedSub_Categories";
import Selecteditems from "../components/User/SeletedItems";
import EstimateCalculator from "../components/User/EstimateCalculator";
import Categories_Card from "../components/User/Categories_Card";
import UserAllSelecteditems from "../components/User/UserAllSelectedItems";
import AutoTypingHeadline from "../components/AutoTypingHeadline";





function EmployeeRoutes() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <AutoTypingHeadline />
        <Routes>
          {/* Admin routes */}

          <Route path="/" element={<UserAccount />} />
          <Route path="/user-account" element={<UserAccount />} />
          <Route path="/user-profile" element={<UserProfile />} />

          <Route path="/user-select-categories" element={<SelectedCategories />} />
        <Route path="/user-select-sub-categories" element={<SelectedSub_Categories />} />
     
        <Route path="/user-select-items" element={<Selecteditems />} />
        <Route path="/categories/:id" element={<EstimateCalculator />} />
        <Route path="/user-categories-cards" element={<Categories_Card />} />
        <Route path="/user-all-selection" element={<UserAllSelecteditems />} />
        </Routes>
      </div>
    </>
  );
}

export default EmployeeRoutes;
