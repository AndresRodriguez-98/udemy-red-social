import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";

export const People = () => {
  const [users, setUsers] = useState([]); // genero un estado de usuarios
  const [page, setPage] = useState(1); // estado de pag (x defecto 1)
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getUsers(page); // como es una funcion asincronica, necesito meterla adentro de un useEffect
    // cuando cargue el componente people x 1ra vez, se llama a un getUsers.
  }, [page]);

  const getUsers = async (nextPage) => {
    // Peticion para sacar usuarios
    const request = await fetch(Global.url + "user/list/" + nextPage, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    // Crear un estado para poder listarlos
    if (data.users && data.status == "success") {
      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...newUsers];
      }

      setUsers(newUsers);
      setFollowing(data.user_following);
    }

    // Paginación (cuando desplegamos una pagina para ver mas cosas , en este caso mas usuarios)
  };

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    // No importa cuando terminan xq ambas tienen el mismo valor por copia.
  };

  
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>

      <UserList users={users}
                setUsers={setUsers}
                following={following}
                setFollowing={setFollowing}
                />

      {/* estos valores que puse como props de mi nuevo componente
      tengo que agarrarlos en ese nuevo component, si no da error
      y te dice que estan undefined */}

      <div className="content__container-btn">
        <button className="content__btn-more-post" onClick={nextPage}>
          Ver mas personas
        </button>
      </div>
    </>
  );
};
