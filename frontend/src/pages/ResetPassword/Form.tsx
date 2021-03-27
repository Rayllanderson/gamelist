import { useContext, useState } from "react";
import { FiMail } from "react-icons/fi";
import { Button } from "../../components/Button/Index";
import { Input } from "../../components/Inputs/login/Input";
import { LoaderCircle } from "../../components/Loaders/Index";
import { LoadingContext } from "../../hooks/LoadingContext";
import { ToastContext } from "../../hooks/ToastContext";
import api from "../../services/api";

export default function Form() {

  const [email, setEmail] = useState('');
  const { addToast } = useContext(ToastContext);
  const { btnIsLoading, setBtnIsLoading } = useContext(LoadingContext)

  function handleChange(e: any) {
    setEmail(e.target.value);
  }
  async function handleSubmit(e: any) {
    setBtnIsLoading(true)
    email ?
      await api.post('/users/reset-password', { email: email })
        .then(() =>
          addToast({
            type: 'success',
            title: 'Email enviado.',
            description: "Sua nova senha foi enviada para o email cadastrado. Cheque sua caixa de emails.",
          })
        ).catch(err => {
          const message = err.response.data.message ? err.response.data.message : 'Erro desconhecido';
          addToast({
            type: 'error',
            title: 'Erro',
            description: message,
          })
        })
      :
      addToast({
        type: 'info',
        title: 'Email inválido',
        description: "Preencha o campo de email antes de enviar",
      })
    setBtnIsLoading(false)
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
        {btnIsLoading ?
          <Button disabled type="large"><LoaderCircle /></Button>
          :
          <Button onClick={handleSubmit} type="large">Enviar email</Button>
        }
      </div>
    </div>
  );
}