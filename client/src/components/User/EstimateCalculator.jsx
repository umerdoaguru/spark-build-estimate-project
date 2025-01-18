import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainHeader from '../../pages/MainHeader';
import UserSider from './UserSider';
import { useParams } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import Selected_Items_Cart from './Selected_Items_Cart';

function EstimateCalculator() {
  const [categories, setCategories] = useState([]);
  const [userprofile, setUseProfile] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const [userselection, setUserSelection] = useState([]);
  const [alluserselection, setAllUserSelection] = useState([]);
  const [alluserrecommendation, setAllUserCommendation] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [leadsPerPage, setLeadsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const {id} = useParams();
  const user = useSelector((state) => state.auth.user);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);



  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleDropdownclose = () => {
    setIsOpen(false); 
    setSelectedSubcategory(''); 
    setSelectedItem('');
    setQuantity('');
  };
  
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Fetch categories on initial render
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`http://localhost:9000/api/categories/${id}`);
      setCategories(response.data);
      console.log(categories);
      
    };
    fetchCategories();
  }, [id]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await axios.get(`http://localhost:9000/api/user-profile/${user.id}`);
      setUseProfile(response.data[0]);
      console.log(userprofile);
      
    };
    fetchUserProfile();
  }, [id]);
  
  // Fetch subcategories when category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      console.log(id);
      
      if (id) {
        const response = await axios.get(`http://localhost:9000/api/subcategories/${id}`);
        setSubcategories(response.data);
        console.log(subcategories);
        
      }
    };
    fetchSubcategories();
  }, [id]);
  
  // Fetch items when subcategory is selected
  useEffect(() => {
    const fetchItems = async () => {
      if (selectedSubcategory) {
        const response = await axios.get(`http://localhost:9000/api/items/${selectedSubcategory}`);
        openPopup();
        setItems(response.data);
        console.log(items);
        
      }
    };
    fetchItems();
  }, [selectedSubcategory]);
  
  // Handle item selection and price calculation
  const handleItemSelect = (item) => {
    console.log(item);
    
    setSelectedItem(item);
    setTotalPrice(item.unit_price * quantity);
    setIsOpen(false);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty);
    if (selectedItem) {
      setTotalPrice(selectedItem.unit_price * qty);
    }
  };

  const handleSubmit = async () => {
   
 
    

    const data = {
      user_id: user.id, // Assuming `id` from `useParams` is the logged-in user ID
      item_id: selectedItem.item_id,
      category_name: categories.find((c) => c.category_id === Number(id))?.category_name,
      subcategory_name: selectedItem.subcategory_name,
      item_name: selectedItem.item_name,
      description: selectedItem.description,
      image_items:selectedItem.image_items,
      quantity: quantity,
      total_price: totalPrice,
    };
    console.log(data);
    
  
    try {
      const response = await axios.post('http://localhost:9000/api/user-selection', data);
  
      // Check response for success or error
      if (response.data.success) {
        cogoToast.success(response.data.message || 'User selection successfully submitted!');
       setSelectedSubcategory('');
        setSelectedItem('');
        fetchSelecteddata();
        fetchAllSelectedData();
        setQuantity('');
      
       
      } else {
        cogoToast.error(response.data.message || 'Error submitting user selection. Please try again.');
      }
    } catch (error) {
   
      console.error('Error during submission:', error);
      cogoToast.error(error.response?.data?.error || 'Error submitting user selection. Please try again.');
    }
  };
  useEffect(() => {
    if (categories.length > 0 && id) {
      fetchSelecteddata();
    }
  }, [id, categories]); // Trigger fetch when `id` or `categories` change

  const handleDeleteClick = async (selection_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/user-selection/${selection_id}`);
        fetchSelecteddata(); // Refresh the list after deletion
        fetchAllSelectedData(); 
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  
  const fetchSelecteddata = async () => {
    try {
      // Ensure category_name is derived correctly
      const category_name = categories.find((c) => c.category_id === Number(id))?.category_name;

  
      if (!category_name) {
        console.warn("Category name not found for the given ID.");
        return;
      }
  
      // Fetch data
      const response = await axios.get(`http://localhost:9000/api/user-selection/${user.id}`, {
        params: { category_name },
      });
  
      setUserSelection(response.data);
      console.log(response.data); // Log the fetched data for debugging
    } catch (error) {
      console.error("Error fetching selected data:", error);
    }
  };
  
  // Calculate total number of pages
  const pageCount = Math.ceil(userselection.length / leadsPerPage);

  // Pagination logic
  const indexOfLastLead = (currentPage + 1) * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads =  userselection.slice(indexOfFirstLead, indexOfLastLead);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    
    fetchAllSelectedData();

  }, []);
  
  const fetchAllSelectedData = async () => {
        const response = await axios.get(`http://localhost:9000/api/user-selection`);
        setAllUserSelection(response.data);
        console.log(alluserselection);
        
      };
      useEffect(() => {
    
     
        fetchUserRecommendationData();
      }, [selectedSubcategory]);

  const fetchUserRecommendationData = async () => {
    const subcategory_name = subcategories.find((c) => c.subcategory_id === Number(selectedSubcategory))?.subcategory_name;
    console.log(subcategory_name);
        const response = await axios.get(`http://localhost:9000/api/user-recommendation/${user.id}`, {
          params: { subcategory_name },
        });
        setAllUserCommendation(response.data.recommendations);
        console.log(alluserrecommendation);
        
      };
      const recommendation_subcategory_name = subcategories.find((c) => c.subcategory_id === Number(selectedSubcategory))?.subcategory_name;
