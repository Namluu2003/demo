import { Breadcrumb, Button, Col, Divider, Form, Input, Modal, Radio, Row } from "antd";
import React, { useState } from "react";
import { FaHome, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GHNInfo from "~/components/GhnInfo";
import Loading from "~/components/Loading/Loading";
import QrCode from "~/components/QrCode";
import BaseUI from "~/layouts/admin/BaseUI";
import * as request from "~/utils/httpRequest";

function AddStaff() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataAddress, setDataAddress] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const handleImageSelect = (event) => {
    try {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatar(file);
      setPreviewUrl(imageUrl);
    } catch (e) {
      setPreviewUrl("");
    }
  };

  const handleQrSuccess = (value) => {
    const withoutName = value.substring(14, value.length);
    const splits = withoutName.split("|");
    const birthday = splits[1];
    if (value.substring(0, 12).length === 12) {
      toast.success(`Đã tìm thấy ${splits[0].toString()}!`);
      form.setFieldsValue({
        gender: splits[2],
        cccd: value.substring(0, 12),
        name: splits[0],
        birthday: `${birthday.substring(4)}-${birthday.substring(2, 4)}-${birthday.substring(0, 2)}`,
        specificAddress: splits[3],
      });
    }
  };

  const handleAddStaff = (data) => {
    if (dataAddress == null) {
      toast.error("Vui lòng chọn địa chỉ!");
    } else {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("address.name", data.name);
      formData.append("address.phoneNumber", data.phoneNumber);
      formData.append("address.specificAddress", data.specificAddress);
      formData.append("address.ward", dataAddress.ward);
      formData.append("address.district", dataAddress.district);
      formData.append("address.province", dataAddress.province);
      formData.append("address.defaultAddress", true);

      formData.append("cccd", data.cccd);
      formData.append("username", data.username);
      formData.append("name", data.name);
      formData.append("gender", data.gender);
      formData.append("birthday", data.birthday);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      Modal.confirm({
        title: "Xác nhận",
        maskClosable: true,
        content: "Xác nhận thêm nhân viên ?",
        okText: "Ok",
        cancelText: "Cancel",
        onOk: () => {
          request
          .post("/staff", formData, { headers: { "Content-Type": "multipart/form-data", }, })
          .then((response) => {
            console.log(response);
            setLoading(true);
            if (response.data.success) {
              setLoading(false);
              toast.success("Thêm thành công!");
              navigate("/admin/staff");
            }
          }).catch((e) => {
            console.log(e);
            toast.error(e.response.data);
          });
        },
      });
    }
  };

  if (loading) {
    return (
      <BaseUI>
        <Loading />
      </BaseUI>
    );
  }

  return (
    <BaseUI>
      {/* <div className="d-flex mb-3">
        <div className="flex-grow-1">
          <Breadcrumb className="mb-2"
            items={[{ href: "/", title: <FaHome /> }, { href: "/admin/staff", title: "Danh sách nhân viên" }, { title: "Thêm nhân viên" },]}
          />
        </div>
        
      </div> */}
            <h6 className="fw-semibold brand-title" >Thêm nhân viên</h6>

      <Form onFinish={handleAddStaff} layout="vertical" form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <h6>Thông tin nhân viên</h6>
            <Divider />
            {previewUrl !== null ? (
              <div className="text-center">
                <img src={previewUrl} alt="Preview" style={{ width: "162px", height: "162px" }} className="mt-2 border border-primary shadow-lg bg-body-tertiary rounded-circle object-fit-contain" />
                <Button className="position-absolute border-0" onClick={() => { setPreviewUrl(null); setAvatar(null); }}><FaTrash className="text-danger" /></Button>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <div className="position-relative rounded-circle border border-primary mt-2 d-flex align-items-center justify-content-center" style={{ width: "162px", height: "162px" }}>
                  <Input type="file" accept="image/*" onChange={handleImageSelect} className="position-absolute opacity-0 py-5" />
                  <div className="text-center text-secondary">
                    <i className="fas fa-plus"></i> <br />
                    <span>Vui lòng chọn ảnh</span>
                  </div>
                </div>
              </div>
            )}
            
          </Col>
          <Col span={16}>
            
            <Divider />
            <Form.Item label={"Username"} name={"username"} rules={[{ required: true, message: "Username không được để trống!" },]}>
              <Input placeholder="Nhập username..." />
            </Form.Item>
            <Form.Item label={"Tên nhân viên"} name={"name"} rules={[{ required: true, message: "Tên không được để trống!" },{  pattern: /^[^\d!@#$%^&*()_+={}\\:;"'<>,.?/`~|-]+$/, message: "Tên phải là chữ"}]}>
              <Input placeholder="Nhập tên nhân viên..." />
            </Form.Item>
            <Row gutter={10}>
              <Col span={12}>
              <Form.Item label={"CCCD/CMT"} name={"cccd"} rules={[{ required: true, message: "cccd được để trống!", },{ pattern: '^([0-9]{9}|[0-9]{12})$', message: "Mã định danh phải có 9 hoặc 12 kí tự!" }]}>
                  <Input placeholder="Nhập cccd hoặc cmt" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={"Giới tính"} name={"gender"} rules={[{ required: true, message: "Giới tính không được để trống!", },]}>
                  <Radio.Group>
                    <Radio value={"Nam"}>Nam</Radio>
                    <Radio value={"Nữ"}>Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
  <Form.Item
    label="Ngày sinh"
    name="birthday"
    rules={[
      { required: true, message: "Ngày sinh không được để trống!" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();

          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();

          const is18 =
            age > 18 || (age === 18 && m >= 0 && today.getDate() >= birthDate.getDate());

          return is18
            ? Promise.resolve()
            : Promise.reject("Người dùng phải đủ 18 tuổi trở lên!");
        },
      }),
    ]}
  >
    <Input type="date" />
  </Form.Item>
</Col>

              <Col span={12}>
                <Form.Item label={"Email"} name={"email"} rules={[{ required: true, message: "Email không được để trống!" },]} >
                  <Input placeholder="Nhập email ..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={"Số điện thoại"} name={"phoneNumber"} rules={[{ required: true, message: "Số điện thoại không được để trống!", },{ pattern: '^0[0-9]{9}$', message: "SDT không đúng định dạng!" }]} >
                  <Input placeholder="Nhập số điện thoại ..." />
                </Form.Item>
              </Col>
              
              <GHNInfo dataAddress={setDataAddress} />
            </Row>
           
                <Form.Item label={"Địa chỉ cụ thể"} name={"specificAddress"} rules={[{ required: true, message: "Địa chỉ cụ thể không được để trống!", },]} >
                  <Input placeholder="Nhập địa chỉ cụ thể ..." />
                </Form.Item>
             
            <Form.Item className="mt-3 float-end">
              <Button type="primary" htmlType="submit" className="bg-primary">
                <i className="fas fa-plus me-2"></i> Thêm nhân viên
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BaseUI>
  );
}

export default AddStaff;
