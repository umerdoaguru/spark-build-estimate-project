import React from 'react'
import { SiMoneygram } from "react-icons/si";
import { MdOutlineNextWeek } from "react-icons/md";
import { GiFiles, GiMoneyStack } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import MainHeader from '../../pages/MainHeader';
import UserSider from './UserSider';


function Categories_Card() {
  return (
 <>
 <MainHeader/>
 <UserSider/>
 <div className="flex-1 max-w-full 2xl:w-[93%] 2xl:ml-32 mt-[5rem] ">
 <h1 className="text-2xl text-center font-medium ">
             User Selection Mangement 
              </h1>
              <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
  <div className="flex flex-wrap justify-around mt-12">
        <div className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 my-3 p-0 sm-mx-0 mx-3 ">
          <Link to="">
            <div
              className="shadow-md rounded-2xl overflow-hidden cursor-pointer text-gray-600 border-2" // Change background color if active
              //   onClick={() => setSelectedComponent('LeadData')}  // Set selected component
            >
              <div className="p-10 flex flex-col items-center text-center">
                <div className=" text-3xl text-gray-700">
                  <GiFiles />
                </div>
                <div className="mt-2">
                  <h5 className="text-gray-800 text-xl font-semibold ">
                  Foundation
                  </h5>
                  <p className="text-gray-800 text-xl font-semibold ">
                    
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

       
       
    
        
      </div>
 </div>
 
 
 
 </>
  )
}

export default Categories_Card