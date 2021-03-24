interface Props {
  icon: React.ComponentType;
  isFocused: boolean;
  isFilled: boolean;
}

export function Icon({ icon: Icon, isFocused, isFilled }: Props) {
  const color = isFocused || isFilled ? '#ff79c6' : '#6c757d';
  const borderColor = isFocused ? '#ff79c6' : '#ffffff';
  return (
    <span className="input-group-text" style={{
      fontSize: '1.2rem', color: color,
      borderColor: borderColor
    }}>
      <Icon />
    </span>
  )
}