export function RegisterGameModal() {
  return (
    <form>
      <div className="form-group ">
        <label className="col-form-label "> Nome do jogo </label>
        <input type="text " placeholder=" Nome " className="form-control form-control-lg" />
      </div>
      <div className="form-group ">
        <label className="col-form-label "> Status </label>
        <select className="form-control form-control-lg">
          <option>Jogando</option>
          <option>Em espera</option>
          <option>Finalizado</option>
        </select>
      </div>
    </form>
  );
}