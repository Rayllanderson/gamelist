import styles from '../../../styles/components/main.module.css';

interface Props{
  text: string;
}

export function NavItem(props: Props){
  return (
    <li className="nav-item">
      <a href="#">
        <a className={`nav-link ${styles.menuItem} ${styles.textActive}`} href="#">{props.text}</a>
        <div className={`${styles.menuItemFooter} ${styles.footerActive}`}></div>
      </a>
    </li>
  )
}