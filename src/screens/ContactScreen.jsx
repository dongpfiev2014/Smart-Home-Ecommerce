import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Row, Typography } from "antd";
import { getContent } from "../Redux-reducer/data";

const ContactScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [content, setContent] = useState(null);
  const [listContents, setListContents] = useState(null);

  useEffect(() => {
    dispatch(getContent({ category: id })).then((action) => {
      if (action.payload) {
        const listContents = action.payload;
        setListContents(listContents);
        setContent(listContents[listContents.length - 1].content);
      }
    });
  }, [dispatch, id]);

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
        <Flex
          style={{
            backgroundColor: mode ? "#001529" : "white",
            padding: "15px",
          }}
          justify="center"
          align="center"
        >
          <Row
            style={{
              width: "1200px",
              minHeight: "75vh",
              backgroundColor: mode ? "#001529" : "white",
            }}
          >
            <Flex vertical gap={15}>
              <div
                className="CKeditor"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </Flex>
          </Row>
        </Flex>
      )}
    </>
  );
};

export default ContactScreen;
