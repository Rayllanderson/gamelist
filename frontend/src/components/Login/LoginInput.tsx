import styles from '../../../styles/components/login.module.css';

type Props = {
  type: string;
  placeholder: string;
}

export function LoginInput({type, placeholder}: Props){
  return(
    <div className={`form-group ${styles.formGroup}`}>
      <input className="form-control form-control-lg" type={type} placeholder={placeholder} />
    </div>
  )
}