import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContext } from '../../contexts/ToastContext';
import {Nav} from './style'
import './style.css'
export default function MyNavbar() {
  const { signOut } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);

  function logout() {
    signOut();
    addToast({
      type: 'info',
      title: 'Logout',
      description: "Você fez logout. Até mais!",
    })
  }
  return (
    <Nav className="navbar">
      <div className="content container d-flex justify-content-end">
        <Dropdown className="content-items" drop='down' >
          <Dropdown.Toggle variant="dropdown">
            < FiSettings size={22} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="drop-menu" >
            <Dropdown.Item href="#/action-1"><FiUser/> Conta </Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={logout}> <FiLogOut /> Logout </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Nav>
  )
}