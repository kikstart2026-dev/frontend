import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const handleError = (message) => {
  toast.error(
    <div className="toast-content">
      <span>❌</span>
      <p>{message}</p>
    </div>,
    { ...config, className: "toast-error" }
  );
};

export const handleSuccess = (message) => {
  toast.success(
    <div className="toast-content">
      <span>🎉</span>
      <p>{message}</p>
    </div>,
    { ...config, className: "toast-success" }
  );
};

export const ApiUrl = process.env.REACT_APP_BASE_URL;