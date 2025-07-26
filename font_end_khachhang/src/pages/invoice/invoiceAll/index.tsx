// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Images from "../../../static";
// import { useShoppingCart } from "../../../context/shoppingCart.context";
// import axios from "axios";
// import API from "../../../api";
// import { IDetailOrder, IOrder } from "../../../types/product.type";
// import { convertToCurrencyString } from "../../../utils/format";
// import { toast } from "react-toastify";
// type ItemProps = {
//   name: string;
//   price: number;
//   color: string;
//   quantity: number;
// };
// const Item = ({ item }: { item: IDetailOrder }) => {
//   return (
//     <div className="flex justify-between items-center p-2 border-b ">
//       <div className="flex gap-5 ">
//         <div className="w-24 h-20 flex items-center justify-center">
//           <img
//             src={item.images.split(",")[0]}
//             className="max-w-24 max-h-20  object-contain"
//           />
//         </div>
//         <div>
//           <div className="text-sm font-semibold">{item.name}</div>
//           <div className="text-xs text-[#0000008a]">
//             Phân loại hàng: {item?.color} - {item?.size} - {item?.sole}
//           </div>
//           <div className="text-[10px] text-gray-600 font-semibold ">
//             X{item?.quantity}
//           </div>
//         </div>
//       </div>
//       <div> 
//         <div className="text-sm">
//           {!!item?.discountValue ? (
//             <>
//               <span className="line-through mr-2">
//                 {convertToCurrencyString(Number(item?.shoePrice))}
//               </span>
//               <span className="text-red-600 font-semibold">
//                 {convertToCurrencyString(Number(item?.discountValue))}
//               </span>
//             </>
//           ) : (
//             <span className="text-red-600 font-semibold">
//               {convertToCurrencyString(Number(item?.shoePrice))}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// const ItemOrder = ({
//   item,
//   setLoading,
//   loading,
// }: {
//   item: IOrder;
//   setLoading: any;
//   loading: boolean;
// }) => {
//   const navigate = useNavigate();
//   const [dataDetailOrder, setDataDetailOrder] = useState<IDetailOrder[]>([]);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [selectedOption, setSelectedOption] = useState<string>("");
//   const [statusPayment, setStatusPayment] = useState<boolean>(false);
//   const getStatusPayMent = async (id: number) => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: `http://localhost:8080/client/api/payment-method/${id}`,
//       });
//       if (res.status) {
//         console.log(res.data);
//         setStatusPayment(res?.data[0].type);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (item?.id) {
//       getStatusPayMent(item?.id);
//     }
//   }, [item?.id]);
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedOption(event.target.value);
//   };

