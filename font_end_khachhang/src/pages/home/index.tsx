// // // import React, { useEffect, useState } from "react";
// // // import SliderHome from "../../components/sliderHome/SliderHome";
// // // import Images from "../../static";
// // // import "./styles.css";
// // // import TitleBrand from "../../components/TitleBrand";
// // // import { useNavigate } from "react-router-dom";
// // // import SliderListBrand from "../../components/SliderListBrand";
// // // import axios from "axios";
// // // import API from "../../api";
// // // import { IProduct } from "../../types/product.type";
// // // import ProductStanding from "../../components/ProductStanding";
// // // import { toSlug } from "../../utils/format";
// // // import NavPage from "../../components/NavPage";
// // // import SekeletonItemShoe from "../../components/SekeletonItemShoe";
// // // import Fade from "react-reveal/Fade";

// // // import { LazyLoadImage } from "react-lazy-load-image-component";
// // // import Slider, { Settings } from "react-slick";
// // // import ProductStandingTop from "../../components/ProductStadingWithTop";
// // // const Line = () => {
// // //   return (
// // //     <span className="border-b-2 border-[#f1f1f1] border-solid w-full h-[1px] my-3 " />
// // //   );
// // // };
// // // const HomePage = () => {
// // //   const navigate = useNavigate();
// // //   const [page, setPage] = React.useState<number>(1);
// // //   const [products, setProducts] = useState<IProduct[]>();
// // //   const [productsAll, setProductsAll] = useState<IProduct[]>();
// // //   const [productsTop, setProductsTop] = useState<IProduct[]>();
// // //   const [totalPages, setTotalPages] = useState<number>(1);
// // //   const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);
// // //   const [sekeletonItemShoeAll, setSekeletonItemShoeAll] =
// // //     useState<boolean>(true);
// // //   const [sekeletonItemShoeTop, setSekeletonItemShoeTop] =
// // //     useState<boolean>(true);
// // //   console.log("productsTop", productsTop);
// // //   const settings: Settings = {
// // //     dots: false,
// // //     arrows: false,
// // //     className: "center",
// // //     infinite: true,
// // //     slidesToShow: 4,
// // //     swipeToSlide: true,
// // //     slidesToScroll: 1,
// // //   };
// // //   const sliderRef = React.useRef<Slider>(null);

// // //   const next = () => {
// // //     if (sliderRef.current) {
// // //       sliderRef.current.slickNext();
// // //     }
// // //   };
// // //   const prev = () => {
// // //     if (sliderRef.current) {
// // //       sliderRef.current.slickPrev();
// // //     }
// // //   };
// // //   // Lấy danh sách sản phẩm
// // //   const getDataShoes = async () => {
// // //     const res = await axios({
// // //       method: "get",
// // //       url: API.getShoe(page, 20),
// // //     });
// // //     setSekeletonItemShoe(true);
// // //     if (res.status) {
// // //       setProducts(res?.data?.data);
// // //       setTotalPages(res?.data?.totalPages);
// // //       setSekeletonItemShoe(false);
// // //     }
// // //   };
// // //   const getAllShoe = async () => {
// // //     const res = await axios({
// // //       method: "get",
// // //       url: API.getAllShoe(1, 10000),
// // //     });
// // //     setSekeletonItemShoeAll(true);
// // //     if (res.status) {
// // //       setProductsAll(res?.data?.data);
// // //       setSekeletonItemShoeAll(false);
// // //     }
// // //   };
// // //   const getDataTopSale = async () => {
// // //     const res = await axios({
// // //       method: "get",
// // //       url: API.getTopSale(15),
// // //     });
// // //     setSekeletonItemShoeTop(true);
// // //     if (res.status) {
// // //       setProductsTop(res?.data);
// // //       setSekeletonItemShoeTop(false);
// // //     }
// // //   };
// // //   useEffect(() => {
// // //     getDataShoes();
// // //   }, [page]);
// // //   useEffect(() => {
// // //     window.scrollTo(0, 0);
// // //     getDataTopSale();
// // //     getAllShoe();
// // //   }, []);
// // //   return (
// // //     <div className=" w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden ">
// // //       <SliderHome />
// // //       {/* Thông tin ưu đãi */}
// // //       <Line />
// // //       <Fade top distance="10%" duration={3000}>
// // //         <div className="w-full px-5 flex justify-between  ">
// // //           <div className="flex items-center">
// // //             <LazyLoadImage
// // //               src="https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg"
// // //               alt=""
// // //               className="w-10 h-10"
// // //             />
// // //             <span className="text-base text-gray-600 ml-2 font-semibold ">
// // //               Đổi mẫu, đổi size miễn phí
// // //             </span>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <LazyLoadImage
// // //               src="https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg"
// // //               alt=""
// // //               className="w-10 h-10"
// // //             />
// // //             <span className="text-base text-gray-600 ml-2 font-semibold ">
// // //               Mua trước, trả sau miễn lãi
// // //             </span>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <LazyLoadImage
// // //               src="https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg"
// // //               alt=""
// // //               className="w-10 h-10"
// // //             />
// // //             <span className="text-base text-gray-600 ml-2 font-semibold ">
// // //               Giao hàng, đổi trả tận nhà
// // //             </span>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <LazyLoadImage
// // //               src="https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg"
// // //               alt=""
// // //               className="w-10 h-10"
// // //             />

// // //             <span className="text-base text-gray-600 ml-2 font-semibold ">
// // //               Hàng giả, đền tiền gấp đôi
// // //             </span>
// // //           </div>
// // //         </div>
// // //       </Fade>
// // //       <Line />
// // //       {/* Phần Top Sản Phẩm Bán Chạy */}
// // //       {!!productsTop && !!productsTop.length && (
// // //         <>
// // //           <div className="flex flex-col items-center">
// // //             <p className="text-2xl font-semibold text-center uppercase">
// // //               TOP NHỮNG SẢN PHẨM BÁN CHẠY
// // //             </p>
// // //             <span className="text-[#999] italic text-sm font-semibold uppercase mb-5">
// // //               {/* Có thể thêm mô tả nếu cần */}
// // //             </span>
// // //           </div>
// // //           <div className="w-full p-4">
// // //             <div className="grid grid-cols-4 gap-4">
// // //               {!!productsTop && !!productsTop.length && sekeletonItemShoeTop === false
// // //                 ? productsTop.map((item, index) => {
// // //                     if (item.status === true) {
// // //                       return null;
// // //                     }
// // //                     return (
// // //                       <div key={index}>
// // //                         <ProductStandingTop
// // //                           product={item}
// // //                           checkTop={true}
// // //                         />
// // //                       </div>
// // //                     );
// // //                   })
// // //                 : sekeletonItemShoeTop &&
// // //                   Array(4)
// // //                     .fill({})
// // //                     .map((_, index) => (
// // //                       <div key={index}>
// // //                         <SekeletonItemShoe />
// // //                       </div>
// // //                     ))}
// // //             </div>
// // //           </div>
// // //         </>
// // //       )}
// // //       <Line />
// // //       {!!productsAll && !!productsAll.length && (
// // //         <div className="flex flex-col items-center">
// // //           <p className=" text-2xl font-semibold text-center uppercase   ">
// // //             Sản phẩm đang giảm giá
// // //           </p>
// // //         </div>
// // //       )}
// // //       <div className="w-full p-4 ">
// // //         <div className="grid grid-cols-5 gap-0 ">
// // //           {!!productsAll &&
// // //           !!productsAll.length &&
// // //           sekeletonItemShoeAll === false
// // //             ? productsAll.map((item, index) => {
// // //                 if (item?.status === true) {
// // //                   return;
// // //                 } else {
// // //                   return !!item.discountValue ? (
// // //                     <div key={index}>
// // //                       <ProductStanding product={item} key={index} />
// // //                     </div>
// // //                   ) : (
// // //                     <></>
// // //                   );
// // //                 }
// // //               })
// // //             : !!sekeletonItemShoeAll &&
// // //               sekeletonItemShoeAll === true &&
// // //               Array(10)
// // //                 .fill({})
// // //                 .map((item, index) => {
// // //                   return (
// // //                     <div key={index}>
// // //                       <SekeletonItemShoe />
// // //                     </div>
// // //                   );
// // //                 })}
// // //         </div>
// // //       </div>
// // //       <Line />
// // //       {!!products && !!products.length && (
// // //         <div className="flex flex-col items-center">
// // //           <p className=" text-2xl font-semibold  text-center uppercase   ">
// // //             SẢN PHẨM NỔI BẬT
// // //           </p>
// // //         </div>
// // //       )}
// // //       <div className="w-full p-4 ">
// // //         <div className="grid grid-cols-5 gap-0 ">
// // //           {!!products && !!products.length && sekeletonItemShoe === false
// // //             ? products.map((item, index) => {
// // //                 if (!item.quantity || item.status === true) {
// // //                   return;
// // //                 } else {
// // //                   return (
// // //                     <div key={index}>
// // //                       <ProductStanding product={item} key={index} />
// // //                     </div>
// // //                   );
// // //                 }
// // //               })
// // //             : !!sekeletonItemShoe &&
// // //               sekeletonItemShoe === true &&
// // //               Array(10)
// // //                 .fill({})
// // //                 .map((item, index) => {
// // //                   return (
// // //                     <div key={index}>
// // //                       <SekeletonItemShoe />
// // //                     </div>
// // //                   );
// // //                 })}
// // //         </div>
// // //         {totalPages === 1 ? (
// // //           ""
// // //         ) : (
// // //           <NavPage page={page} totalPages={totalPages} setPage={setPage} />
// // //         )}
// // //       </div>

