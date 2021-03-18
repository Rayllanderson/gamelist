import styles from '../../../styles/components/main.module.css';

export function Footer(){
  return (
    <div className={styles.footerFixed}>
      <button className={`btn btn-pink btn-lg ${styles.fixedButton}`} data-toggle="modal" data-target="#gameModal" title="Adicionar novo jogo">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )
}