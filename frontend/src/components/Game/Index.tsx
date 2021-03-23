import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

export default function Game(){
  const {selectedGame} = useContext(GameContext);
  
  return (
    <div></div>
  )
}