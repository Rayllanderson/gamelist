
interface Props{
  iconName: string;
  isFocused: boolean;
  isFilled: boolean;
}

export function Icon({ iconName, isFocused, isFilled}: Props){
  const color = isFocused || isFilled ? '#ff79c6' : '#6c757d';
  return (
    <span style={{ fontSize: '1.1rem', color: color, opacity: 1 }}>
      <i className={iconName}></i>
    </span>
  )
}