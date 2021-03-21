export function LoginModalBody() {
  return (<form>
    <div className="form-group">
      <label className="col-form-label">Nome </label>
      <input type="text" placeholder=" Nome (Opcional) " className="form-control" />
    </div>
      <label className="col-form-label">
        Email
        <button type="button" className="btn badge badge-info"
          id="emailPopover"
          data-container="body"
          data-toggle="popover"
          data-placement="bottom"
          data-content="Precisaremos de um email válido e ativo para caso esqueça sua senha.">
          ?
        </button>
      </label>
    <input type="email" placeholder=" Email (Opcional) " className="form-control form-control-lg" />
    <div className="form-group">
      <label className="col-form-label">Username</label>
      <input type="text" placeholder=" Username" className="form-control" />
    </div>
    <div className="form-group">
      <label className="col-form-label">Password</label>
      <input type="password" placeholder="Password" className="form-control" />
    </div>
    
  </form>
  )
}