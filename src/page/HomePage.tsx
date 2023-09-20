import { useEffect, useMemo, useRef, useState } from "react";
import { SortBy, type User } from "../types.d";
import { UserList } from "../components/UserList";

function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColor, setShowColor] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColor = () => {
    setShowColor(!showColor);
  };

  const toggleSortByCountry = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSorting);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=3&results=100&seed=abc")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredUsers = useMemo(() => {
    console.log('calculating filteredUsers')
  return typeof filterCountry === "string" && filterCountry.length > 0
  ? users.filter((user) => {
      return user.location.country
        .toLowerCase()
        .includes(filterCountry.toLowerCase());
    })
  : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    console.log('calculating sortedUsers')
    
    if (sorting === SortBy.COUNTRY){
      return [...filteredUsers].sort((a, b) =>  a.location.country.localeCompare(b.location.country));
    }
    if(sorting === SortBy.NAME) {
      return [...filteredUsers].sort((a,b) => a.name.first.localeCompare(b.name.first))
    }
    if(sorting === SortBy.LAST) {
      return [...filteredUsers].sort((a,b) => a.name.last.localeCompare(b.name.last))
    }
    return filteredUsers;
  },[filteredUsers, sorting]);

  
  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };
  return (
    <div className="flex justify-center items-center flex-col px-10">
      <h1 className="text-2xl ">Prueba Técnica</h1>
      <header className="my-4 flex gap-x-2 ">
        <button
          className="bg-zinc-800 px-4 py-1.5 rounded-lg hover:bg-zinc-700"
          onClick={toggleColor}
        >
          Colorear filas
        </button>
        <button
          className="bg-zinc-800 px-4 py-1.5 rounded-lg hover:bg-zinc-700"
          onClick={toggleSortByCountry}
        >
          {sorting === SortBy.COUNTRY ? "No ordenar por país" : "Ordenar por país"}
        </button>
        <button
          className="bg-zinc-800 px-4 py-1.5 rounded-lg hover:bg-zinc-700"
          onClick={handleReset}
        >
          {" "}
          Resetear Estado
        </button>
        <input
          className="bg-zinc-800 px-4 py-1.5 rounded-lg hover:bg-zinc-700"
          placeholder="Filtrar por país"
          onChange={(event) => {
            setFilterCountry(event.target.value);
          }}
        />
      </header>
      <main>
        <UserList
          handleChangeSort={handleChangeSort}
          handleDelete={handleDelete}
          showColor={showColor}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default HomePage;
