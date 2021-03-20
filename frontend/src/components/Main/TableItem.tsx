/* eslint-disable jsx-a11y/anchor-is-valid */

interface Game  {
  name: string;
}
interface Props {
  game: Game;
}


export function TableItem({ game }: Props) {
  return (
    <tr>
      <td>{game.name}</td>
      <td className="text-center">
        <a href="#" data-toggle="modal" data-target="#gameModal"><i className="fas fa-pen"></i></a></td>
      <td className="text-center">
        <a href="#" data-toggle="modal" data-target="#deleteModal"><i className="fas fa-times"></i></a>
      </td>
    </tr>
  )
}