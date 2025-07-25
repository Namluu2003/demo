// import React, { useEffect, useState } from "react";
// import { useShoppingCart } from "../context/shoppingCart.context";
// import Images from "../static";
// import { formatCurrency } from "../utils/formatCurrency";
// import { useNavigate } from "react-router-dom";
// import path from "../constants/path";
// import axios from "axios";
// import API from "../api";
// import {
//   IDetailProductCart,
//   IDetailProductCart2,
//   IListDeatilShoe,
// } from "../types/product.type";
// import { calculateTotalDone, convertToCurrencyString } from "../utils/format";
// import ModalComponent from "./Modal";
// import { toast } from "react-toastify";
// type ShoppingCartProps = {
//   isOpen: boolean;
// };
// type CartItemProps = {
//   id: number;
//   quantity: number;
// };
// const ItemInCart = ({ id, quantity }: CartItemProps) => {
//   const [infoShoe, setInfoShoe] = useState<IDetailProductCart2>();
//   const [showToast, setShowToast] = useState<boolean>();
//   const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

//   const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
//     useShoppingCart();
//   const getDetailShoeWithId = async () => {
//     const res = await axios({
//       method: "get",
//       url: API.getShoeDetailWithId(id),
//     });
//     if (res.status) {
//       setInfoShoe(res?.data?.data);
//     }
//   };
//   useEffect(() => {
//     getDetailShoeWithId();
//   }, [id]);
//   return infoShoe ? (
//     <div className="flex justify-between items-center p-3 border-b-[2px] border-dotted w-full border-gray-400  ">
//       <img
//         src={infoShoe?.images.split(",")[0]}
//         className="w-[90px] h-[120px] object-contain"
//       />
//       <div className="w-[70%] flex flex-col gap-2">
//         <p className="text-xs font-medium line-clamp-2 ">{infoShoe?.name}</p>
//         {!!infoShoe.discountPercent && infoShoe?.discountValue ? (
//           <div className="flex items-center gap-2">
//             <p className="  font-semibold text-sm text-red-500">
//               {convertToCurrencyString(infoShoe?.discountValue)}
//             </p>
//             <p className="  font-semibold text-xs  line-through">
//               {convertToCurrencyString(infoShoe?.price)}
//             </p>
//           </div>
//         ) : (
//           <p className="  font-semibold text-xs  text-red-500">
//             {convertToCurrencyString(infoShoe?.price)}
//           </p>
//         )}
//         <div className="flex justify-between">
//           <div className="flex ">
//             <div
//               className=" border-[1px] border-gray-300 w-6 flex items-center justify-center cursor-pointer"
//               onClick={() => [decreaseCartQuantity(infoShoe.id)]}
//             >
//               -
//             </div>
//             <div className="border-[1px] border-gray-300 w-6 flex items-center justify-center text-xs">
//               {quantity}
//             </div>
//             <div
//               className="border-[1px] border-gray-300 w-6 flex items-center justify-center cursor-pointer"
//               onClick={() => {
//                 if (quantity >= infoShoe?.quantity) {
//                   toast.warning("Số lượng thêm đã đạt tối đa ");
//                   setShowToast(true);
//                   return;
//                 } else {
//                   increaseCartQuantity(infoShoe.id);
//                 }
//               }}
//             >
//               +
//             </div>
//           </div>
//           <div
//             className="border-[1px] bg-[#f2f2f2] flex items-center h-full px-2   cursor-pointer"
//             onClick={() => {
//               setShowModalDelete(true);
//             }}
//           >
//             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3SMQrCUBAE0HeFtJa5QirBc1jnEsE2VQ5jbSOexDQWHkRZ2OIjXyOS0oFh2Zk/DCyfldCgTXY44ZKzK7ymFh7x+ILju+Y7hqKl5JB+tTlwQ48tptSm3Pv0LYXLhzWtin/4x4NtsEstZuyL4RlHHCoM/fopvMc5//QrQw9/HTwB68BA1F7PyxoAAAAASUVORK5CYII=" />
//             <span className="font-medium">Xóa</span>
//           </div>
//         </div>
//       </div>
//       {showModalDelete && (
//         <ModalComponent
//           check={true}
//           isVisible={showModalDelete}
//           onClose={() => {
//             setShowModalDelete(false);
//           }}
//         >
//           <div className="w-full flex flex-col justify-center">
//             <svg
//               className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//               />
//             </svg>
//             <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
//               Xác nhận xóa sản phẩm này khỏi giỏ hàng ?
//             </h3>

