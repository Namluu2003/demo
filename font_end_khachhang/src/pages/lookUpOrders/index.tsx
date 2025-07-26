// // import React, {
// //   DetailedHTMLProps,
// //   TdHTMLAttributes,
// //   useEffect,
// //   useState,
// // } from "react";
// // import API from "../../api";
// // import axios from "axios";
// // import Images from "../../static";
// // import { CustomError, IBill, IDetailOrder } from "../../types/product.type";
// // import { formartDate, formatCurrency } from "../../utils/formatCurrency";
// // import { toast } from "react-toastify";
// // import { convertToCurrencyString } from "../../utils/format";
// // import DetailAddress from "../information/address/detailAddress";

// // const LookUpOrders = () => {
// //   const [inputHD, setInputHD] = useState<string>("");
// //   const [listDataBill, setListDataBill] = useState<IBill>();
// //   const [detailBill, setDetailBill] = useState<IDetailOrder[]>();
// //   const [statusPayment, setStatusPayment] = useState<boolean>(false);
// //   console.log(statusPayment);
// //   const getInfoDetailProduct = async () => {
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: API.getSearchBill(inputHD),
// //       });
// //       if (res.status) {
// //         setListDataBill(res?.data);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //     }
// //   };
// //   useEffect(() => {
// //     if (listDataBill?.id) {
// //       getBillDetail();
// //     }
// //   }, [listDataBill]);
// //   const getStatusPayMent = async (id: number) => {
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: `http://localhost:8080/client/api/payment-method/${id}`,
// //       });
// //       if (res.status) {
// //         console.log(res.data);
// //         setStatusPayment(res?.data[0].type);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   useEffect(() => {
// //     if (listDataBill?.id) {
// //       getStatusPayMent(listDataBill?.id);
// //     }
// //   }, [listDataBill]);
// //   console.log("listDataBill", listDataBill);
// //   console.log("detailBill", detailBill);
// //   const getBillDetail = async () => {
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: API.getDetailBill(Number(listDataBill?.id)),
// //       });
// //       if (res.status) {
// //         setDetailBill(res?.data?.data);
// //       }
// //     } catch (error) {
// //       if (typeof error === "string") {
// //         toast.error(error);
// //       } else if (error instanceof Error) {
// //         const customError = error as CustomError;
// //         if (customError.response && customError.response.data) {
// //           toast.error(customError.response.data);
// //         } else {
// //           toast.error(customError.message);
// //         }
// //       } else {
// //         toast.error("Hãy thử lại.");
// //       }
// //     }
// //   };
// //   console.log("listDataBill", listDataBill);
// //   return (
// //     <div className="w-full h-full bg-white min-h-screen">
// //       <div className="relative w-fit h-fit">
// //         <img
// //           src={
// //             "https://viettelpost.com.vn/wp-content/uploads/2021/02/1920px-Hong_Kong_Skyline_Panorama_-_Dec_200811.jpg"
// //           }
// //           className="w-full h-auto "
// //         />
// //         <div className="absolute top-[50%] right-[50%] translate-x-1/2 text-center -translate-y-1/2">
// //           <p className="text-white font-bold text-2xl uppercase  space-x-8 ">
// //             Tra cứu hành trình đơn hàng
// //           </p>
// //           <p className="text-white font-bold ">
// //             "Mạng chuyển phát nhanh rộng khắp nơi"
// //           </p>
// //         </div>
// //       </div>
// //       <div className="bg-[#f0f0f0] w-full px-4 py-2">
// //         Trang chủ / Tra cứu hành trình đơn hàng
// //       </div>
// //       <div className="w-full flex items-center justify-between">
// //         <div className="w-[50%]">
// //           <p className="text-[rgba(68,73,77,1)] font-medium text-xl mt-5">
// //             Mã phiếu gửi
// //           </p>
// //           <input
// //             type="text"
// //             placeholder="VD:  "
// //             className="rounded border-[1px] mt-2 w-[60%] border-[#ccc]"
// //             value={inputHD}
// //             onChange={(e) => setInputHD(e.target.value)}
// //           />
// //           <div className="mt-3">
// //             <button
// //               className="bg-red-600 text-white px-4 py-2 rounded "
// //               onClick={() => {
// //                 getInfoDetailProduct();
// //               }}
// //             >
// //               Tra cứu
// //             </button>
// //           </div>
// //         </div>
// //         <div className="w-[50%]">
// //           <img src={Images.imgTrack} className="w-[220px] object-contain" />
// //         </div>
// //       </div>
// //       {listDataBill && (
// //         <div className="w-full">
// //           <p className="font-semibold text-2xl my-2">Danh sách phiếu gửi</p>
// //           <div className="relative overflow-x-auto">
// //             <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
// //               <thead className="text-xs text-white uppercase bg-gray-500  ">
// //                 <tr>
// //                   <th scope="col" className="px-6 py-3">
// //                     Mã phiếu gửi
// //                   </th>
// //                   <th scope="col" className="px-6 py-3">
// //                     Ngày tạo đơn
// //                   </th>

