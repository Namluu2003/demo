// import { IProduct } from "../types/product.type";
// import { convertToCurrencyString, renderColor } from "../utils/format";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import Images from "../static";
// import Fade from "react-reveal/Fade";
// import QuickViewDetail from "./QuickViewDetail";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ProductStanding = ({ product }: { product: IProduct }) => {
//   const navigate = useNavigate();
//   const [showQuickView, setShowQuickView] = useState<boolean>(false);
//   return product.minPrice && product.maxPrice ? (
//     <div>
//       <Fade top distance="10%" duration={2000}>
//         <div
//           className="border-[0.2px] py-4  relative h-[300px] group btn4 leading-none overflow-hidden  border-gray-100"
//           onClick={() => {
//             if (!!product.minPrice && !!product.maxPrice && product?.images) {
//               navigate(`/product/${product.id}`);
//             } else {
//               return;
//             }
//           }}
//         >
//           {!!product.discountValue && (
//             <p className=" text-xs bg-red-500  font-medium  absolute top-[1%] left-[1%] z-[8] text-white px-3 py-[1px] rounded-r-[15px]">
//               Sale
//             </p>
//           )}

//           <button
//             className="opacity-0 group-hover:opacity-100 absolute bottom-0 z-10 left-0 right-0 bg-black bg-opacity-50 text-white text-sm font-bold py-2 transition-opacity duration-300 ease-in-out cursor-pointer"
//             type="button"
//             onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
//               event.stopPropagation();
//               setShowQuickView(true);
//             }}
//           >
//             Xem nhanh
//           </button>
//           <div className="hover-translate-up">
//             <div className={`h-[170px] flex flex-col gap-2`}>
//               <img
//                 src={product?.images.split(",")[0]}
//                 className="max-h-[170px] w-full  object-contain mx-auto"
//               />
//             </div>
//             <div className="px-2 flex flex-col justify-between h-[130px]">
//               <p className="text-[#282828] font-medium text-xs text-center mt-4  line-clamp-2">
//                 {product.name}
//               </p>
//               <div>
//                 {product.discountValue !== null ? (
//                   <div className="flex items-end ">
//                     <p className="text-red-500 font-semibold text-base mr-2">
//                       {convertToCurrencyString(product.discountValue)}
//                     </p>
//                     <p className="text-gray-500 font-semibold text-sm  line-through">
//                       {convertToCurrencyString(product.minPrice)}
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-red-500 font-semibold text-base  ">
//                     {convertToCurrencyString(product.minPrice)}
//                   </p>
//                 )}
//                 <p className=" text-gray-400 font-normal text-sm  line-clamp-1">
//                   <span className="text-slate-800 ">Màu sắc</span>:{" "}
//                   {product.color.replace(/,/g, ", ")}
//                 </p>
//                 <p className=" text-gray-400 font-normal text-sm  line-clamp-1 ">
//                   <span className="text-slate-800 ">Danh mục:</span>{" "}
//                   {product?.category}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <span
//             className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#000]  `}
//           />
//         </div>
//       </Fade>

//       {showQuickView && (
//         <QuickViewDetail
//           product={product}
//           setShowQuickView={setShowQuickView}
//         />
//       )}
//     </div>
//   ) : (
//     <Fade top distance="10%" duration={2000}>
//       <div className="border-[1px] py-4 px-4 relative h-[300px] group btn4 leading-none overflow-hidden">
//         <div className="hover-translate-up">
//           <div
//             className={`min-h-[110px] max-h-[170px] flex flex-col gap-2
//       `}
//           >
//             <LazyLoadImage
//               src={Images.imgNotFound}
//               className="max-h-[170px] w-full  object-contain mx-auto"
//             />
//           </div>
//         </div>
//         <span className={`absolute inset-x-0 h-[1.5px] bottom-0 bg-[#000]  `} />
//       </div>
//     </Fade>
//   );
// };
// export default ProductStanding;

// import { IProduct } from "../types/product.type";
// import { convertToCurrencyString } from "../utils/format";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import Images from "../static";
// import Fade from "react-reveal/Fade";
// import QuickViewDetail from "./QuickViewDetail";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ProductStanding = ({ product }: { product: IProduct }) => {
//   const navigate = useNavigate();
//   const [showQuickView, setShowQuickView] = useState<boolean>(false);

//   return product.minPrice && product.maxPrice ? (
//     <div>
//       <Fade top distance="10%" duration={2000}>
//         <div
//           className="border-[0.2px] py-4 relative h-[300px] group btn4 leading-none overflow-hidden border-gray-100"
//           onClick={() => {
//             if (product.minPrice && product.maxPrice && product.images) {
//               navigate(`/product/${product.id}`);
//             }
//           }}
//         >
//           {!!product.discountPercent && (
//             <p className="text-xs bg-red-500 font-medium absolute top-[1%] left-[1%] z-[8] text-white px-3 py-[1px] rounded-r-[15px]">
//               Sale {product.discountPercent}%
//             </p>
//           )}

