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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function UserAllSelecteditems() {

  const [alluserselection, setAllUserSelection] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [leadsPerPage, setLeadsPerPage] = useState(5);
 const [refresh, setRefresh] = useState(false);
 const token = user?.token;

  useEffect(() => {

    fetchAllSelectedData();
  }, []);

  const fetchAllSelectedData = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/user-selection-by-userid/${user.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
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
        await axios.delete(`http://localhost:9000/api/user-selection/${selection_id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }});


        fetchAllSelectedData(); // Refresh the list after deletion

         const response = await axios.put(
            `http://localhost:9000/api/user-final-amount/${user.id}`,
            { after_selection_amount: "pending" },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            }
          );
        console.log("Response:", response.data);
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
const downloadPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");

  doc.setFontSize(16);
  doc.text(`All Selected Items By ${user.name}`, 14, 12);

  const columns = ["S.No","Sub Category","Item Name","Description","Total Price","Date"];

  // table body (no total row here)
  const body = alluserselection.map((item, i) => ([
    String(i + 1),
    String(item.subcategory_name ?? ""),
    String(item.item_name ?? ""),
    String(item.description ?? ""),
    String(Number(item.total_price || 0).toLocaleString("en-IN")),
    moment(item.created_at).format("DD MMM YYYY"),
  ]));

  // grand total
  const grandTotal = alluserselection.reduce(
    (s, it) => s + Number(it.total_price || 0), 0
  );
  const formattedTotal = grandTotal.toLocaleString("en-IN");

  // footer (shows only once, at the end)
  const foot = [[
    { content: "Final Total", colSpan: 5, styles: { halign: "right", fontStyle: "bold",} },
    { content: `Rs. ${formattedTotal}`, styles: { halign: "right", fontStyle: "bold" } },
    "" // keep 6 columns total
  ]];

  autoTable(doc, {
    head: [columns],
    body,
    foot,
    showFoot: "lastPage",          // only on the last page
    startY: 20,
    margin: { left: 10, right: 10 },
    styles: { fontSize: 9, overflow: "linebreak", cellWidth: "wrap" },
    columnStyles: {
      0: { cellWidth: 12 },
      1: { cellWidth: 32 },
      2: { cellWidth: 38 },
      3: { cellWidth: 45 },
      4: { cellWidth: 22, halign: "right" },
      5: { cellWidth: 25 }
    },
   footStyles: {
    fillColor: [100, 100, 100],   
    textColor: [255, 255, 255],   
    fontStyle: "bold"
  }
  });

  doc.save(`${user.name}.pdf`);
};



  return (
    <>
      <MainHeader />
      <UserSider />
      <>
        <div className="2xl:w-[89%]  2xl:ml-40 mx-4 ">
          <div className="main mt-[1rem]">
      <Selected_Items_Cart refresh={refresh}/>
            <h1 className="text-2xl text-center font-medium">
            All Selected Items by {user.name}
            </h1>
            <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>

          <button
  onClick={downloadPDF}
  className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
>
  Download PDF
</button>

          </div>

          <div className=" overflow-x-auto mt-4 ">
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
                    Sub Categories Name
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Items Name
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Total Price
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
                      {index + 1 + currentPage * leadsPerPage}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold">
                          {item.item_id}
                        </td>
                 
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.subcategory_name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.item_name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.total_price}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.description}
                        </td>
                       
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                        <img
        src={item.image_items}
        alt="Preview"
        className=" w-22 3xl:h-[8rem] xl:h-[3rem] lg:h-[4rem]  object-cover rounded"
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

         
        </div>
      </>
    </>
  );
}

export default UserAllSelecteditems;
