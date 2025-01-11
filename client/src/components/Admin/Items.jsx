import React, { useEffect, useState } from "react";
import MainHeader from "../../pages/MainHeader";
import AdminSider from "./AdminSider";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import cogoToast from "cogo-toast";

function items() {
  const navigate = useNavigate();
  const [subcategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [currentLead, setCurrentLead] = useState({
    subcategory_id: "",
    subcategory_name: "",
    item_name: "",
    description: "",
    unit_price: "",
    image_items: null,
    unit_price_type: "",
    image_preview: ""
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
    const { name, value, files } = e.target;
  
    setCurrentLead((prevLead) => {
      // Handle file inputs separately
      const updatedLead = { 
        ...prevLead, 
        [name]: files && files.length > 0 ? files[0] : value 
      };
  
      // Special logic for "subcategory_name"
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
      image_items: "",
      unit_price_type: "",
      
    });
    setShowPopup(true);
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentLead({
      item_id: item.item_id,
      subcategory_id: item.subcategory_id,
      subcategory_name: item.subcategory_name,
      item_name: item.item_name,
      description: item.description,
      unit_price: item.unit_price,
      unit_price_type: item.unit_price_type,
      image_items: null, 
      image_preview: item.image_items, 
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
    const formData = new FormData();
    formData.append("subcategory_id", currentLead.subcategory_id);
    formData.append("subcategory_name", currentLead.subcategory_name);
    formData.append("item_name", currentLead.item_name);
    formData.append("description", currentLead.description);
    formData.append("unit_price", currentLead.unit_price);
    formData.append("unit_price_type", currentLead.unit_price_type);
    if (currentLead.image_items) {
      formData.append("image_items", currentLead.image_items);
    } else if (currentLead.image_preview) {
      formData.append("image_items", currentLead.image_preview);
    }
  
    try {
      setLoading(true);
      if (isEditing) {
        // Update existing lead
        await axios.put(
          `http://localhost:9000/api/items/${currentLead.item_id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        fetchItems(); // Refresh the list
      } else {
        // Create new lead
        await axios.post("http://localhost:9000/api/items", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fetchItems(); // Refresh the list
      }
      closePopup();
    } catch (error) {
      console.error("Error saving Items:", error);
      cogoToast.error(error?.response?.data?.message || "An error occurred formate is image Invalid file type. Only JPG, JPEG, WEBP, and PNG are allowed");
    } finally {
      setLoading(false);
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
      <AdminSider />
      <>
        <div className="container  2xl:ml-40">
          <div className="main 2xl:w-[89%] mt-[4rem]">
            <h1 className="text-2xl text-center font-medium">
              items Management
            </h1>
            <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>

            {/* Button to create a new lead */}
            <div className="mb-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-5 rounded hover:bg-blue-700 font-medium"
                onClick={handleCreateClick}
              >
                Itmes Add
              </button>
            </div>
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
                    Unit Type
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                  Image
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
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.unit_price_type}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                        <img
        src={item.image_items}
        alt="Preview"
        className="w-22 h-32 object-cover rounded"
      />
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
                            onClick={() => handleDeleteClick(item.item_id)}
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
              containerClassName={
                "flex justify-center gap-2"
              } /* Main container for pagination */
              pageClassName={
                "px-4 py-2 border rounded"
              } /* Individual page buttons */
              pageLinkClassName={
                "hover:bg-gray-100 text-gray-700"
              } /* Links inside buttons */
              previousClassName={
                "px-4 py-2 border rounded"
              } /* Previous button */
              previousLinkClassName={
                "hover:bg-gray-100 text-gray-700"
              } /* Link inside Previous */
              nextClassName={"px-4 py-2 border rounded"} /* Next button */
              nextLinkClassName={
                "hover:bg-gray-100 text-gray-700"
              } /* Link inside Next */
              breakClassName={"px-4 py-2 border rounded"} /* Dots ("...") */
              breakLinkClassName={
                "hover:bg-gray-100 text-gray-700"
              } /* Link inside dots */
              activeClassName={
                "bg-blue-500 text-white border-blue-500"
              } /* Active page */
              disabledClassName={
                "opacity-50 cursor-not-allowed"
              } /* Disabled Previous/Next */
            />
          </div>

          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md p-6 mx-2 bg-white rounded-lg shadow-lg h-[65%] overflow-y-auto">
                <h2 className="text-xl mb-4">
                  {isEditing ? "Edit Item" : "Add Item"}
                </h2>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Sub Categories Name
                  </label>
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
                  <label className="block text-gray-700">Item Name</label>
                  <input
                    type="text"
                    name="item_name"
                    value={currentLead.item_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={currentLead.description}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Unit Price</label>
                  <input
                    type="text"
                    name="unit_price"
                    value={currentLead.unit_price}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded`}
                  />
                </div>
               
                <div className="mb-4">
  <label className="block text-gray-700">Unit Type</label>
  <select
    name="unit_price_type"
    value={currentLead.unit_price_type}
    onChange={handleInputChange}
    className="w-full px-3 py-2 border rounded"
  >
    <option value="" disabled>Select Unit Type</option>
    <optgroup label="Volume">
      <option value="per m³">per m³ (per cubic meter)</option>
      <option value="per ft³">per ft³ (per cubic foot)</option>
      <option value="per yd³">per yd³ (per cubic yard)</option>
      <option value="per L">per L (per liter)</option>
      <option value="per gallon">per gallon</option>
    </optgroup>
    <optgroup label="Weight">
      <option value="per kg">per kg (per kilogram)</option>
      <option value="per ton">per ton (per metric ton)</option>
      <option value="per lb">per lb (per pound)</option>
    </optgroup>
    <optgroup label="Area">
      <option value="per m²">per m² (per square meter)</option>
      <option value="per ft²">per ft² (per square foot)</option>
      <option value="per yd²">per yd² (per square yard)</option>
    </optgroup>
    <optgroup label="Quantity">
      <option value="per piece">per piece</option>
      <option value="per unit">per unit</option>
      <option value="per bag">per bag</option>
      <option value="per roll">per roll</option>
    </optgroup>
    <optgroup label="Time">
      <option value="per hour">per hour</option>
      <option value="per day">per day</option>
      <option value="per week">per week</option>
    </optgroup>
  </select>
</div>

                <div className="mb-4">
  <label className="block text-gray-700">Image Items</label>
  {currentLead.image_preview && (
    <div className="mb-2">
      <img
        src={currentLead.image_preview}
        alt="Preview"
        className="w-32 h-32 object-cover rounded"
      />
    </div>
  )}
  <input
    type="file"
    name="image_items"
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

export default items;
