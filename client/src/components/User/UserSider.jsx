// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaHistory, FaUserCircle } from "react-icons/fa";
// import { RiSecurePaymentLine } from "react-icons/ri";
// import { BsFileEarmarkPerson, BsHouse } from "react-icons/bs";
// import { MdOutlineManageAccounts } from "react-icons/md";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

// const UserSider = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   const getSidebarClass = (path) => {
//     return location.pathname === path ? "bg-blue-800 shadow-lg" : "";
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {/* Hamburger Button - Hidden on large screens */}
//       <button
//         className="fixed top-16 md:top-20 left-4 z-50 text-black "
//         onClick={toggleSidebar}
//       >
//         <AiOutlineMenu size={25} />
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed mt-16 md:mt-[70px] lg:mt-[60px] inset-y-0 bg-black  overflow-hidden 2xl:translate-x-0 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out w-20 md:w-[150px] z-50`}
//       >
//         {/* Close (Cross) Button - Hidden on large screens */}
//         <button
//           className="absolute left-14 md:left-32 lg-left-32 text-gray-400 2xl:hidden" // Hidden on large screens (lg)
//           onClick={toggleSidebar}
//         >
//           <AiOutlineClose size={25} />
//         </button>

//         <div className="flex flex-col items-center max-h-screen overflow-auto	p-4 xl:w-[10rem]	">
//           <ul className="flex flex-col items-center space-y-4 w-full pb-16">
//             <li
//               className={`xl:w-full ${getSidebarClass("/user-account")}`}
//             >
//               <Link
//                 to="/user-account"
//                 className="flex flex-col items-center py-3"
//               >
//                 <BsHouse className="text-[#ffce08]  text-2xl md:text-3xl" />
//                 <h3 className="text-xs max-md:pt-3 lg:inline text-[#ffce08]  md:text-base">
//                  User Account
//                 </h3>
//               </Link>
//             </li>



//           <hr className="w-full border-gray-400" />
//                      <li className={`xl:w-full ${getSidebarClass("/user-categories-cards")}`}>
//                        <Link
//                          to="/user-categories-cards"
//                          className="flex flex-col items-center py-3"
//                        >
//                          <FaUserCircle className="text-[#ffce08]  text-2xl md:text-3xl" />
//                          <h3 className="text-xs text-center max-md:pt-3 lg:inline text-[#ffce08]  md:text-base">
//                   User Categories
//                          </h3>
//                        </Link>
//                      </li>
//           <hr className="w-full border-gray-400" />
//                      <li className={`xl:w-full ${getSidebarClass("/user-all-selection")}`}>
//                        <Link
//                          to="/user-all-selection"
//                          className="flex flex-col items-center py-3"
//                        >
//                          <FaUserCircle className="text-[#ffce08]  text-2xl md:text-3xl" />
//                          <h3 className="text-xs text-center max-md:pt-3 lg:inline text-[#ffce08]  md:text-base">
//                   User Selection 
//                                            </h3>
//                        </Link>
//                      </li>
                                   
//             <hr className="w-full border-gray-400" />
//             <li className={`xl:w-full ${getSidebarClass("/user-profile")}`}>
//               <Link
//                 to="/user-profile"
//                 className="flex flex-col items-center py-3"
//               >
//                 <FaUserCircle className="text-[#ffce08]  text-2xl md:text-3xl" />
//                 <h3 className="text-xs text-center max-md:pt-3 lg:inline text-[#ffce08]  md:text-base">
//                  User Profile
//                 </h3>
//               </Link>
//             </li>
                
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserSider;


import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

const UserSider = ({refresh}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const token = user.token;
  

  const [userProfile, setUserProfile] = useState([]); 

  useEffect(() => {
    fetchUserProfile()
  }, []);
  useEffect(() => {
    fetchUserProfile()
  }, [refresh]);
  
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/user-profile/${user.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
      setUserProfile(response.data[0]);
      console.log(userProfile);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const getSidebarClass = (path) => {
    return location.pathname === path ? "bg-blue-800 shadow-lg" : "";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    if (!userProfile) {
      alert("Please create your user profile first!");
      return;
    }
    navigate(path);
  };

  return (
    <>
      {/* Hamburger Button - Hidden on large screens */}
      <button
        className="fixed top-16 md:top-20 left-4 z-50 text-black"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={25} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed mt-16 md:mt-[70px] lg:mt-[60px] inset-y-0 bg-black overflow-hidden 2xl:translate-x-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-20 md:w-[150px] z-50`}
      >
        {/* Close (Cross) Button - Hidden on large screens */}
        <button
          className="absolute left-14 md:left-32 lg-left-32 text-gray-400 2xl:hidden"
          onClick={toggleSidebar}
        >
          <AiOutlineClose size={25} />
        </button>

        <div className="flex flex-col items-center max-h-screen overflow-auto p-4 xl:w-[10rem]">
          <ul className="flex flex-col items-center space-y-4 w-full pb-16">
            <li className={`xl:w-full ${getSidebarClass("/user-account")}`}>
              <button
                onClick={() => handleNavigation("/user-account")}
                className="flex flex-col items-center py-3 w-full"
              >
                <BsHouse className="text-[#ffce08] text-2xl md:text-3xl" />
                <h3 className="text-xs max-md:pt-3 lg:inline text-[#ffce08] md:text-base">
                  User Account
                </h3>
              </button>
            </li>

            <hr className="w-full border-gray-400" />

            <li className={`xl:w-full ${getSidebarClass("/user-categories-cards")}`}>
              <button
                onClick={() => handleNavigation("/user-categories-cards")}
                className="flex flex-col items-center py-3 w-full"
              >
                <FaUserCircle className="text-[#ffce08] text-2xl md:text-3xl" />
                <h3 className="text-xs text-center max-md:pt-3 lg:inline text-[#ffce08] md:text-base">
                  User Categories
                </h3>
              </button>
            </li>

            <hr className="w-full border-gray-400" />

            <li className={`xl:w-full ${getSidebarClass("/user-all-selection")}`}>
              <button
                onClick={() => handleNavigation("/user-all-selection")}
                className="flex flex-col items-center py-3 w-full"
              >
                <FaUserCircle className="text-[#ffce08] text-2xl md:text-3xl" />
                <h3 className="text-xs text-center max-md:pt-3 lg:inline text-[#ffce08] md:text-base">
                  User Selection
                </h3>
              </button>
            </li>

            <hr className="w-full border-gray-400" />

            <li className={`xl:w-full ${getSidebarClass("/user-profile")}`}>
              <button
                onClick={() => handleNavigation("/user-profile")}
                className="flex flex-col items-center py-3 w-full"
              >
                <FaUserCircle className="text-[#ffce08] text-2xl md:text-3xl" />
                <h3 className="text-xs text-center max-md:pt-3 lg:inline text-[#ffce08] md:text-base">
                  User Profile
                </h3>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserSider;
