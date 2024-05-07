import {
  Button,
  Flex,
  Image,
  InputNumber,
  Row,
  Space,
  Table,
  Typography,
  Modal,
  Popconfirm,
  Affix,
  Checkbox,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux-reducer/auth";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { BsTrash } from "react-icons/bs";
import { setSelectedRowKeys } from "../Redux-reducer/selectedRowKeys";

const columns = [
  {
    title: "Product",
    dataIndex: "title",
  },
  {
    title: "Unit Price",
    dataIndex: "price",
  },
  {
    title: "Quantity",
    dataIndex: "amount",
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const CartScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const auth = useSelector((state) => state.authen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, ...rest } = (auth && auth.currentUser) || {};
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [checkedSelectAll, setCheckedSelectAll] = useState(false);
  const selectedRowKeys = useSelector((state) => state.selectedRowKeys);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (product && product.length === 0) {
      const timer = setTimeout(() => {
        navigate("/products/all");
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [product && product.length]);

  useEffect(() => {
    if (auth && auth.currentUser && Array.isArray(auth.currentUser.product)) {
      const updatedCart = auth.currentUser.product.filter((item) =>
        selectedRowKeys.includes(item.id)
      );
      const totalCost = updatedCart.reduce(
        (total, product) => total + product.price * product.amount,
        0
      );
      setTotalCost(totalCost);
    } else setTotalCost(0);
  }, [selectedRowKeys]);

  const handleRemoveItem = (index) => {
    const updatedCart = [...auth.currentUser.product];
    updatedCart.splice(index, 1);
    const updatedUser = { ...rest, product: updatedCart };
    dispatch(addToCart(updatedUser));
  };

  const handleRemoveSelectedItems = () => {
    const updatedCart = [...auth.currentUser.product];
    const updatedUser = {
      ...rest,
      product: updatedCart.filter((item) => !selectedRowKeys.includes(item.id)),
    };

    dispatch(addToCart(updatedUser));
  };

  const handleRemoveAllItems = () => {
    const updatedUser = { ...rest, product: [] };
    dispatch(addToCart(updatedUser));
  };

  const handleIncreaseAmount = (index) => {
    const updatedCart = JSON.parse(JSON.stringify(auth.currentUser.product));
    updatedCart[index].amount += 1;
    const updatedUser = { ...rest, product: updatedCart };
    dispatch(addToCart(updatedUser));
  };
  const handleDecreaseAmount = (index) => {
    const updatedCart = JSON.parse(JSON.stringify(auth.currentUser.product));
    updatedCart[index].amount -= 1;
    if (updatedCart[index].amount === 0) {
      showDeleteConfirm(index);
    } else {
      const updatedUser = { ...rest, product: updatedCart };
      dispatch(addToCart(updatedUser));
    }
  };

  const handleOnChangeAmount = (index, value) => {
    if (value !== null && value > 0) {
      const updatedCart = JSON.parse(JSON.stringify(auth.currentUser.product));
      updatedCart[index].amount = value;
      const updatedUser = { ...rest, product: updatedCart };
      dispatch(addToCart(updatedUser));
    } else if (value === 0) {
      showDeleteConfirm(index);
    }
  };

  const showDeleteConfirm = (index) => {
    Modal.confirm({
      title: "Delete Item",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to delete this item?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        setDropdownVisible(true);
        handleRemoveItem(index);
      },
      onCancel() {
        setDropdownVisible(true);
      },
    });
  };

  const data =
    auth &&
    auth.currentUser &&
    auth.currentUser.product.map((item, index) => ({
      key: item.id,
      title: (
        <>
          <Space>
            <Image
              preview={false}
              width={100}
              alt="logo"
              src={item.images[0]}
              style={{
                height: "100%",
                borderRadius: "15px",
                objectFit: "cover",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/product-detail?id=${item.id}&name=${item.title}&code=${item.code}&brand=${item.brand}&series=${item.series}&category=${item.category}`
                )
              }
            />
            <Typography.Paragraph
              ellipsis={{ rows: 2, expandable: false }}
              className="fw-medium"
              style={{ maxWidth: "240px", cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/product-detail?id=${item.id}&name=${item.title}&code=${item.code}&brand=${item.brand}&series=${item.series}&category=${item.category}`
                )
              }
            >
              {item.title}
            </Typography.Paragraph>
          </Space>
        </>
      ),
      price: (
        <>
          <Space>
            <Typography.Text
              style={{ textDecoration: "line-through", color: "grey" }}
            >
              {`${parseInt(
                item.price * (Math.random() + 1)
              ).toLocaleString()}đ`}
            </Typography.Text>
            <Typography.Text>
              {`${item.price.toLocaleString()}đ`}
            </Typography.Text>
          </Space>
        </>
      ),
      amount: (
        <>
          <Space size={5}>
            <Button size="small" onClick={() => handleDecreaseAmount(index)}>
              -
            </Button>
            <InputNumber
              size="small"
              changeOnWheel
              value={item.amount}
              controls={false}
              style={{
                width: "35px",
              }}
              onBlur={(event) =>
                handleOnChangeAmount(index, parseInt(event.target.value))
              }
            />
            <Button size="small" onClick={() => handleIncreaseAmount(index)}>
              +
            </Button>
          </Space>
        </>
      ),
      totalPrice: (
        <Typography.Text type="danger">
          {`${(item.price * item.amount).toLocaleString()}đ`}
        </Typography.Text>
      ),
      actions: (
        <>
          <Space size="middle">
            <Popconfirm
              placement="bottom"
              title="Remove the item"
              description="Are you sure to remove this item?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleRemoveItem(index)}
            >
              <Space>
                <BsTrash
                  style={{
                    cursor: "pointer",
                    color: "red",
                  }}
                />
                <Typography.Text style={{ cursor: "pointer" }}>
                  Delete
                </Typography.Text>
              </Space>
            </Popconfirm>
          </Space>
        </>
      ),
    }));

  const PaymentBar = () => (
    <Affix offsetBottom={0} style={{ width: "100%" }}>
      <Flex
        justify="space-between"
        align="flex-end"
        style={{
          padding: "15px",
          backgroundColor: "#e9e7e7",
          borderTop: "1px solid #ddd",
          height: "12vh",
          fontSize: "15px",
          borderRadius: "15px",
        }}
      >
        <Space size="small">
          <Checkbox
            style={{ fontSize: "15px" }}
            onChange={(e) => {
              const { checked } = e.target;
              setCheckedSelectAll(checked);
              const newSelectedRowKeys = checked
                ? data.map((item) => item.key)
                : [];
              dispatch(setSelectedRowKeys(newSelectedRowKeys));
            }}
            checked={checkedSelectAll}
          >
            Select All
          </Checkbox>
          <Popconfirm
            placement="top"
            title="Remove the selected items"
            description="Are you sure to remove the selected items?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              if (!checkedSelectAll) {
                handleRemoveSelectedItems();
              } else handleRemoveAllItems();
            }}
          >
            <Button style={{ fontSize: "15px" }} type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
        <Space size="middle" align="baseline">
          <Space size={5}>
            <div style={{ fontSize: "15px" }}>Total</div>
            <div style={{ fontSize: "15px", color: "red" }}>
              {selectedRowKeys.length}
            </div>
            <div style={{ fontSize: "15px" }}>items: </div>
          </Space>
          <Typography.Text style={{ fontSize: "20px", color: "red" }}>
            {`${totalCost.toLocaleString()}đ`}
          </Typography.Text>
          <Button
            type="primary"
            danger
            style={{ fontSize: "15px" }}
            onClick={() => {
              if (selectedRowKeys && selectedRowKeys.length > 0) {
                navigate("/checkout");
              }
            }}
          >
            Check Out!
          </Button>
        </Space>
      </Flex>
    </Affix>
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      dispatch(setSelectedRowKeys(selectedRowKeys));
      if (selectedRows.length === auth.currentUser.product.length) {
        setCheckedSelectAll(true);
      } else setCheckedSelectAll(false);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        setCheckedSelectAll(true);
      } else setCheckedSelectAll(false);
    },

    //   getCheckboxProps: (record) => ({
    //     disabled: record.name === "Disabled User",
    //     name: record.name,
    //   }),
  };

  return (
    <>
      {auth && auth.currentUser && (
        <>
          <Flex
            style={{
              backgroundColor: mode ? "#001529" : "white",
              padding: "10px",
            }}
            justify="center"
            align="center"
          >
            <Row
              style={{
                width: "1200px",
                minHeight: "80vh",
                backgroundColor: mode ? "#001529" : "white",
              }}
            >
              <Table
                rowHoverable
                style={{ width: "100%" }}
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
              />
              <PaymentBar />
            </Row>
          </Flex>
        </>
      )}
    </>
  );
};

export default CartScreen;
