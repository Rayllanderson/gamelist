/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../styles/components/main.css';
interface Props{
  text: string;
}

export function NavItem(props: Props){
  return (
    <li className="nav-item">
      <a href="#" style={{textDecoration: "none"}}>
        <span className='nav-link menuItem textActive'>{props.text}</span>
        <div className='menuItemFooter footerActive'></div>
      </a>
    </li>
  )
}