// //                   <th scope="col" className="px-6 py-3">
// //                     Trạng thái đơn
// //                   </th>
// //                   <th scope="col" className="px-6 py-3">
// //                     Phí ship
// //                   </th>
// //                   <th scope="col" className="px-6 py-3">
// //                     Tổng tiền
// //                   </th>
// //                   <th scope="col" className="px-6 py-3">
// //                     Trạng thái
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
// //                   <th
// //                     scope="row"
// //                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// //                   >
// //                     {listDataBill?.code}
// //                   </th>
// //                   <td className="px-6 py-4">
// //                     {formartDate(listDataBill?.createAt)}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     {listDataBill?.status === 2
// //                       ? "Chờ xác nhận"
// //                       : listDataBill.status === 4
// //                       ? "Chờ giao"
// //                       : listDataBill.status === 5
// //                       ? "Đang giao"
// //                       : listDataBill.status === 6
// //                       ? "Hoàn Thành"
// //                       : listDataBill.status === 7
// //                       ? "Đã hủy"
// //                       : ""}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     {formatCurrency(listDataBill.moneyShip)}{" "}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     {formatCurrency(
// //                       listDataBill.totalMoney + listDataBill.moneyShip
// //                     )}{" "}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     {statusPayment === true
// //                       ? "Đã thanh toán"
// //                       : "Chưa thanh toán"}
// //                   </td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //             <div className="bg-[#f0f0f0] shadow-md rounded px-8 pt-6 pb-8 my-4">
// //               <div className="mb-4">
// //                 <h1 className="text-lg font-bold mb-3">THÔNG TIN VẬN ĐƠN</h1>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-gray-700 text-sm font-bold mb-2">
// //                       Mã phiếu gửi:
// //                     </label>
// //                     <p className="text-gray-700">{listDataBill.code}</p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-gray-700 text-sm font-bold mb-2">
// //                       Phí ship:
// //                     </label>
// //                     <p className="text-gray-700">
// //                       {formatCurrency(listDataBill.moneyShip)}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <label className="block text-gray-700 text-sm font-bold mb-2">
// //                       Dịch vụ:
// //                     </label>
// //                     <p className="text-gray-700">
// //                       Chuyển phát tiết kiệm hàng hóa
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-gray-700 text-sm font-bold mb-2">
// //                       Người nhận:
// //                     </label>
// //                     <p className="text-gray-700">
// //                       {listDataBill?.customerName}
// //                       {!!listDataBill && -listDataBill?.phoneNumber}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <label className="block text-gray-700 text-sm font-bold mb-2">
// //                       Trạng thái:
// //                     </label>
// //                     <p className="text-gray-700">
// //                       {" "}
// //                       {listDataBill?.status === 2
// //                         ? "Chờ xác nhận"
// //                         : listDataBill.status === 4
// //                         ? "Chờ giao"
// //                         : listDataBill.status === 5
// //                         ? "Đang giao"
// //                         : listDataBill.status === 6
// //                         ? "Hoàn Thành"
// //                         : listDataBill.status === 7
// //                         ? "Đã hủy"
// //                         : ""}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-gray-700 text-sm font-bold mb-2">
// //                       Số điện thoại:
// //                     </label>
// //                     <p className="text-gray-700">
// //                       {!!listDataBill && listDataBill?.phoneNumber}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     {" "}
// //                     {!!listDataBill && (
// //                       <label className="block text-gray-700 text-sm font-bold mb-2">
// //                         Địa chỉ:
// //                       </label>
// //                     )}
// //                     <DetailAddress
// //                       spec={listDataBill.address.split("##")[0]}
// //                       war={listDataBill.address.split("##")[1]}
// //                       distr={listDataBill.address.split("##")[2]}
// //                       prov={listDataBill.address.split("##")[3]}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-gray-700 text-sm font-bold mb-2">
// //                       Lưu ý:
// //                     </label>
// //                     <p className="text-gray-700">
// //                       {!!listDataBill && listDataBill?.note}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //       {!!detailBill && (
// //         <div className="border-[1px] border-gray-300 mt-5 rounded mb-7">
// //           <p className="font-semibold text-base m-4 ">Danh sách sản phẩm </p>
// //           {detailBill?.map((item, index) => {
// //             return (
// //               <div
// //                 key={index}
// //                 className={`flex items-center gap-4 m-4 pb-4 ${
// //                   index === detailBill.length - 1
// //                     ? ""
// //                     : "border-b-[1px] border-gray-300"
// //                 }`}
// //               >
// //                 <img
// //                   src={item?.images.split(",")[0]}
// //                   alt=""
// //                   className="w-20 h-20 object-contain"
// //                 />
// //                 <div className=" flex flex-col justify-between  h-20">
// //                   <p className="text-xs font-semibold uppercase">
// //                     {item?.name}
// //                   </p>
// //                   <div className="flex items-center  gap-8">
// //                     <p className="text-xs font-normal">
// //                       Màu sắc:{" "}
// //                       <span className="font-medium">{item?.color}</span>
// //                     </p>
// //                     <p className="text-xs font-normal">
// //                       Số lượng:{" "}
// //                       <span className="font-medium">{item?.quantity}</span>
// //                     </p>
// //                     <p className="text-xs font-normal">
// //                       Kích thước:{" "}
// //                       <span className="font-medium">{item?.size}</span>
// //                     </p>
// //                     <p className="text-xs font-normal">
// //                       Loại đế: <span className="font-medium">{item?.sole}</span>
// //                     </p>
// //                   </div>
// //                   <p className="text-xs font-normal">
// //                     Thành tiền :{" "}
// //                     <span className="font-medium">
// //                       {!!item?.discountValue
// //                         ? convertToCurrencyString(
// //                             item?.discountValue * item?.quantity
// //                           )
// //                         : convertToCurrencyString(item?.price * item?.quantity)}
// //                     </span>
// //                   </p>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default LookUpOrders;

// // import React, { useEffect, useState } from "react";
// // import API from "../../api";
// // import axios from "axios";
// // import Images from "../../static";
// // import { CustomError, IBill, IDetailOrder } from "../../types/product.type";
// // import { formartDate, formatCurrency } from "../../utils/formatCurrency";
// // import { toast } from "react-toastify";
// // import { convertToCurrencyString } from "../../utils/format";
// // import DetailAddress from "../information/address/detailAddress";
// // import { FaClock, FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// // const LookUpOrders = () => {
// //   const [inputHD, setInputHD] = useState<string>("");
// //   const [listDataBill, setListDataBill] = useState<IBill>();
// //   const [detailBill, setDetailBill] = useState<IDetailOrder[]>();
// //   const [statusPayment, setStatusPayment] = useState<boolean>(false);

// //   const getInfoDetailProduct = async () => {
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: API.getSearchBill(inputHD),
// //       });
// //       if (res.status) {
// //         setListDataBill(res?.data);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const getBillDetail = async () => {
// //     if (!listDataBill?.id) return;
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: API.getDetailBill(Number(listDataBill?.id)),
// //       });
// //       if (res.status) {
// //         setDetailBill(res?.data?.data);
// //       }
// //     } catch (error) {
// //       toast.error(
// //         error instanceof Error ? error.message : "Đã có lỗi xảy ra, thử lại sau."
// //       );
// //     }
// //   };

// //   const getStatusPayMent = async (id: number) => {
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: `http://localhost:8080/client/api/payment-method/${id}`,
// //       });
// //       if (res.status) {
// //         setStatusPayment(res?.data[0].type);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (listDataBill?.id) {
// //       getBillDetail();
// //       getStatusPayMent(listDataBill.id);
// //     }
// //   }, [listDataBill]);

// //   const getStatusText = (status: number) => {
// //     switch (status) {
// //       case 2: return "Chờ xác nhận";
// //       case 4: return "Chờ giao hàng";
// //       case 5: return "Đang giao hàng";
// //       case 6: return "Hoàn thành";
// //       case 7: return "Đã hủy";
// //       default: return "Không xác định";
// //     }
// //   };

// //   const timelineSteps = [
// //     { status: 2, label: "Chờ xác nhận", icon: <FaClock />, color: "bg-yellow-500" },
// //     { status: 4, label: "Chờ giao hàng", icon: <FaBox />, color: "bg-blue-500" },
// //     { status: 5, label: "Đang giao hàng", icon: <FaTruck />, color: "bg-purple-500" },
// //     { status: 6, label: "Hoàn thành", icon: <FaCheckCircle />, color: "bg-green-500" },
// //     { status: 7, label: "Đã hủy", icon: <FaTimesCircle />, color: "bg-red-500" },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* Header */}
// //       <div className="relative w-full h-64">
// //         <img

// //           // src="https://viettelpost.com.vn/wp-content/uploads/2021/02/1920px-Hong_Kong_Skyline_Panorama_-_Dec_200811.jpg"
// //           src={Images.ghn}
// //           alt="Banner"
// //           className="w-full h-full object-cover"
// //         />

// //         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
// //           <div className="text-center text-white">
// //             <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
// //               Tra cứu hành trình đơn hàng
// //             </h1>
// //             <p className="mt-2 text-sm md:text-base">
// //               "Mạng chuyển phát nhanh rộng khắp nơi"
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Breadcrumb */}
// //       {/* <div className="bg-gray-200 py-2 px-4 text-sm">
// //         Trang chủ / <span className="text-blue-600">Tra cứu hành trình đơn hàng</span>
// //       </div> */}

// //       {/* Search Section */}
// //       <div className="max-w-6xl mx-auto px-4 py-8">
// //         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
// //           <div className="w-full md:w-1/2">
// //             <label className="block text-lg font-semibold text-gray-700 mb-2">
// //               Nhập mã phiếu gửi
// //             </label>
// //             <div className="flex gap-3">
// //               <input
// //                 type="text"
// //                 placeholder="VD: Hoá đơn "
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 value={inputHD}
// //                 onChange={(e) => setInputHD(e.target.value)}
// //               />
// //               <button
// //                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
// //                 onClick={getInfoDetailProduct}
// //               >
// //                 Tra cứu
// //               </button>
// //             </div>
// //           </div>
// //           {/* <div className="w-full md:w-1/2 flex justify-center">
// //             <img src={Images.imgTrack} alt="Track" className="w-48 object-contain" />
// //           </div> */}
// //         </div>

