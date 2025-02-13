import React, { useEffect, useState } from "react";
import MainHeader from "../../pages/MainHeader";

import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import UserSider from "./UserSider";
import { useSelector } from "react-redux";
import Selected_Items_Cart from "./Selected_Items_Cart";

function UserAccount() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [categories, setCategories] = useState([]);
  const [userprofile, setUserProfile] = useState([]);
  const [customProjectType, setCustomProjectType] = useState("");

  const [employees, setEmployees] = useState([]);
  const [currentLead, setCurrentLead] = useState({
    user_id: "",
    name: "",
    email: "",
    plot_area: "",
    project_type: "",
    construction_area: "",
    no_floor: "",
    tower: "",
    balcony: "",
    total_construction_area: "",
    budgest: "",
    
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [leadsPerPage, setLeadsPerPage] = useState(10);

  const [loading, setLoading] = useState(false);

  // Fetch leads and employees from the API
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/user-profile/${user.id}`);
      setUserProfile(response.data[0]);
      console.log(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the currentLead state
    setCurrentLead((prevLead) => {
      const updatedLead = { ...prevLead, [name]: value };

      // Automatically calculate total construction area
      if (
        name === "construction_area" ||
        name === "no_floor" ||
        name === "tower" ||
        name === "balcony"
      ) {
        const constructionArea = parseFloat(updatedLead.construction_area) || 0;
        const noFloor = parseInt(updatedLead.no_floor, 10) || 0;
        const tower = parseFloat(updatedLead.tower) || 0;
        const balcony = parseFloat(updatedLead.balcony) || 0;

        updatedLead.total_construction_area =
          constructionArea * noFloor + tower + balcony;
      }

      return updatedLead;
    });
  };


  const handleCustomProjectTypeChange = (e) => {
    setCustomProjectType(e.target.value);
  };


  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentLead({
     
     
      plot_area: "",
      project_type: "",
      construction_area: "",
      no_floor: "",
      tower: "",
      balcony: "",
      total_construction_area: "",
      budgest: "",
      
    });
    setCustomProjectType('');
    setShowPopup(true);
  };

  const handleEditClick = (userprofile) => {
    setIsEditing(true);
    setCurrentLead({
      ...userprofile,
    });
    setShowPopup(true);
  };

  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/user-profile/${id}`);
        fetchUserProfile(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting categories:", error);
      }
    }
  };



  const saveChanges = async () => {
    console.log(currentLead);
   const UserProfileData = {
        ...currentLead,
        project_type:
          currentLead.project_type === "Other"
            ? customProjectType
            : currentLead.project_type,
            name: user.name,
            email: user.email,
            plot_area: currentLead.plot_area,
            budgest: currentLead.budgest,
            user_id: user.id, // Send user.id here
      };
  
  
    try {
      setLoading(true);
      if (isEditing) {
        // Update existing lead
        await axios.put(
          `http://localhost:9000/api/user-profile/${currentLead.user_id}`,
          UserProfileData
        );
        fetchUserProfile(); // Refresh the list
        closePopup();
      } else {
        // Create new lead
        await axios.post("http://localhost:9000/api/user-profile", UserProfileData);
  
        fetchUserProfile(); // Refresh the list
        closePopup();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error saving lead:", error);
      
    }
  };
  

  const closePopup = () => {
    setShowPopup(false);
    setErrors({});
  };

  // Calculate total number of pages
  const pageCount = Math.ceil(categories.length / leadsPerPage);

  // Pagination logic
  const indexOfLastLead = (currentPage + 1) * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads =
    leadsPerPage === Infinity
      ? categories
      : categories.slice(indexOfFirstLead, indexOfLastLead);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <MainHeader />
      <UserSider />
      <>
        <div className="container  2xl:ml-40 ">
          <div className="main 2xl:w-[89%] mt-[6rem]">
            <Selected_Items_Cart/>
            <h1 className="text-2xl text-center font-medium">User Account</h1>
            <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>

            {/* Button to create a new lead */}
            <div className="mb-4">
  {!userprofile && ( // Only render if userprofile has no data
    <button
      className="bg-blue-500 text-white px-4 py-2 mt-5 mx-1 rounded hover:bg-blue-700 font-medium"
      onClick={handleCreateClick}
    >
      Add User Profile
    </button>
  )}
</div>

          </div>

          <div className=" overflow-x-auto mt-4  2xl:w-[89%] mx-1">
          {userprofile? ( 
          <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="p-6">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{userprofile?.name}</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">User ID:</span> {userprofile?.user_id}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Email:</span> {userprofile?.email}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Plot Size:</span> {userprofile?.plot_area}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Project Type:</span> {userprofile?.project_type}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Construction Area:</span> {userprofile?.construction_area}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Number of Floor :</span> {userprofile?.no_floor}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Tower Area:</span> {userprofile?.tower}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Balcony Area:</span> {userprofile?.balcony}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Total Contruction Area:</span> {userprofile?.total_construction_area}
        </p>
      
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Budget:</span> ₹{userprofile?.budgest}
        </p>
 
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">After Selection Amount : -</span> {userprofile?.after_selection_amount == 0 ? "pending":userprofile.after_selection_amount}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Created Date:</span>{" "}
          {new Date(userprofile?.created_date).toLocaleString()}
        </p>
      </div>
      <div className="text-end">
      <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditClick(userprofile)}
                        >
                          <BsPencilSquare size={20} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 mx-2"
                          onClick={() => handleDeleteClick(userprofile.user_id)}
                        >
                          <BsTrash size={20} />
                        </button>
 </div>
                        </div>
          ):(
            <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="p-6">
       <h1 className="text-center font-bold text-2xl ">PleaseCreate User Profile By User Profile Button</h1>
      </div>
     
    </div>
          )}
          </div>


          {showPopup && ( 
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md p-6 mx-2 bg-white rounded-lg shadow-lg h-[65%] overflow-y-auto">
                <h2 className="text-xl mb-4">
                  {isEditing ? "Edit User Profile" : "Add User Profile"}
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Email Id</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Plot Area</label>
                  <input
                    type="number"
                    name="plot_area"
                    value={currentLead.plot_area}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Construction Area</label>
                  <input
                    type="number"
                    name="construction_area"
                    value={currentLead.construction_area}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Number of Floor</label>
                  <input
                    type="number"
                    name="no_floor"
                    value={currentLead.no_floor}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Tower</label>
                  <input
                    type="number"
                    name="tower"
                    value={currentLead.tower}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">balcony</label>
                  <input
                    type="number"
                    name="balcony"
                    value={currentLead.balcony}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Total Construction Area</label>
                  <input
                    type="number"
                    name="total_construction_area"
                    value={currentLead.total_construction_area}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Project Type</label>
   
                   <select
                    type="text"
                    name="project_type"
                    id="project_type"
                    value={currentLead.project_type}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Lead Source</option>

                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Semi Residential">Semi Residential</option>
                    <option value="Other">Other</option>
                  </select>
                  {currentLead.project_type === "Other" && (
                    <input
                      type="text"
                      value={customProjectType}
                      onChange={handleCustomProjectTypeChange}
                      placeholder="Enter Your Project Type"
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Budgest</label>
                  <input
                    type="number"
                    name="budgest"
                    value={currentLead.budgest}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                    onClick={saveChanges}
                    disabled={loading}
                  >
                    {loading ? "Save..." : "Save"}
                  </button>

                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    onClick={closePopup}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}

export default UserAccount;
