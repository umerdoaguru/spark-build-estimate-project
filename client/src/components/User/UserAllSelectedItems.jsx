import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import cogoToast from "cogo-toast";
import MainHeader from "../../pages/MainHeader";
import UserSider from './UserSider';
import Selected_Items_Cart from "./Selected_Items_Cart";
import { useSelector } from "react-redux";

function UserAllSelecteditems() {

  const [alluserselection, setAllUserSelection] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [leadsPerPage, setLeadsPerPage] = useState(10);
 const [refresh, setRefresh] = useState(false);
 

  useEffect(() => {

    fetchAllSelectedData();
  }, []);

  const fetchAllSelectedData = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/user-selection-by-userid/${user.id}`);
      setAllUserSelection(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  



  const handleDeleteClick = async (selection_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/user-selection/${selection_id}`);
        fetchAllSelectedData(); // Refresh the list after deletion
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };


  // Calculate total number of pages
  const pageCount = Math.ceil(alluserselection.length / leadsPerPage);

  // Pagination logic
  const indexOfLastLead = (currentPage + 1) * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = alluserselection.slice(indexOfFirstLead, indexOfLastLead);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <MainHeader />
      <UserSider />
      <>
        <div className="container  2xl:ml-40">
          <div className="main 2xl:w-[89%] mt-[4rem]">
      <Selected_Items_Cart refresh={refresh}/>
            <h1 className="text-2xl text-center font-medium">
            All Selected Items 
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
                            className="text-red-500 hover:text-red-700 mx-2"
                            onClick={() => handleDeleteClick(item.selection_id)}
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

         
        </div>
      </>
    </>
  );
}

export default UserAllSelecteditems;
