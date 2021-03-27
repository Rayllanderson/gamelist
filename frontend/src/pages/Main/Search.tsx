import { useContext } from "react"
import { SearchContext } from "../../hooks/SearchContex"

export function Search() {
  
  const {handleChange, handleSubmit, search} = useContext(SearchContext)

  return (
    <div className='input-group inputSearch input-group-lg' >
      <input type="search" className="rounded-md py-1 px-3 form-control " placeholder="Pesquise um jogo"
      value={search} onChange={handleChange} />
      <button type="button" className="btn btn-pink btn-lg"
      onClick={handleSubmit}> &nbsp; <i className="fa fa-search"></i> &nbsp;</button>
    </div>
  )
}