import './nav.css'

/*
interface NavItemData {
  id: number;
  name: string;
}
*/
export function Nav() {
  /*const navItems: NavItemData[] = [{ id: 1, name: 'Todos' }, { id: 2, name: 'Jogando' },
    { id: 3, name: 'Em espera' }, { id: 4, name: '' }]*/
  return (
    <div className="topnav">
      
      <div id="myLinks" className="justify-content-between">
        <a href="#news" className="active">Todos</a>
        <a href="#about">Em espera</a>
        <a href="#contact">Jogando</a>
        <a href="#about">Finalizados</a>
      </div>
    </div>
  )
}