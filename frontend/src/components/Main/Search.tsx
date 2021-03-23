export function Search() {
  return (
    <div className='input-group inputSearch input-group-lg' >
      <input type="text" className="rounded-md py-1 px-3 form-control " placeholder="Pesquise um jogo" />
      <button type="button" className="btn btn-pink btn-lg"> &nbsp; <i className="fa fa-search"></i> &nbsp;</button>
    </div>
  )
}