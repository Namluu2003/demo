



// // import { Button, Col, Form, Input, InputNumber, Modal, Row, Table, Tag } from "antd";
// // import TextArea from "antd/es/input/TextArea";
// // import Title from "antd/es/typography/Title";
// // import React, { useEffect, useState } from "react";
// // import { toast } from "react-toastify";
// // import FormatCurrency from "~/utils/FormatCurrency";
// // import FormatDate from "~/utils/FormatDate";
// // import formatCurrency from "~/utils/format"; // Import the formatCurrency utility
// // import * as request from "~/utils/httpRequest";

// // function PaymentMethod({ bill, onSuccess, onOpenPaymentModal, isModalOpen, setIsModalOpen }) {
// //   const [paymentMethod, setPaymentMethod] = useState([]);
// //   const [method, setMethod] = useState(0);
// //   const [totalPayment, setTotalPayment] = useState(0);
// //   const [totalPaymentRefund, setTotalPaymentRefund] = useState(0);
// //   const [extraMoney, setExtraMoney] = useState(null);
// //   const [totalBillDetail, setTotalBillDetail] = useState(0);
// //   const [totalBillDetailRefund, setTotalBillDetailRefund] = useState(0);
// //   const [isRefund, setIsRefund] = useState(false);
// //   const [form] = Form.useForm();

// //   useEffect(() => {
// //     loadPaymentMethod();
// //   }, [bill]);

// //   const loadPaymentMethod = () => {
// //     request
// //       .get(`/payment-method/${bill.id}`)
// //       .then((response) => {
// //         setPaymentMethod(response);
// //         const calculateTotalPayment = response
// //           .filter((item) => item.type === true)
// //           .reduce((total, item) => total + item.totalMoney, 0);
// //         const calculateTotalPaymentRefund = response
// //           .filter((item) => item.type === false)
// //           .reduce((total, item) => total + item.totalMoney, 0);
// //         setTotalPaymentRefund(calculateTotalPaymentRefund);
// //         setTotalPayment(calculateTotalPayment);
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });

// //     request
// //       .get(`/bill-detail`, {
// //         params: { bill: bill.id, page: 1, sizePage: 1_000_000 },
// //       })
// //       .then((response) => {
// //         const calculatedTotalMoney = response.data
// //           .filter((item) => item.status === false)
// //           .reduce(
// //             (total, item) =>
// //               total +
// //               item.quantity * (item.discountPercent !== null ? item.discountValue : item.price),
// //             0
// //           );
// //         const calculatedTotalMoneyRefund = response.data
// //           .filter((item) => item.status === true)
// //           .reduce(
// //             (total, item) =>
// //               total +
// //               item.quantity * (item.discountPercent !== null ? item.discountValue : item.price),
// //             0
// //           );
// //         setTotalBillDetailRefund(calculatedTotalMoneyRefund);
// //         setTotalBillDetail(calculatedTotalMoney);
// //       })
// //       .catch((e) => {
// //         console.log(e);
// //       });

// //     form.setFieldsValue({
// //       totalMoney:
// //         totalBillDetailRefund !== totalPaymentRefund
// //           ? totalBillDetailRefund - totalPaymentRefund - bill.moneyReduce
// //           : bill.totalMoney + bill.moneyShip - totalPayment,
// //     });
// //   };

// //   const handleCreatePaymentMethod = (data) => {
// //     if (method === 1) {
// //       data.totalMoney = bill.totalMoney + bill.moneyShip - totalPayment;
// //     }
// //     data.type = !isRefund;
// //     data.method = method;
// //     data.bill = bill.id;
// //     request
// //       .post(`/payment-method`, data)
// //       .then((response) => {
// //         loadPaymentMethod();
// //         onSuccess(); // Notify parent to reload data
// //         toast.success(`Đã thanh toán ${formatCurrency(data.totalMoney)}`); // Use formatCurrency instead of FormatCurrency
// //         setIsModalOpen(false);
// //         setIsRefund(false);
// //         form.resetFields();
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //         toast.error(error.response.data);
// //       });
// //   };

