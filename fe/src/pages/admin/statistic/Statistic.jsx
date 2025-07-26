// // import { Col, Row, Table } from "antd";
// // import Title from "antd/es/typography/Title";
// // import React, { useEffect, useState } from "react";
// // import TopSell from "./TopSell";
// // import ChartBillStatus from "./ChartBillStatus";
// // import * as request from "~/utils/httpRequest";
// // import FormatCurrency from "~/utils/FormatCurrency";
// // import DailySales from "./DailySales";
// // import BaseUI from "~/layouts/admin/BaseUI";
// // function Statistic() {
// //   const [totalBillMonth, setTotalBillMonth] = useState(0);
// //   const [totalBillAmoutMonth, setTotalBillAmoutMonth] = useState(0);
// //   const [totalBillDay, setTotalBillDay] = useState(0);
// //   const [totalBillAmountDay, setTotalBillAmoutDay] = useState(0);
// //   const [totalProductMonth, setTotalProductMonth] = useState(0);

// //   const loadData = () => {
// //     // tháng
// //     request
// //       .get(`statistical/month`)
// //       .then((response) => {
// //         const data = response.data[0];
// //         setTotalBillMonth(data.totalBill);
// //         setTotalBillAmoutMonth(data.totalBillAmount);
// //         setTotalProductMonth(data.totalProduct);
// //       })
// //       .catch((error) => { });
// //     // ngày
// //     request
// //       .get(`statistical/day`)
// //       .then((response) => {
// //         const data = response.data[0];
// //         setTotalBillDay(data.totalBillToday);
// //         setTotalBillAmoutDay(data.totalBillAmountToday);
// //       })
// //       .catch((error) => { });
// //   };

// //   useEffect(() => {
// //     loadData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   return (
// //     <>
// //     <BaseUI>
// //       <Row gutter={16}>
// //         <Col xl={8}>
// //           <div
// //             className="border px-2 pt-2"
// //             style={{ height: "150px", backgroundColor: "#024FA0" }}
// //           >
// //             <Title level={5} className="text-white">Doanh số tháng này </Title>
// //             <h1 className="text-white">{totalBillMonth}</h1>
// //             <Title level={3} className="text-white"><FormatCurrency value={totalBillAmoutMonth} /></Title>
// //           </div>
// //         </Col>
// //         <Col xl={8}>
// //           <div
// //             className="border px-2 pt-2"
// //             style={{ height: "150px", backgroundColor: "#F2721E" }}
// //           >
// //             <Title level={5} className="text-white">Doanh số hôm nay</Title>
// //             <h1 className="text-white">{totalBillDay}</h1>
// //             <Title level={3} className="text-white">
// //               <FormatCurrency value={totalBillAmountDay} />
// //             </Title>
// //           </div>
// //         </Col>
// //         <Col xl={8}>
// //           <div
// //             className="border px-2 pt-2"
// //             style={{ height: "150px", backgroundColor: "#50B846" }}
// //           >
// //             <Title level={5} className="text-white">Sản phẩm bán được trong tháng</Title>
// //             <h1 className="text-white">{totalProductMonth === null ? 0 : totalProductMonth}</h1>
// //             <Title level={3} className="text-white">Sản phẩm</Title>
// //           </div>
// //         </Col>
// //       </Row>

// //       <Row className="mt-3" gutter={24}>
// //         <Col xl={12}>
// //           <TopSell />
// //         </Col>
// //         <Col xl={12}>
// //           <ChartBillStatus />
// //         </Col>
// //       </Row>
// //       <Row className="mt-3">
// //         <Col span={24}>
// //           <DailySales/>
// //         </Col>
// //       </Row>
// //       </BaseUI>
// //     </>
// //   );
// // }

// // export default Statistic;
// // import React, { useEffect, useState } from "react";
// // import { Card, Col, Row, Statistic as AntdStatistic, Typography } from "antd";
// // import ChartBillStatus from "./ChartBillStatus";
// // import TopSell from "./TopSell";
// // import NearExpiredProducts from "./NearExpiredProducts"; // Component mới
// // import DailySales from "./DailySales";
// // import * as request from "~/utils/httpRequest";
// // import FormatCurrency from "~/utils/FormatCurrency";
// // import BaseUI from "~/layouts/admin/BaseUI";

