interface Props {
  handleChange(e: any): void;
  value: string;
  type?: string;
  placeholder?:string;
}

export default function Input(props: Props) {
  const type = props.type ? props.type : 'text';
  const value = props.value ? props.value : '';
  return (
    <input type={type} placeholder={props.placeholder}
      className="form-control form-control-lg"
      value={value}
      onChange={props.handleChange} />
  )
}