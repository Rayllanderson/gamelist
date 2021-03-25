import { NavLink } from "react-router-dom";

export interface NavItemData {
  id?: number;
  name: string;
  path:string;
}

export default function NavItem ({name, path}:NavItemData){
  const link = path === 'games' ? 'games' :  'games/status/' + path
  return (
    <NavLink to={`/${link}`} activeClassName="active" exact ><span>{name}</span></NavLink>
  )
}