// // const { Title } = Typography;

// // function Statistic() {
// //   const [totalBillMonth, setTotalBillMonth] = useState(0);
// //   const [totalBillAmountMonth, setTotalBillAmountMonth] = useState(0);
// //   const [totalBillDay, setTotalBillDay] = useState(0);
// //   const [totalBillAmountDay, setTotalBillAmountDay] = useState(0);
// //   const [totalProductMonth, setTotalProductMonth] = useState(0);

// //   const loadData = () => {
// //     request.get("/statistical/month").then((response) => {
// //       const data = response.data[0];
// //       setTotalBillMonth(data.totalBill);
// //       setTotalBillAmountMonth(data.totalBillAmount);
// //       setTotalProductMonth(data.totalProduct);
// //     });
// //     request.get("/statistical/day").then((response) => {
// //       const data = response.data[0];
// //       setTotalBillDay(data.totalBillToday);
// //       setTotalBillAmountDay(data.totalBillAmountToday);
// //     });
// //   };

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   return (
// //     <BaseUI>
// //       <Title level={2}>Thống Kê Tổng Quan</Title>
// //       <Row gutter={[16, 16]}>
// //         {/* Doanh thu */}
// //         <Col xs={24} md={8}>
// //           <Card bordered={false} style={{ backgroundColor: "#1890ff" }}>
// //             <AntdStatistic
// //               title={<span style={{ color: "#fff" }}>Doanh Số Tháng</span>}
// //               value={totalBillAmountMonth}
// //               formatter={(value) => <FormatCurrency value={value} />}
// //               valueStyle={{ color: "#fff", fontSize: "24px" }}
// //               suffix={<span style={{ color: "#fff" }}> ({totalBillMonth} đơn)</span>}
// //             />
// //           </Card>
// //         </Col>
// //         <Col xs={24} md={8}>
// //           <Card bordered={false} style={{ backgroundColor: "#52c41a" }}>
// //             <AntdStatistic
// //               title={<span style={{ color: "#fff" }}>Doanh Số Hôm Nay</span>}
// //               value={totalBillAmountDay}
// //               formatter={(value) => <FormatCurrency value={value} />}
// //               valueStyle={{ color: "#fff", fontSize: "24px" }}
// //               suffix={<span style={{ color: "#fff" }}> ({totalBillDay} đơn)</span>}
// //             />
// //           </Card>
// //         </Col>
// //         <Col xs={24} md={8}>
// //           <Card bordered={false} style={{ backgroundColor: "#fa8c16" }}>
// //             <AntdStatistic
// //               title={<span style={{ color: "#fff" }}>Sản Phẩm Bán Được (Tháng)</span>}
// //               value={totalProductMonth || 0}
// //               valueStyle={{ color: "#fff", fontSize: "24px" }}
// //               suffix={<span style={{ color: "#fff" }}> sản phẩm</span>}
// //             />
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* Biểu đồ và danh sách */}
// //       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
// //         <Col xs={24} md={12}>
// //           <Card title="Trạng Thái Đơn Hàng" bordered={false}>
// //             <ChartBillStatus />
// //           </Card>
// //         </Col>
// //         <Col xs={24} md={12}>
// //           <Card title="Sản Phẩm Bán Chạy" bordered={false}>
// //             <TopSell />
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* Sản phẩm sắp hết hạn */}
// //       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
// //         <Col span={24}>
// //           <Card title="Sản Phẩm Sắp Hết Hàng" bordered={false}>
// //             <NearExpiredProducts />
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* Doanh số theo ngày */}
// //       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
// //         <Col span={24}>
// //           <Card title="Doanh Số Theo Ngày" bordered={false}>
// //             <DailySales />
// //           </Card>
// //         </Col>
// //       </Row>
// //     </BaseUI>
// //   );
// // }

