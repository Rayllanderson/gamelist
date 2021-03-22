import { FiAlertCircle, FiXCircle } from "react-icons/fi";
import './toast.css'
import Toast from "./Toast";
export default function ToastContainer() {
  return (
    <div className="toastContainer">
      <Toast />
      <Toast type="success" />
      <Toast type="error" />
    </div>
  );
}
