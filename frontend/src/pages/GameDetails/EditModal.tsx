import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import Input from "../Main/modal/Input";
import InputSelect from "../Main/modal/InputSelect";

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