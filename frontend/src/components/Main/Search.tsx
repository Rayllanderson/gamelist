import styles from '../../../styles/components/main.module.css';

export function Search(){
  return (
    <div className={`input-group ${styles.inputSearch} input-group-lg`} >
      <input type="text" className="rounded-md py-1 px-3 form-control" placeholder="Pesquise um jogo" />
      <div className="input-group-append">
        <button type="button" className="btn btn-pink"> &nbsp; <i className="fa fa-search"></i> &nbsp;</button>
      </div>
    </div>
  )
}