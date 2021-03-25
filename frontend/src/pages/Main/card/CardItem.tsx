import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Game } from "../../../contexts/GameContext";
import { CardGame } from "./styles";

interface Props {
  game: Game;
}

export default function CardItem({ game }: Props) {
  return (
    <CardGame>
      <Link to={`/games/${game.id}`}>
        <img src="/game-controler.svg"
          alt="logo"/>
        <div>
          <strong>{game.name}</strong>
          <p>{game.status}</p>
        </div>
        <FiChevronRight size={20} />
      </Link>
    </CardGame>
  );
}