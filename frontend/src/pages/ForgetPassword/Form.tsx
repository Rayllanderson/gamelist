import { useContext, useState } from "react";
import { FiMail } from "react-icons/fi";
import { Input } from "../../components/Inputs/login/Input";
import { ToastContext } from "../../contexts/ToastContext";
import api from "../../services/api";

export default function Form() {

  const [email, setEmail] = useState('');
  const { addToast } = useContext(ToastContext);

  function handleChange(e: any) {
    setEmail(e.target.value);
  }
  async function handleSubmit(e: any) {
    email ?
      await api.post('/forget-password', { email: email })
        .then(() =>
          addToast({
            type: 'success',
            title: 'Email enviado.',
            description: "Sua nova senha foi enviada para o email cadastrado. Cheque sua caixa de emails.",
          })
        ).catch(err =>
          addToast({
            type: 'error',
            title: 'Erro',
            description: err.response.data.error,
          })
        )
      :
      addToast({
        type: 'info',
        title: 'Email inválido',
        description: "Preencha o campo de email antes de enviar",
      })
  }
  return (
    <div className='inputs'>
      <div className='form-group formGroup'>
        <Input type='text' placeholder='Email cadastrado'
          handleChange={handleChange}
          icon={FiMail}
          value={email} required={true} />
      </div>
      <div className='loginButton d-grid gap-2'>
        <button type="button"
          className="btn btn-pink btn-lg" onClick={handleSubmit}>Enviar email</button>
      </div>
    </div>
  );
}