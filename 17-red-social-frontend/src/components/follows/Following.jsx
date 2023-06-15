import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "../users/UserList";
import { useParams } from "react-router-dom";
import { GetProfile } from "../../helpers/getProfile";
import avatar from "../../assets/img/user.png"

export const Following = () => {
  const [users, setUsers] = useState([]); // genero un estado de usuarios
  const [page, setPage] = useState(1); // estado de pag (x defecto 1)
  const [following, setFollowing] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const params = useParams();

  useEffect(() => {
    getUsers(page); // como es una funcion asincronica, necesito meterla adentro de un useEffect
                    // cuando cargue el componente people x 1ra vez, se llama a un getUsers.
    GetProfile(params.userId, setUserProfile);
    
  }, [page]);

  const getUsers = async (nextPage) => {
    // Sacar userId de la url:
    const userId = params.userId;

    // Peticion para sacar usuarios
    const request = await fetch(Global.url + "follow/following/" + userId + "/" + nextPage, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    // Recorrer y limpiar follows, para quedarme con followed nada mas
    let cleanUsers = [];

    data.follows.forEach((follow) => {
      cleanUsers = [...cleanUsers, follow.followed]; // creamos un nuevo array dentro de la propiedad data (que se va a llamar users) y le agrego el nuevo valor de followed
    });

    data.users = cleanUsers; // Ahora si vamos a devolver solo a los usuarios que sigue el usuario
    

    // Crear un estado para poder listarlos
    if (data.follows && data.status == "success") {
      let newUsers = data.follows;

      if (users.length >= 1) {
        newUsers = [...users, ...data.follows];
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
        <h1 className="content__title">Usuarios que sigue {userProfile.name}</h1>
      </header>

      <UserList users={users} setUsers={setUsers} following={following} setFollowing={setFollowing} />

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
