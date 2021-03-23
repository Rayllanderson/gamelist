import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Game } from "../../../contexts/GameContext";
import { CardGame } from "./styles";

interface Props {
  game: Game;
}

export default function Card({ game }: Props) {
  return (
    <CardGame>
      <Link
        to={`/repositories/`}
      >
        <img
          src="game-controler.svg"
          alt="logo"
        />
        <div>
          <strong>{game.name}</strong>
          <p>{game.status}</p>
        </div>
        

        <FiChevronRight size={20} />
      </Link>
    </CardGame>
  );
}