// // export default Statistic;



// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, DatePicker, Row, Select, Statistic as AntdStatistic, Typography } from "antd";
// import ChartBillStatus from "./ChartBillStatus";
// import TopSell from "./TopSell";
// import NearExpiredProducts from "./NearExpiredProducts";
// import DailySales from "./DailySales";
// import * as request from "~/utils/httpRequest";
// import FormatCurrency from "~/utils/FormatCurrency";
// import BaseUI from "~/layouts/admin/BaseUI";
// import moment from "moment";

// const { Title } = Typography;
// const { RangePicker } = DatePicker;

// function Statistic() {
//   const [totalBillMonth, setTotalBillMonth] = useState(0);
//   const [totalBillAmountMonth, setTotalBillAmountMonth] = useState(0);
//   const [totalBillDay, setTotalBillDay] = useState(0);
//   const [totalBillAmountDay, setTotalBillAmountDay] = useState(0);
//   const [totalProductMonth, setTotalProductMonth] = useState(0);
//   const [filterType, setFilterType] = useState("MONTH");
//   const [dateRange, setDateRange] = useState([]);

//   const loadData = () => {
//     const params = { filterType };
//     if (filterType === "CUSTOM" && dateRange.length === 2) {
//       params.fromDate = moment(dateRange[0]).format("YYYY-MM-DD");
//       params.toDate = moment(dateRange[1]).format("YYYY-MM-DD");
//     }

//     request.get("/statistical/day", { params }).then((response) => {
//       const data = response.data[0] || {};
//       setTotalBillDay(data.totalBillToday || 0);
//       setTotalBillAmountDay(data.totalBillAmountToday || 0);
//     });

//     request.get("/statistical/month", { params }).then((response) => {
//       const data = response.data[0] || {};
//       setTotalBillMonth(data.totalBill || 0);
//       setTotalBillAmountMonth(data.totalBillAmount || 0);
//       setTotalProductMonth(data.totalProduct || 0);
//     });
//   };

//   useEffect(() => {
//     loadData();
//   }, [filterType, dateRange]);

//   const handleFilterChange = (value) => {
//     setFilterType(value);
//     if (value !== "CUSTOM") {
//       setDateRange([]);
//     }
//   };

//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//   };

//   return (
//     <BaseUI>
//       <Title level={2}>Thống Kê Tổng Quan</Title>
//       <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//         <Col>
//           <Select
//             value={filterType}
//             onChange={handleFilterChange}
//             style={{ width: 150 }}
//             options={[
//               { value: "DAY", label: "Ngày" },
//               { value: "WEEK", label: "Tuần" },
//               { value: "MONTH", label: "Tháng" },
//               { value: "YEAR", label: "Năm" },
//               { value: "CUSTOM", label: "Tùy chỉnh" },
//             ]}
//           />
//         </Col>
//         {filterType === "CUSTOM" && (
//           <Col>
//             <RangePicker
//               value={dateRange}
//               onChange={handleDateRangeChange}
//               format="YYYY-MM-DD"
//             />
//           </Col>
//         )}
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={8}>
//           <Card bordered={false} style={{ backgroundColor: "#1890ff" }}>
//             <AntdStatistic
//               title={<span style={{ color: "#fff" }}>Doanh Số Tháng</span>}
//               value={totalBillAmountMonth}
//               formatter={(value) => <FormatCurrency value={value} />}
//               valueStyle={{ color: "#fff", fontSize: "24px" }}
//               suffix={<span style={{ color: "#fff" }}> ({totalBillMonth} đơn)</span>}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} md={8}>
//           <Card bordered={false} style={{ backgroundColor: "#52c41a" }}>
//             <AntdStatistic
//               title={<span style={{ color: "#fff" }}>Doanh Số Hôm Nay</span>}
//               value={totalBillAmountDay}
//               formatter={(value) => <FormatCurrency value={value} />}
//               valueStyle={{ color: "#fff", fontSize: "24px" }}
//               suffix={<span style={{ color: "#fff" }}> ({totalBillDay} đơn)</span>}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} md={8}>
//           <Card bordered={false} style={{ backgroundColor: "#fa8c16" }}>
//             <AntdStatistic
//               title={<span style={{ color: "#fff" }}>Sản Phẩm Bán Được (Tháng)</span>}
//               value={totalProductMonth || 0}
//               valueStyle={{ color: "#fff", fontSize: "24px" }}
//               suffix={<span style={{ color: "#fff" }}> sản phẩm</span>}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
//         <Col xs={24} md={12}>
//           <Card title="Trạng Thái Đơn Hàng" bordered={false}>
//             <ChartBillStatus />
//           </Card>
//         </Col>
//         <Col xs={24} md={12}>
//           <Card title="Sản Phẩm Bán Chạy" bordered={false}>
//             <TopSell />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
//         <Col span={24}>
//           <Card title="Sản Phẩm Sắp Hết Hàng" bordered={false}>
//             <NearExpiredProducts />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
//         <Col span={24}>
//           <Card title="Doanh Số Theo Ngày" bordered={false}>
//             <DailySales />
//           </Card>
//         </Col>
//       </Row>
//     </BaseUI>
//   );
// }

