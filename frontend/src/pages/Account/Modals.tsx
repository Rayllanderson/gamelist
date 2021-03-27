import { Input } from "../../components/Inputs/modal/Inputs";

interface UpdateProps {
  name: string,
  username: string,
  email: string;
  handleNameChange(e: any): void;
  handleUsernameChange(e: any): void;
  handleEmailChange(e: any): void;
}

export function UpdateDataModal({ name, username, email, handleNameChange, handleUsernameChange, handleEmailChange }: UpdateProps) {
  return (
    <div>
      <label className="col-form-label "> Nome </label>
      <Input value={name} required handleChange={handleNameChange} placeholder="Nome" />

      <label className="col-form-label "> Username </label>
      <Input value={username} required handleChange={handleUsernameChange} placeholder="Username" />

      <label className="col-form-label "> Email </label>
      <Input value={email} required handleChange={handleEmailChange} placeholder="Email" />
      
    </div>
  )
}