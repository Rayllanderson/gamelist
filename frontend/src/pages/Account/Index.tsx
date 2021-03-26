import Header from "../../components/Header/Index";
import { Container, AccountContent, ButtonGroup } from "./style";
import { FcLandscape } from "react-icons/fc";
import { Chart } from '../../components/Chart/Index'
import './style.css'

export default function Account() {
  return (
    <div>
      <Container className="container">
        <Header />
        <AccountContent >
          <div className="d-flex justify-content-center">
            <div className="image">
              <FcLandscape size={76} />
            </div>
          </div>
          <div className="user-infos mt-2">
            <strong className="name">Nome qualquer</strong>
            <p className="email">useremail@email.com</p>
          </div>
          <ButtonGroup>
            <button className="btn btn-comment" onClick={() => (null)}>Editar dados</button>
            <button className="btn btn-red" onClick={() => (null)}>Trocar senha</button>
          </ButtonGroup>
          <div className="stats">
            <strong className="d-flex justify-content-center">Estatísticas breves</strong>
            <div className="chart d-flex justify-content-center">
              <Chart />
            </div>
          </div>
        </AccountContent>

      </Container>
    </div>
  )
}