// //         {/* Bill Details */}
// //         {listDataBill && (
// //           <div className="mt-8">
// //             <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin đơn hàng</h2>

// //             {/* Horizontal Timeline */}
// //             <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
// //               <h3 className="text-xl font-medium text-gray-700 mb-6">Hành trình đơn hàng</h3>
// //               <div className="relative flex justify-between items-center">
// //                 {/* Gradient Line */}
// //                 <div
// //                   className={`absolute top-1/2 left-0 h-1 transform -translate-y-1/2 ${
// //                     listDataBill.status === 7
// //                       ? "right-0 bg-red-500"
// //                       : "bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500"
// //                   }`}
// //                   style={{
// //                     width:
// //                       listDataBill.status === 7
// //                         ? "100%"
// //                         : `${(Math.min(listDataBill.status, 6) - 2) * 33.33}%`,
// //                   }}
// //                 ></div>

// //                 {timelineSteps.map((step, index) => (
// //                   <div
// //                     key={index}
// //                     className={`relative flex-1 text-center transition-all duration-500 ${
// //                       listDataBill.status === 7
// //                         ? step.status === 7
// //                           ? "opacity-100 scale-100"
// //                           : "opacity-50 scale-90"
// //                         : listDataBill.status >= step.status
// //                         ? "opacity-100 scale-100"
// //                         : "opacity-50 scale-90"
// //                     }`}
// //                   >
// //                     {/* Icon */}
// //                     <div
// //                       className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-xl z-10 ${step.color} shadow-lg`}
// //                     >
// //                       {step.icon}
// //                     </div>
// //                     {/* Label */}
// //                     <p className="mt-3 text-base font-semibold text-gray-800">{step.label}</p>
// //                     <p className="text-sm text-gray-500">
// //                       {listDataBill.status === step.status
// //                         ? formartDate(listDataBill.createAt)
// //                         : listDataBill.status > step.status && step.status !== 7
// //                         ? "Đã hoàn thành"
// //                         : listDataBill.status === 7 && step.status === 7
// //                         ? formartDate(listDataBill.createAt)
// //                         : "Chưa thực hiện"}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Bill Summary */}
// //             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <p className="text-sm text-gray-600">Mã phiếu gửi</p>
// //                   <p className="font-medium text-gray-900">{listDataBill.code}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Ngày tạo đơn</p>
// //                   <p className="font-medium text-gray-900">{formartDate(listDataBill.createAt)}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Trạng thái</p>
// //                   <p className="font-medium text-blue-600">{getStatusText(listDataBill.status)}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Phí ship</p>
// //                   <p className="font-medium text-gray-900">{formatCurrency(listDataBill.moneyShip)}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Tổng tiền</p>
// //                   <p className="font-medium text-red-600">
// //                     {formatCurrency(listDataBill.totalMoney)}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Thanh toán</p>
// //                   <p className="font-medium">
// //                     {statusPayment ? (
// //                       <span className="text-green-600">Đã thanh toán</span>
// //                     ) : (
// //                       <span className="text-red-600">Chưa thanh toán</span>
// //                     )}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Customer Info */}
// //             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
// //               <h3 className="text-lg font-medium text-gray-700 mb-4">Thông tin người nhận</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// //                 <p><span className="font-medium">Tên:</span> {listDataBill.customerName}</p>
// //                 <p><span className="font-medium">SĐT:</span> {listDataBill.phoneNumber}</p>
// //                 <div>
// //                   <span className="font-medium">Địa chỉ:</span>
// //                   <DetailAddress
// //                     spec={listDataBill.address.split("##")[0]}
// //                     war={listDataBill.address.split("##")[1]}
// //                     distr={listDataBill.address.split("##")[2]}
// //                     prov={listDataBill.address.split("##")[3]}
// //                   />
// //                 </div>
// //                 {listDataBill.note && (
// //                   <p><span className="font-medium">Ghi chú:</span> {listDataBill.note}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Product List */}
// //         {detailBill && (
// //           <div className="bg-white shadow-md rounded-lg p-6 mt-6">
// //             <h3 className="text-lg font-medium text-gray-700 mb-4">Danh sách sản phẩm</h3>
// //             <div className="space-y-6">
// //               {detailBill.map((item, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
// //                 >
// //                   <img
// //                     src={item?.images.split(",")[0]}
// //                     alt={item?.name}
// //                     className="w-20 h-20 object-contain rounded"
// //                   />
// //                   <div className="flex-1">
// //                     <p className="font-semibold text-gray-900">{item?.name}</p>
// //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
// //                       <p>Màu: <span className="font-medium">{item?.color}</span></p>
// //                       <p>Số lượng: <span className="font-medium">{item?.quantity}</span></p>
// //                       <p>Kích thước: <span className="font-medium">{item?.size}</span></p>
// //                       <p>Loại đế: <span className="font-medium">{item?.sole}</span></p>
// //                     </div>
// //                     <p className="mt-2 text-sm">
// //                       Thành tiền:
// //                       <span className="font-medium text-red-600">
// //                         {item?.discountValue
// //                           ? convertToCurrencyString(item?.discountValue * item?.quantity)
// //                           : convertToCurrencyString(item?.price * item?.quantity)}
// //                       </span>
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LookUpOrders;

// // import React, { useEffect, useState } from "react";
// // import API from "../../api";
// // import axios from "axios";
// // import Images from "../../static";
// // import { CustomError, IBill, IDetailOrder } from "../../types/product.type";
// // import { formartDate, formatCurrency } from "../../utils/formatCurrency";
// // import { toast } from "react-toastify";
// // import { convertToCurrencyString } from "../../utils/format";
// // import DetailAddress from "../information/address/detailAddress";
// // import { FaClock, FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// // const LookUpOrders = () => {
// //   const [inputHD, setInputHD] = useState<string>("");
// //   const [listDataBill, setListDataBill] = useState<IBill>();
// //   const [detailBill, setDetailBill] = useState<IDetailOrder[]>();
// //   const [statusPayment, setStatusPayment] = useState<boolean>(false);

// //   const getInfoDetailProduct = async () => {
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: API.getSearchBill(inputHD),
// //       });
// //       if (res.status) {
// //         setListDataBill(res?.data);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const getBillDetail = async () => {
// //     if (!listDataBill?.id) return;
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: API.getDetailBill(Number(listDataBill?.id)),
// //       });
// //       if (res.status) {
// //         setDetailBill(res?.data?.data);
// //       }
// //     } catch (error) {
// //       toast.error(
// //         error instanceof Error ? error.message : "Đã có lỗi xảy ra, thử lại sau."
// //       );
// //     }
// //   };

// //   const getStatusPayMent = async (id: number) => {
// //     try {
// //       const res = await axios({
// //         method: "get",
// //         url: `http://localhost:8080/client/api/payment-method/${id}`,
// //       });
// //       if (res.status) {
// //         setStatusPayment(res?.data[0].type);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (listDataBill?.id) {
// //       getBillDetail();
// //       getStatusPayMent(listDataBill.id);
// //     }
// //   }, [listDataBill]);

// //   const getStatusText = (status: number) => {
// //     switch (status) {
// //       case 2: return "Chờ xác nhận";
// //       case 4: return "Chờ giao hàng";
// //       case 5: return "Đang giao hàng";
// //       case 6: return "Hoàn thành";
// //       case 7: return "Đã hủy";
// //       default: return "Không xác định";
// //     }
// //   };

