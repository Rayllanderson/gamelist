interface Props {
  handleChange(e: any): void;
  value: string;
}

export default function Input(props: Props) {
  return (<div className="form-group ">
    <label className="col-form-label "> Nome </label>
    <input type="text " placeholder=" Nome "
      className="form-control form-control-lg"
      value={props.value}
      onChange={props.handleChange} />
  </div>)
}