// //   const columns = [
// //     {
// //       title: "STT",
// //       dataIndex: "index",
// //       key: "index",
// //     },
// //     {
// //       title: "Số tiền",
// //       dataIndex: "totalMoney",
// //       key: "totalMoney",
// //       render: (x) => <FormatCurrency value={x} />,
// //     },
// //     {
// //       title: "Thời gian",
// //       dataIndex: "createAt",
// //       key: "createAt",
// //       render: (x) => <FormatDate date={x} />,
// //     },
// //     {
// //       title: "Mã giao dịch",
// //       dataIndex: "tradingCode",
// //       key: "tradingCode",
// //       render: (x) => (x === null ? "---" : x),
// //     },
// //     {
// //       title: "Loại giao dịch",
// //       dataIndex: "type",
// //       key: "type",
// //       render: (x) => (
// //         <Tag
// //           color={x ? "green" : "red"}
// //           style={{ width: "100px" }}
// //           className="text-center"
// //         >
// //           {x ? "Thanh toán" : "Hoàn tiền"}
// //         </Tag>
// //       ),
// //     },
// //     {
// //       title: "Nhân viên xác nhận",
// //       dataIndex: "createBy",
// //       key: "createBy",
// //     },
// //     {
// //       title: "Ghi chú",
// //       dataIndex: "note",
// //       key: "note",
// //     },
// //   ];

// //   return (
// //     <>
// //       <div className="mt-3">
// //         <div className="d-flex align-items-center">
// //           <Title level={5} className="text-danger text-uppercase p-0 m-0 flex-grow-1 p-2">
// //             Lịch sử thanh toán
// //           </Title>
// //           <div className="p-2">
// //             {bill.status === 7 &&
// //               totalPayment < bill.totalMoney + bill?.moneyShip && (
// //                 <Button
// //                   type="primary"
// //                   className="text-dark bg-blue"
// //                   onClick={() => {
// //                     setIsModalOpen(true);
// //                     loadPaymentMethod();
// //                     onOpenPaymentModal(); // Notify parent
// //                   }}
// //                 >
// //                   Xác nhận thanh toán
// //                 </Button>
// //               )}
            
// //           </div>
// //         </div>

// //         <Modal
// //           title={`Xác nhận ${isRefund ? "hoàn tiền" : "thanh toán"}`}
// //           open={isModalOpen}
// //           onOk={() => {
// //             setIsModalOpen(false);
// //             setIsRefund(false);
// //           }}
// //           onCancel={() => {
// //             setIsModalOpen(false);
// //             setIsRefund(false);
// //           }}
// //           footer={[
// //             <Button
// //               key="cancel"
// //               onClick={() => {
// //                 setIsModalOpen(false);
// //                 setIsRefund(false);
// //               }}
// //             >
// //               Hủy
// //             </Button>,
// //             <Button key="submit" type="primary" onClick={() => form.submit()}>
// //               Thanh toán
// //             </Button>,
// //           ]}
// //         >
// //           <Form
// //             layout="vertical"
// //             form={form}
// //             onFinish={handleCreatePaymentMethod}
// //           >
// //             {method === 0 ? (
// //               <Form.Item
// //                 label={`Tiền ${isRefund ? "trả khách" : "khách đưa"}`}
// //                 name="totalMoney"
// //                 rules={[
// //                   {
// //                     required: true,
// //                     message: `Tiền ${isRefund ? "trả khách" : "khách đưa"} không được để trống!`,
// //                   },
// //                 ]}
// //               >
// //                 <InputNumber
// //                   className="w-100 mb-2"
// //                   formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
// //                   suffix="VNĐ"
// //                   placeholder="Nhập tiền khách đưa..."
// //                   onChange={(e) => {
// //                     setExtraMoney(e - (bill.totalMoney + bill.moneyShip - totalPayment));
// //                   }}
// //                 />
// //               </Form.Item>
// //             ) : (
// //               <Form.Item
// //                 label="Mã giao dịch"
// //                 name="tradingCode"
// //                 rules={[
// //                   { required: true, message: "Mã giao dịch không được để trống!" },
// //                 ]}
// //               >
// //                 <Input />
// //               </Form.Item>
// //             )}
// //             <Form.Item
// //               label="Ghi chú"
// //               name="note"
// //               rules={[{ required: true, message: "Ghi chú không được để trống!" }]}
// //             >
// //               <TextArea />
// //             </Form.Item>
// //             {!isRefund && (
// //               <Row gutter={10} className="mt-3">
// //                 <Col xl={12} onClick={() => setMethod(0)}>
// //                   <div
// //                     className={`py-2 border border-2 rounded-2 d-flex align-items-center justify-content-center ${
// //                       method === 1
// //                         ? `text-secondary border-secondary`
// //                         : "border-primary text-primary"
// //                     }`}
// //                   >
// //                     <span className="ms-2 fw-semibold text-dark">Tiền mặt</span>
// //                   </div>
// //                 </Col>
// //                 <Col xl={12} onClick={() => setMethod(1)}>
// //                   <div
// //                     className={`py-2 border border-2 rounded-2 d-flex align-items-center justify-content-center ${
// //                       method === 0
// //                         ? `text-secondary border-secondary`
// //                         : "border-primary text-primary"
// //                     }`}
// //                   >
// //                     <span className="ms-2 fw-semibold text-dark">Chuyển khoản</span>
// //                   </div>
// //                 </Col>
// //               </Row>
// //             )}
// //           </Form>
// //           {isRefund ? (
// //             <>
// //               Cần phải trả lại khách:{" "}
// //               <span className="float-end fw-semibold text-danger">
// //                 <FormatCurrency
// //                   value={totalBillDetailRefund - totalPaymentRefund - bill.moneyReduce}
// //                 />
// //               </span>
// //             </>
// //           ) : (
// //             <div className="mt-3 fw-semibold">
// //               Số tiền cần thanh toán:{" "}
// //               <span className="float-end fw-semibold text-danger">
// //                 <FormatCurrency
// //                   value={bill.totalMoney + bill.moneyShip - totalPayment}
// //                 />
// //               </span>
// //               <br />
// //               Tiền thừa trả khách:{" "}
// //               <span className="float-end text-success">
// //                 <FormatCurrency value={extraMoney < 0 ? 0 : extraMoney} />
// //               </span>
// //             </div>
// //           )}
// //         </Modal>

