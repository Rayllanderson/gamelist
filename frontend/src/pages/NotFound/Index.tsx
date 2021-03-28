import { Container } from "./style";
import { GiRollingEnergy} from 'react-icons/gi'
export default function NotFound(){
  return (
    <Container className="container">
      <GiRollingEnergy color="white" size={78} className="spin"/>
      <span>404</span>
      <strong>Página não encontrada</strong>
    </Container>
  )
}