// //   const timelineSteps = [
// //     { status: 2, label: "Chờ xác nhận", icon: <FaClock />, color: "bg-yellow-500" },
// //     { status: 4, label: "Chờ giao hàng", icon: <FaBox />, color: "bg-blue-500" },
// //     { status: 5, label: "Đang giao hàng", icon: <FaTruck />, color: "bg-purple-500" },
// //     { status: 6, label: "Hoàn thành", icon: <FaCheckCircle />, color: "bg-green-500" },
// //     { status: 7, label: "Đã hủy", icon: <FaTimesCircle />, color: "bg-red-500" },
// //   ];

// //   // Filter timeline steps based on current status
// //   const filteredTimelineSteps = () => {
// //     const currentStatus = listDataBill?.status ?? 0;

// //     if (currentStatus === 7) {
// //       // Nếu đã hủy, chỉ hiển thị các bước liên quan
// //       return timelineSteps.filter(
// //         step => step.status === 2 || step.status === 4 || step.status === 7
// //       );
// //     }

// //     // Hiển thị các bước từ "Chờ xác nhận" đến trạng thái hiện tại, loại "Đã hủy"
// //     return timelineSteps.filter(
// //       step => step.status <= currentStatus && step.status !== 7
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* Header */}
// //       <div className="relative w-full h-64">
// //         <img
// //           src={Images.ghn}
// //           alt="Banner"
// //           className="w-full h-full object-cover"
// //         />
// //         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
// //           <div className="text-center text-white">
// //             <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
// //               Tra cứu hành trình đơn hàng
// //             </h1>
// //             <p className="mt-2 text-sm md:text-base">
// //               "Mạng chuyển phát nhanh rộng khắp nơi"
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Search Section */}
// //       <div className="max-w-6xl mx-auto px-4 py-8">
// //         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
// //           <div className="w-full md:w-1/2">
// //             <label className="block text-lg font-semibold text-gray-700 mb-2">
// //               Nhập mã phiếu gửi
// //             </label>
// //             <div className="flex gap-3">
// //               <input
// //                 type="text"
// //                 placeholder="VD: Hoá đơn "
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 value={inputHD}
// //                 onChange={(e) => setInputHD(e.target.value)}
// //               />
// //               <button
// //                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
// //                 onClick={getInfoDetailProduct}
// //               >
// //                 Tra cứu
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bill Details */}
// //         {listDataBill && (
// //           <div className="mt-8">
// //             <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin đơn hàng</h2>

// //             {/* Horizontal Timeline */}
// //             <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
// //               <h3 className="text-xl font-medium text-gray-700 mb-6">Hành trình đơn hàng</h3>
// //               <div className="relative flex justify-between items-center">
// //                 {/* Gradient Line */}
// //                 <div
// //                   className={`absolute top-1/2 left-0 h-1 transform -translate-y-1/2 ${
// //                     listDataBill.status === 7
// //                       ? "right-0 bg-red-500"
// //                       : "bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500"
// //                   }`}
// //                   style={{
// //                     width:
// //                       listDataBill.status === 7
// //                         ? "100%"
// //                         : `${((filteredTimelineSteps().length - 1) / (filteredTimelineSteps().length - 1)) * 100}%`,
// //                   }}
// //                 ></div>

// //                 {filteredTimelineSteps().map((step, index) => (
// //                   <div
// //                     key={index}
// //                     className={`relative flex-1 text-center transition-all duration-500 ${
// //                       listDataBill.status === step.status
// //                         ? "opacity-100 scale-100"
// //                         : listDataBill.status > step.status || listDataBill.status === 7
// //                         ? "opacity-100 scale-100"
// //                         : "opacity-50 scale-90"
// //                     }`}
// //                   >
// //                     {/* Icon */}
// //                     <div
// //                       className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-xl z-10 ${step.color} shadow-lg`}
// //                     >
// //                       {step.icon}
// //                     </div>
// //                     {/* Label */}
// //                     <p className="mt-3 text-base font-semibold text-gray-800">{step.label}</p>
// //                     <p className="text-sm text-gray-500">
// //                       {listDataBill.status === step.status
// //                         ? formartDate(listDataBill.createAt)
// //                         : listDataBill.status > step.status && step.status !== 7
// //                         ? "Đã hoàn thành"
// //                         : listDataBill.status === 7 && step.status === 7
// //                         ? formartDate(listDataBill.createAt)
// //                         : "Chưa thực hiện"}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Bill Summary */}
// //             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <p className="text-sm text-gray-600">Mã phiếu gửi</p>
// //                   <p className="font-medium text-gray-900">{listDataBill.code}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Ngày tạo đơn</p>
// //                   <p className="font-medium text-gray-900">{formartDate(listDataBill.createAt)}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Trạng thái</p>
// //                   <p className="font-medium text-blue-600">{getStatusText(listDataBill.status)}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Phí ship</p>
// //                   <p className="font-medium text-gray-900">{formatCurrency(listDataBill.moneyShip)}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Tổng tiền</p>
// //                   <p className="font-medium text-red-600">
// //                     {formatCurrency(listDataBill.totalMoney)}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-600">Thanh toán</p>
// //                   <p className="font-medium">
// //                     {statusPayment ? (
// //                       <span className="text-green-600">Đã thanh toán</span>
// //                     ) : (
// //                       <span className="text-red-600">Chưa thanh toán</span>
// //                     )}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Customer Info */}
// //             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
// //               <h3 className="text-lg font-medium text-gray-700 mb-4">Thông tin người nhận</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// //                 <p><span className="font-medium">Tên:</span> {listDataBill.customerName}</p>
// //                 <p><span className="font-medium">SĐT:</span> {listDataBill.phoneNumber}</p>
// //                 <div>
// //                   <span className="font-medium">Địa chỉ:</span>
// //                   <DetailAddress
// //                     spec={listDataBill.address.split("##")[0]}
// //                     war={listDataBill.address.split("##")[1]}
// //                     distr={listDataBill.address.split("##")[2]}
// //                     prov={listDataBill.address.split("##")[3]}
// //                   />
// //                 </div>
// //                 {listDataBill.note && (
// //                   <p><span className="font-medium">Ghi chú:</span> {listDataBill.note}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Product List */}
// //         {detailBill && (
// //           <div className="bg-white shadow-md rounded-lg p-6 mt-6">
// //             <h3 className="text-lg font-medium text-gray-700 mb-4">Danh sách sản phẩm</h3>
// //             <div className="space-y-6">
// //               {detailBill.map((item, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
// //                 >
// //                   <img
// //                     src={item?.images.split(",")[0]}
// //                     alt={item?.name}
// //                     className="w-20 h-20 object-contain rounded"
// //                   />
// //                   <div className="flex-1">
// //                     <p className="font-semibold text-gray-900">{item?.name}</p>
// //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
// //                       <p>Màu: <span className="font-medium">{item?.color}</span></p>
// //                       <p>Số lượng: <span className="font-medium">{item?.quantity}</span></p>
// //                       <p>Kích thước: <span className="font-medium">{item?.size}</span></p>
// //                       <p>Loại đế: <span className="font-medium">{item?.sole}</span></p>
// //                     </div>
// //                     <p className="mt-2 text-sm">
// //                       Thành tiền:
// //                       <span className="font-medium text-red-600">
// //                         {item?.discountValue
// //                           ? convertToCurrencyString(item?.discountValue * item?.quantity)
// //                           : convertToCurrencyString(item?.price * item?.quantity)}
// //                       </span>
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LookUpOrders;

// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import axios from "axios";
// import Images from "../../static";
// import { CustomError, IBill, IDetailOrder } from "../../types/product.type";
// import { formartDate, formatCurrency } from "../../utils/formatCurrency";
// import { toast } from "react-toastify";
// import { convertToCurrencyString } from "../../utils/format";
// import DetailAddress from "../information/address/detailAddress";
// import { FaClock, FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// // Interface for bill history data (same as TimeLineOrder)
// interface IBillHistory {
//   createAt: string;
//   createBy: string;
//   id: number;
//   index: number;
//   note: string;
//   status: number;
// }

// const LookUpOrders = () => {
//   const [inputHD, setInputHD] = useState<string>("");
//   const [listDataBill, setListDataBill] = useState<IBill>();
//   const [detailBill, setDetailBill] = useState<IDetailOrder[]>();
//   const [statusPayment, setStatusPayment] = useState<boolean>(false);
//   const [billHistory, setBillHistory] = useState<IBillHistory[]>([]); // New state for bill history

//   // Fetch bill details
//   const getInfoDetailProduct = async () => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getSearchBill(inputHD),
//       });
//       if (res.status) {
//         setListDataBill(res?.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch bill history (same as TimeLineOrder)
//   const getBillHistory = async (billId: number) => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getBillHistory(billId),
//       });
//       if (res.status) {
//         setBillHistory(res?.data);
//       }
//     } catch (error) {
//       console.error("Error fetching bill history: ", error);
//     }
//   };

//   // Fetch bill detail
//   const getBillDetail = async () => {
//     if (!listDataBill?.id) return;
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getDetailBill(Number(listDataBill?.id)),
//       });
//       if (res.status) {
//         setDetailBill(res?.data?.data);
//       }
//     } catch (error) {
//       toast.error(
//         error instanceof Error ? error.message : "Đã có lỗi xảy ra, thử lại sau."
//       );
//     }
//   };

//   // Fetch payment status
//   const getStatusPayMent = async (id: number) => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: `http://localhost:8080/client/api/payment-method/${id}`,
//       });
//       if (res.status) {
//         setStatusPayment(res?.data[0].type);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch bill history and details when bill ID is available
//   useEffect(() => {
//     if (listDataBill?.id) {
//       getBillDetail();
//       getStatusPayMent(listDataBill.id);
//       getBillHistory(listDataBill.id); // Fetch bill history
//     }
//   }, [listDataBill]);

//   const getStatusText = (status: number) => {
//     switch (status) {
//       case 2: return "Chờ xác nhận";
//       case 4: return "Chờ giao hàng";
//       case 5: return "Đang giao hàng";
//       case 6: return "Hoàn thành";
//       case 7: return "Đã hủy";
//       default: return "Không xác định";
//     }
//   };

//   const timelineSteps = [
//     { status: 2, label: "Chờ xác nhận", icon: <FaClock />, color: "bg-yellow-500" },
//     { status: 4, label: "Chờ giao hàng", icon: <FaBox />, color: "bg-blue-500" },
//     { status: 5, label: "Đang giao hàng", icon: <FaTruck />, color: "bg-purple-500" },
//     { status: 6, label: "Hoàn thành", icon: <FaCheckCircle />, color: "bg-green-500" },
//     { status: 7, label: "Đã hủy", icon: <FaTimesCircle />, color: "bg-red-500" },
//   ];

//   // Filter timeline steps based on current status
//   const filteredTimelineSteps = () => {
//     const currentStatus = listDataBill?.status ?? 0;

//     if (currentStatus === 7) {
//       return timelineSteps.filter(
//         step => step.status === 2 || step.status === 4 || step.status === 7
//       );
//     }

//     return timelineSteps.filter(
//       step => step.status <= currentStatus && step.status !== 7
//     );
//   };

//   // Map status to bill history index (based on TimeLineOrder's logic)
//   const getHistoryIndexForStatus = (status: number) => {
//     switch (status) {
//       case 2: return 0; // Chờ xác nhận
//       case 4: return 1; // Chờ giao hàng
//       case 5: return 2; // Đang giao hàng
//       case 6: return 3; // Hoàn thành
//       case 7: return 2; // Đã hủy (assuming it replaces "Đang giao hàng" in history)
//       default: return -1;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="relative w-full h-64">
//         <img
//           src={Images.ghn}
//           alt="Banner"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="text-center text-white">
//             <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
//               Tra cứu hành trình đơn hàng
//             </h1>
//             <p className="mt-2 text-sm md:text-base">
//               "Mạng chuyển phát nhanh rộng khắp nơi"
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="w-full md:w-1/2">
//             <label className="block text-lg font-semibold text-gray-700 mb-2">
//               Nhập mã phiếu gửi
//             </label>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 placeholder="VD: Hoá đơn "
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={inputHD}
//                 onChange={(e) => setInputHD(e.target.value)}
//               />
//               <button
//                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 onClick={getInfoDetailProduct}
//               >
//                 Tra cứu
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bill Details */}
//         {listDataBill && (
//           <div className="mt-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin đơn hàng</h2>

//             {/* Horizontal Timeline */}
//             <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
//               <h3 className="text-xl font-medium text-gray-700 mb-6">Hành trình đơn hàng</h3>
//               <div className="relative flex justify-between items-center">
//                 {/* Gradient Line */}
//                 <div
//                   className={`absolute top-1/2 left-0 h-1 transform -translate-y-1/2 ${
//                     listDataBill.status === 7
//                       ? "right-0 bg-red-500"
//                       : "bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500"
//                   }`}
//                   style={{
//                     width:
//                       listDataBill.status === 7
//                         ? "100%"
//                         : `${((filteredTimelineSteps().length - 1) / (filteredTimelineSteps().length - 1)) * 100}%`,
//                   }}
//                 ></div>

//                 {filteredTimelineSteps().map((step, index) => {
//                   const historyIndex = getHistoryIndexForStatus(step.status);
//                   const historyItem = billHistory[historyIndex];

