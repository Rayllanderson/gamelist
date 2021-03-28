import { useCallback, useRef, useState } from "react"
import { Icon } from "../../InputIcon";

interface Props {
  handleChange: (e: any) => void;
  value: string;
  placeholder: string;
  type: string;
  icon: React.ComponentType;
  required: boolean;
}

export function Input({ handleChange, value, placeholder, type, icon, required}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputBlur = useCallback(() => { 
    setIsFocused(false);
    const hasValue = !!inputRef.current?.value;
    setIsFilled(!!hasValue)
  }, []);

  return (
    <div className="input-group">
      <Icon icon={icon} isFilled={isFilled} isFocused={isFocused} />
      <input className="form-control form-control-lg inner-addon left-addon"
        onChange={handleChange}
        value={value}
        type={type}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur} 
        ref={inputRef} required={required}/>
    </div>
  )
}