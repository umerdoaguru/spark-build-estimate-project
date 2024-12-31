import React, { useEffect, useState } from 'react'
import MainHeader from '../../pages/MainHeader'
import AdminSider from './AdminSider'
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import  axios  from 'axios';
import moment from 'moment';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';


function UserManagement() {
    const navigate = useNavigate();
    const [subcategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentLead, setCurrentLead] = useState({
     category_name: "",
     category_id: "",
     subcategory_name: ""
   
    });

  
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const [currentPage, setCurrentPage] = useState(0);
    const [leadsPerPage, setLeadsPerPage] = useState(10);
 
    const [loading , setLoading] = useState(false)

  
    // Fetch leads and employees from the API
    useEffect(() => {
      fetchSubCategories();
      fetchCategories();
      
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
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categoriess:", error);
      }
    };



    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentLead((prevLead) => {
        const updatedLead = { ...prevLead, [name]: value };
  
        if (name === "category_name") {
          const selectedCategory = categories.find(
            (category) => category.category_name === value
          );
          if (selectedCategory) {
            updatedLead.category_id = selectedCategory.category_id;
           
          } else {
            updatedLead.category_id = ""; // Reset if no match
            
          }
        }
       
  
        return updatedLead;
      });
    };
    const handleCreateClick = () => {
      setIsEditing(false);
      setCurrentLead({
        category_name: "",
     category_id: "",
     subcategory_name: ""
       
      });
      setShowPopup(true);
    };
  
    const handleEditClick = (subcategory) => {
      setIsEditing(true);
      setCurrentLead({
        ...subcategory,
        
      });
      setShowPopup(true);
    };
  
  
    const handleDeleteClick = async (id) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this data?"
      );
      if (isConfirmed) {
        try {
          await axios.delete(`http://localhost:9000/api/subcategories/${id}`);
          fetchSubCategories(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting Subcategories:", error);
        }
      }
    };
    const saveChanges = async () => {
      const leadData = {
        ...currentLead,
      
      };
   
        try {
          setLoading(true)
          if (isEditing) {
            // Update existing lead
            await axios.put(
              `http://localhost:9000/api/subcategories/${currentLead.subcategory_id}`,
              leadData
            );
            fetchSubCategories(); // Refresh the list
            closePopup();
          } else {
            // Create new lead
            await axios.post("http://localhost:9000/api/subcategories", leadData);
    
            // Construct WhatsApp message link with encoded parameters
         
            fetchSubCategories(); // Refresh the list
            closePopup();
          }
          setLoading(false)
        } 
        catch (error) {
          setLoading(false)
          console.error("Error saving lead:", error);
        }
      
    };
  
    
  
    const closePopup = () => {
      setShowPopup(false);
      setErrors({});
    };
  

    // Calculate total number of pages
  const pageCount = Math.ceil(subcategories.length / leadsPerPage);
  
  // Pagination logic
  const indexOfLastLead = (currentPage + 1) * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leadsPerPage === Infinity ? subcategories : subcategories.slice(indexOfFirstLead, indexOfLastLead);
  
  
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
                User Management
              </h1>
              <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
  
              {/* Button to create a new lead */}
              <div className="mb-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-5 rounded hover:bg-blue-700 font-medium"
                  onClick={handleCreateClick}
                >
                 Add User 
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
                    Sub Categories Id
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Categories Id
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                     Categories Name
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Sub Categories Name
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
                    currentLeads.map((subcategory, index) => {
                        console.log(subcategory, "fdfsdfsdfsdfds");
                        
                      return (
                        <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                        { index + 1 }
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {subcategory.subcategory_id}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {subcategory.category_id}
                        </td>
                        
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {subcategory.category_name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {subcategory.subcategory_name}
                        </td>
                       
                        
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {moment(subcategory.created_at).format("DD MMM YYYY").toUpperCase()}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditClick(subcategory)}
                          >
                            <BsPencilSquare size={20} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 mx-2"
                            onClick={() => handleDeleteClick(subcategory.subcategory_id)}
                          >
                            <BsTrash size={20} />
                          </button>
                        </td>
                      
                       
                      </tr>
                    )})
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
    containerClassName={"flex justify-center gap-2"} /* Main container for pagination */
    pageClassName={"px-4 py-2 border rounded"} /* Individual page buttons */
    pageLinkClassName={"hover:bg-gray-100 text-gray-700"} /* Links inside buttons */
    previousClassName={"px-4 py-2 border rounded"} /* Previous button */
    previousLinkClassName={"hover:bg-gray-100 text-gray-700"} /* Link inside Previous */
    nextClassName={"px-4 py-2 border rounded"} /* Next button */
    nextLinkClassName={"hover:bg-gray-100 text-gray-700"} /* Link inside Next */
    breakClassName={"px-4 py-2 border rounded"} /* Dots ("...") */
    breakLinkClassName={"hover:bg-gray-100 text-gray-700"} /* Link inside dots */
    activeClassName={"bg-blue-500 text-white border-blue-500"} /* Active page */
    disabledClassName={"opacity-50 cursor-not-allowed"} /* Disabled Previous/Next */
  />
</div>

  
            {showPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-full max-w-md p-6 mx-2 bg-white rounded-lg shadow-lg h-[35%] overflow-y-auto">
                  <h2 className="text-xl mb-4">
                    {isEditing ? "Edit Sub Category" : "Add Sub Category"}
                  </h2>
               
                  <div className="mb-4">
                  <label className="block text-gray-700">Categories Name</label>
                  <select
                    name="category_name"
                    value={currentLead.category_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border  rounded`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.category_id} value={category.category_name}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                
                </div>

                {/* Hidden category_id field */}
                <input
                  type="hidden"
                  id="category_id"
                  name="category_id"
                  value={currentLead.category_id}
                />
                
                <div className="mb-4">
                    <label className="block text-gray-700">Sub Category Name</label>
                    <input
                      type="text"
                      name="subcategory_name"
                      value={currentLead.subcategory_name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded`}
                    />
                    
                  </div>
  
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                      onClick={saveChanges}  disabled = {loading}
                    >
                       {loading ? 'Save...' : 'Save'}
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

export default UserManagement