// // //       {/* Tin tức nổi bật */}
// // //       {/* <div className=" w-full pt-5 mt-3">
// // //         <p className=" text-3xl font-semibold text-center uppercase mt-5 ">
// // //           ------- Tin tức nổi bật -------
// // //         </p>
// // //         <p className="text-[#999] italic  text-sm font-semibold  text-center uppercase ">
// // //           Tin tức mới nhất và thú vị nhất
// // //         </p>
// // //         <Fade top distance="10%" duration={3000}>
// // //           <div className="flex justify-center items-center">
// // //             <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
// // //               <div className="lg:flex items-stretch ">
// // //                 <div className="lg:w-1/2">
// // //                   <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
// // //                     <div className="sm:w-1/2 relative  group ">
// // //                       <div>
// // //                         <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
// // //                           12 April 2021
// // //                         </p>
// // //                         <div className="absolute bottom-0 left-0 p-6">
// // //                           <h2 className="text-xl font-semibold  5 text-white line-clamp-2">
// // //                             NIKE ADAPT BB – ĐÔI GIÀY CÔNG NGHỆ ĐẾN TỪ TƯƠNG LAI
// // //                           </h2>
// // //                           <p className="text-base leading-4 text-white mt-2 line-clamp-2">
// // //                             Nike luôn khẳng định được vị thế của mình trong làng
// // //                             thời trang giày khi liên tục đưa ra những mẫu giày
// // //                             thời trang độc đáo cũng như những mẫu giày công nghệ
// // //                             cực đỉnh. Mới đây nhất chính là mẫu Nike Adapt BB
// // //                             với công nghệ tự thắt dây mới.
// // //                           </p>
// // //                           <a
// // //                             href="#"
// // //                             className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
// // //                           >
// // //                             <p className="pr-2 text-sm font-medium leading-none">
// // //                               Read More
// // //                             </p>
// // //                             <svg
// // //                               className="fill-stroke"
// // //                               width={16}
// // //                               height={16}
// // //                               viewBox="0 0 16 16"
// // //                               fill="none"
// // //                             >
// // //                               <path
// // //                                 d="M5.75 12.5L10.25 8L5.75 3.5"
// // //                                 stroke="currentColor"
// // //                                 strokeWidth={2}
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                               />
// // //                             </svg>
// // //                           </a>
// // //                         </div>
// // //                       </div>
// // //                       <LazyLoadImage
// // //                         src={Images.banner05}
// // //                         className="w-full h-[257px] group-hover:scale-110 transition-transform duration-300  object-cover"
// // //                         alt="chair"
// // //                       />
// // //                     </div>
// // //                     <div className="sm:w-1/2 sm:mt-0 mt-4 relative group">
// // //                       <div>
// // //                         <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
// // //                           12 April 2021
// // //                         </p>
// // //                         <div className="absolute bottom-0 left-0 p-6">
// // //                           <h2 className="text-xl font-semibold  5 text-white  line-clamp-2">
// // //                             GIẢI MÃ SỨC HÚT CỦA ĐÔI GIÀY CỔ ĐIỂN ADIDAS
// // //                           </h2>
// // //                           <p className="text-base leading-4 text-white mt-2  line-clamp-2">
// // //                             Dạo gần đây, Adidas cho ra mắt mẫu giày Adidas
// // //                             Supercourt kết hợp với
// // //                           </p>
// // //                           <a
// // //                             href="#"
// // //                             className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
// // //                           >
// // //                             <p className="pr-2 text-sm font-medium leading-none">
// // //                               Read More
// // //                             </p>
// // //                             <svg
// // //                               className="fill-stroke"
// // //                               width={16}
// // //                               height={16}
// // //                               viewBox="0 0 16 16"
// // //                               fill="none"
// // //                             >
// // //                               <path
// // //                                 d="M5.75 12.5L10.25 8L5.75 3.5"
// // //                                 stroke="currentColor"
// // //                                 strokeWidth={2}
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                               />
// // //                             </svg>
// // //                           </a>
// // //                         </div>
// // //                       </div>
// // //                       <LazyLoadImage
// // //                         src={Images.banner03}
// // //                         className="w-full object-cover h-[257px] group-hover:scale-110 transition-transform duration-300"
// // //                         alt="wall design"
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                   <div className="relative group">
// // //                     <div>
// // //                       <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
// // //                         12 April 2021
// // //                       </p>
// // //                       <div className="absolute bottom-0 left-0 md:p-10 p-6">
// // //                         <h2 className="text-xl font-semibold  5 text-white ">
// // //                           NHỮNG LẦM TƯỞNG MÀ HẦU HẾT NGƯỜI VIỆT
// // //                         </h2>
// // //                         <p className="text-base leading-4 text-white mt-2">
// // //                           Dive into minimalism
// // //                         </p>
// // //                         <a
// // //                           href="#"
// // //                           className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
// // //                         >
// // //                           <p className="pr-2 text-sm font-medium leading-none">
// // //                             Read More
// // //                           </p>
// // //                           <svg
// // //                             className="fill-stroke"
// // //                             width={16}
// // //                             height={16}
// // //                             viewBox="0 0 16 16"
// // //                             fill="none"
// // //                           >
// // //                             <path
// // //                               d="M5.75 12.5L10.25 8L5.75 3.5"
// // //                               stroke="currentColor"
// // //                               strokeWidth={2}
// // //                               strokeLinecap="round"
// // //                               strokeLinejoin="round"
// // //                             />
// // //                           </svg>
// // //                         </a>
// // //                       </div>
// // //                     </div>
// // //                     <LazyLoadImage
// // //                       src={Images.banner04}
// // //                       alt="sitting place"
// // //                       className="w-full mt-8 md:mt-6 hidden sm:block  h-[466.44px] object-cover group-hover:scale-110 transition-transform duration-300"
// // //                     />
// // //                   </div>
// // //                 </div>
// // //                 <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
// // //                   <div className="relative group">
// // //                     <div>
// // //                       <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
// // //                         12 April 2021
// // //                       </p>
// // //                       <div className="absolute bottom-0 left-0 md:p-10 p-6">
// // //                         <h2 className="text-xl font-semibold  5 text-white">
// // //                           The Decorated Ways
// // //                         </h2>
// // //                         <p className="text-base leading-4 text-white mt-2">
// // //                           Dive into minimalism
// // //                         </p>
// // //                         <a
// // //                           href="#"
// // //                           className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
// // //                         >
// // //                           <p className="pr-2 text-sm font-medium leading-none">
// // //                             Read More
// // //                           </p>
// // //                           <svg
// // //                             className="fill-stroke"
// // //                             width={16}
// // //                             height={16}
// // //                             viewBox="0 0 16 16"
// // //                             fill="none"
// // //                           >
// // //                             <path
// // //                               d="M5.75 12.5L10.25 8L5.75 3.5"
// // //                               stroke="currentColor"
// // //                               strokeWidth={2}
// // //                               strokeLinecap="round"
// // //                               strokeLinejoin="round"
// // //                             />
// // //                           </svg>
// // //                         </a>
// // //                       </div>
// // //                     </div>
// // //                     <LazyLoadImage
// // //                       src={Images.bannerAdidas}
// // //                       alt="sitting place"
// // //                       className="w-full sm:block hidden h-[466.44px] object-cover group-hover:scale-110 transition-transform duration-300"
// // //                     />
// // //                   </div>
// // //                   <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
// // //                     <div className="relative w-full group">
// // //                       <div>
// // //                         <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
// // //                           12 April 2021
// // //                         </p>
// // //                         <div className="absolute bottom-0 left-0 p-6">
// // //                           <h2 className="text-xl font-semibold  5 text-white">
// // //                             The Decorated Ways
// // //                           </h2>
// // //                           <p className="text-base leading-4 text-white mt-2">
// // //                             Dive into minimalism
// // //                           </p>
// // //                           <a
// // //                             href="#"
// // //                             className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
// // //                           >
// // //                             <p className="pr-2 text-sm font-medium leading-none">
// // //                               Read More
// // //                             </p>
// // //                             <svg
// // //                               className="fill-stroke"
// // //                               width={16}
// // //                               height={16}
// // //                               viewBox="0 0 16 16"
// // //                               fill="none"
// // //                             >
// // //                               <path
// // //                                 d="M5.75 12.5L10.25 8L5.75 3.5"
// // //                                 stroke="currentColor"
// // //                                 strokeWidth={2}
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                               />
// // //                             </svg>
// // //                           </a>
// // //                         </div>
// // //                       </div>
// // //                       <LazyLoadImage
// // //                         src="https://i.ibb.co/3yvZBpm/img-5.png"
// // //                         className="w-full h-[257px] object-cover group-hover:scale-110 transition-transform duration-300"
// // //                         alt="chair"
// // //                       />
// // //                     </div>
// // //                     <div className="relative w-full sm:mt-0 mt-4 group">
// // //                       <div>
// // //                         <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
// // //                           12 April 2021
// // //                         </p>
// // //                         <div className="absolute bottom-0 left-0 p-6">
// // //                           <h2 className="text-xl font-semibold  5 text-white">
// // //                             The Decorated Ways
// // //                           </h2>
// // //                           <p className="text-base leading-4 text-white mt-2">
// // //                             Dive into minimalism
// // //                           </p>
// // //                           <a
// // //                             href="#"
// // //                             className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
// // //                           >
// // //                             <p className="pr-2 text-sm font-medium leading-none">
// // //                               Read More
// // //                             </p>
// // //                             <svg
// // //                               className="fill-stroke"
// // //                               width={16}
// // //                               height={16}
// // //                               viewBox="0 0 16 16"
// // //                               fill="none"
// // //                             >
// // //                               <path
// // //                                 d="M5.75 12.5L10.25 8L5.75 3.5"
// // //                                 stroke="currentColor"
// // //                                 strokeWidth={2}
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                               />
// // //                             </svg>
// // //                           </a>
// // //                         </div>
// // //                       </div>
// // //                       <LazyLoadImage
// // //                         src="https://i.ibb.co/gDdnJb5/img-6.png"
// // //                         className="w-full h-[257px] object-cover group-hover:scale-110 transition-transform duration-300"
// // //                         alt="wall design"
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </Fade>
// // //       </div> */}
// // //     </div>
// // //   );
// // // };