// //         <Table columns={columns} pagination={false} dataSource={paymentMethod} />
// //       </div>
// //     </>
// //   );
// // }

// // export default PaymentMethod;


// import { Button, Col, Form, Input, InputNumber, Modal, Row, Table, Tag } from "antd";
// import TextArea from "antd/es/input/TextArea";
// import Title from "antd/es/typography/Title";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import FormatCurrency from "~/utils/FormatCurrency";
// import FormatDate from "~/utils/FormatDate";
// import * as request from "~/utils/httpRequest";

// function PaymentMethod({ bill, onSuccess, onOpenPaymentModal, isModalOpen, setIsModalOpen, paymentForm, onPaymentSubmit, setPaymentMethod, onRefund }) {
//   const [paymentMethodData, setPaymentMethodData] = useState([]);
//   const [method, setMethod] = useState(0);
//   const [totalPayment, setTotalPayment] = useState(0);
//   const [totalPaymentRefund, setTotalPaymentRefund] = useState(0);
//   const [extraMoney, setExtraMoney] = useState(null);
//   const [totalBillDetail, setTotalBillDetail] = useState(0);
//   const [totalBillDetailRefund, setTotalBillDetailRefund] = useState(0);

//   useEffect(() => {
//     loadPaymentMethod();
//   }, [bill]);

//   const loadPaymentMethod = () => {
//     request
//       .get(`/payment-method/${bill.id}`)
//       .then((response) => {
//         setPaymentMethodData(response);
//         const calculateTotalPayment = response
//           .filter((item) => item.type === true)
//           .reduce((total, item) => total + item.totalMoney, 0);
//         const calculateTotalPaymentRefund = response
//           .filter((item) => item.type === false)
//           .reduce((total, item) => total + item.totalMoney, 0);
//         setTotalPaymentRefund(calculateTotalPaymentRefund);
//         setTotalPayment(calculateTotalPayment);
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//     request
//       .get(`/bill-detail`, {
//         params: { bill: bill.id, page: 1, sizePage: 1_000_000 },
//       })
//       .then((response) => {
//         const calculatedTotalMoney = response.data
//           .filter((item) => item.status === false)
//           .reduce(
//             (total, item) =>
//               total +
//               item.quantity * (item.discountPercent !== null ? item.discountValue : item.price),
//             0
//           );
//         const calculatedTotalMoneyRefund = response.data
//           .filter((item) => item.status === true)
//           .reduce(
//             (total, item) =>
//               total +
//               item.quantity * (item.discountPercent !== null ? item.discountValue : item.price),
//             0
//           );
//         setTotalBillDetailRefund(calculatedTotalMoneyRefund);
//         setTotalBillDetail(calculatedTotalMoney);
//       })
//       .catch((e) => {
//         console.log(e);
//       });

