// import React, { useEffect, useState } from "react";
// import { Button, DatePicker, Form, Input, Row, Col, Table, Tooltip, Tag } from "antd";
// import { Link } from "react-router-dom";
// import * as request from "~/utils/httpRequest";
// import FormatCurrency from "~/utils/FormatCurrency";
// import FormatDate from "~/utils/FormatDate";
// import BaseUI from "~/layouts/admin/BaseUI";

// const { RangePicker } = DatePicker;

// const DailySales = () => {
//   const [listOrder, setListOrder] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchValue, setSearchValue] = useState("");
//   const [pageSize, setPageSize] = useState(5);
//   const [status, setStatus] = useState(null);
//   const [selectedDates, setSelectedDates] = useState([]);

//   const [totalRevenue, setTotalRevenue] = useState(0);

//   const calculateTotalRevenue = (orders) => {
//     return orders.reduce((total, order) => total + (order.totalMoney || 0) + (order.moneyShip || 0), 0);
//   };

//   const loadSalesData = () => {
//     request
//       .get(`statistical/daterange`, {
//         params: {
//           page: currentPage,
//           sizePage: pageSize,
//           status: status,
//           code: searchValue,
//           fromDate: selectedDates?.fromDate,
//           toDate: selectedDates?.toDate
//         }
//       }).then((response) => {
//         setListOrder(response.data);
//         setTotalPages(response.totalPages);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     };
//     const loadTotalRevenue = () => {
//       request
//         .get(`statistical/daterange`, {
//           params: {
//             status: status,
//             code: searchValue,
//             fromDate: selectedDates?.fromDate,
//             toDate: selectedDates?.toDate,
//             page: 1,
//             sizePage: 10000, // Số lượng đủ lớn để lấy tất cả đơn hàng
//           }
//         }).then((response) => {
//           setTotalRevenue(calculateTotalRevenue(response.data));
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     };

//   const handleDateChange = (dates) => {
//         if (dates !== null) {
//           setSelectedDates({
//             fromDate: dates[0].format('YYYY-MM-DD'),
//             toDate: dates[1].format('YYYY-MM-DD')
//           })
//         } else {
//           setSelectedDates(null);
//         }
//         console.log(selectedDates);
//       }

//   useEffect(() => {
//     loadSalesData();
//     loadTotalRevenue();
//   }, [])

//   useEffect(() => {
//     loadSalesData();
//   }, [currentPage, pageSize, searchValue, status, selectedDates]);

//   const columns = [
//     {
//       title: '#',
//       dataIndex: 'index',
//       key: 'index',
//     },
//     {
//       title: 'Mã',
//       dataIndex: 'code',
//       key: 'code',
//     },
//     // {
//     //   title: 'Người tạo',
//     //   dataIndex: 'employee',
//     //   key: 'employee',
//     // },
//     {
//       title: 'Khách hàng',
//       dataIndex: 'customer',
//       key: 'customer',
//       render: (x, record) => x === null ? "Khách hàng lẻ" : x
//     },
//     {
//       title: 'SDT',
//       dataIndex: 'phoneNumber',
//       key: 'phoneNumber',
//       render: (x) => x === null ? '-' : x
//     },
//     {
//       title: 'Tổng tiền',
//       dataIndex: 'totalMoney',
//       key: 'totalMoney',
//       render: (x, record) => <span className="fw-semibold text-danger"><FormatCurrency value={x === null ? 0 : x + record.moneyShip} /></span>
//     },
//     {
//       title: 'Loại đơn hàng',
//       dataIndex: 'type',
//       key: 'type',
//       render: (x) => (
//         <Tag
//           style={{ width: '100px' }}
//           className="text-center"
//           color={x === 0 ? "#87d068" : x === 1 ? "#108ee9" : "#2db7f5"}
//           icon={x === 0 ? <i class="fas fa-shop me-1"></i> : x === 1 ? <i class="fas fa-truck-fast me-1"></i> : <i class="fas fa-plus me-1"></i>}
//         >
//           {x === 0 ? "Tại quầy" : x === 1 ? "Giao hàng" : "Đơn mới"}
//         </Tag>
//       )
//     },
//     {
//       title: 'Ngày tạo',
//       dataIndex: 'createAt',
//       key: 'createAt',
//       render: (x) => <FormatDate date={x} />
//     },
//   ];

