import { LoginForm, LoginFooter } from "./Login/Index"
import { RegisterForm, RegisterFooter } from "./Register/Index"
import { ForgetPasswordForm, ForgetPasswordFooter } from "./ResetPassword/Index"

export type ComponentProps  = {
  component: string;
}

export default function Form({ component }: ComponentProps) {
  return (
    <>
      {(component === 'login' || !component) &&
        <>
          <LoginForm />
          <LoginFooter />
        </>
      }

      {
        component === 'register' &&
        <>
          <RegisterForm />
          <RegisterFooter />
        </>
      }

      {
        component === 'forget-password' &&
        <>
          <ForgetPasswordForm />
          <ForgetPasswordFooter />
        </>
      }
    </>
  )
}