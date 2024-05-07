import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Row } from "antd";
import { getContent } from "../Redux-reducer/data";

const ContactScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [content, setContent] = useState(null);

  useEffect(() => {
    dispatch(getContent({ category: id })).then((action) => {
      if (action.payload) {
        const listContents = action.payload;
        setContent(listContents[listContents.length - 1].content);
      }
    });
  }, [dispatch, id]);

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
