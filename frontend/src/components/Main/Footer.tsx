import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import '../../styles/components/main.css';

export function Footer() {
  const { save } = useContext(GameContext)
  return (
    <div className='footerFixed'>
      <button className='btn btn-pink btn-lg fixedButton'
        data-bs-toggle="modal" data-bs-target="#gameModal"
        title="Adicionar novo jogo" onClick={save}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )
}