import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainHeader from '../../pages/MainHeader';
import UserSider from './UserSider';

function EstimateCalculator() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Fetch categories on initial render
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:9000/api/categories');
      setCategories(response.data);
      console.log(categories);
      
    };
    fetchCategories();
  }, []);
  
  // Fetch subcategories when category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      console.log(selectedCategory);
      
      if (selectedCategory) {
        const response = await axios.get(`http://localhost:9000/api/subcategories/${selectedCategory}`);
        setSubcategories(response.data);
        console.log(subcategories);
        
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);
  
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
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty);
    if (selectedItem) {
      setTotalPrice(selectedItem.unit_price * qty);
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
  
            
           
           
    
            <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
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
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.category_id} value={category.category_id}>
          {category.category_name}
        </option>
      ))}
    </select>
  </div>

  {/* Subcategory Selection */}
  {selectedCategory && (
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
  )}

  {/* Item Selection */}
  {selectedSubcategory && (
    <div className="mb-4">
      <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-2">Select Item</label>
      <select
        id="item"
        onChange={(e) => handleItemSelect(items.find(item => item.item_id === parseInt(e.target.value)))}
        value={selectedItem?.item_id || ''}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Item</option>
        {items.map((item) => (
          <option key={item.item_id} value={item.item_id}>
            {item.item_name} - ₹{item.unit_price} per unit
          </option>
        ))}
      </select>
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
    <div className="mt-4 text-center">
      <h3 className="text-xl font-semibold text-gray-800">Total Price: ₹{totalPrice}</h3>
    </div>
  )}
</div>
 </div>
    </div>
    </>
   
  );
}

export default EstimateCalculator;
