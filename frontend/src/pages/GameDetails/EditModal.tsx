import { useContext } from "react";
import { Input, InputSelect } from "../../components/Inputs/modal/Inputs";
import { GameContext } from "../../hooks/GameContext";

export default function EditModal() {

  const { handleNameChange, handleSelectChange, handleEndDateChange,
    handleStartDateChange, endDate, startDate, name, status, } = useContext(GameContext);
  return (
    <div>
      <div className="form-group ">
        <label className="col-form-label "> Nome </label>
        <Input value={name} handleChange={handleNameChange} placeholder="Nome" />
      </div>

      <div>
        <label className="col-form-label "> Status </label>
        <InputSelect value={status} handleChange={handleSelectChange} />
      </div>

      <div>
        <label className="col-form-label ml-3"> Data de início </label>
        <Input type="date" value={startDate} handleChange={handleStartDateChange} />
      </div>

      <div>
        <label className="col-form-label ml-3"> Data de finalização </label>
        <Input type="date" value={endDate} handleChange={handleEndDateChange} />
      </div>
    </div>
  );
}