// // // export default HomePage;

// // // import React, { useEffect, useState } from "react";
// // // import SliderHome from "../../components/sliderHome/SliderHome";
// // // import Images from "../../static";
// // // import "./styles.css";
// // // import TitleBrand from "../../components/TitleBrand";
// // // import { useNavigate } from "react-router-dom";
// // // import SliderListBrand from "../../components/SliderListBrand";
// // // import axios from "axios";
// // // import API from "../../api";
// // // import { IProduct } from "../../types/product.type";
// // // import ProductStanding from "../../components/ProductStanding";
// // // import { toSlug } from "../../utils/format";
// // // import NavPage from "../../components/NavPage";
// // // import SekeletonItemShoe from "../../components/SekeletonItemShoe";
// // // import Fade from "react-reveal/Fade";
// // // import { LazyLoadImage } from "react-lazy-load-image-component";
// // // import Slider, { Settings } from "react-slick";
// // // import ProductStandingTop from "../../components/ProductStadingWithTop";

// // // const Line = () => {
// // //   return (
// // //     <span className="border-b-2 border-[#f1f1f1] border-solid w-full h-[1px] my-3 " />
// // //   );
// // // };

// // // const HomePage = () => {
// // //   const navigate = useNavigate();
// // //   const [page, setPage] = React.useState<number>(1);
// // //   const [products, setProducts] = useState<IProduct[]>();
// // //   const [productsAll, setProductsAll] = useState<IProduct[]>();
// // //   const [productsTop, setProductsTop] = useState<IProduct[]>();
// // //   const [totalPages, setTotalPages] = useState<number>(1);
// // //   const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);
// // //   const [sekeletonItemShoeAll, setSekeletonItemShoeAll] = useState<boolean>(true);
// // //   const [sekeletonItemShoeTop, setSekeletonItemShoeTop] = useState<boolean>(true);

// // //   const settings: Settings = {
// // //     dots: false,
// // //     arrows: false,
// // //     className: "center",
// // //     infinite: true,
// // //     slidesToShow: 4,
// // //     swipeToSlide: true,
// // //     slidesToScroll: 1,
// // //   };
// // //   const sliderRef = React.useRef<Slider>(null);

// // //   const next = () => {
// // //     if (sliderRef.current) {
// // //       sliderRef.current.slickNext();
// // //     }
// // //   };
// // //   const prev = () => {
// // //     if (sliderRef.current) {
// // //       sliderRef.current.slickPrev();
// // //     }
// // //   };

// // //   // API calls (unchanged)
// // //   const getDataShoes = async () => {
// // //     const res = await axios({
// // //       method: "get",
// // //       url: API.getShoe(page, 20),
// // //     });
// // //     setSekeletonItemShoe(true);
// // //     if (res.status) {
// // //       setProducts(res?.data?.data);
// // //       setTotalPages(res?.data?.totalPages);
// // //       setSekeletonItemShoe(false);
// // //     }
// // //   };
// // //   const getAllShoe = async () => {
// // //     const res = await axios({
// // //       method: "get",
// // //       url: API.getAllShoe(1, 10000),
// // //     });
// // //     setSekeletonItemShoeAll(true);
// // //     if (res.status) {
// // //       setProductsAll(res?.data?.data);
// // //       setSekeletonItemShoeAll(false);
// // //     }
// // //   };
// // //   const getDataTopSale = async () => {
// // //     const res = await axios({
// // //       method: "get",
// // //       url: API.getTopSale(15),
// // //     });
// // //     setSekeletonItemShoeTop(true);
// // //     if (res.status) {
// // //       setProductsTop(res?.data);
// // //       setSekeletonItemShoeTop(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     getDataShoes();
// // //   }, [page]);
// // //   useEffect(() => {
// // //     window.scrollTo(0, 0);
// // //     getDataTopSale();
// // //     getAllShoe();
// // //   }, []);