//     paymentForm.setFieldsValue({
//       totalMoney: paymentForm.getFieldValue("isRefund") ? (bill.totalMoney || 0) : (bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment,
//     });
//   };

//   const handleCreatePaymentMethod = (data) => {
//     const isRefund = paymentForm.getFieldValue("isRefund");
//     if (method === 1 && !isRefund) {
//       data.totalMoney = (bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment;
//     } else if (isRefund) {
//       data.totalMoney = bill.totalMoney || 0; // Số tiền hoàn bằng tổng tiền hàng
//     }
//     data.type = !isRefund; // type = false for refund, true for payment
//     data.method = method;
//     data.bill = bill.id;
//     request
//       .post(`/payment-method`, data)
//       .then((response) => {
//         loadPaymentMethod();
//         onSuccess();
//         toast.success(`Đã ${isRefund ? "hoàn tiền" : "thanh toán"} ${data.totalMoney} VNĐ`);
//         if (isRefund) {
//           onRefund(); // Gọi hàm hủy đơn sau khi hoàn tiền thành công
//         }
//         setIsModalOpen(false);
//         paymentForm.resetFields();
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error(error.response.data);
//       });
//   };

//   const columns = [
//     {
//       title: "STT",
//       dataIndex: "index",
//       key: "index",
//     },
//     {
//       title: "Số tiền",
//       dataIndex: "totalMoney",
//       key: "totalMoney",
//       render: (x) => <FormatCurrency value={x} />,
//     },
//     {
//       title: "Thời gian",
//       dataIndex: "createAt",
//       key: "createAt",
//       render: (x) => <FormatDate date={x} />,
//     },
//     {
//       title: "Mã giao dịch",
//       dataIndex: "tradingCode",
//       key: "tradingCode",
//       render: (x) => (x === null ? "---" : x),
//     },
//     {
//       title: "Loại giao dịch",
//       dataIndex: "type",
//       key: "type",
//       render: (x) => (
//         <Tag
//           color={x ? "green" : "red"}
//           style={{ width: "100px" }}
//           className="text-center"
//         >
//           {x ? "Thanh toán" : "Hoàn tiền"}
//         </Tag>
//       ),
//     },
//     {
//       title: "Nhân viên xác nhận",
//       dataIndex: "createBy",
//       key: "createBy",
//     },
//     {
//       title: "Ghi chú",
//       dataIndex: "note",
//       key: "note",
//     },
//   ];

//   return (
//     <>
//       <div className="mt-3">
//         <div className="d-flex align-items-center">
//           <Title level={5} className="text-danger text-uppercase p-0 m-0 flex-grow-1 p-2">
//             Lịch sử thanh toán
//           </Title>
          
          
//                     <div className="p-2">
//              {bill.status === 7 &&
//               totalPayment < bill.totalMoney + bill?.moneyShip && (
//                 <Button
//                   type="primary"
//                   className="text-dark bg-blue"
//                   onClick={() => {
//                     setIsModalOpen(true);
//                     loadPaymentMethod();
//                     onOpenPaymentModal(); // Notify parent
//                   }}
//                 >
//                   Xác nhận thanh toán
//                 </Button>
//               )}
            
//           </div>
//         </div>