//                   return (
//                     <div
//                       key={index}
//                       className={`relative flex-1 text-center transition-all duration-500 ${
//                         listDataBill.status === step.status
//                           ? "opacity-100 scale-100"
//                           : listDataBill.status > step.status || listDataBill.status === 7
//                           ? "opacity-100 scale-100"
//                           : "opacity-50 scale-90"
//                       }`}
//                     >
//                       {/* Icon */}
//                       <div
//                         className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-xl z-10 ${step.color} shadow-lg`}
//                       >
//                         {step.icon}
//                       </div>
//                       {/* Label */}
//                       <p className="mt-3 text-base font-semibold text-gray-800">{step.label}</p>
//                       <p className="text-sm text-gray-500">
//                         {historyItem?.createAt
//                           ? formartDate(historyItem.createAt)
//                           : listDataBill.status > step.status && step.status !== 7
//                           ? "Đã hoàn thành"
//                           : listDataBill.status === 7 && step.status === 7
//                           ? formartDate(billHistory[getHistoryIndexForStatus(7)]?.createAt)
//                           : "Chưa thực hiện"}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Bill Summary */}
//             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-gray-600">Mã phiếu gửi</p>
//                   <p className="font-medium text-gray-900">{listDataBill.code}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Ngày tạo đơn</p>
//                   <p className="font-medium text-gray-900">{formartDate(listDataBill.createAt)}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Trạng thái</p>
//                   <p className="font-medium text-blue-600">{getStatusText(listDataBill.status)}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Phí ship</p>
//                   <p className="font-medium text-gray-900">{formatCurrency(listDataBill.moneyShip)}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Tổng tiền</p>
//                   <p className="font-medium text-red-600">
//                     {formatCurrency(listDataBill.totalMoney)}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Thanh toán</p>
//                   <p className="font-medium">
//                     {statusPayment ? (
//                       <span className="text-green-600">Đã thanh toán</span>
//                     ) : (
//                       <span className="text-red-600">Chưa thanh toán</span>
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Customer Info */}
//             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//               <h3 className="text-lg font-medium text-gray-700 mb-4">Thông tin người nhận</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <p><span className="font-medium">Tên:</span> {listDataBill.customerName}</p>
//                 <p><span className="font-medium">SĐT:</span> {listDataBill.phoneNumber}</p>
//                 <div>
//                   <span className="font-medium">Địa chỉ:</span>
//                   <DetailAddress
//                     spec={listDataBill.address.split("##")[0]}
//                     war={listDataBill.address.split("##")[1]}
//                     distr={listDataBill.address.split("##")[2]}
//                     prov={listDataBill.address.split("##")[3]}
//                   />
//                 </div>
//                 {listDataBill.note && (
//                   <p><span className="font-medium">Ghi chú:</span> {listDataBill.note}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Product List */}
//         {detailBill && (
//           <div className="bg-white shadow-md rounded-lg p-6 mt-6">
//             <h3 className="text-lg font-medium text-gray-700 mb-4">Danh sách sản phẩm</h3>
//             <div className="space-y-6">
//               {detailBill.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
//                 >
//                   <img
//                     src={item?.images.split(",")[0]}
//                     alt={item?.name}
//                     className="w-20 h-20 object-contain rounded"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-900">{item?.name}</p>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
//                       <p>Màu: <span className="font-medium">{item?.color}</span></p>
//                       <p>Số lượng: <span className="font-medium">{item?.quantity}</span></p>
//                       <p>Kích thước: <span className="font-medium">{item?.size}</span></p>
//                       {/* <p>Loại đế: <span className="font-medium">{item?.sole}</span></p> */}
//                     </div>
//                     <p className="mt-2 text-sm">
//                       Thành tiền:
//                       <span className="font-medium text-red-600">
//                         {item?.discountValue
//                           ? convertToCurrencyString(item?.discountValue * item?.quantity)
//                           : convertToCurrencyString(item?.price * item?.quantity)}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LookUpOrders;

// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import axios from "axios";
// import Images from "../../static";
// import { CustomError, IBill, IDetailOrder } from "../../types/product.type";
// import { formartDate, formatCurrency } from "../../utils/formatCurrency";
// import { toast } from "react-toastify";
// import { convertToCurrencyString } from "../../utils/format";
// import DetailAddress from "../information/address/detailAddress";
// import { FaClock, FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// // Interface for bill history data (aligned with BillHistory)
// interface IBillHistory {
//   createAt: string;
//   createBy: string;
//   id: number;
//   index: number;
//   note: string;
//   status: number;
// }

// const LookUpOrders = () => {
//   const [inputHD, setInputHD] = useState<string>("");
//   const [listDataBill, setListDataBill] = useState<IBill>();
//   const [detailBill, setDetailBill] = useState<IDetailOrder[]>();
//   const [statusPayment, setStatusPayment] = useState<boolean>(false);
//   const [billHistory, setBillHistory] = useState<IBillHistory[]>([]);

//   // Fetch bill details
//   const getInfoDetailProduct = async () => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getSearchBill(inputHD),
//       });
//       if (res.status) {
//         const billData = res?.data;
//         // Đảm bảo address có giá trị mặc định nếu null
//         billData.address = billData.address || "";
//         setListDataBill(billData);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch bill history
//   const getBillHistory = async (billId: number) => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getBillHistory(billId),
//       });
//       if (res.status) {
//         setBillHistory(res?.data);
//       }
//     } catch (error) {
//       console.error("Error fetching bill history: ", error);
//     }
//   };

//   // Fetch bill detail
//   const getBillDetail = async () => {
//     if (!listDataBill?.id) return;
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getDetailBill(Number(listDataBill?.id)),
//       });
//       if (res.status) {
//         setDetailBill(res?.data?.data);
//       }
//     } catch (error) {
//       toast.error(
//         error instanceof Error ? error.message : "Đã có lỗi xảy ra, thử lại sau."
//       );
//     }
//   };

//   // Fetch payment status
//   const getStatusPayMent = async (id: number) => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: `http://localhost:8080/client/api/payment-method/${id}`,
//       });
//       if (res.status) {
//         setStatusPayment(res?.data[0].type);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch bill history and details when bill ID is available
//   useEffect(() => {
//     if (listDataBill?.id) {
//       getBillDetail();
//       getStatusPayMent(listDataBill.id);
//       getBillHistory(listDataBill.id);
//     }
//   }, [listDataBill]);

//   // Map status codes to text (only for relevant statuses)
//   const getStatusText = (status: number) => {
//     switch (status) {
//       case 1: return "Tạo hoá đơn";
//       case 2: return "Chờ xác nhận";
//       case 4: return "Chờ giao hàng";
//       case 5: return "Đang giao hàng";
//       case 6: return "Hoàn thành";
//       case 7: return "Đã hủy";
//       default: return "Không xác định";
//     }
//   };

//   // Timeline steps (restricted to specified statuses)
//   const timelineSteps = [
//     { status: 1, label: "Tạo hoá đơn", icon: <FaClock />, color: "bg-yellow-500" },
//     { status: 2, label: "Chờ xác nhận", icon: <FaClock />, color: "bg-yellow-500" },
//     { status: 4, label: "Chờ giao hàng", icon: <FaBox />, color: "bg-blue-500" },
//     { status: 5, label: "Đang giao hàng", icon: <FaTruck />, color: "bg-purple-500" },
//     { status: 6, label: "Hoàn thành", icon: <FaCheckCircle />, color: "bg-green-500" },
//     { status: 7, label: "Đã hủy", icon: <FaTimesCircle />, color: "bg-red-500" },
//   ];

//   // Filter timeline steps based on current status and bill history
//   const filteredTimelineSteps = () => {
//     const currentStatus = listDataBill?.status ?? 0;

//     // If the order is canceled (status 7), show only statuses present in billHistory
//     if (currentStatus === 7) {
//       const relevantStatuses = timelineSteps.filter(step =>
//         (step.status === 2 || step.status === 4 || step.status === 7) &&
//         billHistory.some(history => history.status === step.status)
//       );
//       return relevantStatuses;
//     }

//     // For non-canceled orders, show steps up to the current status, excluding cancel
//     return timelineSteps.filter(
//       step => step.status <= currentStatus && step.status !== 7
//     );
//   };

//   // Map status to bill history index
//   const getHistoryIndexForStatus = (status: number) => {
//     return billHistory.findIndex(history => history.status === status);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="relative w-full h-64">
//         <img
//           src={Images.ghn}
//           alt="Banner"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="text-center text-white">
//             <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
//               Tra cứu hành trình đơn hàng
//             </h1>
//             <p className="mt-2 text-sm md:text-base">
//               "Mạng chuyển phát nhanh rộng khắp nơi"
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="w-full md:w-1/2">
//             <label className="block text-lg font-semibold text-gray-700 mb-2">
//               Nhập mã phiếu gửi
//             </label>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 placeholder="VD: Hoá đơn "
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={inputHD}
//                 onChange={(e) => setInputHD(e.target.value)}
//               />
//               <button
//                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 onClick={getInfoDetailProduct}
//               >
//                 Tra cứu
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bill Details */}
//         {listDataBill && (
//           <div className="mt-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin đơn hàng</h2>

