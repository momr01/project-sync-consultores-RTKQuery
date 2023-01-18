import { toast } from "react-hot-toast";

export const successMsg = (text) =>
  toast.success(text, {
    style: {
      borderRadius: "10px",
      background: "#EFF7F0",
      fontSize: "1.1rem",
      color: "#2CA73B",
    },
  });

export const errorMsg = (text) =>
  toast.error(text, {
    style: {
      borderRadius: "10px",
      background: "#EFF7F0",
      fontSize: "1.1rem",
      color: "#A13131",
    },
  });
