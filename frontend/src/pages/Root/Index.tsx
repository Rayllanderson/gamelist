import { Logo } from "../../components/Logo";
import Form from "./Form";

export function Root() {
  const param = window.location.pathname.replace('/' , '');
  const component = !param ? 'login' : param;
  return (
    <div className={`container container-${component} mt-5`}>
      <Logo />
      <Form component={component}/>
    </div>
  );
}