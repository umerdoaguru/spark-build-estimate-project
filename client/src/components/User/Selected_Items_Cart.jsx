import axios from 'axios';
import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Selected_Items_Cart() {
   
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [alluserselection, setAllUserSelection] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const toggleCart = () => setIsCartOpen(!isCartOpen);





    useEffect(() => {
      const fetchAllSelectedData = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/api/user-selection-by-userid/${user.id}`);
          setAllUserSelection(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    
      fetchAllSelectedData();
      const interval = setInterval(fetchAllSelectedData, 1000);
    
     
      return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
      const fetchCategories = async () => {
        const response = await axios.get(`http://localhost:9000/api/categories`);
        setCategories(response.data);
        console.log(categories);
        
      };
      fetchCategories();
    }, []);
  const updateFinalAmount = async () => {
    const finalAmount = alluserselection.reduce((sum, item) => sum + item.total_price, 0);
  
    const isConfirmed = window.confirm(
      "Are you sure you want to submit this data?"
    );
  
    if (isConfirmed) {
      try {
        const response = await axios.put(`http://localhost:9000/api/user-final-amount/${user.id}`, {
          after_selection_amount: finalAmount,
        });
        
        // Success Toast Notification
        cogoToast.success(response.data.message || 'User selection successfully submitted!');
  
        console.log('Final amount updated successfully:', finalAmount);
      } catch (error) {
        // Error Toast Notification
        cogoToast.error('Failed to update final amount. Please try again later.');
  
        console.error('Error updating final amount:', error);
      }
    }
  };

  const handleCategoryClick = (categoryName) => {
    // Find the category by name
    const category = categories.find((c) => c.category_name === categoryName);
    if (category && category.category_id) {
      // Navigate to the category detail page
      navigate(`/categories/${category.category_id}`);
    } else {
      console.error('Category not found or category_id is missing');
    }
  };

 

  return (
    <>
    <div className="">
        <button
      onClick={toggleCart}
      className="fixed top-15 right-5 bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
      aria-label="Toggle Cart"
    >
      <FaShoppingCart
       className="text-2xl " />
      {alluserselection.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {alluserselection.length}
        </span>
      )}
      
    </button>
    <div className="border-t  flex justify-start gap-3 mx-7 text-end items-center">
          <span className="text-sm font-medium">Final Amount:</span>
          <span className="text-lg font-bold text-green-600">
            ₹{alluserselection.reduce((sum, item) => sum + item.total_price, 0)}
          </span>
          
        {/* <button
            onClick={updateFinalAmount}
            className="bg-blue-500 text-white   py-2 rounded mt-4 hover:bg-blue-600"
          >
            Save Final Amount
          </button> */}
        </div>
</div>
    
    {/* Selected Items Box */}
    {isCartOpen && (
      <div className="w-80 p-4 bg-white border border-gray-300 rounded-md shadow-lg fixed top-20 right-10 z-50">
        {/* Close Button */}
        <button
          onClick={() => setIsCartOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          ✖
        </button>
    
        <h2 className="text-lg font-semibold text-center mb-4">Selected Items</h2>
        <div className=" overflow-auto  ">
        
                    <table className="min-w-full bg-white border">
                      <thead>
                        <tr>
                          
                          <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                          Category
                          </th>
                          <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                          Subcategory
                          </th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {alluserselection.length === 0 ? (
                          <tr>
                            <td
                              colSpan="15"
                              className="px-6 py-4 border-b border-gray-200 text-center text-gray-500"
                            >
                              No data found
                            </td>
                          </tr>
                        ) : (
                          alluserselection.map((item, index) => {
                            console.log(item, "fdfsdfsdfsdfds");
        
                            return (
                              <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-100" : ""}
                              >
                                
                                <td className="px-2 py-1 border-b border-gray-200 text-gray-800 text-nowrap">
              <button
              
                onClick={() => handleCategoryClick(item.category_name)}
                className="text-blue-600 hover:underline"
              >
                {item.category_name}
              </button>
            </td>
                                <td className="px-6 py-1 border-b border-gray-200 text-gray-800  text-wrap">
                                {item.subcategory_name}
                                
                                </td>
                             
                                
                              
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                 
        
        </div>
    
        <div className="border-t mt-4 pt-4 flex justify-between items-center">
          <span className="text-sm font-medium">Final Amount:</span>
          <span className="text-lg font-bold text-green-600">
            ₹{alluserselection.reduce((sum, item) => sum + item.total_price, 0)}
          </span>
        </div>

        <button
            onClick={updateFinalAmount}
            className="bg-blue-500 text-white w-full py-2 rounded mt-4 hover:bg-blue-600"
          >
            Save Final Amount
          </button>
      </div>
       
    )}
    
    </>
  )
}

export default Selected_Items_Cart