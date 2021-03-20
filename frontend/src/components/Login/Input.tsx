import { useCallback, useRef, useState } from "react"
import { FiUser } from "react-icons/fi";
import { Icon } from "./Icon"

interface Props {
  handleChange: (e: any) => void;
  value: string;
  placeholder: string;
  type: string;
  icon: React.ComponentType;
}

export function Input({ handleChange, value, placeholder, type, icon }: Props) {
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
      <div className="input-group-prepend">
      <Icon icon={icon} isFilled={isFilled} isFocused={isFocused} />
      </div>
      <input className="form-control form-control-lg inner-addon left-addon"
        onChange={handleChange}
        value={value}
        type={type}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur} 
        ref={inputRef}/>
    </div>
  )
}