//             <div className="w-full flex justify-around items-center mb-2">
//               <button
//                 onClick={() => {
//                   setShowModalDelete(false);
//                 }}
//                 data-modal-hide="popup-modal"
//                 type="button"
//                 className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
//               >
//                 Hủy
//               </button>
//               <button
//                 onClick={() => {
//                   removeFromCart(infoShoe?.id);
//                   setShowModalDelete(false);
//                 }}
//                 data-modal-hide="popup-modal"
//                 type="button"
//                 className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
//               >
//                 Xác nhận
//               </button>
//             </div>
//           </div>
//         </ModalComponent>
//       )}
//     </div>
//   ) : (
//     <div></div>
//   );
// };
// const ItemInCart2 = ({
//   item,
// }: {
//   item: IDetailProductCart;
//   loading: any;
//   setLoading: any;
// }) => {
//   const { reduceShoe, addShoe, removeFromCartUser, getProductQuantityById } =
//     useShoppingCart();
//   const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
//   return (
//     <div className="flex justify-between items-center p-3 border-b-[2px] border-dotted w-full border-gray-400  ">
//       <img src={item.image} className="w-[90px] h-[90px] object-contain" />
//       <div className="w-[70%] flex flex-col gap-2">
//         <p className="text-xs font-medium line-clamp-2 ">{item.name}</p>
//         {!!item.discountPercent && item.discountValue ? (
//           <div className="flex items-center gap-2">
//             <p className="  font-semibold text-sm text-red-500">
//               {convertToCurrencyString(item?.discountValue)}
//             </p>
//             <p className="  font-semibold text-xs  line-through">
//               {convertToCurrencyString(item.price)}
//             </p>
//           </div>
//         ) : (
//           <p className="  font-semibold text-xs  text-red-500">
//             {convertToCurrencyString(item.price)}
//           </p>
//         )}

//         <div className="flex justify-between">
//           <div className="flex ">
//             <div
//               className=" border-[1px] border-gray-300 w-6 flex items-center justify-center cursor-pointer"
//               onClick={() => {
//                 if (getProductQuantityById(item.idProductDetail) === 1) {
//                   setShowModalDelete(true);
//                 } else {
//                   reduceShoe(
//                     item.id,
//                     getProductQuantityById(item.idProductDetail)
//                   );
//                 }
//               }}
//             >
//               -
//             </div>
//             <div className="border-[1px] border-gray-300 w-6 flex items-center justify-center text-xs">
//               {getProductQuantityById(item.idProductDetail)}
//             </div>
//             <div
//               className="border-[1px] border-gray-300 w-6 flex items-center justify-center cursor-pointer"
//               onClick={() => {
//                 addShoe(item.id, getProductQuantityById(item.idProductDetail));
//               }}
//             >
//               +
//             </div>
//           </div>
//           <div
//             className="border-[1px] bg-[#f2f2f2] flex items-center h-full px-2 cursor-pointer "
//             onClick={() => setShowModalDelete(true)}
//           >
//             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3SMQrCUBAE0HeFtJa5QirBc1jnEsE2VQ5jbSOexDQWHkRZ2OIjXyOS0oFh2Zk/DCyfldCgTXY44ZKzK7ymFh7x+ILju+Y7hqKl5JB+tTlwQ48tptSm3Pv0LYXLhzWtin/4x4NtsEstZuyL4RlHHCoM/fopvMc5//QrQw9/HTwB68BA1F7PyxoAAAAASUVORK5CYII=" />
//             <span className="font-medium">Xóa</span>
//           </div>
//         </div>
//       </div>
//       {showModalDelete && (
//         <ModalComponent
//           check={true}
//           isVisible={showModalDelete}
//           onClose={() => {
//             setShowModalDelete(false);
//           }}
//         >
//           <div className="w-full flex flex-col justify-center">
//             <svg
//               className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//               />
//             </svg>
//             <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
//               Xác nhận xóa sản phẩm này khỏi giỏ hàng ?
//             </h3>

