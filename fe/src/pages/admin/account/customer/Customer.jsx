import { Button, Col, Input, Radio, Row, Table, } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BaseUI from "~/layouts/admin/BaseUI";
import FormatDate from "~/utils/FormatDate";
import * as request from "~/utils/httpRequest";

function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchValue, setSearchValue] = useState("");
  const [customerStatus, setCustomerStatus] = useState(null);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    request.get("/customer", {
      params: {
        name: searchValue,
        page: currentPage,
        sizePage: pageSize,
        status: customerStatus,
      },
    }).then(response => {
      setCustomerList(response.data);
      setTotalPages(response.totalPages);
    }).catch(e => {
      console.log(e);
    })
  }, [searchValue, pageSize, customerStatus, currentPage]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      className: "text-center",
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (x) => <FormatDate date={x} />
    },
    {
      title: 'Ngày sinh', // Thêm cột Ngày sinh
      dataIndex: 'birthday',
      key: 'birthday',
      render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : ''
    },
    
    {
      title: 'Giới tính', // Thêm cột Giới tính
      dataIndex: 'gender',
      key: 'gender',
      render: (x) => (x ? x : "Chưa xác định") // Hiển thị "Chưa xác định" nếu không có dữ liệu
    },
    {
      title: 'Trạng thái',
      dataIndex: 'deleted',
      key: 'deleted',
      render: (x) => (
        <span className={x ? "fw-semibold text-danger" : "fw-semibold text-success"}>
          {x ? "Không hoạt động" : "Đang hoạt động"}
        </span>
      )
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'action',
      render: (x) => (
        <Link to={`/admin/customer/${x}`} className="btn btn-sm text-primary">
          <i className="fas fa-edit"></i>
        </Link>
      )
    },
  ];

  return (
    <BaseUI>
      <div className="brand-container">
      <h6 className="fw-semibold brand-title" >Danh sách khách hàng</h6>
      <div className="card p-3 mb-3">
        <h6 className="fw-semibold">Bộ lọc</h6>
      <Row gutter={10}>
        <Col span={16}>
          <label className="mb-1">Nhập tên, email, số điện thoại</label>
          <Input
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Tìm kiếm khách hàng theo tên,..."
          />
        </Col>
        {/* <Col span={10} className="text-nowrap">
          <div className="mb-1">Trạng thái</div>
          <Radio.Group
            defaultValue={null} className="align-middle"
            onChange={(event) => setCustomerStatus(event.target.value)}
          >
            <Radio value={null}>Tất cả</Radio>
            <Radio value={false}>Kích hoạt</Radio>
            <Radio value={true}>Hủy kích hoạt</Radio>
          </Radio.Group>
        </Col> */}
        
      </Row>
      </div> 
      <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-semibold">Bảng khách hàng</h6>
                <Link to={"/admin/customer/add"}>
            <Button type="primary" className="bg-primary">
              <i className="fas fa-plus-circle me-1"></i>Thêm khách hàng
            </Button>
          </Link>
              </div>    
      <Table dataSource={customerList} columns={columns} className="mt-3"
        pagination={{
          // showSizeChanger: true,
          current: currentPage,
          pageSize: pageSize,
          // pageSizeOptions: [5, 10, 20, 50, 100],
          // showQuickJumper: true,
          total: totalPages * pageSize,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }} />
         </div>
    </BaseUI>
  );
}

export default Customer;