// // //   return (
// // //     <div className="w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden">
// // //       <SliderHome />
// // //       <Line />
// // //       {/* Thông tin ưu đãi (unchanged) */}
// // //       <Fade top distance="10%" duration={3000}>
// // //         <div className="w-full px-5 flex justify-between">
// // //           <div className="flex items-center">
// // //             <LazyLoadImage
// // //               src="https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg"
// // //               alt=""
// // //               className="w-10 h-10"
// // //             />
// // //             <span className="text-base text-gray-600 ml-2 font-semibold">
// // //               Đổi mẫu, đổi size miễn phí
// // //             </span>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <LazyLoadImage
// // //               src="https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg"
// // //               alt=""
// // //               className="w-10 h-10"
// // //             />
// // //             <span className="text-base text-gray-600 ml-2 font-semibold">
// // //               Mua trước, trả sau miễn lãi
// // //             </span>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <LazyLoadImage
// // //               src="https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg"
// // //               alt=""
// // //               className="w-10 h-10"
// // //             />
// // //             <span className="text-base text-gray-600 ml-2 font-semibold">
// // //               Giao hàng, đổi trả tận nhà
// // //             </span>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <LazyLoadImage
// // //               src="https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg"
// // //               alt=""
// // //               className="w-10 h-10"
// // //             />
// // //             <span className="text-base text-gray-600 ml-2 font-semibold">
// // //               Hàng giả, đền tiền gấp đôi
// // //             </span>
// // //           </div>
// // //         </div>
// // //       </Fade>
// // //       <Line />

// // //       {/* Top Sản Phẩm Bán Chạy (unchanged, can apply same layout if needed) */}
// // //       {!!productsTop && !!productsTop.length && (
// // //         <>
// // //           <div className="flex flex-col items-center">
// // //             <p className="text-2xl font-semibold text-center uppercase">
// // //               TOP NHỮNG SẢN PHẨM BÁN CHẠY
// // //             </p>
// // //           </div>
// // //           <div className="w-full p-4">
// // //             <div className="grid grid-cols-4 gap-4">
// // //               {!!productsTop && !!productsTop.length && sekeletonItemShoeTop === false
// // //                 ? productsTop.map((item, index) => {
// // //                     if (item.status === true) {
// // //                       return null;
// // //                     }
// // //                     return (
// // //                       <div key={index}>
// // //                         <ProductStandingTop product={item} checkTop={true} />
// // //                       </div>
// // //                     );
// // //                   })
// // //                 : sekeletonItemShoeTop &&
// // //                   Array(4)
// // //                     .fill({})
// // //                     .map((_, index) => (
// // //                       <div key={index}>
// // //                         <SekeletonItemShoe />
// // //                       </div>
// // //                     ))}
// // //             </div>
// // //           </div>
// // //         </>
// // //       )}
// // //       <Line />

// // //       {/* Sản phẩm đang giảm giá (unchanged, can apply same layout if needed) */}
// // //       {!!productsAll && !!productsAll.length && (
// // //         <div className="flex flex-col items-center">
// // //           <p className="text-2xl font-semibold text-center uppercase">
// // //             Sản phẩm đang giảm giá
// // //           </p>
// // //         </div>
// // //       )}
// // //       <div className="w-full p-4">
// // //         <div className="grid grid-cols-5 gap-0">
// // //           {!!productsAll &&
// // //           !!productsAll.length &&
// // //           sekeletonItemShoeAll === false
// // //             ? productsAll.map((item, index) => {
// // //                 if (item?.status === true) {
// // //                   return;
// // //                 } else {
// // //                   return !!item.discountValue ? (
// // //                     <div key={index}>
// // //                       <ProductStanding product={item} key={index} />
// // //                     </div>
// // //                   ) : (
// // //                     <></>
// // //                   );
// // //                 }
// // //               })
// // //             : !!sekeletonItemShoeAll &&
// // //               sekeletonItemShoeAll === true &&
// // //               Array(10)
// // //                 .fill({})
// // //                 .map((item, index) => {
// // //                   return (
// // //                     <div key={index}>
// // //                       <SekeletonItemShoe />
// // //                     </div>
// // //                   );
// // //                 })}
// // //         </div>
// // //       </div>
// // //       <Line />

// // //       {/* SẢN PHẨM NỔI BẬT - Updated Layout */}
// // //       {!!products && !!products.length && (
// // //         <div className="flex flex-col items-center">
// // //           <p className="text-2xl font-semibold text-center uppercase">
// // //             SẢN PHẨM NỔI BẬT
// // //           </p>
// // //         </div>
// // //       )}
// // //       <div className="w-full p-4">
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
// // //           {!!products && !!products.length && sekeletonItemShoe === false
// // //             ? products
// // //                 .filter((item) => item.quantity && item.status !== true)
// // //                 .slice(0, 12) // Limit to 12 products (6 top, 6 bottom)
// // //                 .map((item, index) => (
// // //                   <div key={index}>
// // //                     <ProductStanding product={item} />
// // //                   </div>
// // //                 ))
// // //             : sekeletonItemShoe &&
// // //               Array(12)
// // //                 .fill({})
// // //                 .map((_, index) => (
// // //                   <div key={index}>
// // //                     <SekeletonItemShoe />
// // //                   </div>
// // //                 ))}
// // //         </div>
// // //         {/* View All Products Button */}
// // //         <div className="flex justify-center mt-6">
// // //           <button
// // //             onClick={() => navigate("/products")}
// // //             className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
// // //           >
// // //             Xem tất cả sản phẩm
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Tin tức nổi bật (commented out, unchanged) */}
// // //       {/* ... */}
// // //     </div>
// // //   );
// // // };

// // // export default HomePage;

// // import React, { useEffect, useState } from "react";
// // import SliderHome from "../../components/sliderHome/SliderHome";
// // import Images from "../../static";
// // import "./styles.css";
// // import TitleBrand from "../../components/TitleBrand";
// // import { useNavigate } from "react-router-dom";
// // import SliderListBrand from "../../components/SliderListBrand";
// // import axios from "axios";
// // import API from "../../api";
// // import { IProduct } from "../../types/product.type";
// // import ProductStanding from "../../components/ProductStanding";
// // import { toSlug } from "../../utils/format";
// // import NavPage from "../../components/NavPage";
// // import SekeletonItemShoe from "../../components/SekeletonItemShoe";
// // import Fade from "react-reveal/Fade";
// // import { LazyLoadImage } from "react-lazy-load-image-component";
// // import Slider, { Settings } from "react-slick";

// // const Line = () => {
// //   return (
// //     <span className="border-b-2 border-[#f1f1f1] border-solid w-full h-[1px] my-8" />
// //   );
// // };

// // const HomePage = () => {
// //   const navigate = useNavigate();
// //   const [page, setPage] = React.useState<number>(1);
// //   const [products, setProducts] = useState<IProduct[]>();
// //   const [productsAll, setProductsAll] = useState<IProduct[]>();
// //   const [productsTop, setProductsTop] = useState<IProduct[]>();
// //   const [totalPages, setTotalPages] = useState<number>(1);
// //   const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);
// //   const [sekeletonItemShoeAll, setSekeletonItemShoeAll] = useState<boolean>(true);
// //   const [sekeletonItemShoeTop, setSekeletonItemShoeTop] = useState<boolean>(true);

// //   const settings: Settings = {
// //     dots: false,
// //     arrows: false,
// //     className: "center",
// //     infinite: true,
// //     slidesToShow: 4,
// //     swipeToSlide: true,
// //     slidesToScroll: 1,
// //     responsive: [
// //       {
// //         breakpoint: 1024,
// //         settings: { slidesToShow: 3 },
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: { slidesToShow: 2 },
// //       },
// //       {
// //         breakpoint: 480,
// //         settings: { slidesToShow: 1 },
// //       },
// //     ],
// //   };
// //   const sliderRef = React.useRef<Slider>(null);

