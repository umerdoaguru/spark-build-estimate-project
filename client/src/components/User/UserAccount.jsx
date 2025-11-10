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
    no_floor: "",
    budgest: "",
    
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [leadsPerPage, setLeadsPerPage] = useState(10);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);


   
  const token = user?.token;

  // Fetch leads and employees from the API
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/user-profile/${user.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
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

      
      return updatedLead;
    });
  };


  const handleCustomProjectTypeChange = (e) => {
    setCustomProjectType(e.target.value);
  };


  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentLead({
     
     
      user_id: "",
    name: "",
    email: "",
    plot_area: "",
    no_floor: "",

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
        await axios.delete(`http://localhost:9000/api/user-profile/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }});
        fetchUserProfile(); // Refresh the list after deletion
        setRefresh(prev => !prev);
      } catch (error) {
        console.error("Error deleting categories:", error);
      }
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!currentLead.plot_area) {
      formErrors.plot_area = "Plot Area is required";
      isValid = false;
    }

    if (!currentLead.project_type) {
      formErrors.project_type = "Project Type is required";
      isValid = false;
    }

    
    
    if (!currentLead.no_floor) {
      formErrors.no_floor = "Number of Floor is required";
      isValid = false;
    }
    
    
    
    if (!currentLead.budgest) {
      formErrors.budgest = "Budgest Area is required";
      isValid = false;
    }
    

    
    setErrors(formErrors);
    return isValid;
  };


  const saveChanges = async () => {

    if (validateForm()) {
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
          `http://localhost:9000/api/user-profilebyid/${currentLead.user_id}`,UserProfileData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );
        fetchUserProfile(); // Refresh the list
     
        closePopup();
      } else {
        // Create new lead
        await axios.post("http://localhost:9000/api/user-profile", UserProfileData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }});
          setRefresh(prev => !prev);
  
        fetchUserProfile(); // Refresh the list
        closePopup();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error saving lead:", error);
      
    }

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
      <UserSider refresh={refresh} />
      <>
        <div className="2xl:w-[89%]  2xl:ml-40 mx-4  ">
          <div className="main  mt-[1rem]">
            <Selected_Items_Cart/>
            <h1 className="text-2xl text-center font-medium">User Account</h1>
            <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>

            {/* Button to create a new lead */}
            {/* <div className="mb-4">
  {!userprofile && ( // Only render if userprofile has no data
    <button
      className="bg-blue-500 text-white px-4 py-2 mt-5 mx-1 rounded hover:bg-blue-700 font-medium"
      onClick={handleCreateClick}
    >
      Add User Profile
    </button>
  )}
</div> */}

          </div>

          <div className=" overflow-x-auto mt-4   mx-1">
          {userprofile? ( 
        <div className="max-w-md mx-auto bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 shadow-xl rounded-2xl overflow-hidden transform transition duration-500 ">
  <div className="bg-white/90 backdrop-blur-md p-6">
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600 text-center mb-4">
      {userprofile?.name}
    </h2>

    <div className="space-y-3 text-gray-700">
      <p>
        <span className="font-semibold text-orange-700">User ID:</span>{" "}
        {userprofile?.user_id}
      </p>
      <p>
        <span className="font-semibold text-orange-700">Email:</span>{" "}
        {userprofile?.email}
      </p>
      <p>
        <span className="font-semibold text-orange-700">Plot Size:</span>{" "}
        {userprofile?.plot_area}
      </p>
      <p>
        <span className="font-semibold text-orange-700">Project Type:</span>{" "}
        {userprofile?.project_type}
      </p>
      <p>
        <span className="font-semibold text-orange-700">Number of Floors:</span>{" "}
        {userprofile?.no_floor}
      </p>
      <p>
        <span className="font-semibold text-orange-700">Budget:</span>{" "}
        <span className="font-bold text-orange-800">₹{userprofile?.budgest}</span>
      </p>
      <p>
        <span className="font-semibold text-orange-700">Estimated Cost (Approx):</span>{" "}
        {userprofile?.after_selection_amount === 0 ? (
          <span className="italic text-gray-500">Pending</span>
        ) : (
          <span className="font-bold text-orange-800">
            ₹{userprofile?.after_selection_amount}
          </span>
        )}
      </p>
      <p>
        <span className="font-semibold text-orange-700">Created Date:</span>{" "}
        {new Date(userprofile?.created_date).toLocaleString()}
      </p>
    </div>
  </div>

  <div className="flex justify-end gap-4 p-4 bg-gradient-to-r from-orange-500 to-yellow-400 border-t border-orange-200">
    <button
      className="bg-white/80 p-2 rounded-full hover:bg-white text-orange-600 hover:text-orange-700 transition duration-300"
      onClick={() => handleEditClick(userprofile)}
      title="Edit"
    >
      <BsPencilSquare size={20} />
    </button>
    <button
      className="bg-white/80 p-2 rounded-full hover:bg-white text-red-600 hover:text-red-700 transition duration-300"
      onClick={() => handleDeleteClick(userprofile.user_id)}
      title="Delete"
    >
      <BsTrash size={20} />
    </button>
  </div>
</div>

          ):(
            <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="p-6 text-center">
       <h1 className="text-center font-bold text-2xl ">Please Create User Profile</h1>
        <button
      className="bg-blue-500 text-white px-4 py-2 mt-5 mx-1 rounded hover:bg-blue-700 font-medium"
      onClick={handleCreateClick}
    >
      Add User Profile
    </button>
      </div>
     
    </div>
          )}
          </div>


          {showPopup && ( 
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="w-full max-w-3xl p-6 mx-2 bg-white rounded-lg shadow-lg h-[50%] overflow-y-auto">
    <h2 className="text-xl mb-4">
      {isEditing ? "Edit User Profile" : "Add User Profile"}
    </h2>

    {/* GRID START */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700">Email Id</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700">Plot Area </label>
        <input
          type="number"
          name="plot_area"
          value={currentLead.plot_area}
          placeholder="Enter Your Plot Area Sqft"
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border ${errors.plot_area ? "border-red-500" : "border-gray-300"} rounded`}
        />
        {errors.plot_area && <span className="text-red-500 text-sm">{errors.plot_area}</span>}
      </div>

      <div>
        <label className="block text-gray-700">Number of Floor</label>
        <input
          type="number"
          name="no_floor"
          placeholder="Enter Your No of Floor"
          value={currentLead.no_floor}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border ${errors.no_floor ? "border-red-500" : "border-gray-300"} rounded`}
        />
        {errors.no_floor && <span className="text-red-500 text-sm">{errors.no_floor}</span>}
      </div>

      <div className="col-span-2">
        <label className="block text-gray-700">Project Type</label>
        <select
          name="project_type"
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

        {errors.project_type && <span className="text-red-500 text-sm">{errors.project_type}</span>}
      </div>

      <div>
        <label className="block text-gray-700">Budget</label>
        <input
          type="number"
          name="budgest"
          value={currentLead.budgest}
          placeholder="Enter Your Budgest"

          onChange={handleInputChange}
          className={`w-full px-3 py-2 border ${errors.budgest ? "border-red-500" : "border-gray-300"} rounded`}
        />
        {errors.budgest && <span className="text-red-500 text-sm">{errors.budgest}</span>}
      </div>

    </div>
    {/* GRID END */}

    <div className="flex justify-end mt-4">
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
