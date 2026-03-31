import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./utils.scss"

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
      <p className="error_P">{message}</p>
    </div>,
    {...config, className: "toast-error" }
    );
  
};

export const handleWarning = (message) => {
  toast.warning(
    <div className="toast-content">
      <span>⚠️</span>
      <p className="warning_P">{message}</p>
    </div>,
    { ...config, className: "toast-warning" }
  );
};

export const handleSuccess = (message) => {
  toast.success(
    <div className="toast-content">
      <span>🎉</span>
      <p className="success_p">{message}</p>
    </div>,
    { ...config, className: "toast-success" }
  );
};

// export const handleAuth = (message) => {
//   toast.success(
//     <div className="toast-content">
//       <span>🎉</span>
//       <p>{message}</p>
//     </div>,
//     { ...config, className: "toast-success" }
//   );
// };

export const ApiUrl = process.env.REACT_APP_BASE_URL;