// //   const next = () => {
// //     if (sliderRef.current) {
// //       sliderRef.current.slickNext();
// //     }
// //   };
// //   const prev = () => {
// //     if (sliderRef.current) {
// //       sliderRef.current.slickPrev();
// //     }
// //   };

// //   // API calls
// //   const getDataShoes = async () => {
// //     const res = await axios({
// //       method: "get",
// //       url: API.getShoe(page, 20),
// //     });
// //     setSekeletonItemShoe(true);
// //     if (res.status) {
// //       setProducts(res?.data?.data);
// //       setTotalPages(res?.data?.totalPages);
// //       setSekeletonItemShoe(false);
// //     }
// //   };
// //   const getAllShoe = async () => {
// //     const res = await axios({
// //       method: "get",
// //       url: API.getAllShoe(1, 10000),
// //     });
// //     setSekeletonItemShoeAll(true);
// //     if (res.status) {
// //       setProductsAll(res?.data?.data);
// //       setSekeletonItemShoeAll(false);
// //     }
// //   };
// //   const getDataTopSale = async () => {
// //     const res = await axios({
// //       method: "get",
// //       url: API.getTopSale(15),
// //     });
// //     setSekeletonItemShoeTop(true);
// //     if (res.status) {
// //       setProductsTop(res?.data);
// //       setSekeletonItemShoeTop(false);
// //     }
// //   };

// //   useEffect(() => {
// //     getDataShoes();
// //   }, [page]);
// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //     getDataTopSale();
// //     getAllShoe();
// //   }, []);

// //   return (
// //     <div className="w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden">
// //       <SliderHome />
// //       <Line />

// //       {/* Thông tin ưu đãi */}
// //       <Fade top distance="10%" duration={3000}>
// //         <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-between gap-4 py-6">
// //           {[
// //             {
// //               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg",
// //               text: "Đổi mẫu, đổi size miễn phí",
// //             },
// //             {
// //               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg",
// //               text: "Mua trước, trả sau miễn lãi",
// //             },
// //             {
// //               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg",
// //               text: "Giao hàng, đổi trả tận nhà",
// //             },
// //             {
// //               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg",
// //               text: "Hàng giả, đền tiền gấp đôi",
// //             },
// //           ].map((item, index) => (
// //             <div key={index} className="flex items-center gap-3">
// //               <LazyLoadImage src={item.img} alt="" className="w-12 h-12 object-contain" />
// //               <span className="text-base text-gray-700 font-medium">{item.text}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </Fade>
// //       <Line />

// //       {/* Top Sản Phẩm Bán Chạy */}
// //       {!!productsTop && !!productsTop.length && (
// //         <>
// //           <div className="flex flex-col items-center py-8">
// //             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
// //               Top Những Sản Phẩm Bán Chạy
// //             </p>
// //           </div>
// //           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
// //               {sekeletonItemShoeTop
// //                 ? Array(5)
// //                     .fill({})
// //                     .map((_, index) => (
// //                       <div key={index}>
// //                         <SekeletonItemShoe />
// //                       </div>
// //                     ))
// //                 : productsTop
// //                     .filter((item) => !item.status)
// //                     .map((item, index) => (
// //                       <div key={index}>
// //                         <ProductStanding product={item} />
// //                       </div>
// //                     ))}
// //             </div>
// //           </div>
// //         </>
// //       )}
// //       <Line />

// //       {/* Sản phẩm đang giảm giá */}
// //       {!!productsAll && !!productsAll.length && (
// //         <>
// //           <div className="flex flex-col items-center py-8">
// //             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
// //               Sản Phẩm Đang Giảm Giá
// //             </p>
// //           </div>
// //           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
// //               {sekeletonItemShoeAll
// //                 ? Array(5)
// //                     .fill({})
// //                     .map((_, index) => (
// //                       <div key={index}>
// //                         <SekeletonItemShoe />
// //                       </div>
// //                     ))
// //                 : productsAll
// //                     .filter((item) => !item.status && item.discountValue)
// //                     .slice(0, 10)
// //                     .map((item, index) => (
// //                       <div key={index}>
// //                         <ProductStanding product={item} />
// //                       </div>
// //                     ))}
// //             </div>
// //           </div>
// //         </>
// //       )}
// //       <Line />

// //       {/* Sản Phẩm Nổi Bật */}
// //       {!!products && !!products.length && (
// //         <>
// //           <div className="flex flex-col items-center py-8">
// //             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
// //               Sản Phẩm Nổi Bật
// //             </p>
// //           </div>
// //           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
// //               {sekeletonItemShoe
// //                 ? Array(5)
// //                     .fill({})
// //                     .map((_, index) => (
// //                       <div key={index}>
// //                         <SekeletonItemShoe />
// //                       </div>
// //                     ))
// //                 : products
// //                     .filter((item) => item.quantity && !item.status)
// //                     .slice(0, 10)
// //                     .map((item, index) => (
// //                       <div key={index}>
// //                         <ProductStanding product={item} />
// //                       </div>
// //                     ))}
// //             </div>
// //             <div className="flex justify-center mt-10">
// //               <button
// //                 onClick={() => navigate("/products")}
// //                 className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md"
// //               >
// //                 Xem Tất Cả Sản Phẩm
// //               </button>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default HomePage;

// import React, { useEffect, useState } from "react";
// import SliderHome from "../../components/sliderHome/SliderHome";
// import Images from "../../static";
// import "./styles.css";
// import TitleBrand from "../../components/TitleBrand";
// import { useNavigate } from "react-router-dom";
// import SliderListBrand from "../../components/SliderListBrand";
// import axios from "axios";
// import API from "../../api";
// import { IProduct } from "../../types/product.type";
// import ProductStanding from "../../components/ProductStanding";
// import { toSlug } from "../../utils/format";
// import SekeletonItemShoe from "../../components/SekeletonItemShoe";
// import Fade from "react-reveal/Fade";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import Slider, { Settings } from "react-slick";
// import Pagination from "../../components/Pagination"; // Import Pagination

// const Line = () => {
//   return (
//     <span className="border-b-2 border-[#f1f1f1] border-solid w-full h-[1px] my-8" />
//   );
// };

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [page, setPage] = React.useState<number>(1);
//   const [products, setProducts] = useState<IProduct[]>();
//   const [productsAll, setProductsAll] = useState<IProduct[]>();
//   const [productsTop, setProductsTop] = useState<IProduct[]>();
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);
//   const [sekeletonItemShoeAll, setSekeletonItemShoeAll] = useState<boolean>(true);
//   const [sekeletonItemShoeTop, setSekeletonItemShoeTop] = useState<boolean>(true);

//   const settings: Settings = {
//     dots: false,
//     arrows: false,
//     className: "center",
//     infinite: true,
//     slidesToShow: 4,
//     swipeToSlide: true,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 3 },
//       },
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 2 },
//       },
//       {
//         breakpoint: 480,
//         settings: { slidesToShow: 1 },
//       },
//     ],
//   };
//   const sliderRef = React.useRef<Slider>(null);

//   const next = () => {
//     if (sliderRef.current) {
//       sliderRef.current.slickNext();
//     }
//   };
//   const prev = () => {
//     if (sliderRef.current) {
//       sliderRef.current.slickPrev();
//     }
//   };