//         <Modal
//           title={`Xác nhận ${paymentForm.getFieldValue("isRefund") ? "hoàn tiền" : "thanh toán"}`}
//           open={isModalOpen}
//           onOk={() => {
//             paymentForm.submit();
//           }}
//           onCancel={() => {
//             setIsModalOpen(false);
//             paymentForm.resetFields();
//           }}
//           footer={[
//             <Button
//               key="cancel"
//               onClick={() => {
//                 setIsModalOpen(false);
//                 paymentForm.resetFields();
//               }}
//             >
//               Hủy
//             </Button>,
//             <Button key="submit" type="primary" onClick={() => paymentForm.submit()}>
//               {paymentForm.getFieldValue("isRefund") ? "Hoàn tiền" : "Thanh toán"}
//             </Button>,
//           ]}
//         >
//           <Form
//             layout="vertical"
//             form={paymentForm}
//             onFinish={handleCreatePaymentMethod}
//           >
//             <Form.Item
//               name="isRefund"
//               hidden
//             >
//               <Input type="hidden" />
//             </Form.Item>
//             <Form.Item
//               label={`Tiền ${paymentForm.getFieldValue("isRefund") ? "trả khách" : "khách đưa"}`}
//               name="totalMoney"
//               rules={[
//                 {
//                   required: true,
//                   message: `Tiền ${paymentForm.getFieldValue("isRefund") ? "trả khách" : "khách đưa"} không được để trống!`,
//                 },
//               ]}
//               initialValue={paymentForm.getFieldValue("isRefund") ? (bill.totalMoney || 0) : (bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment}
//             >
//               <InputNumber
//                 className="w-100 mb-2"
//                 formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//                 suffix="VNĐ"
//                 placeholder={`Nhập tiền ${paymentForm.getFieldValue("isRefund") ? "trả khách" : "khách đưa"}...`}
//                 disabled={paymentForm.getFieldValue("isRefund")} // Vô hiệu hóa chỉnh sửa khi hoàn tiền
//                 onChange={(e) => {
//                   if (!paymentForm.getFieldValue("isRefund")) {
//                     setExtraMoney(e - ((bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment));
//                   }
//                 }}
//               />
//             </Form.Item>
//             {method === 1 && (
//               <Form.Item
//                 label="Mã giao dịch"
//                 name="tradingCode"
//                 rules={[
//                   { required: true, message: "Mã giao dịch không được để trống!" },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             )}
//             <Form.Item
//               label="Ghi chú"
//               name="note"
//               rules={[{ required: true, message: "Ghi chú không được để trống!" }]}
//             >
//               <TextArea />
//             </Form.Item>
//             <Row gutter={10} className="mt-3">
//               <Col xl={12} onClick={() => { setMethod(0); setPaymentMethod(0); }}>
//                 <div
//                   className={`py-2 border border-2 rounded-2 d-flex align-items-center justify-content-center ${
//                     method === 1
//                       ? `text-secondary border-secondary`
//                       : "border-primary text-primary"
//                   }`}
//                 >
//                   <span className="ms-2 fw-semibold text-dark">Tiền mặt</span>
//                 </div>
//               </Col>
//               <Col xl={12} onClick={() => { setMethod(1); setPaymentMethod(1); }}>
//                 <div
//                   className={`py-2 border border-2 rounded-2 d-flex align-items-center justify-content-center ${
//                     method === 0
//                       ? `text-secondary border-secondary`
//                       : "border-primary text-primary"
//                   }`}
//                 >
//                   <span className="ms-2 fw-semibold text-dark">Chuyển khoản</span>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//           {paymentForm.getFieldValue("isRefund") ? (
//             <>
//               Cần phải trả lại khách:{" "}
//               <span className="float-end fw-semibold text-danger">
//                 <FormatCurrency value={bill.totalMoney || 0} />
//               </span>
//             </>
//           ) : (
//             <div className="mt-3 fw-semibold">
//               Số tiền cần thanh toán:{" "}
//               <span className="float-end fw-semibold text-danger">
//                 <FormatCurrency
//                   value={(bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment}
//                 />
//               </span>
//               <br />
//               Tiền thừa trả khách:{" "}
//               <span className="float-end text-success">
//                 <FormatCurrency value={extraMoney < 0 ? 0 : extraMoney} />
//               </span>
//             </div>
//           )}
//         </Modal>

//         <Table columns={columns} pagination={false} dataSource={paymentMethodData} />
//       </div>
//     </>
//   );
// }

// export default PaymentMethod;