//             {/* Horizontal Timeline */}
//             <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
//               <h3 className="text-xl font-medium text-gray-700 mb-6">Hành trình đơn hàng</h3>
//               <div className="relative flex justify-between items-center">
//                 {/* Gradient Line */}
//                 <div
//                   className={`absolute top-1/2 left-0 h-1 transform -translate-y-1/2 ${
//                     listDataBill.status === 7
//                       ? "right-0 bg-red-500"
//                       : "bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500"
//                   }`}
//                   style={{
//                     width: `${((filteredTimelineSteps().length - 1) / (filteredTimelineSteps().length - 1)) * 100}%`,
//                   }}
//                 ></div>

//                 {filteredTimelineSteps().map((step, index) => {
//                   const historyIndex = getHistoryIndexForStatus(step.status);
//                   const historyItem = billHistory[historyIndex];

//                   return (
//                     <div
//                       key={index}
//                       className={`relative flex-1 text-center transition-all duration-500 ${
//                         listDataBill.status === step.status
//                           ? "opacity-100 scale-100"
//                           : listDataBill.status > step.status || listDataBill.status === 7
//                           ? "opacity-100 scale-100"
//                           : "opacity-50 scale-90"
//                       }`}
//                     >
//                       {/* Icon */}
//                       <div
//                         className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-xl z-10 ${step.color} shadow-lg`}
//                       >
//                         {step.icon}
//                       </div>
//                       {/* Label */}
//                       <p className="mt-3 text-base font-semibold text-gray-800">{step.label}</p>
//                       <p className="text-sm text-gray-500">
//                         {historyItem?.createAt
//                           ? formartDate(historyItem.createAt)
//                           : listDataBill.status > step.status && step.status !== 7
//                           ? "Đã hoàn thành"
//                           : listDataBill.status === 7 && step.status === 7
//                           ? formartDate(billHistory[getHistoryIndexForStatus(7)]?.createAt)
//                           : "Chưa thực hiện"}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Bill Summary */}
//             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-gray-600">Mã phiếu gửi</p>
//                   <p className="font-medium text-gray-900">{listDataBill.code}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Ngày tạo đơn</p>
//                   <p className="font-medium text-gray-900">{formartDate(listDataBill.createAt)}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Trạng thái</p>
//                   <p className="font-medium text-blue-600">{getStatusText(listDataBill.status)}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Thanh toán</p>
//                   <p className="font-medium">
//                     {statusPayment ? (
//                       <span className="text-green-600">Đã thanh toán</span>
//                     ) : (
//                       <span className="text-red-600">Chưa thanh toán</span>
//                     )}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Tổng tiền hàng</p>
//                   <p className="font-medium text-red-600">
//                     {formatCurrency(listDataBill.totalMoney + listDataBill.moneyReduce)}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Phí vận chuyển</p>
//                   <p className="font-medium text-gray-900">{formatCurrency(listDataBill.moneyShip)}</p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-600">Tổng tiền phải thanh toán</p>
//                   <p className="font-medium text-red-600">
//                     {formatCurrency(listDataBill.totalMoney + listDataBill.moneyShip)}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Giảm giá</p>
//                   <p className="font-medium text-red-600">
//                     {formatCurrency(listDataBill.moneyReduce)}
//                   </p>
//                 </div>

//               </div>
//             </div>

//             {/* Customer Info */}
//             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//               <h3 className="text-lg font-medium text-gray-700 mb-4">Thông tin người nhận</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <p><span className="font-medium">Tên:</span> {listDataBill.customerName}</p>
//                 <p><span className="font-medium">SĐT:</span> {listDataBill.phoneNumber}</p>
//                 <div>
//                   <span className="font-medium">Địa chỉ:</span>
//                   <DetailAddress
//                     spec={listDataBill.address.split("##")[0]}
//                     war={listDataBill.address.split("##")[1]}
//                     distr={listDataBill.address.split("##")[2]}
//                     prov={listDataBill.address.split("##")[3]}
//                   />
//                 </div>
//                 {listDataBill.note && (
//                   <p><span className="font-medium">Ghi chú:</span> {listDataBill.note}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Product List */}
//         {detailBill && (
//           <div className="bg-white shadow-md rounded-lg p-6 mt-6">
//             <h3 className="text-lg font-medium text-gray-700 mb-4">Danh sách sản phẩm</h3>
//             <div className="space-y-6">
//               {detailBill.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
//                 >
//                   <img
//                     src={item?.images.split(",")[0]}
//                     alt={item?.name}
//                     className="w-20 h-20 object-contain rounded"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-900">{item?.name}</p>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
//                       <p>Màu: <span className="font-medium">{item?.color}</span></p>
//                       <p>Số lượng: <span className="font-medium">{item?.quantity}</span></p>
//                       <p>Kích thước: <span className="font-medium">{item?.size}</span></p>
//                     </div>
//                     <p className="mt-2 text-sm">
//                       Thành tiền:
//                       <span className="font-medium text-red-600">
//                         {item?.discountValue
//                           ? convertToCurrencyString(item?.discountValue * item?.quantity)
//                           : convertToCurrencyString(item?.price * item?.quantity)}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LookUpOrders;

