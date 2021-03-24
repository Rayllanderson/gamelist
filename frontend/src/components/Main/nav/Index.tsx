import './nav.css'
import NavItem, { NavItemData } from './NavItem'


export function Nav() {
  const navItems: NavItemData[] = [
    { id: 1, name: 'Todos', path: 'games' },
    { id: 2, name: 'Em espera', path: 'wish' },
    { id: 3, name: 'Jogando', path: 'playing' },
    { id: 4, name: 'Finalizados', path: 'completed' }]
  return (
    <div className="topnav">
      <div id="myLinks" className="justify-content-between">
        {navItems.map(item =>
          <NavItem path={item.path} key={item.id} name={item.name} />
        )}
      </div>
    </div>
  )
}