import { Button, Col, Form, Input, InputNumber, Modal, Row, Table, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormatCurrency from "~/utils/FormatCurrency";
import FormatDate from "~/utils/FormatDate";
import * as request from "~/utils/httpRequest";

function PaymentMethod({ bill, onSuccess, onOpenPaymentModal, isModalOpen, setIsModalOpen, paymentForm, onPaymentSubmit, setPaymentMethod, onRefund }) {
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [method, setMethod] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalPaymentRefund, setTotalPaymentRefund] = useState(0);
  const [extraMoney, setExtraMoney] = useState(null);
  const [totalBillDetail, setTotalBillDetail] = useState(0);
  const [totalBillDetailRefund, setTotalBillDetailRefund] = useState(0);

  useEffect(() => {
    loadPaymentMethod();

    // Đặt giá trị totalMoney dựa trên isRefund khi modal mở
    if (isModalOpen) {
      const isRefund = paymentForm.getFieldValue("isRefund");
      paymentForm.setFieldsValue({
        totalMoney: isRefund ? (bill.totalMoney || 0) : (bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment,
      });
    }
  }, [bill, isModalOpen, paymentForm, totalPayment]);

  const loadPaymentMethod = () => {
    request
      .get(`/payment-method/${bill.id}`)
      .then((response) => {
        setPaymentMethodData(response);
        const calculateTotalPayment = response
          .filter((item) => item.type === true)
          .reduce((total, item) => total + item.totalMoney, 0);
        const calculateTotalPaymentRefund = response
          .filter((item) => item.type === false)
          .reduce((total, item) => total + item.totalMoney, 0);
        setTotalPaymentRefund(calculateTotalPaymentRefund);
        setTotalPayment(calculateTotalPayment);
      })
      .catch((error) => {
        console.error(error);
      });

    request
      .get(`/bill-detail`, {
        params: { bill: bill.id, page: 1, sizePage: 1_000_000 },
      })
      .then((response) => {
        const calculatedTotalMoney = response.data
          .filter((item) => item.status === false)
          .reduce(
            (total, item) =>
              total +
              item.quantity * (item.discountPercent !== null ? item.discountValue : item.price),
            0
          );
        const calculatedTotalMoneyRefund = response.data
          .filter((item) => item.status === true)
          .reduce(
            (total, item) =>
              total +
              item.quantity * (item.discountPercent !== null ? item.discountValue : item.price),
            0
          );
        setTotalBillDetailRefund(calculatedTotalMoneyRefund);
        setTotalBillDetail(calculatedTotalMoney);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCreatePaymentMethod = (data) => {
    const isRefund = paymentForm.getFieldValue("isRefund");
    if (method === 1 && !isRefund) {
      data.totalMoney = (bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment;
    } else if (isRefund) {
      data.totalMoney = bill.totalMoney || 0; // Số tiền hoàn bằng tổng tiền hàng
    }
    data.type = !isRefund; // type = false for refund, true for payment
    data.method = method;
    data.bill = bill.id;
    request
      .post(`/payment-method`, data)
      .then((response) => {
        loadPaymentMethod();
        onSuccess();
        toast.success(`Đã ${isRefund ? "hoàn tiền" : "thanh toán"} ${data.totalMoney} VNĐ`);
        if (isRefund) {
          onRefund(); // Gọi hàm hủy đơn sau khi hoàn tiền thành công
        }
        setIsModalOpen(false);
        paymentForm.resetFields();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Số tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (x) => <FormatCurrency value={x} />,
    },
    {
      title: "Thời gian",
      dataIndex: "createAt",
      key: "createAt",
      render: (x) => <FormatDate date={x} />,
    },
    {
      title: "Mã giao dịch",
      dataIndex: "tradingCode",
      key: "tradingCode",
      render: (x) => (x === null ? "---" : x),
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
      render: (x) => (
        <Tag
          color={x ? "green" : "red"}
          style={{ width: "100px" }}
          className="text-center"
        >
          {x ? "Thanh toán" : "Hoàn tiền"}
        </Tag>
      ),
    },
    {
      title: "Nhân viên xác nhận",
      dataIndex: "createBy",
      key: "createBy",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];

  return (
    <>
      <div className="mt-3">
        <div className="d-flex align-items-center">
          <Title level={5} className="text-danger text-uppercase p-0 m-0 flex-grow-1 p-2">
            Lịch sử thanh toán
          </Title>
          <div className="p-2">
            {bill.status === 7 && (totalPayment < (bill.totalMoney || 0) + (bill.moneyShip || 0)) && (
              <Button
                type="primary"
                className="text-dark bg-blue"
                onClick={() => {
                  setIsModalOpen(true);
                  paymentForm.setFieldsValue({ isRefund: false });
                  loadPaymentMethod();
                  onOpenPaymentModal();
                }}
              >
                Xác nhận thanh toán
              </Button>
            )}
          </div>
        </div>

        <Modal
          title={`Xác nhận ${paymentForm.getFieldValue("isRefund") ? "hoàn tiền" : "thanh toán"}`}
          open={isModalOpen}
          onOk={() => {
            paymentForm.submit();
          }}
          onCancel={() => {
            setIsModalOpen(false);
            paymentForm.resetFields();
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setIsModalOpen(false);
                paymentForm.resetFields();
              }}
            >
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={() => paymentForm.submit()}>
              {paymentForm.getFieldValue("isRefund") ? "Hoàn tiền" : "Thanh toán"}
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            form={paymentForm}
            onFinish={handleCreatePaymentMethod}
          >
            <Form.Item
              name="isRefund"
              hidden
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label={`Tiền ${paymentForm.getFieldValue("isRefund") ? "trả khách" : "khách đưa"}`}
              name="totalMoney"
              rules={[
                {
                  required: true,
                  message: `Tiền ${paymentForm.getFieldValue("isRefund") ? "trả khách" : "khách đưa"} không được để trống!`,
                },
              ]}
            >
              <InputNumber
                className="w-100 mb-2"
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                suffix="VNĐ"
                placeholder={`Nhập tiền ${paymentForm.getFieldValue("isRefund") ? "trả khách" : "khách đưa"}...`}
                disabled={paymentForm.getFieldValue("isRefund")} // Vô hiệu hóa chỉnh sửa khi hoàn tiền
                value={paymentForm.getFieldValue("isRefund") ? (bill.totalMoney || 0) : undefined}
                onChange={(e) => {
                  if (!paymentForm.getFieldValue("isRefund")) {
                    setExtraMoney(e - ((bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment));
                  }
                }}
              />
            </Form.Item>
            {method === 1 && (
              <Form.Item
                label="Mã giao dịch"
                name="tradingCode"
                rules={[
                  { required: true, message: "Mã giao dịch không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item
              label="Ghi chú"
              name="note"
              rules={[{ required: true, message: "Ghi chú không được để trống!" }]}
            >
              <TextArea />
            </Form.Item>
            <Row gutter={10} className="mt-3">
              <Col xl={12} onClick={() => { setMethod(0); setPaymentMethod(0); }}>
                <div
                  className={`py-2 border border-2 rounded-2 d-flex align-items-center justify-content-center ${
                    method === 1
                      ? `text-secondary border-secondary`
                      : "border-primary text-primary"
                  }`}
                >
                  <span className="ms-2 fw-semibold text-dark">Tiền mặt</span>
                </div>
              </Col>
              <Col xl={12} onClick={() => { setMethod(1); setPaymentMethod(1); }}>
                <div
                  className={`py-2 border border-2 rounded-2 d-flex align-items-center justify-content-center ${
                    method === 0
                      ? `text-secondary border-secondary`
                      : "border-primary text-primary"
                  }`}
                >
                  <span className="ms-2 fw-semibold text-dark">Chuyển khoản</span>
                </div>
              </Col>
            </Row>
          </Form>
          {paymentForm.getFieldValue("isRefund") ? (
            <>
              Cần phải trả lại khách:{" "}
              <span className="float-end fw-semibold text-danger">
                <FormatCurrency value={bill.totalMoney || 0} />
              </span>
            </>
          ) : (
            <div className="mt-3 fw-semibold">
              Số tiền cần thanh toán:{" "}
              <span className="float-end fw-semibold text-danger">
                <FormatCurrency
                  value={(bill.totalMoney || 0) + (bill.moneyShip || 0) - totalPayment}
                />
              </span>
              <br />
              Tiền thừa trả khách:{" "}
              <span className="float-end text-success">
                <FormatCurrency value={extraMoney < 0 ? 0 : extraMoney} />
              </span>
            </div>
          )}
        </Modal>

        <Table columns={columns} pagination={false} dataSource={paymentMethodData} />
      </div>
    </>
  );
}

export default PaymentMethod;