import React, { useEffect, useState } from "react";
import API from "../../api";
import axios from "axios";
import Images from "../../static";
import { CustomError, IBill, IDetailOrder } from "../../types/product.type";
import { formartDate, formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";
import { convertToCurrencyString } from "../../utils/format";
import DetailAddress from "../information/address/detailAddress";
import {
  FaClock,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// Interface for bill history data (aligned with BillHistory)
interface IBillHistory {
  createAt: string;
  createBy: string;
  id: number;
  index: number;
  note: string;
  status: number;
}

const LookUpOrders = () => {
  const [inputHD, setInputHD] = useState<string>("");
  const [listDataBill, setListDataBill] = useState<IBill>();
  const [detailBill, setDetailBill] = useState<IDetailOrder[]>();
  const [statusPayment, setStatusPayment] = useState<boolean>(false);
  const [billHistory, setBillHistory] = useState<IBillHistory[]>([]);

  // Fetch bill details
  const getInfoDetailProduct = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getSearchBill(inputHD),
      });
      if (res.status) {
        const billData = res?.data;
        billData.address = billData.address || "";
        setListDataBill(billData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch bill history
  const getBillHistory = async (billId: number) => {
    try {
      const res = await axios({
        method: "get",
        url: API.getBillHistory(billId),
      });
      if (res.status) {
        setBillHistory(res?.data);
      }
    } catch (error) {
      console.error("Error fetching bill history: ", error);
    }
  };

  // Fetch bill detail
  const getBillDetail = async () => {
    if (!listDataBill?.id) return;
    try {
      const res = await axios({
        method: "get",
        url: API.getDetailBill(Number(listDataBill?.id)),
      });
      if (res.status) {
        setDetailBill(res?.data?.data);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Đã có lỗi xảy ra, thử lại sau."
      );
    }
  };

  // Fetch payment status
  const getStatusPayMent = async (id: number) => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8080/client/api/payment-method/${id}`,
      });
      if (res.status) {
        setStatusPayment(res?.data[0].type);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch bill history and details when bill ID is available
  useEffect(() => {
    if (listDataBill?.id) {
      getBillDetail();
      getStatusPayMent(listDataBill.id);
      getBillHistory(listDataBill.id);
    }
  }, [listDataBill]);

  // Map status codes to text (only for relevant statuses)
  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return "Tạo hoá đơn";
      case 2:
        return "Chờ xác nhận";
      case 4:
        return "Chờ giao hàng";
      case 5:
        return "Đang giao hàng";
      case 6:
        return "Hoàn thành";
      case 7:
        return "Đã hủy";
      case 9:
        return "Đã xác nhận";
      default:
        return "Không xác định";
    }
  };

  // Timeline steps (restricted to specified statuses)
  const timelineSteps = [
    {
      status: 1,
      label: "Tạo hoá đơn",
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      status: 2,
      label: "Chờ xác nhận",
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      status: 9,
      label: "Đã xác nhận",
      icon: <FaCheckCircle />,
      color: "bg-green-400",
    },
    {
      status: 4,
      label: "Chờ giao hàng",
      icon: <FaBox />,
      color: "bg-blue-500",
    },
    {
      status: 5,
      label: "Đang giao hàng",
      icon: <FaTruck />,
      color: "bg-purple-500",
    },
    {
      status: 6,
      label: "Hoàn thành",
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      status: 7,
      label: "Đã hủy",
      icon: <FaTimesCircle />,
      color: "bg-red-500",
    },
  ];

  // Filter timeline steps based on current status and bill history
  // Filter timeline steps based on current status and bill history
  const filteredTimelineSteps = () => {
    const currentStatus = listDataBill?.status ?? 0;

    // If the order is canceled (status 7), show only statuses present in billHistory
    if (currentStatus === 7) {
      const relevantStatuses = timelineSteps.filter(
        (step) =>
          (step.status === 2 ||
            step.status === 4 ||
            step.status === 7 ||
            step.status === 9) && // Include status 9
          billHistory.some((history) => history.status === step.status)
      );
      return relevantStatuses;
    }

    // For non-canceled orders, show steps up to the current status, excluding cancel
    return timelineSteps.filter(
      (step) =>
        (step.status <= currentStatus && step.status !== 7) ||
        (step.status === 9 &&
          billHistory.some((history) => history.status === 9))
    );
  };

  // Map status to bill history index
  const getHistoryIndexForStatus = (status: number) => {
    return billHistory.findIndex((history) => history.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="relative w-full h-64">
        <img
          src={Images.ghn}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
              Tra cứu hành trình đơn hàng
            </h1>
            <p className="mt-2 text-sm md:text-base">
              "Mạng chuyển phát nhanh rộng khắp nơi"
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Nhập mã phiếu gửi
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="VD: Hoá đơn "
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputHD}
                onChange={(e) => setInputHD(e.target.value)}
              />
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={getInfoDetailProduct}
              >
                Tra cứu
              </button>
            </div>
          </div>
        </div>

        {/* Bill Details */}
        {listDataBill && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Thông tin đơn hàng
            </h2>

            {/* Horizontal Timeline */}
            <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-700 mb-6">
                Hành trình đơn hàng
              </h3>
              <div className="relative flex justify-between items-center">
                {/* Gradient Line */}
                <div
                  className={`absolute top-1/2 left-0 h-1 transform -translate-y-1/2 ${
                    listDataBill.status === 7
                      ? "right-0 bg-red-500"
                      : "bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500"
                  }`}
                  style={{
                    width: `${((filteredTimelineSteps().length - 1) /
                      (filteredTimelineSteps().length - 1)) *
                      100}%`,
                  }}
                ></div>

                {filteredTimelineSteps().map((step, index) => {
                  const historyIndex = getHistoryIndexForStatus(step.status);
                  const historyItem = billHistory[historyIndex];
                  // Kiểm tra nếu trạng thái hiển thị "Đã hoàn thành" và không có createAt thì ẩn
                  const isCompletedWithoutDate =
                    !historyItem?.createAt &&
                    listDataBill.status > step.status &&
                    step.status !== 7;

                  if (isCompletedWithoutDate) {
                    return null; // Ẩn trạng thái không có createAt và hiển thị "Đã hoàn thành"
                  }

                  return (
                    <div
                      key={index}
                      className={`relative flex-1 text-center transition-all duration-500 ${
                        listDataBill.status === step.status ||
                        billHistory.some(
                          (history) => history.status === step.status
                        ) ||
                        (listDataBill.status > step.status && step.status !== 7)
                          ? "opacity-100 scale-100"
                          : "opacity-50 scale-90"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-xl z-10 ${step.color} shadow-lg`}
                      >
                        {step.icon}
                      </div>
                      {/* Label */}
                      <p className="mt-3 text-base font-semibold text-gray-800">
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {historyItem?.createAt
                          ? formartDate(historyItem.createAt)
                          : listDataBill.status === 7 && step.status === 7
                          ? formartDate(
                              billHistory[getHistoryIndexForStatus(7)]?.createAt
                            )
                          : "Chưa thực hiện"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Mã phiếu gửi</p>
                  <p className="font-medium text-gray-900">
                    {listDataBill.code}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày tạo đơn</p>
                  <p className="font-medium text-gray-900">
                    {formartDate(listDataBill.createAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <p className="font-medium text-blue-600">
                    {getStatusText(listDataBill.status)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thanh toán</p>
                  <p className="font-medium">
                    {statusPayment ? (
                      <span className="text-green-600">Đã thanh toán</span>
                    ) : (
                      <span className="text-red-600">Chưa thanh toán</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng tiền hàng</p>
                  <p className="font-medium text-red-600">
                    {formatCurrency(
                      listDataBill.totalMoney + listDataBill.moneyReduce
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phí vận chuyển</p>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(listDataBill.moneyShip)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Tổng tiền phải thanh toán
                  </p>
                  <p className="font-medium text-red-600">
                    {formatCurrency(
                      listDataBill.totalMoney + listDataBill.moneyShip
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Giảm giá</p>
                  <p className="font-medium text-red-600">
                    {formatCurrency(listDataBill.moneyReduce)}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Thông tin người nhận
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium">Tên:</span>{" "}
                  {listDataBill.customerName}
                </p>
                <p>
                  <span className="font-medium">SĐT:</span>{" "}
                  {listDataBill.phoneNumber}
                </p>
                <div>
                  <span className="font-medium">Địa chỉ:</span>
                  <DetailAddress
                    spec={listDataBill.address.split("##")[0]}
                    war={listDataBill.address.split("##")[1]}
                    distr={listDataBill.address.split("##")[2]}
                    prov={listDataBill.address.split("##")[3]}
                  />
                </div>
                {listDataBill.note && (
                  <p>
                    <span className="font-medium">Ghi chú:</span>{" "}
                    {listDataBill.note}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Product List */}
        {detailBill && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Danh sách sản phẩm
            </h3>
            <div className="space-y-6">
              {detailBill.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={item?.images.split(",")[0]}
                    alt={item?.name}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item?.name}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
                      <p>
                        Màu: <span className="font-medium">{item?.color}</span>
                      </p>
                      <p>
                        Số lượng:{" "}
                        <span className="font-medium">{item?.quantity}</span>
                      </p>
                      <p>
                        Kích thước:{" "}
                        <span className="font-medium">{item?.size}</span>
                      </p>
                    </div>
                    <p className="mt-2 text-sm">
                      Thành tiền:
                      <span className="font-medium text-red-600">
                        {item?.discountValue
                          ? convertToCurrencyString(
                              item?.discountValue * item?.quantity
                            )
                          : convertToCurrencyString(
                              item?.price * item?.quantity
                            )}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LookUpOrders;
