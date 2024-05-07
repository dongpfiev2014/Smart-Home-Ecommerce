import axios from "axios";

// Định nghĩa URL của API endpoint
const API_URL = "https://6623c3b23e17a3ac847025a5.mockapi.io/api/user";

axios
  .get(API_URL)
  .then((response) => {})
  .catch((error) => {
    console.error("Lỗi khi gửi yêu cầu:", error);
  });

const userData = {
  username: "example",
  email: "example@example.com",
  password: "password",
};
axios
  .post(API_URL, userData)
  .then((response) => {})
  .catch((error) => {
    console.error("Lỗi khi gửi yêu cầu:", error);
  });
