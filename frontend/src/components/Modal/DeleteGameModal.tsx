type Props = {
  gameName: string;
}
export function DeleteModal({ gameName }: Props) {
  return (
    <p>
      Você tem certeza que deseja excluir o jogo<strong><span> {gameName} </span></strong>?
    </p>
  )
}