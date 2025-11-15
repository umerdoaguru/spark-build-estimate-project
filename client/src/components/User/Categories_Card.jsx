import React, { useState, useEffect } from 'react';
import { GiFiles } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported
import MainHeader from '../../pages/MainHeader';
import UserSider from './UserSider';
import Selected_Items_Cart from './Selected_Items_Cart';
import { useSelector } from 'react-redux';
import CommentBox from './CommentBox';

function Categories_Card() {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://estimate-project.dentalguru.software/api/categories-data',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }});
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <MainHeader />
      <UserSider />
      <div className="flex-1 max-w-full 2xl:w-[89%]  2xl:ml-40 mt-[1rem]">
        <Selected_Items_Cart/>
         
   <div className="mt-10"><CommentBox/></div>
        <h1 className="text-2xl text-center font-medium">
          Categories Management
        </h1>
        <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
            
        <div className="flex flex-wrap justify-around mt-12">
          {categories.map((category) => (
            <>
              <div
              key={category.category_id} // Use a unique key for each category
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 my-3 p-0 sm-mx-0 mx-3"
            >
              <Link to={`/categories/${category.category_id}`}> {/* Dynamic link */}
                <div className="shadow-md rounded-2xl overflow-hidden cursor-pointer text-gray-600 border-2">
                  <div className="p-10 flex flex-col items-center text-center bg-yellow-500">
                    <div className="text-3xl text-gray-700  ">
                  <img src={category.icon}
                   alt="Preview"
        className=" w-22 3xl:h-[8rem] xl:h-[3rem] lg:h-[4rem] object-cover rounded "
                   />  
                    </div>
                    <div className="mt-2 ">
                      <h5 className="text-gray-800 text-xl font-semibold">
                        {category.category_name} {/* Category name */}
                      </h5>
                      
                    </div>
                  </div>
                </div>
              </Link>
            </div>
                  
            </>
          
          ))}
        
        </div>

      </div>
         
    </>
  );
}

export default Categories_Card;
