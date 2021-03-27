import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Header as Head } from "./style";

interface Props {
  onClick?: () => void;
}
export default function Header({ onClick }: Props) {
  return (
    <Head>
      <div>&nbsp;</div>
      <Link to="/games" onClick={onClick}>
        <FiChevronLeft size={17} />Voltar
      </Link>
    </Head>
  )
}