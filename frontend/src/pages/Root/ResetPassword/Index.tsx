import { useContext, useState } from "react";
import { FiMail } from "react-icons/fi";
import { LoaderCircle } from "../../../components/Loaders/Index";
import { LoadingContext } from "../../../hooks/LoadingContext";
import { ToastContext } from "../../../hooks/ToastContext";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Input } from '../../../components/Inputs/root/Input';
import { Button } from '../../../components/Button/Index';
import api from "../../../services/api";


export function ForgetPasswordForm() {

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
          console.log(err.response.data)
          const message = err.response.data.message ? err.response.data.message : 'Função indísponível em produção.';
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


export function ForgetPasswordFooter() {
  return (
    <div className='links'>
      <div className='d-flex justify-content-center'>
        <Link to="/"><FiArrowLeft /> &nbsp; Voltar para o login</Link>
      </div>
    </div>
  )
}