import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  message,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "~/components/Pagination";
import BaseUI from "~/layouts/admin/BaseUI";
import * as request from "~/utils/httpRequest";
import FormatDate from "~/utils/FormatDate";
import { Empty } from "antd";
import { FaHome, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import FormatCurrency from "~/utils/FormatCurrency";
import VoucherSatus from "./VoucherSatus";
import "./Voucher.css";
function Voucher() {
  const { confirm } = Modal;
  const [voucherList, setVoucherList] = useState([]);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const [reloadInterval, setReloadInterval] = useState(null);
  const [selectedOption, setSelectedOption] = useState("voucher");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    loadVoucher();
    // Khởi tạo interval khi component được tạo
    const intervalId = setInterval(() => {
      loadVoucher();
      console.log("test");
    }, 60000);

    // Lưu intervalId vào state để sau này có thể xóa interval
    setReloadInterval(intervalId);

    // Hủy interval khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [searchValue, pageSize, currentPage, statusValue]);

  const loadVoucher = async () => {
    try {
      const response = await request.get("/voucher", {
        params: {
          name: searchValue,
          page: currentPage,
          sizePage: pageSize,
          status: statusValue,
        },
      });
      console.log("Dữ liệu voucher:", response.data); // Kiểm tra định dạng startDate và endDate

      setVoucherList(response.data);
      setTotalPages(response.totalPages);
    } catch (e) {
      console.log(e);
    }
  };
  const showDeleteConfirm = (item) => {
    confirm({
      title: "Xác nhận ",
      content: "Bạn có chắc muốn kết thúc phiếu giảm giá này không?",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        request
        .put(`/voucher/update/end-date/${item.id}`)
        .then((response) => {
          if (response.status === 200) {
            loadVoucher();
            toast.success("Kết thúc thành công!");
       }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data);
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
  };
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    setCurrentPage(pageNumber);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => indexOfFirstItem + index + 1,
    },
    {
      title: "Mã phiếu giảm giá",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên phiếu giảm giá",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn hàng tối thiểu",
      dataIndex: "minBillValue",
      key: "minBillValue",
      render: (x) => <FormatCurrency value={x} />,
    },
    {
      title: "Giá trị giảm tối đa",
      dataIndex: "maxBillValue",
      key: "maxBillValue",
      render: (x) => <FormatCurrency value={x} />,
    },
    {
      title: "Giảm",
      dataIndex: "percentReduce",
      key: "percentReduce",
      render: (x) => `${x}%`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (x) => (
        <span
          className="badge text-while p-2"
          style={{ backgroundColor: "#28a745" }}
        >
          <FormatDate date={x} />
        </span>
      ),
    },

    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (x) => (
        <span
          className="badge text-while p-2"
          style={{ backgroundColor: "#dc3545" }}
        >
          <FormatDate date={x} />
        </span>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (x) => <VoucherSatus status={x} />,
    },

    {
      title: "Thao tác",
      dataIndex: "id",
      key: "action",
      render: (x, item) => (
        <>
           <Tooltip placement="top" title="Chỉnh sửa">
          <Link to={`/admin/voucher/${x}`} className="btn btn-sm text-primary">
            <i className="fas fa-edit"></i>
          </Link>
          </Tooltip>
          <Tooltip placement="top" title="Kết thúc">
          <Button
              type="text"
              icon={<i class="fa-solid fa-calendar-xmark text-danger"></i>}
              onClick={() => showDeleteConfirm(item)}    
          /></Tooltip>
        </>
      )
    },
  ];
  const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .brand-container {
    padding: 24px;
    background: #f8f9fe;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .brand-title {
    color: #2c3e50;
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 24px;
    letter-spacing: 0.5px;
  }

  
`;

  // Thêm style vào document
  const styleSheet = document.createElement("style");
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
  return (
    <BaseUI>
    <div className="brand-container">
      <h6 className="fw-semibold brand-title">Danh sách phiếu giảm giá</h6>
      <div className="card p-3 mb-3">
        <h6 className="fw-semibold">Bộ lọc</h6>

        <Row gutter={12}>
          <Col span={16}>
            <label className="mb-1">Nhập mã, tên phiếu giảm giá </label>
            <Input
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Tìm kiếm phiếu giảm giá theo tên, mã ..."
              //
            />
          </Col>
          <Col span={8}>
            <div className="mb-1">Trạng thái</div>
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={(value) => {
                setStatusValue(value);
                setCurrentPage(1);
              }}
            >
              <Select.Option value="">Tất cả</Select.Option>
              <Select.Option value={0}>Sắp diễn ra</Select.Option>
              <Select.Option value={1}>Đang diễn ra</Select.Option>
              <Select.Option value={2}>Đã kết thúc</Select.Option>
            </Select>
          </Col>
          {/* <Col span={2}>
            <div className="mb-1">Số bản ghi</div>
            <Select
              defaultValue={5}
              onChange={(value) => setPageSize(value)}
              options={[{ value: 5 }, { value: 10 }, { value: 15 }]}
            />
          </Col> */}
        </Row>
      </div>
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-semibold">Bảng phiếu giảm giá</h6>
          <Link to={"/admin/voucher/add"}>
            <Button
              type="primary"
              className="bg-warning"
              style={{ textAlign: "center" }}
            >
              <i className="fas fa-plus-circle me-1"></i>Thêm phiếu giảm giá
            </Button>
          </Link>
        </div>

        <Table
          dataSource={voucherList}
          columns={columns}
          className="mt-3"
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
          }}
        />
      </div>
      </div>
    </BaseUI>
  );
}

export default Voucher;