//           <button
//             className="opacity-0 group-hover:opacity-100 absolute bottom-0 z-10 left-0 right-0 bg-black bg-opacity-50 text-white text-sm font-bold py-2 transition-opacity duration-300 ease-in-out cursor-pointer"
//             type="button"
//             onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
//               event.stopPropagation();
//               setShowQuickView(true);
//             }}
//           >
//             Xem nhanh
//           </button>
//           <div className="hover-translate-up">
//             <div className="h-[170px] flex flex-col gap-2">
//               <img
//                 src={product.images.split(",")[0]}
//                 className="max-h-[170px] w-full object-contain mx-auto"
//                 alt={product.name}
//               />
//             </div>
//             <div className="px-2 flex flex-col justify-between h-[130px]">
//               <p className="text-[#282828] font-medium text-xs text-center mt-4 line-clamp-2">
//                 {product.name}
//               </p>
//               <div>
//                 {product.discountValue ? (
//                   <div className="flex items-end">
//                     <p className="text-red-500 font-semibold text-base mr-2">
//                       {convertToCurrencyString(product.discountValue)}
//                     </p>
//                     <p className="text-gray-500 font-semibold text-sm line-through">
//                       {convertToCurrencyString(product.minPrice)}
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-red-500 font-semibold text-base">
//                     {convertToCurrencyString(product.minPrice)}
//                   </p>
//                 )}
//                 <p className="text-gray-400 font-normal text-sm line-clamp-1">
//                   <span className="text-slate-800">Màu sắc</span>:{" "}
//                   {product.color.replace(/,/g, ", ")}
//                 </p>
//                 <p className="text-gray-400 font-normal text-sm line-clamp-1">
//                   <span className="text-slate-800">Danh mục:</span>{" "}
//                   {product.category}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-[#000]" />
//         </div>
//       </Fade>

//       {showQuickView && (
//         <QuickViewDetail product={product} setShowQuickView={setShowQuickView} />
//       )}
//     </div>
//   ) : (
//     <Fade top distance="10%" duration={2000}>
//       <div className="border-[1px] py-4 px-4 relative h-[300px] group btn4 leading-none overflow-hidden">
//         <div className="hover-translate-up">
//           <div className="min-h-[110px] max-h-[170px] flex flex-col gap-2">
//             <LazyLoadImage
//               src={Images.imgNotFound}
//               className="max-h-[170px] w-full object-contain mx-auto"
//               alt="Not found"
//             />
//           </div>
//         </div>
//         <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-[#000]" />
//       </div>
//     </Fade>
//   );
// };

// export default ProductStanding;

import { IProduct } from "../types/product.type";
import { convertToCurrencyString } from "../utils/format";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Images from "../static";
import Fade from "react-reveal/Fade";
import QuickViewDetail from "./QuickViewDetail";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductStanding = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState<boolean>(false);

  return product.minPrice && product.maxPrice ? (
    <div>
 
        <div
          className="border border-gray-200 rounded-lg shadow-sm p-4 relative h-[380px] group bg-white overflow-hidden transition-transform duration-300 hover:shadow-lg cursor-pointer"
          onClick={() => {
            if (product.minPrice && product.maxPrice && product.images) {
              navigate(`/product/${product.id}`);
            }
          }}
        >
          {!!product.discountPercent && (
            <p className="text-sm bg-red-500 font-semibold absolute top-3 left-3 z-10 text-white px-4 py-1 rounded-full">
              Sale {product.discountPercent}%
            </p>
          )}

          <button
            className="opacity-0 group-hover:opacity-100 absolute bottom-4 z-10 left-0 right-0 mx-auto bg-blue-600 text-white text-sm font-semibold py-2 px-6 rounded-full transition-opacity duration-300 ease-in-out cursor-pointer"
            type="button"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              setShowQuickView(true);
            }}
          >
            Xem Nhanh
          </button>

          <div className="zh-[220px] flex flex-col items-center justify-center">
            <LazyLoadImage
              src={product.images.split(",")[0]}
              className="max-h-[180px] w-full object-contain transition-transform duration-300 group-hover:scale-105"
              alt={product.name}
            />

            <p className="text-gray-800 font-semibold text-sm text-center mt-2 line-clamp-2">
              {product.name}
            </p>
            <div className="mt-2">
              {product.discountValue ? (
                <div className="flex items-center justify-center gap-3">
                  <p className="text-red-600 font-bold text-lg">
                    {convertToCurrencyString(product.discountValue)}
                  </p>
                  <p className="text-gray-500 font-medium text-sm line-through">
                    {convertToCurrencyString(product.minPrice)}
                  </p>
                </div>
              ) : (
                <p className="text-red-600 font-bold text-lg text-center">
                  {convertToCurrencyString(product.minPrice)}
                </p>
              )}
              <p className="text-gray-600 font-normal text-xs text-center mt-1 line-clamp-1">
                <span className="text-gray-800">Màu sắc:</span>{" "}
                {product.color.replace(/,/g, ", ")}
              </p>
              <p className="text-gray-600 font-normal text-xs text-center mt-1 line-clamp-1">
                <span className="text-gray-800">Kích cỡ:</span> {product.size}
              </p>
            </div>
          </div>
        </div>
    

      {showQuickView && (
        <QuickViewDetail
          product={product}
          setShowQuickView={setShowQuickView}
        />
      )}
    </div>
  ) : (
    <Fade bottom distance="10%" duration={1500}>
      <div className="border border-gray-200 rounded-lg shadow-sm p-4 relative h-[380px] bg-white overflow-hidden">
        <div className="h-[220px] flex items-center justify-center">
          <LazyLoadImage
            src={Images.imgNotFound}
            className="max-h-[220px] w-full object-contain"
            alt="Not found"
          />
        </div>
        <p className="text-gray-500 font-medium text-sm text-center mt-4">
          Sản phẩm không khả dụng
        </p>
      </div>
    </Fade>
  );
};

export default ProductStanding;
