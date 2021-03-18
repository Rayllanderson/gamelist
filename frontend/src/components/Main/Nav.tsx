import React from "react";
import { NavItem } from "./NavItem";
import styles from '../../../styles/components/main.module.css';

export function Nav() {
  const navItems = ['Todos', 'Jogando', 'Desejados', 'Finalizados'];
  return (
    <div>
      <ul className="nav nav-pills nav-fill">
       {navItems.map(text => (
         <NavItem text={text} />
       ))}
      </ul>
      <div className={styles.footerBar}></div>
    </div>
  )
}