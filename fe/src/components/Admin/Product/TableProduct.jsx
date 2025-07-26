



import {
  Button,
  Collapse,
  Empty,
  Input,
  InputNumber,
  Modal,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ImageModal from "./ImageModal";
import "./TableProduct.css";

function TableProduct({ props, handleChange }) {
  const [groupByColor, setGroupByColor] = useState([]);

  // Price formatting function
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "0đ";
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
  };

  const handleImageSelect = (colorName, index, files) => {
    const updatedItems = [...groupByColor[colorName]];
    for (let i = 0; i < updatedItems.length; i++) {
      updatedItems[i] = { ...updatedItems[i], images: files };
    }
    setGroupByColor({
      ...groupByColor,
      [colorName]: updatedItems,
    });
    handleChange(
      Object.values({
        ...groupByColor,
        [colorName]: [...updatedItems],
      }).flat()
    );
    console.log(groupByColor);
  };

  const handleChangeQuantity = (value, colorName, index) => {
    if (value < 1) {
      toast.error("Số lượng phải >= 1!");
    } else {
      const updatedItems = [...groupByColor[colorName]];
      updatedItems[index] = { ...updatedItems[index], quantity: value };
      setGroupByColor({
        ...groupByColor,
        [colorName]: updatedItems,
      });
      handleChange(
        Object.values({
          ...groupByColor,
          [colorName]: [...updatedItems],
        }).flat()
      );
    }
  };

  const handleChangePrice = (event, colorName, index) => {
    const value = parseInt(event.target.value.replace(/[^0-9]/g, "")); // Remove non-numeric characters
    if (isNaN(value) || value < 1) {
      toast.error("Đơn giá không hợp lệ!");
    } else {
      const updatedItems = [...groupByColor[colorName]];
      updatedItems[index] = { ...updatedItems[index], price: value };
      setGroupByColor({
        ...groupByColor,
        [colorName]: updatedItems,
      });
      handleChange(
        Object.values({
          ...groupByColor,
          [colorName]: [...updatedItems],
        }).flat()
      );
    }
  };

  const handleChangeWeight = (event, colorName, index) => {
    const value = parseInt(event.target.value);
    if (value < 1) {
      toast.error("Cân nặng không hợp lệ!");
    } else {
      const updatedItems = [...groupByColor[colorName]];
      updatedItems[index] = { ...updatedItems[index], weight: value };
      setGroupByColor({
        ...groupByColor,
        [colorName]: updatedItems,
      });
      handleChange(
        Object.values({
        ...groupByColor,
        [colorName]: [...updatedItems],
      }).flat()
    );
  }
};

const deleteProductDetail = (colorName, index) => {
  const items = groupByColor[colorName];
  items.splice(index, 1);

  // Cập nhật lại groupByColor sau khi xóa
  setGroupByColor({
    ...groupByColor,
    [colorName]: [...items],
  });

  const allItems = Object.values({
    ...groupByColor,
    [colorName]: [...items],
  }).flat();
  handleChange(allItems);
  toast.success("Xóa thành công!");
};

useEffect(() => {
  const groupedProducts = {};
  props.forEach((option) => {
    const colorName = option.color.name;

    if (!groupedProducts[colorName]) {
      groupedProducts[colorName] = [];
    }

    groupedProducts[colorName].push(option);
  });
  setGroupByColor(groupedProducts);
}, [props]);

return (
  <>
    <Collapse defaultActiveKey={0} className="rounded-0 border-0">
      <Collapse.Panel key={0} className="border-bottom-0">
        <div className="table-responsive">
          <table className="table table-borderless text-nowrap">
            <tbody>
              {Object.entries(groupByColor).map(([key, items], index) => (
                <React.Fragment key={index}>
                  <tr className="fw-semibold">
                    <td className="bg-primary">STT</td>
                    <td className="bg-primary">Sản phẩm</td>
                    <td className="bg-primary">Số lượng</td>
                    <td className="bg-primary">Đơn giá</td>
                    {/* <td className="bg-primary">Cân nặng</td> */}
                    <td className="bg-primary">Xuất xứ</td>
                    <td className="bg-primary">Thương hiệu</td>
                    <td className="bg-primary">Cổ áo</td>
                    <td className="bg-primary">Tay áo</td>
                    <td className="bg-primary">Chất liệu</td>
                    <td className="bg-primary"></td>
                  </tr>

                  {items.map((option, idx) => (
                    <tr key={idx}>
                      <>
                        {option.shoe &&
                        option.shoe !== undefined &&
                        option.shoe !== null ? (
                          <>
                            <td>{idx + 1}</td>
                            <td>
                              {option.shoe === undefined ||
                              option.shoe === null
                                ? "Vui lòng chọn sản phẩm"
                                : option.shoe.name}{" "}
                              [{option.color.name} - {option.size.name}]
                            </td>
                            <td width="100px">
                              <InputNumber
                                className="table-input-number"
                                defaultValue={option.quantity}
                                onChange={(value) =>
                                  handleChangeQuantity(value, key, idx)
                                }
                                min={1}
                              />
                            </td>
                            <td width="150px">
                              <Input
                                className="table-input"
                                value={formatPrice(option.price)} // Display formatted price
                                onChange={(event) =>
                                  handleChangePrice(event, key, idx)
                                }
                                onFocus={(e) =>
                                  e.target.value = option.price
                                } // Show raw number on focus
                                onBlur={(e) =>
                                  e.target.value = formatPrice(option.price)
                                } // Show formatted price on blur
                              />
                            </td>
                            {/* <td width="100px">
                              <Input
                                className="table-input"
                                defaultValue={option.weight}
                                onChange={(value) =>
                                  handleChangeWeight(value, key, idx)
                                }
                              />
                            </td> */}
                            <td>{option.shoe.xuatXu}</td>
                            <td>{option.shoe.thuongHieu}</td>
                            <td>{option.shoe.coAo}</td>
                            <td>{option.shoe.tayAo}</td>
                            <td>{option.shoe.chatLieu}</td>
                            <td>
                              <button
                                className="btn btn-sm"
                                onClick={() => deleteProductDetail(key, idx)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                            {idx === 0 ? (
                              <>
                                <td
                                  className="align-middle"
                                  rowSpan={items.length}
                                ></td>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Collapse.Panel>
    </Collapse>
  </>
);
}

export default TableProduct;