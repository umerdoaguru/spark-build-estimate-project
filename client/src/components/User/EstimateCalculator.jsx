import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainHeader from '../../pages/MainHeader';
import UserSider from './UserSider';
import { useParams } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import { useSelector } from 'react-redux';

function EstimateCalculator() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const [userselection, setUserSelection] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const {id} = useParams();
  const user = useSelector((state) => state.auth.user);
  const toggleDropdown = () => setIsOpen(!isOpen);
  // Fetch categories on initial render
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`http://localhost:9000/api/categories/${id}`);
      setCategories(response.data);
      console.log(categories);
      
    };
    fetchCategories();
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
  



  return (
    <>
     <MainHeader />
        <UserSider />
        
          <div className="container  2xl:ml-40">
            <div className="main 2xl:w-[89%] mt-[6rem]">
              <h1 className="text-2xl text-center font-medium">
             User Selection Mangement 
              </h1>
              <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
  
            
           
           
    
            <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border">
  <h1 className="text-2xl font-bold text-center mb-6">Estimate Calculator</h1>

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
              <span>{item.item_name} - ₹{item.unit_price} per unit</span>
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
      <span>{selectedItem.item_name} - ₹{selectedItem.unit_price} per unit</span>
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
 </div>
    </div>
    </>
   
  );
}

export default EstimateCalculator;
