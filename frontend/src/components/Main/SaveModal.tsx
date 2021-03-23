import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import Input from "../Main/InputName";
import InputSelect from "../Main/InputStatus";

export function SaveGameModal() {
  const {handleNameChange,
    handleSelectChange, name, status } = useContext(GameContext);
  return (
    <div>
      <Input value={name} handleChange={handleNameChange} />
      <InputSelect value={status} handleChange={handleSelectChange} />
    </div>
  );
}