//   const getDetailBill = async () => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getDetailBill(Number(item?.id)),
//       });
//       if (res.status) {
//         setDataDetailOrder(res?.data?.data);
//       }
//     } catch (error) {
//       console.error("Error fetching order details: ", error);
//     }
//   };
//   useEffect(() => {
//     if (item?.id) {
//       getDetailBill();
//     }
//   }, [item?.id]);
//   const changeStatusBill = async () => {
//     try {
//       const res = await axios({
//         method: "get",
//         url: `http://localhost:8080/client/api/bill/change-status/${item?.id}`,
//         params: {
//           note: selectedOption,
//           isCancel: true,
//         },
//       });
//       if (res.status) {
//         setLoading(!loading);
//         toast.success("Đã hủy đơn hàng thành công");
//       } else {
//         toast.warning("Lỗi hủy đơn hàng");
//       }
//     } catch (error) {
//       console.error("Error fetching order details: ", error);
//     }
//   };
//   return (
//     <div className="bg-white mb-3 shadow-lg flex flex-col">
//       <div className="w-full px-2 py-2 border-b-[1px] flex items-center justify-between">
//         <p className=" text-gray-500 text-sm">Mã Hóa Đơn: {item?.code}</p>
//         <div className="flex items-center gap-4">
//           {item.status !== 7 && (
//             <button
//               className="text-gray-500 text-sm font-semibold"
//               onClick={() => {
//                 navigate(
//                   `/timeLineOrder/${item?.status}/${item?.id}/${item?.code}`
//                 );
//               }}
//             >
//               Xem tình trạng đơn hàng
//             </button>
//           )}
//           <p className=" text-red-400 text-sm uppercase">
//             |{" "}
//             {item?.status === 2
//               ? "Chờ xác nhận"
//               : item?.status === 4
//               ? "Chờ giao hàng"
//               : item?.status === 5
//               ? "Đang giao hàng"
//               : item?.status === 6
//               ? "Hoàn thành"
//               : item?.status === 7
//               ? "Đã hủy"
//               : ""}
//           </p>
//         </div>
//       </div>
//       {!!dataDetailOrder && dataDetailOrder.length > 0 ? (
//         dataDetailOrder.map((item, index) => {
//           return <Item key={index} item={item} />;
//         })
//       ) : (
//         <svg
//           className="animate-spin w-12 h-12 text-indigo-400"
//           viewBox="0 0 24 24"
//         >
//           {" "}
//         </svg>
//       )}
//       <div className="p-4 flex items-center justify-between">
//         <div className="font-semibold text-xs ">
//           Trạng thái:{" "}
//           <span className="text-red-600">
//             {statusPayment === true ? (
//               <span>Đã thanh toán</span>
//             ) : (
//               <span>Chưa thanh toán</span>
//             )}
//           </span>
//         </div>
//         {item?.status === 4 || item?.status === 2 ? (
//           <div
//             className="border border-red-400 rounded px-2 py-1 cursor-pointer "
//             onClick={() => {
//               setShowModal(true);
//             }}
//           >
//             <span className="text-red-500">Hủy đơn hàng</span>
//           </div>
//         ) : (
//           <></>
//         )}
//         <div className="font-semibold text-xs ">
//           Thành tiền:{" "}
//           <span className="text-red-600">
//             {convertToCurrencyString(item?.totalMoney + item?.moneyShip)}
//           </span>
//         </div>
//       </div>
//       {showModal === true && (
//         <div
//           className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mt-20"
//           id="my-modal"
//         >
//           <div className="relative top-20 mx-auto p-5 border w-[30%] shadow-lg rounded-md bg-white px-10">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">
//                 Lý Do Hủy
//               </h3>
//               <div className="mt-2">
//                 <label className="flex justify-start items-center gap-4 my-3">
//                   <input
//                     type="radio"
//                     name="reason"
//                     value="Tôi muốn thay đổi mã giảm giá"
//                     checked={selectedOption === "Tôi muốn thay đổi mã giảm giá"}
//                     onChange={handleChange}
//                     className="mr-2 
// "
//                   />
//                   Tôi muốn thay đổi mã giảm giá.
//                 </label>
//                 <label className="flex justify-start items-center  gap-4 my-3">
//                   <input
//                     type="radio"
//                     name="reason"
//                     value="Tôi muốn thay đổi sản phẩm"
//                     checked={selectedOption === "Tôi muốn thay đổi sản phẩm"}
//                     onChange={handleChange}
//                     className="mr-2 
// "
//                   />
//                   Tôi muốn thay đổi sản phẩm
//                 </label>
//                 <label className="flex justify-start  items-center  gap-4 my-3">
//                   <input
//                     type="radio"
//                     name="reason"
//                     value="Thủ tục thanh toán rắc rối"
//                     checked={selectedOption === "Thủ tục thanh toán rắc rối"}
//                     onChange={handleChange}
//                     className="mr-2 "
//                   />
//                   Thủ tục thanh toán rắc rối
//                 </label>
//                 <label className="flex justify-start  items-center  gap-4 my-3">
//                   <input
//                     type="radio"
//                     name="reason"
//                     value="Tôi tìm thấy chỗ mua khác tốt hơn"
//                     checked={
//                       selectedOption === "Tôi tìm thấy chỗ mua khác tốt hơn"
//                     }
//                     onChange={handleChange}
//                     className="mr-2 "
//                   />
//                   Tôi tìm thấy chỗ mua khác tốt hơn
//                 </label>
//                 <label className="flex justify-start  items-center  gap-4 my-3">
//                   <input
//                     type="radio"
//                     name="reason"
//                     value="Tôi không có nhu cầu mua nữa"
//                     checked={selectedOption === "Tôi không có nhu cầu mua nữa"}
//                     onChange={handleChange}
//                     className="mr-2 "
//                   />
//                   Tôi không có nhu cầu mua nữa
//                 </label>
//                 <label className="flex justify-start  items-center  gap-4 my-3">
//                   <input
//                     type="radio"
//                     name="reason"
//                     value="Tôi không tìm thấy lý do hủy phù hợp"
//                     checked={
//                       selectedOption === "Tôi không tìm thấy lý do hủy phù hợp"
//                     }
//                     onChange={handleChange}
//                     className="mr-2 "
//                   />
//                   Tôi không tìm thấy lý do hủy phù hợp
//                 </label>
//                 <label className="flex justify-start  items-center  gap-4 my-3">
//                   <input
//                     type="radio"
//                     name="reason"
//                     value="Tìm được chỗ khác rẻ hơn"
//                     checked={selectedOption === "Tìm được chỗ khác rẻ hơn"}
//                     onChange={handleChange}
//                     className="mr-2 
// "
//                   />
//                   Tìm được chỗ khác rẻ hơn
//                 </label>
//                 <label className="flex justify-start  items-center  gap-4 my-3">
//                   <input
//                     type="radio"
//                     name="reason"
//                     value="Tôi muốn cập nhật địa chỉ/sđt nhận hàng"
//                     checked={
//                       selectedOption ===
//                       "Tôi muốn cập nhật địa chỉ/sđt nhận hàng"
//                     }
//                     onChange={handleChange}
//                     className="mr-2 
// "
//                   />
//                   Tôi muốn cập nhật địa chỉ/sđt nhận hàng.
//                 </label>
//               </div>
//               <div className="items-center px-4 py-3">
//                 <button
//                   id="ok-btn"
//                   className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
//                   onClick={() => {
//                     changeStatusBill();
//                     setShowModal(false);
//                   }}
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// const InvoiceAll = ({ status }: { status: number | null }) => {
//   const { userPrf } = useShoppingCart();
//   const [dataOrder, setDataOrder] = useState<IOrder[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [loading2, setLoading2] = useState<boolean>(true);
//   const getAllOrders = async () => {
//     if (status === null) {
//       try {
//         setLoading(true);
//         const res = await axios({
//           method: "get",
//           url: API.getAllOrders(Number(userPrf?.id)),
//         });
//         if (res.status) {
//           setDataOrder(res?.data?.data);
//         }
//       } catch (error) {
//         console.error("Error fetching order details: ", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       try {
//         const res = await axios({
//           method: "get",
//           url: API.getOrderWithStatus(Number(userPrf?.id), status),
//         });
//         if (res.status) {
//           setDataOrder(res?.data?.data);
//         }
//       } catch (error) {
//         console.error("Error fetching order details: ", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     if (userPrf) {
//       getAllOrders();
//     }
//   }, [userPrf, loading2]);

