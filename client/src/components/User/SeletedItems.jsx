import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import MainHeader from "../../pages/MainHeader";
import UserSider from "./UserSider";

function Selecteditems() {
  const navigate = useNavigate();
  const [subcategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [currentLead, setCurrentLead] = useState({
    subcategory_id: "",
    subcategory_name: "",
    item_name: "",
    description: "",
    unit_price: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [leadsPerPage, setLeadsPerPage] = useState(10);

  const [loading, setLoading] = useState(false);

  // Fetch leads and employees from the API
  useEffect(() => {
    fetchSubCategories();
    fetchItems();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/subcategories"
      );
      setSubCategories(response.data);
      console.log(subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching categoriess:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentLead((prevLead) => {
      const updatedLead = { ...prevLead, [name]: value };

      if (name === "subcategory_name") {
        const selectedCategory = subcategories.find(
          (subcategory) => subcategory.subcategory_name === value
        );
        if (selectedCategory) {
          updatedLead.subcategory_id = selectedCategory.subcategory_id;
        } else {
          updatedLead.subcategory_id = ""; // Reset if no match
        }
      }

      return updatedLead;
    });
  };
  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentLead({
      subcategory_id: "",
      subcategory_name: "",
      item_name: "",
      description: "",
      unit_price: "",
    });
    setShowPopup(true);
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentLead({
      ...item,
    });
    setShowPopup(true);
  };

  const handleDeleteClick = async (item_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/items/${item_id}`);
        fetchItems(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  const saveChanges = async () => {
    const leadData = {
      ...currentLead,
    };

    try {
      setLoading(true);
      if (isEditing) {
        // Update existing lead
        await axios.put(
          `http://localhost:9000/api/items/${currentLead.item_id}`,
          leadData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );
        fetchItems(); // Refresh the list
        closePopup();
      } else {
        // Create new lead
        await axios.post("http://localhost:9000/api/items", leadData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }});

        // Construct WhatsApp message link with encoded parameters

        fetchItems(); // Refresh the list
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
  const pageCount = Math.ceil(items.length / leadsPerPage);

  // Pagination logic
  const indexOfLastLead = (currentPage + 1) * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads =
    leadsPerPage === Infinity
      ? items
      : items.slice(indexOfFirstLead, indexOfLastLead);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
         <MainHeader />
         <UserSider />
      <>
        <div className="container  2xl:ml-40">
          <div className="main 2xl:w-[89%] mt-[6rem]">
            <h1 className="text-2xl text-center font-medium">
              items Management
            </h1>
            <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>

            
          </div>

          <div className=" overflow-x-auto mt-4  2xl:w-[89%]">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    S.no
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Items Id
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Sub Categories Id
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                   Sub Categories Name
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                   Items Name
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                  Description
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                  Unit Price
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Date
                  </th>

                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan="15"
                      className="px-6 py-4 border-b border-gray-200 text-center text-gray-500"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  currentLeads.map((item, index) => {
                    console.log(item, "fdfsdfsdfsdfds");

                    return (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {item.item_id}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {item.subcategory_id}
                        </td>

                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.subcategory_name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.item_name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.unit_price}
                        </td>

                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {moment(item.created_at)
                            .format("DD MMM YYYY")
                            .toUpperCase()}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditClick(item)}
                          >
                            <BsPencilSquare size={20} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 mx-2"
                            onClick={() =>
                              handleDeleteClick(item.item_id)
                            }
                          >
                            <BsTrash size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="2xl:w-[89%] mt-4 mb-3 flex justify-center">
 <ReactPaginate
    previousLabel={"Previous"}
    nextLabel={"Next"}
    breakLabel={"..."}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={handlePageClick}
    containerClassName="flex justify-center gap-2"
    
    pageClassName="border rounded cursor-pointer"
    pageLinkClassName="w-full h-full flex items-center justify-center py-2 px-4"
    
    previousClassName="border rounded cursor-pointer"
    previousLinkClassName="w-full h-full flex items-center justify-center py-2 px-3" 
    
    nextClassName="border rounded cursor-pointer"
    nextLinkClassName="w-full h-full flex items-center justify-center py-2 px-3"
    
    breakClassName="border rounded cursor-pointer"
    breakLinkClassName="w-full h-full flex items-center justify-center"
    
    activeClassName="bg-blue-500 text-white border-blue-500"
    disabledClassName="opacity-50 cursor-not-allowed"
  />
          </div>

          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md p-6 mx-2 bg-white rounded-lg shadow-lg h-[65%] overflow-y-auto">
                <h2 className="text-xl mb-4">
                  {isEditing ? "Edit Item" : "Add Item"}
                </h2>

                <div className="mb-4">
                  <label className="block text-gray-700">Sub Categories Name</label>
                  <select
                    name="subcategory_name"
                    value={currentLead.subcategory_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                  >
                    <option value="">Select Sub Category</option>
                    {subcategories.map((subcategory) => (
                      <option
                        key={subcategory.subcategory_id}
                        value={subcategory.subcategory_name}
                      >
                        {subcategory.subcategory_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hidden category_id field */}
                <input
                  type="hidden"
                  id="subcategory_id"
                  name="subcategory_id"
                  value={currentLead.subcategory_id}
                />

              
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="item_name"
                    value={currentLead.item_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                   Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={currentLead.description}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Unit Price
                  </label>
                  <input
                    type="text"
                    name="unit_price"
                    value={currentLead.unit_price}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded`}
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

export default Selecteditems;
