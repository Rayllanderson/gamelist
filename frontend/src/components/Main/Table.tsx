import { TableItem } from "./TableItem";

export function Table() {
  const mockTableItem = [{ name: "Gta v", id: 2 }, { name: "Horizon Zero Dawn", id: 4 }]
  return (
    <table className='table table-hover table-borderless'>
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col" className="text-center">Editar</th>
          <th scope="col" className="text-center">Excluir</th>
        </tr>
      </thead>
      <tbody>
        {mockTableItem.map(item => (
          <TableItem game={item} key={Math.random()}/>
        ))}
        
      </tbody>
    </table>
  );
}