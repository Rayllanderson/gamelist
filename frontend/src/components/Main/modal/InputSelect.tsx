import { GameStatus } from "../../../contexts/GameContext";

interface Props{
  handleChange(e: any): void,
  value:GameStatus;
}

export default function InputSelect({ value, handleChange}:Props) {
  return (
    <div>
      <select className="form-select form-select-lg" value={value} onChange={handleChange} >
        <option value={GameStatus.WISH}>Em espera</option>
        <option value={GameStatus.PLAYING}>Jogando</option>
        <option value={GameStatus.COMPLETED}>Finalizado</option>
      </select>
    </div>
  )
}