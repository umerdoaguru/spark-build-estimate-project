import React, { useEffect, useState } from 'react'
import MainHeader from '../../pages/MainHeader'
import AdminSider from './AdminSider'
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import  axios  from 'axios';
import moment from 'moment';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import cogoToast from 'cogo-toast';
import { useSelector } from 'react-redux';


function Comment() {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const [categories, setCategories] = useState([]);
    const [currentcomments, setCurrentcomments] = useState({
        answer:"",
        question:"",

    });

  
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const [currentPage, setCurrentPage] = useState(0);
    const [leadsPerPage, setLeadsPerPage] = useState(10);
 
    const [loading , setLoading] = useState(false)
    const token = user?.token;
  
    // Fetch leads and employees from the API
    useEffect(() => {
      fetchComments();
   
      
    }, []);
  
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/comment",
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );
        setComments(response.data);
        console.log(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
 


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentcomments((prevLead) => {
        const updatedLead = { ...prevLead, [name]: value };
  
      
       
  
        return updatedLead;
      });
    };
    
  
    const handleEditClick = (comments) => {
      setIsEditing(true);
      setCurrentcomments({
        ...comments,
        
      });
      setShowPopup(true);
    };
  
  
    const handleDeleteClick = async (id) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this data?"
      );
      if (isConfirmed) {
        try {
          await axios.delete(`http://localhost:9000/api/comment/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
          fetchComments(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting comments:", error);
        }
      }
    };

    const validateForm = () => {
      let formErrors = {};
      let isValid = true;
  
      if (!currentcomments.answer) {
        formErrors.answer = "Answer is required";
        isValid = false;
      }
      if (!currentcomments.question) {
        formErrors.question = "Question is required";
        isValid = false;
      }
  
     
      
      setErrors(formErrors);
      return isValid;
    };

    const saveChanges = async () => {
      if (validateForm()) {
      const commentsData = {
        ...currentcomments,
      
      };
        
        try {
          setLoading(true)
          if (isEditing) {
            // Update existing lead
            await axios.put(
              `http://localhost:9000/api/comment/${currentcomments.id}`,
              commentsData,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }}
            );
            fetchComments(); // Refresh the list
            closePopup();
          } else {
           null
          }
          setLoading(false)
        } 
        catch (error) {
          setLoading(false)
          console.error("Error saving lead:", error);
          cogoToast.error(error?.response?.data?.message || "An error occurred ");

        }
      }
      
    };
  
    
  
    const closePopup = () => {
      setShowPopup(false);
      setErrors({});
    };
  

    // Calculate total number of pages
  const pageCount = Math.ceil(comments.length / leadsPerPage);
  
  // Pagination logic
  const indexOfLastLead = (currentPage + 1) * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentcommentss = leadsPerPage === Infinity ? comments : comments.slice(indexOfFirstLead, indexOfLastLead);
  
  
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
 
  
    
  
    return (
      <>
        <MainHeader />
        <AdminSider />
        <>
          <div className="2xl:w-[89%]  2xl:ml-40 mx-4 ">
            <div className="main  mt-[6rem]">
              <h1 className="text-2xl text-center font-medium">
                Comments Management
              </h1>
              <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
  
              {/* Button to create a new lead */}
              
           
            </div>

         
  
            <div className=" overflow-x-auto mt-4  ">
           
  
              <table className="min-w-full bg-white border">
               
                <thead>
                  <tr>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                      S.no
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Question
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Answer
                    </th>
                   
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Created Date
                    </th>
                   
                      <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                      Action
                    </th>
                  
                 
                  </tr>
                </thead>
                <tbody>
                  {currentcommentss.length === 0 ? (
                    <tr>
                      <td
                        colSpan="15"
                        className="px-6 py-4 border-b border-gray-200 text-center text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    currentcommentss.map((comments, index) => {
                        console.log(comments, "fdfsdfsdfsdfds");
                        
                      return (
                        <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                       {index + 1 + currentPage * leadsPerPage}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {comments.question}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {comments.answer}
                        </td>
                      
                        
                       
                        
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {moment(comments.created_date).format("DD MMM YYYY").toUpperCase()}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditClick(comments)}
                          >
                            <BsPencilSquare size={20} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 mx-2"
                            onClick={() => handleDeleteClick(comments.id)}
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
            <div className=" mt-4 mb-3 flex justify-center">
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
                <div className="w-full max-w-md p-6 mx-2 bg-white rounded-lg shadow-lg h-[30%] overflow-y-auto">
                  <h2 className="text-xl mb-4">
                    {isEditing ? "Edit comments" : "Add comments"}
                  </h2>
               
               
                
                <div className="mb-4">
                    <label className="block text-gray-700">Text</label>
                    <textarea
                      type="text"
                      name="hl_text"
                      value={currentcomments.hl_text}
                  rows={3}
                  
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${
                        errors.hl_text ? "border-red-500" : "border-gray-300"
                      } rounded`}
                    />
                     {errors.hl_text && (
                    <span className="text-red-500">{errors.hl_text}</span>
                  )}
                    
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

export default Comment