//             <div className="w-full flex justify-around items-center mb-2">
//               <button
//                 onClick={() => {
//                   setShowModalDelete(false);
//                 }}
//                 data-modal-hide="popup-modal"
//                 type="button"
//                 className="text-white bg-green-400  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
//               >
//                 Hủy
//               </button>
//               <button
//                 onClick={() => {
//                   removeFromCartUser(item?.id);
//                   setShowModalDelete(false);
//                 }}
//                 data-modal-hide="popup-modal"
//                 type="button"
//                 className="text-white bg-red-600  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
//               >
//                 Xác nhận
//               </button>
//             </div>
//           </div>
//         </ModalComponent>
//       )}
//     </div>
//   );
// };
// const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
//   const navigate = useNavigate();
//   const { closeCart, cartItems, cartQuantity, listProducts, cartQuantityUser } =
//     useShoppingCart();
//   const [listDetailShoe, setListDetailShoe] = useState<IListDeatilShoe[]>();
//   const [itemCheckRender, setItemCheckRender] = useState<boolean>(false);
//   const getDetailShoe = async () => {
//     const res = await axios({
//       method: "get",
//       url: API.getAllShoeDetail(),
//     });
//     if (res.status) {
//       setListDetailShoe(res?.data?.data);
//     }
//   };
//   const { userPrf } = useShoppingCart();
//   useEffect(() => {
//     getDetailShoe();
//   }, [itemCheckRender]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [isOpen]);
//   if (!isOpen) return null;
//   return (
//     <div>
//       {isOpen ? (
//         <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-10    ">
//           <div className="w-full h-full" onClick={() => closeCart()}></div>
//           <div className="bg-white  shadow-lg h-screen w-[30%]  transform   transition-transform ease-in-out  relative  ">
//             <div className="flex justify-between items-center px-4 pt-4 mb-2  top-0 bg-white  w-full ">
//               <h2 className="text-lg font-semibold  uppercase   ">
//                 {!!userPrf && !!listProducts
//                   ? ` Giỏ hàng (${listProducts.length} sản phẩm)`
//                   : ` Giỏ hàng (${cartItems.length} sản phẩm)`}
//               </h2>
//               <div onClick={() => closeCart()} className="cursor-pointer">
//                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nGNgoBAwMjAw8BGhjg+qFkVgCQMDgygeTaJQNXzYJFYyMDBI4NC0EoccTgWihDRhUyhKrCZ0/ywh4G/qaBQlx6mi5ASOKDnRQXYCIDvJkQwARZsQRRiqQN4AAAAASUVORK5CYII=" />{" "}
//               </div>
//             </div>
//             <div className="w-full bg-gray-500 h-[1.5px]  " />

//             <div className="w-full overflow-y-auto h-[75%]    ">
//               {!!userPrf && !!listProducts
//                 ? listProducts.map((item) => {
//                     return (
//                       <ItemInCart2
//                         key={item.id}
//                         loading={itemCheckRender}
//                         setLoading={setItemCheckRender}
//                         item={item}
//                       />
//                     );
//                   })
//                 : cartItems.map((item) => {
//                     return <ItemInCart key={item.id} {...item} />;
//                   })}
//             </div>
//             <div className="absolute bottom-0 w-full flex-1 ">
//               <div className="mt-4 px-2">
//                 <p className="text-sm font-medium">
//                   Tổng số lượng: {!!userPrf ? cartQuantityUser : cartQuantity}
//                 </p>
//                 <p className="text-sm font-medium">
//                   Tổng giá:{" "}
//                   <span className="text-red-500">
//                     {!!userPrf && !!listProducts
//                       ? formatCurrency(calculateTotalDone(listProducts))
//                       : cartItems &&
//                         !!listDetailShoe &&
//                         !!listDetailShoe.length &&
//                         formatCurrency(
//                           cartItems.reduce((total, cartItem) => {
//                             const item = listDetailShoe.find(
//                               (i) => i.id === cartItem.id
//                             );
//                             return (
//                               total +
//                               (item?.discountValue
//                                 ? item?.discountValue
//                                 : item?.price || 0) *
//                                 cartItem.quantity
//                             );
//                           }, 0)
//                         )}
//                   </span>
//                 </p>
//               </div>
//               <div className=" flex justify-around items-center my-5   ">
//                 <button
//                   className="border-gray-300 border-[1px] px-3 py-2 rounded font-medium w-[45%] hover:border-gray-500"
//                   onClick={() => [closeCart(), navigate(path.cart)]}
//                 >
//                   Xem giỏ hàng
//                 </button>
//                 {!!userPrf ? (
//                   <button
//                     className="rounded font-medium bg-[#5ae0d7] px-3 py-2 w-[45%] "
//                     onClick={() => [
//                       navigate(path.payMentWithUser),
//                       closeCart(),
//                     ]}
//                   >
//                     Thanh toán ({listProducts.length})
//                   </button>
//                 ) : (
//                   <button
//                     className="rounded font-medium bg-[#5ae0d7] px-3 py-2 w-[45%] "
//                     onClick={() => [navigate(path.payment), closeCart()]}
//                   >
//                     Thanh toán ({cartItems.length})
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// };

