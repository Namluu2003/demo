import { Button, Modal } from 'antd'
import React from 'react'
import { useState } from 'react';
import { FaBug, FaEdit, FaRegCalendar, FaRegCalendarCheck, FaRegFileAlt, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { FaTruckFast } from "react-icons/fa6";
import { GiConfirmed } from 'react-icons/gi';
import { MdOutlineCancelPresentation, MdOutlineChangeCircle, MdOutlineConfirmationNumber, MdPayment } from 'react-icons/md';
import FormatDate from '~/utils/FormatDate';

function BillHistory({ props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type='primary' onClick={showModal} danger>
        Chi tiết
      </Button>
      <Modal title="Lịch sử chi tiết" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="" width={1000}>
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <table class="table align-middle table-borderless">
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
              <tr>
                <th scope="col">Trạng thái</th>
                <th scope="col">Thời gian</th>
                <th scope="col">Nhân viên xác nhận</th>
                <th scope="col">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {props.map((item, index) => (
                <tr className='border-bottom'>
                  <tr>
                    <span style={{
                      fontSize: "36px", color: item.status === 1 ? '#007bff' :
                      item.status === 2 ? "#007bff" :
                      item.status === 5 ? "#007bff" :
                      item.status === 10 ? "#007bff" :
                        item.status === 3 ? "#007bff" :
                          item.status === 4 ? "#007bff" :
                            item.status === 500 ? "#007bff" :
                              item.status === 7 ? "#007bff" :
                              item.status === 6 ? "#007bff" :
                                item.status === 9 ? "#007bff" :
                                  item.status === 8 ? "#7925C7" : '#2DC255'
                    }} className='me-2'>
                      {item.status === 0 ? <FaRegFileAlt />
                        : item.status === 1 ? <FaRegFileAlt />
                          : item.status === 2 ? <MdOutlineConfirmationNumber />
                            : item.status === 3 ? <MdPayment />
                              : item.status === 4 ? <FaTruck />
                                : item.status === 5 ? <FaTruckFast />
                                  : item.status === 6 ? <GiConfirmed />
                                    : item.status === 7 ? <MdOutlineCancelPresentation />
                                      : item.status === 8 ? <MdOutlineChangeCircle />
                                      : item.status === 9 ? <GiConfirmed />
                                       : item.status === 10 ? <FaCheckCircle />
                                        : item.status === 500 ? <FaEdit /> : ""}
                    </span>
                    <span className='fw-semibold'>
                      {item.status === 1 ? "Tạo đơn hàng"
                        : item.status === 0 ? "Chờ thanh toán"
                          : item.status === 2 ? "Chờ xác nhận"
                            : item.status === 3 ? "Đã thanh toán"
                              : item.status === 4 ? "Chờ giao hàng"
                                : item.status === 5 ? "Đang giao hàng"
                                  : item.status === 6 ? "Hoàn thành"
                                    : item.status === 7 ? "Hủy"
                                      : item.status === 8 ? "Trả hàng"
                                      : item.status === 9 ? "Đã xác nhận"
                                      : item.status === 10 ? "Đã giao hàng"
                                        : item.status === 500 ? "Chỉnh sửa đơn hàng" : ""}
                    </span>
                  </tr>
                  <td><FormatDate date={item.createAt} /></td>
                  <td>{item.createBy}</td>
                  <td>{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  )
}

export default BillHistory