//   // API calls
//   const getDataShoes = async () => {
//     setSekeletonItemShoe(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getShoe(page, 10), // Giảm limit xuống 10 để phân trang rõ ràng hơn
//       });
//       if (res.status) {
//         setProducts(res?.data?.data);
//         setTotalPages(res?.data?.totalPages);
//         setSekeletonItemShoe(false);
//       }
//     } catch (error) {
//       console.error("Error fetching shoes:", error);
//       setSekeletonItemShoe(false);
//     }
//   };
//   const getAllShoe = async () => {
//     setSekeletonItemShoeAll(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getAllShoe(1, 10000),
//       });
//       if (res.status) {
//         setProductsAll(res?.data?.data);
//         setSekeletonItemShoeAll(false);
//       }
//     } catch (error) {
//       console.error("Error fetching all shoes:", error);
//       setSekeletonItemShoeAll(false);
//     }
//   };
//   const getDataTopSale = async () => {
//     setSekeletonItemShoeTop(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getTopSale(15),
//       });
//       if (res.status) {
//         setProductsTop(res?.data);
//         setSekeletonItemShoeTop(false);
//       }
//     } catch (error) {
//       console.error("Error fetching top sale:", error);
//       setSekeletonItemShoeTop(false);
//     }
//   };

//   useEffect(() => {
//     getDataShoes();
//   }, [page]);
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     getDataTopSale();
//     getAllShoe();
//   }, []);

//   return (
//     <div className="w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden">
//       <SliderHome />
//       <Line />

//       {/* Thông tin ưu đãi */}
//       <Fade top distance="10%" duration={3000}>
//         <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-between gap-4 py-6">
//           {[
//             {
//               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg",
//               text: "Đổi mẫu, đổi size miễn phí",
//             },
//             {
//               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg",
//               text: "Mua trước, trả sau miễn lãi",
//             },
//             {
//               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg",
//               text: "Giao hàng, đổi trả tận nhà",
//             },
//             {
//               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg",
//               text: "Hàng giả, đền tiền gấp đôi",
//             },
//           ].map((item, index) => (
//             <div key={index} className="flex items-center gap-3">
//               <LazyLoadImage src={item.img} alt="" className="w-12 h-12 object-contain" />
//               <span className="text-base text-gray-700 font-medium">{item.text}</span>
//             </div>
//           ))}
//         </div>
//       </Fade>
//       <Line />

//       {/* Top Sản Phẩm Bán Chạy */}
//       {!!productsTop && !!productsTop.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Top Những Sản Phẩm Bán Chạy
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoeTop
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => (
//                       <div key={index}>
//                         <SekeletonItemShoe />
//                       </div>
//                     ))
//                 : productsTop
//                     .filter((item) => !item.status)
//                     .map((item, index) => (
//                       <div key={index}>
//                         <ProductStanding product={item} />
//                       </div>
//                     ))}
//             </div>
//           </div>
//         </>
//       )}
//       <Line />

//       {/* Sản phẩm đang giảm giá */}
//       {!!productsAll && !!productsAll.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Sản Phẩm Đang Giảm Giá
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoeAll
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => (
//                       <div key={index}>
//                         <SekeletonItemShoe />
//                       </div>
//                     ))
//                 : productsAll
//                     .filter((item) => !item.status && item.discountValue)
//                     .slice(0, 10)
//                     .map((item, index) => (
//                       <div key={index}>
//                         <ProductStanding product={item} />
//                       </div>
//                     ))}
//             </div>
//           </div>
//         </>
//       )}
//       <Line />

//       {/* Sản Phẩm Nổi Bật */}
//       {!!products && !!products.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Sản Phẩm Nổi Bật
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoe
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => (
//                       <div key={index}>
//                         <SekeletonItemShoe />
//                       </div>
//                     ))
//                 : products
//                     .filter((item) => item.quantity && !item.status)
//                     .map((item, index) => (
//                       <div key={index}>
//                         <ProductStanding product={item} />
//                       </div>
//                     ))}
//             </div>
//             {/* Phân trang */}
//             <Pagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={(newPage) => setPage(newPage)}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;

// import React, { useEffect, useState } from "react";
// import SliderHome from "../../components/sliderHome/SliderHome";
// import Images from "../../static";
// import "./styles.css";
// import TitleBrand from "../../components/TitleBrand";
// import { useNavigate } from "react-router-dom";
// import SliderListBrand from "../../components/SliderListBrand";
// import axios from "axios";
// import API from "../../api";
// import { IProduct } from "../../types/product.type";
// import ProductStanding from "../../components/ProductStanding";
// import { toSlug } from "../../utils/format";
// import SekeletonItemShoe from "../../components/SekeletonItemShoe";
// import Fade from "react-reveal/Fade";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import Slider, { Settings } from "react-slick";
// import Pagination from "../../components/Pagination"; // Import Pagination

// const Line = () => {
//   return <span className="border-b-2 border-[#f1f1f1] border-solid w-full h-[1px] my-8" />;
// };

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [page, setPage] = React.useState<number>(1);
//   const [discountPage, setDiscountPage] = React.useState<number>(1); // Trang cho Sản Phẩm Đang Giảm Giá
//   const [products, setProducts] = useState<IProduct[]>();
//   const [productsAll, setProductsAll] = useState<IProduct[]>();
//   const [productsTop, setProductsTop] = useState<IProduct[]>();
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [totalDiscountPages, setTotalDiscountPages] = useState<number>(1); // Tổng số trang cho Sản Phẩm Đang Giảm Giá
//   const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);
//   const [sekeletonItemShoeAll, setSekeletonItemShoeAll] = useState<boolean>(true);
//   const [sekeletonItemShoeTop, setSekeletonItemShoeTop] = useState<boolean>(true);

//   const itemsPerPage = 10; // Số sản phẩm mỗi trang

//   const settings: Settings = {
//     dots: false,
//     arrows: false,
//     className: "center",
//     infinite: true,
//     slidesToShow: 4,
//     swipeToSlide: true,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } },
//     ],
//   };
//   const sliderRef = React.useRef<Slider>(null);

//   const next = () => sliderRef.current?.slickNext();
//   const prev = () => sliderRef.current?.slickPrev();

//   // API calls
//   const getDataShoes = async () => {
//     setSekeletonItemShoe(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getShoe(page, itemsPerPage),
//       });
//       if (res.status) {
//         setProducts(res?.data?.data);
//         setTotalPages(res?.data?.totalPages);
//         setSekeletonItemShoe(false);
//       }
//     } catch (error) {
//       console.error("Error fetching shoes:", error);
//       setSekeletonItemShoe(false);
//     }
//   };

//   const getAllShoe = async () => {
//     setSekeletonItemShoeAll(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getAllShoe(1, 10000),
//       });
//       if (res.status) {
//         const allProducts = res?.data?.data;
//         setProductsAll(allProducts);
//         // Tính tổng số trang cho Sản Phẩm Đang Giảm Giá
//         const discountedProducts = allProducts.filter((item: IProduct) => !item.status && item.discountValue);
//         setTotalDiscountPages(Math.ceil(discountedProducts.length / itemsPerPage));
//         setSekeletonItemShoeAll(false);
//       }
//     } catch (error) {
//       console.error("Error fetching all shoes:", error);
//       setSekeletonItemShoeAll(false);
//     }
//   };

//   const getDataTopSale = async () => {
//     setSekeletonItemShoeTop(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getTopSale(15),
//       });
//       if (res.status) {
//         setProductsTop(res?.data);
//         setSekeletonItemShoeTop(false);
//       }
//     } catch (error) {
//       console.error("Error fetching top sale:", error);
//       setSekeletonItemShoeTop(false);
//     }
//   };

//   useEffect(() => {
//     getDataShoes();
//   }, [page]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     getDataTopSale();
//     getAllShoe();
//   }, []);

//   return (
//     <div className="w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden">
//       <SliderHome />
//       <Line />

//       {/* Thông tin ưu đãi */}
//       <Fade top distance="10%" duration={3000}>
//         <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-between gap-4 py-6">
//           {[
//             {
//               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg",
//               text: "Đổi mẫu, đổi size miễn phí",
//             },
//             {
//               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg",
//               text: "Mua trước, trả sau miễn lãi",
//             },
//             {
//               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg",
//               text: "Giao hàng, đổi trả tận nhà",
//             },
//             {
//               img: "https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg",
//               text: "Hàng giả, đền tiền gấp đôi",
//             },
//           ].map((item, index) => (
//             <div key={index} className="flex items-center gap-3">
//               <LazyLoadImage src={item.img} alt="" className="w-12 h-12 object-contain" />
//               <span className="text-base text-gray-700 font-medium">{item.text}</span>
//             </div>
//           ))}
//         </div>
//       </Fade>
//       <Line />

//       {/* Top Sản Phẩm Bán Chạy */}
//       {productsTop && productsTop.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Top Những Sản Phẩm Bán Chạy
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoeTop
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => <SekeletonItemShoe key={index} />)
//                 : productsTop
//                     .filter((item) => !item.status)
//                     .map((item, index) => <ProductStanding product={item} key={index} />)}
//             </div>
//           </div>
//         </>
//       )}
//       <Line />

//       {/* Sản phẩm đang giảm giá */}
//       {productsAll && productsAll.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Sản Phẩm Đang Giảm Giá
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoeAll
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => <SekeletonItemShoe key={index} />)
//                 : productsAll
//                     .filter((item) => !item.status && item.discountValue)
//                     .slice((discountPage - 1) * itemsPerPage, discountPage * itemsPerPage)
//                     .map((item, index) => <ProductStanding product={item} key={index} />)}
//             </div>
//             {totalDiscountPages > 1 && (
//               <Pagination
//                 currentPage={discountPage}
//                 totalPages={totalDiscountPages}
//                 onPageChange={setDiscountPage}
//               />
//             )}
//           </div>
//         </>
//       )}
//       <Line />

//       {/* Sản Phẩm Nổi Bật */}
//       {products && products.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Sản Phẩm Nổi Bật
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoe
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => <SekeletonItemShoe key={index} />)
//                 : products
//                     .filter((item) => item.quantity && !item.status)
//                     .map((item, index) => <ProductStanding product={item} key={index} />)}
//             </div>
//             {totalPages > 1 && (
//               <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;
// import React, { useEffect, useState } from "react";
// import SliderHome from "../../components/sliderHome/SliderHome";
// import Images from "../../static";
// import "./styles.css";
// import TitleBrand from "../../components/TitleBrand";
// import { useNavigate } from "react-router-dom";
// import SliderListBrand from "../../components/SliderListBrand";
// import axios from "axios";
// import API from "../../api";
// import { IProduct } from "../../types/product.type";
// import ProductStanding from "../../components/ProductStanding";
// import { toSlug } from "../../utils/format";
// import SekeletonItemShoe from "../../components/SekeletonItemShoe";
// import Fade from "react-reveal/Fade";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import Slider, { Settings } from "react-slick";
// import Pagination from "../../components/Pagination";
// import Chatbot from "../../components/ChatBot"; // Import Chatbot component

