import { ReactNode } from "react";

interface Props {
  disabled?: boolean;
  onClick?(e: any): void;
  children: ReactNode;
  type: 'modal' | 'large'
}

export function Button({ type, disabled, children, onClick }: Props) {
  const buttonType = type === 'large' ? 'btn-lg' : '';
  return (
    <button disabled={disabled} 
      type="button"
      onClick={onClick}
      className={`btn btn-pink ${buttonType}`}>
      {children}
    </button>
  );
}