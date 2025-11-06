import axios from 'axios';
import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Selected_Items_Cart({refresh}) {
   
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [alluserselection, setAllUserSelection] = useState([]);
    const [categories, setCategories] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [eligibleDiscount, setEligibleDiscount] = useState(null); 
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const token = user?.token;
    const [userprofile, setUserProfile] = useState([]);


    useEffect(() => {

      fetchAllSelectedData();
      fetchUserProfile();
      fetchDiscount();
       fetchCategories();
    }, [refresh]);

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
        const finalAmount = alluserselection.reduce((sum, item) => sum + item.total_price, 0);
  
        // Check for eligible discount
        const applicableDiscount = discount.find((d) => finalAmount >= d.value);
        console.log(applicableDiscount);
        
    
        if (applicableDiscount) {
          setEligibleDiscount(applicableDiscount); // Store the eligible discount object
          setIsPopupOpen(true); // Open the popup
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
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
  
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/discount-data",
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );
        setDiscount(response.data);
        console.log(discount);
      } catch (error) {
        console.error("Error fetching discount:", error);
      }
    };

  

    useEffect(() => {
   
        fetchAllSelectedData();
        fetchDiscount();
        fetchCategories();

    }, [refresh]); 

 
    const fetchCategories = async () => {
      const response = await axios.get(`http://localhost:9000/api/categories-data`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
      setCategories(response.data);
      console.log(categories);
      
    };
    const updateFinalAmount = async () => {
     
  
    
      const isConfirmed = window.confirm(
        "Are you sure you want to submit this data?"
      );
      const finalAmount = alluserselection.reduce((sum, item) => sum + item.total_price, 0);
    
      if (isConfirmed) {
        try {
          const response = await axios.put(
            `http://localhost:9000/api/user-final-amount/${user.id}`,
            { after_selection_amount: finalAmount },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            }
          );
    
          cogoToast.success(response.data.message || "Final amount updated!");
          console.log("Response:", response.data);
          fetchUserProfile()
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
          cogoToast.error("Failed to update final amount.");
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
{!userprofile?.after_selection_amount ? (
  <>
 <div className="">
    <button
      onClick={toggleCart}
      className="fixed top-15 right-5 bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
      aria-label="Toggle Cart"
    >
      <FaShoppingCart className="text-2xl" />
      {alluserselection.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {alluserselection.length}
        </span>
      )}
    </button>

    <div className="border-t flex justify-start gap-3 mx-7 text-end items-center">
      <span className="text-sm font-medium">Estimated Cost:</span>
      <span className="text-lg font-bold text-green-600">
        ₹{alluserselection.reduce((sum, item) => sum + item.total_price, 0)}
      </span>
    </div>
  </div>

  {isCartOpen && (
      <div className="2xl:w-[30%]  2xl:ml-40 mx-4  p-4 bg-white border border-gray-300 rounded-md shadow-lg xl:fixed top-20 right-10 z-50">
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
                          <th className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-y-2 border-gray-300 text-left">
                          Items Name
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
                                <td className="px-6 py-1 border-b border-gray-200 text-gray-800  text-wrap">
                                {item.item_name}
                                
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

{isPopupOpen && eligibleDiscount && (
        <div className="fixed top-20 right-10 bg-white shadow-xl rounded-lg p-6 border border-gray-300 max-w-sm">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setIsPopupOpen(false)}
          >
            ✖
          </button>

          <h2 className="text-lg font-bold text-center text-green-600 mb-4">
            🎉 Congratulations! 🎉
          </h2>

          <p className="text-gray-700 text-center">
            You are eligible for a special discount!
          </p>

          {/* Discount Value */}
          <div className="mt-4 bg-green-100 text-green-700 font-semibold text-center py-2 rounded-lg">
           Your Budgest Value: ₹{eligibleDiscount.value} Above
          </div> 

          {/* Offer */}
          <p className="text-blue-600 font-bold text-lg text-center mt-4">
            {eligibleDiscount.offer}
          </p>

          {/* Conditions */}
          <p className="text-gray-600 text-sm mt-2 text-center">
            <strong>Conditions:</strong> {eligibleDiscount.conditions}
          </p>

          {/* <button
            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg mt-6 hover:bg-green-600"
            onClick={() => setIsPopupOpen(false)}
          >
            Claim Offer
          </button> */}
        </div>
      )}

  </>
 
    
    
) : (
  <div className="border-t flex justify-start gap-3 mx-7 text-end items-center">
    <span className="text-sm font-medium">Final Amount:</span>
    <span className="text-lg font-bold text-green-600">
      ₹{alluserselection.reduce((sum, item) => sum + item.total_price, 0)} (Submitted)
    </span>
  </div>
)}

      
  



    
    </>
  )
}

export default Selected_Items_Cart