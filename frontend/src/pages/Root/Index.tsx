import { useEffect } from "react";
import { Logo } from "../../components/Logo";
import Form from "./Form";

export function Root() {
  useEffect(() => {
    document.title = 'Game List - Login';
  }, [])
  const url = window.location.pathname;
  const param = url.replace('/' , '');
  const component = !param ? 'login' : param;
  return (
    <div className={`container container-${component} mt-5`}>
      <Logo />
      <Form component={component}/>
    </div>
  );
}