interface Props{
  handleChange(e: any): void,
  value:string;
}

export default function InputSelect({ value, handleChange}:Props) {
  return (
    <div>
      <label className="col-form-label "> Status </label>
      <select className="form-select form-select-lg" value={value} onChange={handleChange} >
        <option value="PLAYING">Jogando</option>
        <option value="WISH">Em espera</option>
        <option value="COMPLETED">Finalizado</option>
      </select>
    </div>
  )
}