//   console.log("loading2", loading2);
//   return (
//     <div className="w-full h-full">
//       <div className="  rounded-lg overflow-hidden flex flex-col w-[80%] mx-auto  px-[1px]  mb-10">
//         {!!dataOrder && dataOrder?.length > 0 && loading === false ? (
//           dataOrder.map((e, i) => {
//             return (
//               <ItemOrder
//                 item={e}
//                 key={i}
//                 setLoading={setLoading2}
//                 loading={loading2}
//               />
//             );
//           })
//         ) : dataOrder.length === 0 ? (
//           <div className="flex flex-col items-center justify-center">
//             {" "}
//             <img
//               src={Images.iconNoOrder}
//               alt=""
//               className="w-56 h-56 object-contain"
//             />
//             <span className="text-center font-medium text-3xl">
//               Chưa có đơn hàng
//             </span>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center space-x-2 animate-bounce mt-3">
//             <div className="w-8 h-8 bg-blue-400 rounded-full" />
//             <div className="w-8 h-8 bg-green-400 rounded-full" />
//             <div className="w-8 h-8 bg-black rounded-full" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InvoiceAll;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../../static";
import { useShoppingCart } from "../../../context/shoppingCart.context";
import axios from "axios";
import API from "../../../api";
import { IDetailOrder, IOrder } from "../../../types/product.type";
import { convertToCurrencyString } from "../../../utils/format";
import { toast } from "react-toastify";

