export function ForgetPasswordModal() {
  return (
    <div>
      <form>
        <div className="form-group">
          <label className="col-form-label">
            Email
          </label>
          <input type="email" placeholder="Email Cadastrado" className="form-control" />
        </div>
      </form>
    </div>
  );
}