// const Line = () => {
//   return (
//     <span className="border-b-2 border-[#f1f1f1] border-solid w-full h-[1px] my-8" />
//   );
// };

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [page, setPage] = React.useState<number>(1);
//   const [discountPage, setDiscountPage] = React.useState<number>(1);
//   const [products, setProducts] = useState<IProduct[]>();
//   const [productsAll, setProductsAll] = useState<IProduct[]>();
//   const [productsTop, setProductsTop] = useState<IProduct[]>();
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [totalDiscountPages, setTotalDiscountPages] = useState<number>(1);
//   const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);
//   const [sekeletonItemShoeAll, setSekeletonItemShoeAll] = useState<boolean>(
//     true
//   );
//   const [sekeletonItemShoeTop, setSekeletonItemShoeTop] = useState<boolean>(
//     true
//   );

//   const itemsPerPage = 10;

//   const settings: Settings = {
//     dots: false,
//     arrows: false,
//     className: "center",
//     infinite: true,
//     slidesToShow: 4,
//     swipeToSlide: true,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } },
//     ],
//   };
//   const sliderRef = React.useRef<Slider>(null);

//   const next = () => sliderRef.current?.slickNext();
//   const prev = () => sliderRef.current?.slickPrev();

//   // API calls
//   const getDataShoes = async () => {
//     setSekeletonItemShoe(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getShoe(page, itemsPerPage),
//       });
//       if (res.status) {
//         setProducts(res?.data?.data);
//         setTotalPages(res?.data?.totalPages);
//         setSekeletonItemShoe(false);
//       }
//     } catch (error) {
//       console.error("Error fetching shoes:", error);
//       setSekeletonItemShoe(false);
//     }
//   };

//   const getAllShoe = async () => {
//     setSekeletonItemShoeAll(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getAllShoe(1, 10000),
//       });
//       if (res.status) {
//         const allProducts = res?.data?.data;
//         setProductsAll(allProducts);
//         const discountedProducts = allProducts.filter(
//           (item: IProduct) => !item.status && item.discountValue
//         );
//         setTotalDiscountPages(
//           Math.ceil(discountedProducts.length / itemsPerPage)
//         );
//         setSekeletonItemShoeAll(false);
//       }
//     } catch (error) {
//       console.error("Error fetching all shoes:", error);
//       setSekeletonItemShoeAll(false);
//     }
//   };

//   const getDataTopSale = async () => {
//     setSekeletonItemShoeTop(true);
//     try {
//       const res = await axios({
//         method: "get",
//         url: API.getTopSale(15),
//       });
//       if (res.status) {
//         setProductsTop(res?.data);
//         setSekeletonItemShoeTop(false);
//       }
//     } catch (error) {
//       console.error("Error fetching top sale:", error);
//       setSekeletonItemShoeTop(false);
//     }
//   };

//   useEffect(() => {
//     getDataShoes();
//   }, [page]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     getDataTopSale();
//     getAllShoe();
//   }, []);

//   return (
//     <div className="w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden">
//       <SliderHome />
//       <Line />

//       {/* Thông tin ưu đãi */}
//       <Fade top distance="10%" duration={3000}>
//         <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-between gap-4 py-6">
//           {[
//             {
//               img:
//                 "https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg",
//               text: "Đổi mẫu, đổi size miễn phí",
//             },
//             {
//               img:
//                 "https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg",
//               text: "Mua trước, trả sau miễn lãi",
//             },
//             {
//               img:
//                 "https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg",
//               text: "Giao hàng, đổi trả tận nhà",
//             },
//             {
//               img:
//                 "https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg",
//               text: "Hàng giả, đền tiền gấp đôi",
//             },
//           ].map((item, index) => (
//             <div key={index} className="flex items-center gap-3">
//               <LazyLoadImage
//                 src={item.img}
//                 alt=""
//                 className="w-12 h-12 object-contain"
//               />
//               <span className="text-base text-gray-700 font-medium">
//                 {item.text}
//               </span>
//             </div>
//           ))}
//         </div>
//       </Fade>
//       <Line />

//       {/* Top Sản Phẩm Bán Chạy */}
//       {productsTop && productsTop.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Top Những Sản Phẩm Bán Chạy
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoeTop
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => <SekeletonItemShoe key={index} />)
//                 : productsTop
//                     .filter((item) => !item.status)
//                     .map((item, index) => (
//                       <ProductStanding product={item} key={index} />
//                     ))}
//             </div>
//           </div>
//         </>
//       )}
//       <Line />

//       {/* Sản phẩm đang giảm giá */}
//       {productsAll && productsAll.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Sản Phẩm Đang Giảm Giá
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoeAll
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => <SekeletonItemShoe key={index} />)
//                 : productsAll
//                     .filter((item) => !item.status && item.discountValue)
//                     .slice(
//                       (discountPage - 1) * itemsPerPage,
//                       discountPage * itemsPerPage
//                     )
//                     .map((item, index) => (
//                       <ProductStanding product={item} key={index} />
//                     ))}
//             </div>
//             {totalDiscountPages > 1 && (
//               <Pagination
//                 currentPage={discountPage}
//                 totalPages={totalDiscountPages}
//                 onPageChange={setDiscountPage}
//               />
//             )}
//           </div>
//         </>
//       )}
//       <Line />

