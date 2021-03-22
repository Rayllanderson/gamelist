import { FiAlertCircle, FiXCircle } from "react-icons/fi";

interface Props {
  type?:string;
}
export default function Toast({type}:Props) {
  let background = '#ebf8ff';
  let color = '#3172b7';
  switch(type){
    case 'success':
      background = '#e6fffa';
      color = '#2e656a';
      break;
    case 'error':
      background = '#fddede';
      color = '#c53030';
      break;
  }
  return (
    <div className="toast-element" style={{background: background, color: color}}>
      <FiAlertCircle size={20} />
      <div>
        <strong> Titulo </strong>
        <p>Não foi possível fazer login na aplicação</p>
      </div>
      <button >
        <FiXCircle size={18} />
      </button>
    </div>
  )
}