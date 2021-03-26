import { GameStatus } from "../../../contexts/GameContext";

interface InputProps {
  handleChange(e: any): void;
  value: string;
  type?: string;
  placeholder?:string;
  required?:boolean
}
interface InputSelectProps {
  handleChange(e: any): void,
  value: GameStatus;
}


export function Input(props: InputProps) {
  const type = props.type ? props.type : 'text';
  const value = props.value ? props.value : '';
  return (
    <input type={type} placeholder={props.placeholder}
      className="form-control form-control-lg"
      value={value}
      onChange={props.handleChange}
      required={props.required} />
  )
}

export function InputSelect({ value, handleChange }: InputSelectProps) {
  return (
    <div>
      <select className="form-select form-select-lg" value={value} onChange={handleChange} >
        <option value={GameStatus.WISH.valueOf()}>Em espera</option>
        <option value={GameStatus.PLAYING}>Jogando</option>
        <option value={GameStatus.COMPLETED}>Finalizado</option>
      </select>
    </div>
  )
}