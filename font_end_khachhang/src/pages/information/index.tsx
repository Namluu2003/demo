// import React, { useEffect, useState } from "react";
// import Images from "../../static";
// import InforMe from "./inforMe";
// import Invoice from "../invoice";
// import { useLocation, useNavigate } from "react-router-dom";
// import Address from "./address";
// import ReturnProduct from "./returnProduct";
// import { IDataAside } from "../../types/product.type";
// import { deleteToken, deleteUserToken } from "../../helper/useCookie";
// import path from "../../constants/path";
// import ChangePassword from "./changePassword";
// import ModalComponent from "../../components/Modal";
// import axios from "axios";
// import API from "../../api";
// import { useShoppingCart } from "../../context/shoppingCart.context";
// type IDataAsideOmit = Omit<IDataAside, "imgHover"> | IDataAside;
// interface IInfoUser {
//   avatar: string;
//   birthday: string;
//   phoneNumber: string;
//   gender: string;
//   name: string;
//   email: string;
//   cccd: string;
//   username: string;
// }
// interface User {
//   id: string;
//   email: string;
//   role: string;
//   fullName: string;
//   avata: string;
//   expirationTime: Date;
// }
// const Information = () => {
//   const [showModal, setShowMoal] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const dataAside: IDataAside[] = [
//     {
//       id: 1,
//       name: "Tài khoản của tôi",
//       img: Images.iconSetting,
//     },
//     {
//       id: 2,
//       name: "Đơn mua",
//       img: Images.iconOrder,
//     },
//     {
//       id: 3,
//       name: "Địa chỉ",
//       img: Images.iconAddress,
//     },
//     {
//       id: 4,
//       name: "Đổi mật khẩu",
//       img: Images.iconChangePassword,
//     },
//     {
//       id: 5,
//       name: "Đăng xuất",
//       img: Images.iconLogout,
//     },
//   ];
//   const handleLogout = () => {
//     deleteToken();
//     deleteUserToken();
//     sessionStorage.removeItem("idAccount");
//     navigate(path.loginScreen);
//     window.location.reload();
//   };
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [selectedCategory, setSelectedCategory] = useState("Tài khoản của tôi");
//   const handleCategoryClick = (category: string) => {
//     setSelectedCategory(category);
//   };
//   return (
//     <div className="w-full h-full   relative  min-h-screen ">
//       <div className="flex w-full h-full ">
//         <aside
//           id="logo-sidebar"
//           className="sticky h-screen  left-0  w-64 transition-transform -translate-x-full sm:translate-x-0  bg-[#f5f5f5] pt-3 rounded"
//           aria-label="Sidebar"
//         >
//           <div className="h-full py-4  ">
//             <div className="flex flex-col items-start justify-center  w-full  ">
//               {dataAside.map((item, index) => {
//                 return (
//                   <div
//                     className={`relative tracking-wider  leading-none overflow-hidden mt-2 pb-2 w-[100%] cursor-pointer mb-2 px-2 pt-2 
//                   ${
//                     selectedCategory === item.name
//                       ? "border-r-2 border-[#000]"
//                       : ""
//                   }
//                   `}
//                     onClick={() => {
//                       handleCategoryClick(item.name);
//                     }}
//                     key={index}
//                   >
//                     <div className=" flex items-end">
//                       <img
//                         src={item.img}
//                         className="w-[18px] h-auto object-contain"
//                       />{" "}
//                       <span
//                         className={`text-base ml-2   ${
//                           selectedCategory === item.name
//                             ? "font-semibold text-black "
//                             : "text-gray-600 font-normal"
//                         }`}
//                       >
//                         {item.name}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </aside>
//         <div className="w-full pl-5  bg-white mt-10">
//           {selectedCategory === dataAside[0].name ? (
//             <InforMe />
//           ) : selectedCategory === dataAside[1].name ? (
//             <Invoice />
//           ) : selectedCategory === dataAside[2].name ? (
//             <Address />
//           ) : selectedCategory === dataAside[3].name ? (
//             <ChangePassword />
//           ) : (
//             <div className="w-full h-full  ">
//               <div className="p-2 px-3 bg-slate-500 w-fit  text-white mx-auto mt-20">
//                 <button
//                   onClick={() => {
//                     setShowMoal(true);
//                   }}
//                 >
//                   Xác nhận đăng xuất ngay
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <ModalComponent
//         check={true}
//         isVisible={showModal}
//         onClose={() => {
//           setShowMoal(false);
//         }}
//       >
//         <div className="w-full flex flex-col justify-center  ">
//           <svg
//             className="mx-auto mb-4 text-gray-400 w-12 h-12 "
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 20"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//             />
//           </svg>
//           <h3 className="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
//             Xác nhận đăng xuất ?
//           </h3>

