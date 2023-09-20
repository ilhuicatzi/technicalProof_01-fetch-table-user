import { SortBy, type User } from "../types.d";

interface UserListProps {
  handleChangeSort: (sort: SortBy) => void;
  handleDelete: (email: string) => void;
  users: User[];
  showColor: boolean;
}

export function UserList({handleChangeSort, handleDelete, users, showColor }: UserListProps) {
    
  return (
    <table className="w-screen">
      <thead className="w-full">
        <tr>
          <th>Foto</th>
          <th className="cursor-pointer" onClick={() => handleChangeSort(SortBy.NAME)}>Nombre</th>
          <th className="cursor-pointer" onClick={() => handleChangeSort(SortBy.LAST)}>Apellido</th>
          <th className="cursor-pointer" onClick={() => handleChangeSort(SortBy.COUNTRY)}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="w-full text-center">
        {users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColor ? backgroundColor : 'transparent'
          return (
            <tr key={user.email} style={{backgroundColor: color}}>
              <td className="flex justify-center ">
                <img
                  src={user.picture.thumbnail}
                  className="my-2 rounded-full"
                  alt={user.name.first}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button 
                onClick={() => {handleDelete(user.email)}}
                className="bg-zinc-800 px-4 py-1.5 rounded-lg hover:bg-zinc-700">
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserList;
