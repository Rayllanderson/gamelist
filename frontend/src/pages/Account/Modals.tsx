import { Input } from "../../components/Inputs/modal/Inputs";

interface UpdateProps {
  name: string;
  email: string;
  handleNameChange(e: any): void;
  handleEmailChange(e: any): void;
}

interface ChangePasswordProps {
  password: string;
  handlePassChange(e: any): void;
}

export function UpdateDataModal({ name, email, handleNameChange, handleEmailChange }: UpdateProps) {
  return (
    <div>
      <label className="col-form-label "> Nome </label>
      <Input value={name} required handleChange={handleNameChange} placeholder="Nome" />

      <label className="col-form-label "> Email </label>
      <Input value={email} required handleChange={handleEmailChange} placeholder="Email" />
      
    </div>
  )
}


export function ChangePasswordModal({ password, handlePassChange }: ChangePasswordProps) {
  return (
    <div>
      <label className="col-form-label "> Nova senha </label>
      <Input value={password} required handleChange={handlePassChange} placeholder="Nova senha" type="password"/>
    </div>
  )
}