// export default Statistic;


// import React, { useEffect, useState } from "react";
// import { Card, Col, Row, Statistic as AntdStatistic, Typography, Select, DatePicker } from "antd";
// import ChartBillStatus from "./ChartBillStatus";
// import TopSell from "./TopSell";
// import NearExpiredProducts from "./NearExpiredProducts";
// import DailySales from "./DailySales";
// import * as request from "~/utils/httpRequest";
// import FormatCurrency from "~/utils/FormatCurrency";
// import BaseUI from "~/layouts/admin/BaseUI";
// import moment from "moment";

// const { Title } = Typography;
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// function Statistic() {
//   const [totalBillMonth, setTotalBillMonth] = useState(0);
//   const [totalBillAmountMonth, setTotalBillAmountMonth] = useState(0);
//   const [totalBillDay, setTotalBillDay] = useState(0);
//   const [totalBillAmountDay, setTotalBillAmountDay] = useState(0);
//   const [totalProductMonth, setTotalProductMonth] = useState(0);
//   const [filterType, setFilterType] = useState("month");
//   const [customRange, setCustomRange] = useState([]);

//   const loadData = () => {
//     // Load daily stats
//     request.get("/statistical/day").then((response) => {
//       const data = response.data[0] || {};
//       setTotalBillDay(data.totalBillToday || 0);
//       setTotalBillAmountDay(data.totalBillAmountToday || 0);
//     });

//     // Load stats based on filter type
//     let endpoint = "";
//     let params = {};

//     switch (filterType) {
//       case "day":
//         endpoint = "/statistical/day";
//         break;
//       case "week":
//         endpoint = "/statistical/week";
//         break;
//       case "month":
//         endpoint = "/statistical/month";
//         break;
//       case "year":
//         endpoint = "/statistical/year";
//         break;
//       case "custom":
//         if (customRange.length === 2) {
//           endpoint = "/statistical/custom";
//           params = {
//             fromDate: customRange[0].startOf("day").valueOf(),
//             toDate: customRange[1].endOf("day").valueOf(),
//           };
//         }
//         break;
//       default:
//         endpoint = "/statistical/month";
//     }

//     if (endpoint) {
//       request.get(endpoint, { params }).then((response) => {
//         const data = response.data[0] || {};
//         setTotalBillMonth(data.totalBill || data.totalBillToday || 0);
//         setTotalBillAmountMonth(data.totalBillAmount || data.totalBillAmountToday || 0);
//         setTotalProductMonth(data.totalProduct || 0);
//       });
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [filterType, customRange]);

//   const handleFilterChange = (value) => {
//     setFilterType(value);
//     if (value !== "custom") {
//       setCustomRange([]);
//     }
//   };

