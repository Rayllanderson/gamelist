import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../hooks/AuthContext';
import { ToastContext } from '../../hooks/ToastContext';
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
            <Link to="/my-account" className="dropdown-item"> <FiUser /> Conta </Link>
            <Dropdown.Item onClick={logout}> <FiLogOut /> Logout </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Nav>
  )
}