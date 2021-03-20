import '../../styles/components/main.css';

export function Footer() {
  return (
    <div className='footerFixed'>
      <button className='btn btn-pink btn-lg fixedButton' data-toggle="modal" data-target="#gameModal" title="Adicionar novo jogo">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )
}