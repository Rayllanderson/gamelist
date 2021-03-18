import styles from '../../../styles/components/login.module.css';

interface Props  {
  children: string;
}

export function Button(props: Props){
  return (
    <div className={styles.loginButton}>
      <button type="button" className="btn btn-pink btn-lg btn-block">{props.children}</button>
    </div>
  );
}