const selectedcategory_name = categories.find((c) => c.category_id === Number(id))?.category_name;
  return (
    <>
     <MainHeader />
        <UserSider />
        
          <div className="container  2xl:ml-40">
            <div className="main 2xl:w-[89%] mt-[6rem]">
       <Selected_Items_Cart/>


              <h1 className="text-2xl text-center font-medium">
             User Selection Mangement 
              </h1>
              
              <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
  
            
           
           
    
            <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border">
  <h1 className="text-2xl font-bold text-center mb-6">Estimate Calculator {selectedcategory_name}</h1>

  {/* Category Selection */}
  <div className="mb-4">
    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
    <select
      id="category"
      onChange={(e) => setSelectedCategory(e.target.value)}
      value={selectedCategory}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
    
      {categories.map((category) => (
        <option key={category.category_id} value={category.category_id}>
          {category.category_name}
        </option>
      ))}
    </select>
  </div>

  {/* Subcategory Selection */}

    <div className="mb-4">
      <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">Select Subcategory</label>
      <select
        id="subcategory"
        onChange={(e) => setSelectedSubcategory(e.target.value)}
        value={selectedSubcategory}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Subcategory</option>
        {subcategories.map((subcategory) => (
          <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
            {subcategory.subcategory_name}
          </option>
        ))}
      </select>
    </div>
  

    {selectedSubcategory && (
   <button
        onClick={toggleDropdown}
        className="w-full p-2 border border-gray-300 rounded-md flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedItem ? (
          <div className="flex items-center">
            <img
              src={selectedItem.image_items}
              alt={selectedItem.item_name}
              className="w-8 h-8 object-cover rounded mr-2"
            />
            <span>{selectedItem.item_name}</span>
          </div>
        ) : (
          <span>Select Item</span>
        )}
        <span className="ml-2">&#x25BC;</span> 
      </button>
       )}


      {isOpen && (
        <ul className="absolute z-10 w-96 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
           <button className='hover:bg-black hover:text-white my-2 bg-slate-300 cursor-pointer w-32 h-18 object-cover rounded mr-2' onClick={toggleDropdownclose}>UnSelected Item</button> 
          {items.map((item) => (
            <li
              key={item.item_id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemSelect(item)}
            >
              <img
                src={item.image_items}
                alt={item.item_name}
                className="w-32 h-28 object-cover rounded mr-2"
              />
              
            
              <span>{item.item_name} - ₹{item.unit_price} per unit   Description : - {item.description}</span> 
          
            </li>
          ))}
        </ul>
      )}


       {/* Item Selection */}
  {selectedSubcategory && (
 <div className="mb-4">
 

 {/* Show image preview if an item is selected */}
 {selectedItem?.image_items && (
   <div className="mt-4">
     <img
       src={selectedItem.image_items}
       alt={selectedItem.item_name}

       className="w-32 h-32 object-cover rounded"
       
     />
      <span>{selectedItem.item_name} - ₹{selectedItem.unit_price} per unit <br /> Description {selectedItem.description}</span>
   </div>
 )}
</div>

  )}

  {/* Quantity Input */}
  {selectedItem && (
    <div className="mb-4">
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
      <input
        id="quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )}

  {/* Total Price */}
  {selectedItem && (
    <div className="mt-4 text-center ">
      <h3 className="text-xl font-semibold text-gray-800">Total Price: ₹{totalPrice}</h3>
      <button
            type="submit"
            className="w-full px-4 py-2 mt-4  font-semibold bg-[black] text-[#ffce08] rounded-md shadow-sm hover:bg-yellow-500 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={handleSubmit}
         >
            Sumbit
          </button>
    </div>
  )}
   
</div>
{userselection.length>0 && (
<>
  <div className=" overflow-x-auto mt-10  ">
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
                    Categories Name
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
                  Quantity
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                    Total  Price
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

                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.category_name}
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
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-800 font-semibold text-wrap">
                          {item.total_price}
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
</>

   )}       

 </div>
 {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">
                    
                    Recommendations for {recommendation_subcategory_name}
                  </h2>
                  <button
                    onClick={closePopup}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                </div>

                {/* Map through alluserrecommendations */}
                {alluserrecommendation && alluserrecommendation.length > 0 ? (
                  alluserrecommendation.map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center border-b py-4"
                    >
                      <img
                        src={recommendation.image_items}
                        alt={recommendation.item_name}
                        className="w-32 h-32 object-cover rounded mb-4"
                      />
                      <h3 className="text-md font-semibold">
                        {recommendation.item_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ₹{recommendation.unit_price} per unit
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {recommendation.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No recommendations available.
                  </p>
                )}

                <button
                  onClick={closePopup}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
                >
                  Close
                </button>
              </div>
            </div>
          )}
       

 
    </div>
    </>
   
  );
}

export default EstimateCalculator;
