import React, { useEffect, useState } from 'react'
import MainHeader from '../../pages/MainHeader'
import AdminSider from './AdminSider'
import ReactPaginate from "react-paginate";
import axios from 'axios';
import moment from 'moment';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import cogoToast from 'cogo-toast';
import { useSelector } from 'react-redux';

function Comment() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  const [currentcomments, setCurrentcomments] = useState({
    answer: "",
    question: "",
    name: ""
  });

  const [selectedUser, setSelectedUser] = useState("all");

  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [leadsPerPage] = useState(10);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [comments, selectedUser]);

  const fetchComments = async () => {
    try {
      const response = await axios.get("https://estimate-project.dentalguru.software/api/comment", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const applyFilter = () => {
    if (selectedUser === "all") {
      setFilteredComments(comments);
    } else {
      const result = comments.filter((c) => c.name === selectedUser);
      setFilteredComments(result);
    }
    setCurrentPage(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentcomments((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentcomments(item);
    setShowPopup(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`https://estimate-project.dentalguru.software/api/comment/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        fetchComments();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let valid = true;

    if (!currentcomments.answer) {
      errors.answer = "Answer is required";
      valid = false;
    }
    if (!currentcomments.question) {
      errors.question = "Question is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const saveChanges = async () => {
    if (validateForm()) {
      try {
        setLoading(true);

        await axios.put(
          `https://estimate-project.dentalguru.software/api/comment-admin/${currentcomments.id}`,
          currentcomments,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        fetchComments();
        closePopup();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error saving data:", error);
        cogoToast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setErrors({});
  };

  const pageCount = Math.ceil(filteredComments.length / leadsPerPage);
  const indexOfLast = (currentPage + 1) * leadsPerPage;
  const indexOfFirst = indexOfLast - leadsPerPage;
  const currentData = filteredComments.slice(indexOfFirst, indexOfLast);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <MainHeader />
      <AdminSider />
      <div className="2xl:w-[89%] 2xl:ml-40 mx-4 mt-[6rem]">

        <h1 className="text-2xl text-center font-medium">Comments Management</h1>
        <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>

        {/* FILTER BY USER NAME */}
        <div className="flex gap-4 items-center mb-4">
          <label className="font-semibold">Filter by User</label>
          <select
            className="border px-3 py-2 rounded"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="all">All Users</option>
            {comments
              .map((c) => c.name)
              .filter((v, i, arr) => arr.indexOf(v) === i)
              .map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>

        {/* TABLE */}
         <div className=" overflow-x-auto mt-4  ">
           
  
              <table className="min-w-full bg-white border">
               
                <thead>
                  <tr>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                      S.no
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    User Name
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
                  {currentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="15"
                        className="px-6 py-4 border-b border-gray-200 text-center text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    currentData.map((comments, index) => {
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
                          {comments.name}
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

        {/* PAGINATION */}
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

        {/* POPUP */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl mb-3">Edit Comment</h2>

              <label className="block text-gray-700 mb-1">Question</label>
              <textarea
                name="question"
                value={currentcomments.question}
                rows={2}
                className="w-full border px-3 py-2 rounded mb-2"
                disabled
              />

              <label className="block text-gray-700 mb-1">Answer</label>
              <textarea
                name="answer"
                value={currentcomments.answer}
                onChange={handleInputChange}
                rows={2}
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={saveChanges}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
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
  );
}

export default Comment;