//           <div className="w-full flex justify-around items-center  gap-12">
//             <button
//               onClick={() => {
//                 setShowMoal(false);
//               }}
//               data-modal-hide="popup-modal"
//               type="button"
//               className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
//             >
//               Hủy
//             </button>
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setShowMoal(false);
//               }}
//               data-modal-hide="popup-modal"
//               type="button"
//               className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
//             >
//               Đăng xuất
//             </button>
//           </div>
//         </div>
//       </ModalComponent>
//     </div>
//   );
// };

// export default Information;



import React, { useEffect, useState } from "react";
import Images from "../../static";
import InforMe from "./inforMe";
import Invoice from "../invoice";
import { useLocation, useNavigate } from "react-router-dom";
import Address from "./address";
import ReturnProduct from "./returnProduct";
import { IDataAside } from "../../types/product.type";
import { deleteToken, deleteUserToken } from "../../helper/useCookie";
import path from "../../constants/path";
import ChangePassword from "./changePassword";
import ModalComponent from "../../components/Modal";
import axios from "axios";
import API from "../../api";
import { useShoppingCart } from "../../context/shoppingCart.context";

type IDataAsideOmit = Omit<IDataAside, "imgHover"> | IDataAside;
interface IInfoUser {
  avatar: string;
  birthday: string;
  phoneNumber: string;
  gender: string;
  name: string;
  email: string;
  cccd: string;
  username: string;
}
interface User {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avata: string;
  expirationTime: Date;
}

const Information = () => {
  const [showModal, setShowMoal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dataAside: IDataAside[] = [
    {
      id: 1,
      name: "Tài khoản của tôi",
      img: Images.iconSetting,
    },
    {
      id: 2,
      name: "Đơn mua",
      img: Images.iconOrder,
    },
    {
      id: 3,
      name: "Địa chỉ",
      img: Images.iconAddress,
    },
    {
      id: 4,
      name: "Đổi mật khẩu",
      img: Images.iconChangePassword,
    },
    {
      id: 5,
      name: "Đăng xuất",
      img: Images.iconLogout,
    },
  ];

  const handleLogout = () => {
    deleteToken();
    deleteUserToken();
    sessionStorage.removeItem("idAccount");
    navigate(path.loginScreen);
    window.location.reload();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Tài khoản của tôi");
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 gap-6">
        <aside
          id="logo-sidebar"
          className="w-64 bg-white shadow-lg rounded-xl sticky top-8 h-fit"
          aria-label="Sidebar"
        >
          <div className="py-6 px-4">
            <div className="flex flex-col space-y-2">
              {dataAside.map((item, index) => (
                <div
                  className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCategory === item.name
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryClick(item.name)}
                  key={index}
                >
                  <img
                    src={item.img}
                    className="w-5 h-5 object-contain mr-3"
                    alt={item.name}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1 bg-white rounded-xl shadow-lg p-8">
          {selectedCategory === dataAside[0].name ? (
            <InforMe />
          ) : selectedCategory === dataAside[1].name ? (
            <Invoice />
          ) : selectedCategory === dataAside[2].name ? (
            <Address />
          ) : selectedCategory === dataAside[3].name ? (
            <ChangePassword />
          ) : (
            <div className="flex justify-center items-center h-full">
              <button
                onClick={() => setShowMoal(true)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Xác nhận đăng xuất ngay
              </button>
            </div>
          )}
        </main>
      </div>
      <ModalComponent
        check={true}
        isVisible={showModal}
        onClose={() => setShowMoal(false)}
      >
        <div className="flex flex-col items-center p-6">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-medium text-gray-900">
            Xác nhận đăng xuất?
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => setShowMoal(false)}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                handleLogout();
                setShowMoal(false);
              }}
              className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Information;