import styles from '../../../styles/components/main.module.css';

interface Props{
  text: string;
}

export function NavItem(props: Props){
  return (
    <li className="nav-item">
      <a href="#" style={{textDecoration: "none"}}>
        <span className={`nav-link ${styles.menuItem} ${styles.textActive}`}>{props.text}</span>
        <div className={`${styles.menuItemFooter} ${styles.footerActive}`}></div>
      </a>
    </li>
  )
}