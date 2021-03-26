/* eslint-disable eqeqeq */
import { useCallback, useContext, useState } from "react";
import { Input, InputSelect } from "../../../components/Inputs/modal/Inputs";
import { GameContext, GameStatus } from "../../../hooks/GameContext";



export function SaveGameModal() {
  const { handleNameChange, handleSelectChange, handleEndDateChange,
    handleStartDateChange, endDate, startDate, name, status, } = useContext(GameContext);

  const [showData, setShowData] = useState(false);
  const [showButton, setShowButton] = useState<'block' | 'none'>('block');

  const showStartData = useCallback(() => {
    setShowData(true)
    setShowButton('none');
  }, [])

  return (
    <div>
      <div className="form-group ">
        <label className="col-form-label "> Nome </label>
        <Input value={name} required handleChange={handleNameChange} placeholder="Nome" />
      </div>

      <div>
        <label className="col-form-label "> Status </label>
        <InputSelect value={status} handleChange={handleSelectChange} />
      </div>

      {(status.valueOf() == GameStatus.PLAYING.valueOf() || showData) &&
        <div>
          <label className="col-form-label ml-3"> Data de início </label>
          <Input type="date" value={startDate} handleChange={handleStartDateChange} />
        </div>
      }

      {status.valueOf() == GameStatus.COMPLETED.valueOf() &&
        <div>
          <label className="col-form-label ml-3"> Data de finalização </label>
          <Input type="date" value={endDate} handleChange={handleEndDateChange} />
          <div className="form-group mt-3" style={{ display: showButton }}>
            <button className="btn btn-purple" onClick={showStartData}>Adicionar data de início</button>
          </div>
        </div>
      }
    </div>
  );
}