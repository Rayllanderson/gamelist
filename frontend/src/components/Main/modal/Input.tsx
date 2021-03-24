interface Props {
  handleChange(e: any): void;
  value: string;
  type?: string;
  placeholder?:string;
}

export default function Input(props: Props) {
  const type = props.type ? props.type : 'text';
  return (
    <input type={type} placeholder={props.placeholder}
      className="form-control form-control-lg"
      value={props.value}
      onChange={props.handleChange} />
  )
}