//   const handleRangeChange = (dates) => {
//     setCustomRange(dates);
//   };

//   return (
//     <BaseUI>
//       <Title level={2}>Thống Kê Tổng Quan</Title>
//       <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
//         <Col>
//           <Select
//             value={filterType}
//             onChange={handleFilterChange}
//             style={{ width: 150 }}
//           >
//             <Option value="day">Ngày</Option>
//             <Option value="week">Tuần</Option>
//             <Option value="month">Tháng</Option>
//             <Option value="year">Năm</Option>
//             <Option value="custom">Tùy chỉnh</Option>
//           </Select>
//         </Col>
//         {filterType === "custom" && (
//           <Col>
//             <RangePicker
//               onChange={handleRangeChange}
//               format="DD/MM/YYYY"
//               style={{ width: 300 }}
//             />
//           </Col>
//         )}
//       </Row>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={8}>
//           <Card bordered={false} style={{ backgroundColor: "#1890ff" }}>
//             <AntdStatistic
//               title={<span style={{ color: "#fff" }}>
//                 {filterType === "day" ? "Doanh Thu Hôm Nay" :
//                  filterType === "week" ? "Doanh Thu Tuần" :
//                  filterType === "month" ? "Doanh Thu Tháng" :
//                  filterType === "year" ? "Doanh Thu Năm" : "Doanh Thu Tùy Chỉnh"}
//               </span>}
//               value={totalBillAmountMonth}
//               formatter={(value) => <FormatCurrency value={value} />}
//               valueStyle={{ color: "#fff", fontSize: "24px" }}
//               suffix={<span style={{ color: "#fff" }}> ({totalBillMonth} đơn)</span>}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} md={8}>
//           <Card bordered={false} style={{ backgroundColor: "#52c41a" }}>
//             <AntdStatistic
//               title={<span style={{ color: "#fff" }}>Doanh thu Hôm Nay</span>}
//               value={totalBillAmountDay}
//               formatter={(value) => <FormatCurrency value={value} />}
//               valueStyle={{ color: "#fff", fontSize: "24px" }}
//               suffix={<span style={{ color: "#fff" }}> ({totalBillDay} đơn)</span>}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} md={8}>
//           <Card bordered={false} style={{ backgroundColor: "#fa8c16" }}>
//             <AntdStatistic
//               title={<span style={{ color: "#fff" }}>
//                 {filterType === "day" ? "Sản Phẩm Bán Được (Hôm Nay)" :
//                  filterType === "week" ? "Sản Phẩm Bán Được (Tuần)" :
//                  filterType === "month" ? "Sản Phẩm Bán Được (Tháng)" :
//                  filterType === "year" ? "Sản Phẩm Bán Được (Năm)" : "Sản Phẩm Bán Được (Tùy Chỉnh)"}
//               </span>}
//               value={totalProductMonth || 0}
//               valueStyle={{ color: "#fff", fontSize: "24px" }}
//               suffix={<span style={{ color: "#fff" }}> sản phẩm</span>}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
//         <Col xs={24} md={12}>
//           <Card title="Trạng Thái Đơn Hàng" bordered={false}>
//             <ChartBillStatus />
//           </Card>
//         </Col>
//         <Col xs={24} md={12}>
//           <Card title="Sản Phẩm Bán Chạy" bordered={false}>
//             <TopSell />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
//         <Col span={24}>
//           <Card title="Sản Phẩm Sắp Hết Hàng" bordered={false}>
//             <NearExpiredProducts />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
//         <Col span={24}>
//           <Card title="Doanh Thu" bordered={false}>
//             <DailySales />
//           </Card>
//         </Col>
//       </Row>
//     </BaseUI>
//   );
// }

// export default Statistic;



import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic as AntdStatistic, Typography, DatePicker } from "antd";
import ChartBillStatus from "./ChartBillStatus";
import TopSell from "./TopSell";
import NearExpiredProducts from "./NearExpiredProducts";
import DailySales from "./DailySales";
import * as request from "~/utils/httpRequest";
import FormatCurrency from "~/utils/FormatCurrency";
import BaseUI from "~/layouts/admin/BaseUI";
import moment from "moment";

