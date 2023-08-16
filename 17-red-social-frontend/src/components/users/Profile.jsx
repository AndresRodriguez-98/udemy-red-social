import React, { useState, useEffect } from "react";
import avatar from "../../assets/img/user.png";
import { GetProfile } from "../../helpers/getProfile";
import { useParams } from "react-router-dom";
import Global from "../../helpers/Global";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Profile = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState({});
  const params = useParams();
  const [counters, setCounters] = useState([]);
  const [iFollow, setIFollow] = useState(false);

  useEffect(() => {
    getDataUser();
    getCounters();
  }, []);

  // con esto logramos que al darle click al nombre de usuario en la navbar vaya al perfil:
  useEffect(() => {
    let dataUser = GetProfile(params.userId, setUser);

    if (dataUser.following && dataUser.following._id) setIFollow(true);

    getCounters();
  }, [params]);

  const getDataUser = async () => {
    let dataUser = GetProfile(params.userId, setUser);

    if (dataUser.following && dataUser.following._id) setIFollow(true);
  };

  const getCounters = async () => {
    const request = await fetch(Global.url + "user/counters/" + params.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.following) {
      setCounters(data);
    }
  };

  return (
    <>
      <header className="aside__profile-info">
        <div className="profile-info__general-info">
          <div className="general-info__container-avatar">
            {user.image != "default.png" && (
              <img
                src={Global.url + "user/avatar/" + user.image}
                className="container-avatar__img"
                alt="Foto de perfil"
              />
            )}
            {user.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
          </div>

          <div className="general-info__container-names">
            <div className="container-names__name">
              <h1>
                {user.name} {user.surname}
              </h1>

              {user._id != auth._id &&
                (iFollow ? (
                  <button className="content__button content__button--rigth post__button">Dejar de seguir</button>
                ) : (
                  <button className="content__button content__button--rigth">Seguir</button>
                ))}
            </div>
            <h2 className="container-names__nickname">{user.nick}</h2>
            <p>{user.bio}</p>
          </div>
        </div>

        <div className="profile-info__stats">
          <div className="stats__following">
            <Link to={"/social/following/" + user._id} className="following__link">
              <span className="following__title">Siguiendo</span>
              <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
            </Link>
          </div>
          <div className="stats__following">
            <Link to={"/social/followers/" + user._id} className="following__link">
              <span className="following__title">Seguidores</span>
              <span className="following__number">{counters.followed >= 1 ? counters.followed : 0}</span>
            </Link>
          </div>

          <div className="stats__following">
            <Link to={"/social/profile/" + user._id} className="following__link">
              <span className="following__title">Publicaciones</span>
              <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="content__posts">
        <article className="posts__post">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img src={avatar} className="post__user-image" alt="Foto de perfil" />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </article>

        <div className="content__container-btn">
          <button className="content__btn-more-post">Ver mas publicaciones</button>
        </div>
      </div>
    </>
  );
};