// export default ShoppingCart;



import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../context/shoppingCart.context";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import path from "../constants/path";
import axios from "axios";
import API from "../api";
import {
  IDetailProductCart,
  IDetailProductCart2,
  IListDeatilShoe,
} from "../types/product.type";
import { calculateTotalDone, convertToCurrencyString } from "../utils/format";
import ModalComponent from "./Modal";
import { toast } from "react-toastify";

type ShoppingCartProps = {
  isOpen: boolean;
};

type CartItemProps = {
  id: number;
  quantity: number;
};

const ItemInCart = ({ id, quantity }: CartItemProps) => {
  const [infoShoe, setInfoShoe] = useState<IDetailProductCart2>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

  const getDetailShoeWithId = async () => {
    const res = await axios({
      method: "get",
      url: API.getShoeDetailWithId(id),
    });
    if (res.status) {
      setInfoShoe(res?.data?.data);
    }
  };

  useEffect(() => {
    getDetailShoeWithId();
  }, [id]);

  const setShowToast = (value: boolean) => {
    // This function sets the state for showing a toast notification
    setShowToast(value);
  };

  return infoShoe ? (
    <div className="flex items-center p-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
      <img
        src={infoShoe?.images.split(",")[0]}
        className="w-20 h-24 object-contain rounded-lg"
        alt={infoShoe?.name}
      />
      <div className="ml-4 flex-1">
        <p className="text-sm font-semibold text-gray-800 line-clamp-2">
          {infoShoe?.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          {!!infoShoe.discountPercent && infoShoe?.discountValue ? (
            <>
              <p className="text-sm font-bold text-red-600">
                {convertToCurrencyString(infoShoe?.discountValue)}
              </p>
              <p className="text-xs text-gray-500 line-through">
                {convertToCurrencyString(infoShoe?.price)}
              </p>
            </>
          ) : (
            <p className="text-sm font-bold text-red-600">
              {convertToCurrencyString(infoShoe?.price)}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => decreaseCartQuantity(infoShoe.id)}
            >
              -
            </button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => {
                if (quantity >= infoShoe?.quantity) {
                  toast.warning("Ssolar: Số lượng thêm đã đạt tối đa");
                  setShowToast(true);
                  return;
                } else {
                  increaseCartQuantity(infoShoe.id);
                }
              }}
              disabled={quantity >= infoShoe?.quantity}
            >
              +
            </button>
          </div>
          <button
            className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors"
            onClick={() => setShowModalDelete(true)}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3SMQrCUBAE0HeFtJa5QirBc1jnEsE2VQ5jbSOexDQWHkRZ2OIjXyOS0oFh2Zk/DCyfldCgTXY44ZKzK7ymFh7x+ILju+Y7hqKl5JB+tTlwQ48tptSm3Pv0LYXLhzWtin/4x4NtsEstZuyL4RlHHCoM/fopvMc5//QrQw9/HTwB68BA1F7PyxoAAAAASUVORK5CYII="
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Xóa</span>
          </button>
        </div>
      </div>
      {showModalDelete && (
        <ModalComponent
          check={true}
          isVisible={showModalDelete}
          onClose={() => setShowModalDelete(false)}
        >
          <div className="flex flex-col items-center p-6">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
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
            <h3 className="text-lg text-gray-700 text-center mb-6">
              Xác nhận xóa sản phẩm này khỏi giỏ hàng?
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModalDelete(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  removeFromCart(infoShoe?.id);
                  setShowModalDelete(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  ) : (
    <div></div>
  );
};

const ItemInCart2 = ({
  item,
}: {
  item: IDetailProductCart;
  loading: any;
  setLoading: any;
}) => {
  const { reduceShoe, addShoe, removeFromCartUser, getProductQuantityById } =
    useShoppingCart();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  return (
    <div className="flex items-center p-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
      <img
        src={item.image}
        className="w-20 h-24 object-contain rounded-lg"
        alt={item.name}
      />
      <div className="ml-4 flex-1">
        <p className="text-sm font-semibold text-gray-800 line-clamp-2">
          {item.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          {!!item.discountPercent && item.discountValue ? (
            <>
              <p className="text-sm font-bold text-red-600">
                {convertToCurrencyString(item?.discountValue)}
              </p>
              <p className="text-xs text-gray-500 line-through">
                {convertToCurrencyString(item.price)}
              </p>
            </>
          ) : (
            <p className="text-sm font-bold text-red-600">
              {convertToCurrencyString(item.price)}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => {
                if (getProductQuantityById(item.idProductDetail) === 1) {
                  setShowModalDelete(true);
                } else {
                  reduceShoe(
                    item.id,
                    getProductQuantityById(item.idProductDetail)
                  );
                }
              }}
            >
              -
            </button>
            <span className="w-10 text-center text-sm">
              {getProductQuantityById(item.idProductDetail)}
            </span>
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() =>
                addShoe(item.id, getProductQuantityById(item.idProductDetail))
              }
            >
              +
            </button>
          </div>
          <button
            className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors"
            onClick={() => setShowModalDelete(true)}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3SMQrCUBAE0HeFtJa5QirBc1jnEsE2VQ5jbSOexDQWHkRZ2OIjXyOS0oFh2Zk/DCyfldCgTXY44ZKzK7ymFh7x+ILju+Y7hqKl5JB+tTlwQ48tptSm3Pv0LYXLhzWtin/4x4NtsEstZuyL4RlHHCoM/fopvMc5//QrQw9/HTwB68BA1F7PyxoAAAAASUVORK5CYII="
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Xóa</span>
          </button>
        </div>
      </div>
      {showModalDelete && (
        <ModalComponent
          check={true}
          isVisible={showModalDelete}
          onClose={() => setShowModalDelete(false)}
        >
          <div className="flex flex-col items-center p-6">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
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
            <h3 className="text-lg text-gray-700 text-center mb-6">
              Xác nhận xóa sản phẩm này khỏi giỏ hàng?
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModalDelete(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  removeFromCartUser(item?.id);
                  setShowModalDelete(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const navigate = useNavigate();
  const { closeCart, cartItems, cartQuantity, listProducts, cartQuantityUser } =
    useShoppingCart();
  const [listDetailShoe, setListDetailShoe] = useState<IListDeatilShoe[]>();
  const [itemCheckRender, setItemCheckRender] = useState<boolean>(false);

  const getDetailShoe = async () => {
    const res = await axios({
      method: "get",
      url: API.getAllShoeDetail(),
    });
    if (res.status) {
      setListDetailShoe(res?.data?.data);
    }
  };

  const { userPrf } = useShoppingCart();

  useEffect(() => {
    getDetailShoe();
  }, [itemCheckRender]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeCart}
      ></div>
      <div className="w-full max-w-md bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Giỏ hàng (
            {!!userPrf && !!listProducts
              ? listProducts.length
              : cartItems.length}{" "}
            sản phẩm)
          </h2>
          <button onClick={closeCart} className="text-gray-600 hover:text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-200px)] p-4">
          {!!userPrf && !!listProducts
            ? listProducts.map((item) => (
                <ItemInCart2
                  key={item.id}
                  item={item}
                  loading={itemCheckRender}
                  setLoading={setItemCheckRender}
                />
              ))
            : cartItems.map((item) => <ItemInCart key={item.id} {...item} />)}
        </div>
        <div className="p-4 border-t bg-white">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">
              Tổng số lượng: {!!userPrf ? cartQuantityUser : cartQuantity}
            </p>
            <p className="text-sm font-medium text-gray-700">
              Tổng giá:{" "}
              <span className="text-lg font-bold text-red-600">
                {!!userPrf && !!listProducts
                  ? formatCurrency(calculateTotalDone(listProducts))
                  : cartItems &&
                    !!listDetailShoe &&
                    !!listDetailShoe.length &&
                    formatCurrency(
                      cartItems.reduce((total, cartItem) => {
                        const item = listDetailShoe.find(
                          (i) => i.id === cartItem.id
                        );
                        return (
                          total +
                          (item?.discountValue
                            ? item?.discountValue
                            : item?.price || 0) *
                            cartItem.quantity
                        );
                      }, 0)
                    )}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => {
                closeCart();
                navigate(path.cart);
              }}
            >
              Xem giỏ hàng
            </button>
            <button
              className="flex-1 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              onClick={() => {
                navigate(!!userPrf ? path.payMentWithUser : path.payment);
                closeCart();
              }}
            >
              Thanh toán (
              {!!userPrf ? listProducts.length : cartItems.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;