const { Title } = Typography;
const { RangePicker } = DatePicker;

function Statistic() {
  const [totalBillMonth, setTotalBillMonth] = useState(0);
  const [totalBillAmountMonth, setTotalBillAmountMonth] = useState(0);
  const [totalBillDay, setTotalBillDay] = useState(0);
  const [totalBillAmountDay, setTotalBillAmountDay] = useState(0);
  const [totalProductMonth, setTotalProductMonth] = useState(0);
  const [customRange, setCustomRange] = useState([]);

  const loadData = () => {
    // Load daily stats
    request.get("/statistical/day").then((response) => {
      const data = response.data[0] || {};
      setTotalBillDay(data.totalBillToday || 0);
      setTotalBillAmountDay(data.totalBillAmountToday || 0);
    });

    // Load stats based on custom range or default to month
    let endpoint = "";
    let params = {};

    if (customRange.length === 2) {
      endpoint = "/statistical/custom";
      params = {
        fromDate: customRange[0].startOf("day").valueOf(),
        toDate: customRange[1].endOf("day").valueOf(),
      };
    } else {
      endpoint = "/statistical/month";
    }

    if (endpoint) {
      request.get(endpoint, { params }).then((response) => {
        const data = response.data[0] || {};
        setTotalBillMonth(data.totalBill || data.totalBillToday || 0);
        setTotalBillAmountMonth(data.totalBillAmount || data.totalBillAmountToday || 0);
        setTotalProductMonth(data.totalProduct || 0);
      });
    }
  };

  useEffect(() => {
    loadData();
  }, [customRange]);

  const handleRangeChange = (dates) => {
    setCustomRange(dates || []);
  };

  return (
    <BaseUI>
      <Title level={2}>Thống Kê Tổng Quan</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col>
          <RangePicker
            onChange={handleRangeChange}
            format="DD/MM/YYYY"
            style={{ width: 300 }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ backgroundColor: "#1890ff" }}>
            <AntdStatistic
              title={
                <span style={{ color: "#fff" }}>
                  {customRange.length === 2 ? "Doanh Thu Tùy Chỉnh" : "Doanh Thu Tháng"}
                </span>
              }
              value={totalBillAmountMonth}
              formatter={(value) => <FormatCurrency value={value} />}
              valueStyle={{ color: "#fff", fontSize: "24px" }}
              suffix={<span style={{ color: "#fff" }}> ({totalBillMonth} đơn)</span>}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ backgroundColor: "#52c41a" }}>
            <AntdStatistic
              title={<span style={{ color: "#fff" }}>Doanh Thu Hôm Nay</span>}
              value={totalBillAmountDay}
              formatter={(value) => <FormatCurrency value={value} />}
              valueStyle={{ color: "#fff", fontSize: "24px" }}
              suffix={<span style={{ color: "#fff" }}> ({totalBillDay} đơn)</span>}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ backgroundColor: "#fa8c16" }}>
            <AntdStatistic
              title={
                <span style={{ color: "#fff" }}>
                  {customRange.length === 2
                    ? "Sản Phẩm Bán Được (Tùy Chỉnh)"
                    : "Sản Phẩm Bán Được (Tháng)"}
                </span>
              }
              value={totalProductMonth || 0}
              valueStyle={{ color: "#fff", fontSize: "24px" }}
              suffix={<span style={{ color: "#fff" }}> sản phẩm</span>}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Trạng Thái Đơn Hàng" bordered={false}>
            <ChartBillStatus />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Sản Phẩm Bán Chạy" bordered={false}>
            <TopSell />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Sản Phẩm Sắp Hết Hàng" bordered={false}>
            <NearExpiredProducts />
          </Card>
        </Col>
      </Row>

      {/* <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Doanh Thu" bordered={false}>
            <DailySales />
          </Card>
        </Col>
      </Row> */}
    </BaseUI>
  );
}

export default Statistic;