import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getIdContent } from "../Redux-reducer/data";
import { Col, Flex, Row, Typography } from "antd";

const NewDetail = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const id = searchParams.get("id");
  const [content, setContent] = useState("");
  // const auth = useSelector((state) => state.authen);
  // const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getIdContent(id)).then((action) => {
        if (action.payload) {
          setContent(action.payload);
        }
      });
    }
  }, [id]);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDate.replace(",", ""); // Loại bỏ dấu phẩy ngăn cách giữa ngày và thời gian
  };

  return (
    <>
      {content && (
        <>
          <Flex
            style={{
              backgroundColor: mode ? "#001529" : "white",
            }}
            justify="center"
            align="center"
          >
            <div
              className="container"
              style={{
                width: "1200px",
                height: "100%",
                backgroundColor: mode ? "#001529" : "white",
                padding: "10px",
              }}
            >
              <Row>
                <Col span={24}>
                  <Flex vertical gap={10}>
                    <Typography.Title level={3} style={{ color: "#0070af" }}>
                      {content.title}
                    </Typography.Title>
                    <Typography.Text type="secondary" italic>
                      Đăng bởi {content.author} vào{" "}
                      {formatDate(content.createdAt)}
                    </Typography.Text>
                    <div
                      className="CKeditor"
                      dangerouslySetInnerHTML={{ __html: content.content }}
                    ></div>
                  </Flex>
                </Col>
              </Row>
            </div>
          </Flex>
        </>
      )}
    </>
  );
};

export default NewDetail;
