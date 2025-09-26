import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8082/api/feedback", // must match backend mapping
  headers: {
    "Content-Type": "application/json",
  },
});
