import styles from '../../../styles/components/login.module.css';

export function Logo(){
  return(
  <div className={styles.logoContent}>
    <div className="text-center">
      <img src="game-controler.svg" className="rounded" alt="Logo" />
    </div>
  </div>
  );
}