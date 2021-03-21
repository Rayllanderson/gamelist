import '../../styles/components/main.css';
export function Search(){
  return (
    <div className='input-group inputSearch input-group-lg' >
      <input type="text" className="rounded-md py-1 px-3 form-control form-control-lg" placeholder="Pesquise um jogo" />
        <button type="button" className="btn btn-pink"> &nbsp; <i className="fa fa-search"></i> &nbsp;</button>
    </div>
  )
}