type ItemProps = {
  name: string;
  price: number;
  color: string;
  quantity: number;
};

const Item = ({ item }: { item: IDetailOrder }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-lg">
          <img
            src={item.images.split(",")[0]}
            className="max-w-full max-h-full object-contain"
            alt={item.name}
          />
        </div>
        <div>
          <div className="text-base font-medium text-gray-900">{item.name}</div>
          <div className="text-sm text-gray-500">
            {item?.color} - {item?.size} - {item?.sole}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            x{item?.quantity}
          </div>
        </div>
      </div>
      <div className="text-right">
        {!!item?.discountValue ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">
              {convertToCurrencyString(Number(item?.price))}
            </span>
            <span className="text-base font-semibold text-red-500">
              {convertToCurrencyString(Number(item?.discountValue))}
            </span>
          </div>
        ) : (
          <span className="text-base font-semibold text-red-500">
            {convertToCurrencyString(Number(item?.price))}
          </span>
        )}
      </div>
    </div>
  );
};
const ItemOrder = ({
  item,
  setLoading,
  loading,
}: {
  item: IOrder;
  setLoading: any;
  loading: boolean;
}) => {
  const navigate = useNavigate();
  const [dataDetailOrder, setDataDetailOrder] = useState<IDetailOrder[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [statusPayment, setStatusPayment] = useState<boolean>(false);

  const getStatusPayMent = async (id: number) => {
    try {
        const res = await axios({
            method: "get",
            url: `http://localhost:8080/client/api/payment-method/${id}`,
        });
        if (res.status && res.data && res.data.length > 0) {
            // Check if there's a VNPAY payment (method === 1, CHUYEN_KHOAN)
            interface PaymentMethodResponse {
              id: number;
              method: number; // 1 = VNPAY/CHUYEN_KHOAN, etc.
              type: boolean; // true = paid, false = unpaid
              totalMoney: number | string;
              [key: string]: any;
            }
            const vnpayPayments = (res.data as PaymentMethodResponse[]).filter(
              (payment: PaymentMethodResponse) => payment.method === 1 && payment.type === true
            );
            if (vnpayPayments.length > 0) {
                // Calculate total paid amount for VNPAY payments
                const totalVnpayPaid = vnpayPayments.reduce(
                    (total, payment) => total + Number(payment.totalMoney),
                    0
                );
                // Compare with bill's totalMoney + moneyShip
                const billResponse = await axios({
                    method: "get",
                    url: `http://localhost:8080/client/api/bill/${id}`,
                });
                const bill = billResponse.data;
                const totalRequired = Number(bill.totalMoney) + Number(bill.moneyShip);
                setStatusPayment(totalVnpayPaid >= totalRequired);
            } else {
                setStatusPayment(false);
            }
        } else {
            setStatusPayment(false);
        }
    } catch (error) {
        console.error("Error fetching payment status: ", error);
        setStatusPayment(false);
    }
};

  useEffect(() => {
    if (item?.id) {
      getStatusPayMent(item?.id);
    }
  }, [item?.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const getDetailBill = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getDetailBill(Number(item?.id)),
      });
      if (res.status) {
        setDataDetailOrder(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching order details: ", error);
    }
  };

  useEffect(() => {
    if (item?.id) {
      getDetailBill();
    }
  }, [item?.id]);

  const changeStatusBill = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8080/client/api/bill/change-status/${item?.id}`,
        params: {
          note: selectedOption,
          isCancel: true,
          isVnpay: statusPayment, // Indicate if the order was paid via VNPAY
        },
      });
      if (res.status) {
        setLoading(!loading);
        toast.success("Đã hủy đơn hàng thành công");
        setShowModal(false);
      } else {
        toast.warning("Lỗi hủy đơn hàng");
      }
    } catch (error) {
      console.error("Error cancelling order: ", error);
      let errorMessage = "Lỗi hủy đơn hàng";
      if (typeof error === "object" && error !== null) {
        if ("response" in error && typeof (error as any).response?.data?.message === "string") {
          errorMessage += ": " + (error as any).response.data.message;
        } else if ("message" in error && typeof (error as any).message === "string") {
          errorMessage += ": " + (error as any).message;
        }
      }
      toast.error(errorMessage);
    }
  };

  const statusText = {
    2: "Chờ xác nhận",
    4: "Chờ giao hàng",
    5: "Đang giao hàng",
    6: "Hoàn thành",
    7: "Đã hủy",
    9: "Đã xác nhận",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-gray-600 font-medium">
          Mã Hóa Đơn: <span className="font-semibold">{item?.code}</span>
        </p>
        <div className="flex items-center gap-4">
          {item.status !== 7 && (
            <button
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
              onClick={() => {
                navigate(
                  `/timeLineOrder/${item?.status}/${item?.id}/${item?.code}`
                );
              }}
            >
              Xem tình trạng
            </button>
          )}
          <p className="text-sm font-semibold text-red-500 uppercase">
            {statusText[item?.status as keyof typeof statusText] || ""}
          </p>
        </div>
      </div>
      <div>
        {!!dataDetailOrder && dataDetailOrder.length > 0 ? (
          dataDetailOrder.map((item, index) => (
            <Item key={index} item={item} />
          ))
        ) : (
          <div className="p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-20 bg-gray-100 rounded-lg"></div>
              <div className="h-20 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex items-center justify-between bg-gray-50">
        <div className="text-sm font-medium text-gray-600">
          Trạng thái thanh toán:{" "}
          <span className={statusPayment ? "text-green-500" : "text-red-500"}>
            {statusPayment ? "Đã thanh toán" : "Chưa thanh toán"}
          </span>
        </div>
        {(item?.status === 2 || (item?.status === 1 && !statusPayment)) && (
          <button
            className="px-3 py-1.5 border border-red-400 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
            onClick={() => setShowModal(true)}
          >
            Hủy đơn hàng
          </button>
        )}
        <div className="text-sm font-medium text-gray-600">
          Thành tiền:{" "}
          <span className="text-red-500 font-semibold">
            {convertToCurrencyString(item?.totalMoney + item?.moneyShip)}
          </span>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Lý do hủy đơn hàng
            </h3>
            <div className="space-y-3">
              {[
                "Tôi muốn thay đổi mã giảm giá",
                "Tôi muốn thay đổi sản phẩm",
                "Thủ tục thanh toán rắc rối",
                "Tôi tìm thấy chỗ mua khác tốt hơn",
                "Tôi không có nhu cầu mua nữa",
                "Tôi không tìm thấy lý do hủy phù hợp",
                "Tìm được chỗ khác rẻ hơn",
                "Tôi muốn cập nhật địa chỉ/sđt nhận hàng",
              ].map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedOption === reason}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  {reason}
                </label>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {
                  changeStatusBill();
                  setShowModal(false);
                }}
                disabled={!selectedOption}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InvoiceAll = ({ status }: { status: number | null }) => {
  const { userPrf } = useShoppingCart();
  const [dataOrder, setDataOrder] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);

  const getAllOrders = async () => {
    if (status === null) {
      try {
        setLoading(true);
        const res = await axios({
          method: "get",
          url: API.getAllOrders(Number(userPrf?.id)),
        });
        if (res.status) {
          setDataOrder(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await axios({
          method: "get",
          url: API.getOrderWithStatus(Number(userPrf?.id), status),
        });
        if (res.status) {
          setDataOrder(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userPrf) {
      getAllOrders();
    }
  }, [userPrf, loading2]);

  return (
    <div className="w-full h-full">
      <div className="rounded-lg overflow-hidden flex flex-col w-[80%] mx-auto px-[1px] mb-10">
        {!!dataOrder && dataOrder?.length > 0 && loading === false ? (
          dataOrder.map((e, i) => (
            <ItemOrder
              item={e}
              key={i}
              setLoading={setLoading2}
              loading={loading2}
            />
          ))
        ) : dataOrder.length === 0 && loading === false ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={Images.iconNoOrder}
              alt=""
              className="w-56 h-56 object-contain"
            />
            <span className="text-center font-medium text-3xl">
              Chưa có đơn hàng
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 animate-bounce mt-3">
            <div className="w-8 h-8 bg-blue-400 rounded-full" />
            <div className="w-8 h-8 bg-green-400 rounded-full" />
            <div className="w-8 h-8 bg-black rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceAll;