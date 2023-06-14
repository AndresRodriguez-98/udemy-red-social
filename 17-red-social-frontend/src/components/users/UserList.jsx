import React from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const UserList = ({users, setUsers, following, setFollowing}) => {

  const { auth } = useAuth();

  const follow = async (userId) => {
    //peticion al backend para guardar el follow
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    // Cuando este todo correcto:
    if (data.status == "success") {
      // Actualizar estado de following, agregando el follow
      setFollowing([...following, userId]);
    }
  };

  const unfollow = async (userId) => {
    //peticion al backend para BORRAR el follow
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    // Cuando este todo correcto:
    if (data.status == "success") {
      // Actualizar estado de following, filtrando los datos para eliminar el antiguo userID que acabo de dejar de seguir
      let filterFollowings = following.filter((followingUserId) => userId !== followingUserId);
      setFollowing(filterFollowings);
    }
  };

  return (
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

            {/* Solo voy a mostrar los botones cuando el user no es 
              con el que estoy identificado (que no aparezca el boton*/}
            {user._id !== auth._id && (
              <div className="post__buttons">
                {!following.includes(user._id) && (
                  <a href="#" className="post__button post__button--green" onClick={() => follow(user._id)}>
                    Seguir
                  </a>
                )}
                {following.includes(user._id) && (
                  <a href="#" className="post__button" onClick={() => unfollow(user._id)}>
                    Dejar de seguir
                  </a>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};