//   return (
//     <>
//       <div className="d-flex">
//         <div className="flex-grow-1">
//           <h6>Doanh số theo ngày</h6>
//         </div>
//         <div className="">
//           <Input className="me-2" onChange={(e) => setSearchValue(e.target.value)} placeholder="Tìm kiếm theo mã hóa đơn, tên khách hàng, số điện thoại..." style={{ width: "440px" }} />
//           <RangePicker onChange={(dates) => handleDateChange(dates)} />
//         </div>
//       </div>
//       <Table dataSource={listOrder} columns={columns}
//         pagination={{
//           showSizeChanger: true,
//           current: currentPage,
//           pageSize: pageSize,
//           pageSizeOptions: [5, 10, 20, 50, 100],
//           showQuickJumper: true,
//           total: totalPages * pageSize,
//           onChange: (page, pageSize) => {
//             setCurrentPage(page);
//             setPageSize(pageSize);
//           },
//         }} />
//          <div className="mt-4">
//         <h6>Tổng doanh thu: <FormatCurrency value={totalRevenue} /></h6>
//       </div>
//       </>
//   );
// };

// export default DailySales;
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Table, Tag } from "antd";
import * as request from "~/utils/httpRequest";
import FormatCurrency from "~/utils/FormatCurrency";
import FormatDate from "~/utils/FormatDate";

const { RangePicker } = DatePicker;

const DailySales = () => {
  const [listOrder, setListOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [selectedDates, setSelectedDates] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const calculateTotalRevenue = (orders) =>
    orders.reduce((total, order) => total + (order.totalMoney || 0) + (order.moneyShip || 0), 0);

  const loadSalesData = () => {
    request
      .get("statistical/daterange", {
        params: {
          page: currentPage,
          sizePage: pageSize,
          code: searchValue,
          fromDate: selectedDates?.fromDate,
          toDate: selectedDates?.toDate,
        },
      })
      .then((response) => {
        setListOrder(response.data);
        setTotalPages(response.totalPages);
        setTotalRevenue(calculateTotalRevenue(response.data));
      })
      .catch((e) => console.log(e));
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setSelectedDates({
        fromDate: dates[0].format("YYYY-MM-DD"),
        toDate: dates[1].format("YYYY-MM-DD"),
      });
    } else {
      setSelectedDates(null);
    }
  };

  useEffect(() => {
    loadSalesData();
  }, [currentPage, pageSize, searchValue, selectedDates]);

  const columns = [
    { title: "STT", dataIndex: "index", key: "index", render: (_, __, index) => index + 1 },
    { title: "Mã", dataIndex: "code", key: "code" },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      render: (x) => x || "Khách lẻ",
    },
    { title: "SDT", dataIndex: "phoneNumber", key: "phoneNumber", render: (x) => x || "-" },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (x, record) => (
        <span className="fw-semibold text-danger">
          <FormatCurrency value={x + (record.moneyShip || 0)} />
        </span>
      ),
    },
    {
      title: "Loại đơn",
      dataIndex: "type",
      key: "type",
      render: (x) => (
        <Tag color={x === 0 ? "green" : "blue"}>
          {x === 0 ? "Tại quầy" : "Giao hàng"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (x) => <FormatDate date={x} />,
    },
  ];

  return (
    <>
      <Form layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item>
          <Input
            placeholder="Tìm theo mã, tên, số điện thoại..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 300 }}
          />
        </Form.Item>
        <Form.Item>
          <RangePicker onChange={handleDateChange} />
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={listOrder}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalPages * pageSize,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={4}>Tổng doanh thu</Table.Summary.Cell>
            <Table.Summary.Cell colSpan={3}>
              <span className="fw-bold">
                <FormatCurrency value={totalRevenue} />
              </span>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </>
  );
};

export default DailySales;