//       {/* Sản Phẩm Nổi Bật */}
//       {products && products.length && (
//         <>
//           <div className="flex flex-col items-center py-8">
//             <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//               Sản Phẩm Nổi Bật
//             </p>
//           </div>
//           <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {sekeletonItemShoe
//                 ? Array(5)
//                     .fill({})
//                     .map((_, index) => <SekeletonItemShoe key={index} />)
//                 : products
//                     .filter((item) => item.quantity && !item.status)
//                     .map((item, index) => (
//                       <ProductStanding product={item} key={index} />
//                     ))}
//             </div>
//             {totalPages > 1 && (
//               <Pagination
//                 currentPage={page}
//                 totalPages={totalPages}
//                 onPageChange={setPage}
//               />
//             )}
//           </div>
//         </>
//       )}

//       {/* Tích hợp Chatbot */}
//       <Chatbot products={productsAll} />
//     </div>
//   );
// };

// export default HomePage;





import React, { useEffect, useState } from "react";
import SliderHome from "../../components/sliderHome/SliderHome";
import Images from "../../static";
import "./styles.css";
import TitleBrand from "../../components/TitleBrand";
import { useNavigate } from "react-router-dom";
import SliderListBrand from "../../components/SliderListBrand";
import axios from "axios";
import API from "../../api";
import { IProduct } from "../../types/product.type";
import ProductStanding from "../../components/ProductStanding";
import { toSlug } from "../../utils/format";
import SekeletonItemShoe from "../../components/SekeletonItemShoe";
import Fade from "react-reveal/Fade";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider, { Settings } from "react-slick";
import Pagination from "../../components/Pagination";
import Chatbot from "../../components/ChatBot";

const Line = () => {
  return (
    <span className="border-b-2 border-[#f1f1f1] border-solid w-full h-[1px] my-8" />
  );
}

const HomePage = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState<number>(1);
  const [discountPage, setDiscountPage] = React.useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>();
  const [productsAll, setProductsAll] = useState<IProduct[]>();
  const [productsTop, setProductsTop] = useState<IProduct[]>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDiscountPages, setTotalDiscountPages] = useState<number>(1);
  const [sekeletonItemShoe, setSekeletonItemShoe] = useState<boolean>(true);
  const [sekeletonItemShoeAll, setSekeletonItemShoeAll] = useState<boolean>(true);
  const [sekeletonItemShoeTop, setSekeletonItemShoeTop] = useState<boolean>(true);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false); // Trạng thái hiển thị chat

  const itemsPerPage = 8;

  const settings: Settings = {
    dots: false,
    arrows: false,
    className: "center",
    infinite: true,
    slidesToShow: 4,
    swipeToSlide: true,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  const sliderRef = React.useRef<Slider>(null);

  const next = () => sliderRef.current?.slickNext();
  const prev = () => sliderRef.current?.slickPrev();

  // API calls
  const getDataShoes = async () => {
    setSekeletonItemShoe(true);
    try {
      const res = await axios({
        method: "get",
        url: API.getShoe(page, itemsPerPage),
      });
      if (res.status) {
        setProducts(res?.data?.data);
        setTotalPages(res?.data?.totalPages);
        setSekeletonItemShoe(false);
      }
    } catch (error) {
      console.error("Error fetching shoes:", error);
      setSekeletonItemShoe(false);
    }
  };

  const getAllShoe = async () => {
    setSekeletonItemShoeAll(true);
    try {
      const res = await axios({
        method: "get",
        url: API.getAllShoe(1, 10000),
      });
      if (res.status) {
        const allProducts = res?.data?.data;
        setProductsAll(allProducts);
        const discountedProducts = allProducts.filter(
          (item: IProduct) => !item.status && item.discountValue
        );
        setTotalDiscountPages(
          Math.ceil(discountedProducts.length / itemsPerPage)
        );
        setSekeletonItemShoeAll(false);
      }
    } catch (error) {
      console.error("Error fetching all shoes:", error);
      setSekeletonItemShoeAll(false);
    }
  };

  const getDataTopSale = async () => {
    setSekeletonItemShoeTop(true);
    try {
      const res = await axios({
        method: "get",
        url: API.getTopSale(15),
      });
      if (res.status) {
        setProductsTop(res?.data);
        setSekeletonItemShoeTop(false);
      }
    } catch (error) {
      console.error("Error fetching top sale:", error);
      setSekeletonItemShoeTop(false);
    }
  };

  useEffect(() => {
    getDataShoes();
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataTopSale();
    getAllShoe();
  }, []);

  return (
    <div className="w-full flex flex-col flex-1 bg-white no-scrollbar overflow-x-hidden">
      <SliderHome />
      <Line />

      {/* Thông tin ưu đãi */}
      <Fade top distance="10%" duration={3000}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-between gap-4 py-6">
          {[
            {
              img:
                "https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg",
              text: "Đổi mẫu, đổi size miễn phí",
            },
            {
              img:
                "https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg",
              text: "Mua trước, trả sau miễn lãi",
            },
            {
              img:
                "https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg",
              text: "Giao hàng, đổi trả tận nhà",
            },
            {
              img:
                "https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg",
              text: "Hàng giả, đền tiền gấp đôi",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <LazyLoadImage
                src={item.img}
                alt=""
                className="w-12 h-12 object-contain"
              />
              <span className="text-base text-gray-700 font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </Fade>
      <Line />

      {/* Top Sản Phẩm Bán Chạy */}
      {/* {productsTop && productsTop.length && (
        <>
          <div className="flex flex-col items-center py-8">
            <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
              Top Những Sản Phẩm Bán Chạy
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {sekeletonItemShoeTop
                ? Array(5)
                    .fill({})
                    .map((_, index) => <SekeletonItemShoe key={index} />)
                : productsTop
                    .filter((item) => !item.status)
                    .map((item, index) => (
                      <ProductStanding product={item} key={index} />
                    ))}
            </div>
          </div>
        </>
      )} */}
      <Line />

      {/* Sản phẩm đang giảm giá */}
      {productsAll && productsAll.length && (
        <>
          <div className="flex flex-col items-center py-8">
            <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
              Sản Phẩm Đang Giảm Giá
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sekeletonItemShoeAll
                ? Array(5)
                    .fill({})
                    .map((_, index) => <SekeletonItemShoe key={index} />)
                : productsAll
                    .filter((item) => !item.status && item.discountValue)
                    .slice(
                      (discountPage - 1) * itemsPerPage,
                      discountPage * itemsPerPage
                    )
                    .map((item, index) => (
                      <ProductStanding product={item} key={index} />
                    ))}
            </div>
            {totalDiscountPages > 1 && (
              <Pagination
                currentPage={discountPage}
                totalPages={totalDiscountPages}
                onPageChange={setDiscountPage}
              />
            )}
          </div>
        </>
      )}
      <Line />

      {/* Sản Phẩm Nổi Bật */}
      {products && products.length && (
        <>
          <div className="flex flex-col items-center py-8">
            <p className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
              Danh sách sản phẩm
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sekeletonItemShoe
                ? Array(5)
                    .fill({})
                    .map((_, index) => <SekeletonItemShoe key={index} />)
                : products
                    .filter((item) => item.quantity && !item.status)
                    .map((item, index) => (
                      <ProductStanding product={item} key={index} />
                    ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </>
      )}

      {/* Icon Chatbot */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-5 right-5 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Thanh Chatbot (Hiển thị khi nhấp vào icon) */}
      {isChatOpen && (
        <div className="fixed bottom-5 right-5 z-50">
          <Chatbot products={productsAll} onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default HomePage;