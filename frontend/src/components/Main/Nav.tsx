import { NavItem } from "./NavItem";
import '../../styles/components/main.css';

export function Nav() {
  const navItems = ['Todos', 'Jogando', 'Desejados', 'Finalizados'];
  return (
    <div>
      <ul className="nav nav-pills nav-fill">
       {navItems.map(text => (
         <NavItem text={text} key={Math.random()} />
       ))}
      </ul>
      <div className='footerBar'></div>
    </div>
  )
}