import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";

export const People = () => {
  const [users, setUsers] = useState([]); // genero un estado de usuarios
  const [page, setPage] = useState(1); // estado de pag (x defecto 1)

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

      <div className="content__posts">
        {users.map((user) => {
          return (
            <article className="posts__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "user/avatar/" + user.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {user.image == "default.png" && (
                      <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                    )}
                    <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {user.name} {user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {user.create_at}
                    </a>
                  </div>

                  <h4 className="post__content"> {user.bio} </h4>
                </div>
              </div>

              <div className="post__buttons">
                <a href="#" className="post__button post__button--green">
                  Seguir
                </a>

                <a href="#" className="post__button">
                  Dejar de seguir
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="content__container-btn">
        <button className="content__btn-more-post" onClick={nextPage}>
          Ver mas personas
        </button>
      </div>
    </>
  );
};
