import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";
import { serializeForm } from "../../helpers/SerializeForm";

export const Config = ({ tituloSubmit }) => {
  const { auth, setAuth } = useAuth();

  const [saved, setSaved] = useState("not_saved");

  // ACORDARSE !! siempre que hagamos un request tendro de una funcion poner el ASYNC ya que esperamos que vamos a esperar resultados
  const updateUser = async (e) => {
    e.preventDefault();

    // recoger toker de autenticacion
    const token = localStorage.getItem("token");

    // recoger datos del formulario
    let newDataUser = serializeForm(e.target);

    // borrar propiedad innecesaria
    delete newDataUser.file0;

    // Actualizar usuario en la base de datos

    try {
      const request = await fetch(`${Global.url}user/update`, {
        method: "PUT",
        body: JSON.stringify(newDataUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log(request);

      const data = await request.json();

      if (data.status == "success" && data.user) {
        delete data.user.password;

        setAuth(data.user);
        setSaved("saved");
      } else {
        setSaved("error");
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // SUBIDA DE IMAGENES
      const fileInput = document.querySelector("#file"); // te permite seleccionar cualq elemento del DOM

      if (data.status == "success" && fileInput.files[0]) {
        // Recoger imagen que se sube
        const formData = new FormData();
        formData.append("file0", fileInput.files[0]);

        // Peticion para enviar la imagen al fichero
        const uploadRequest = await fetch(Global.url + "user/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        });

        const uploadData = await uploadRequest.json();

        if (uploadData.status == "success" && uploadData.user) {
          delete uploadData.user.password; // eliminamos la contraseña para que no la muestre

          setAuth(uploadData.user); // Actualizamos el usuario con la nueva foto
          setSaved("saved"); // Seteamos a "Guardado" si se guardó la foto
        } else {
          setSaved("error"); // Seteamos a error si no se guardó
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>

      {/* este es nuestro formulario de ajustes, muy parecido al de register */}
      <div className="content__posts">
        {saved == "saved" ? <strong className="alert alert-success"> Usuario actualizado correctamente!!</strong> : ""}
        {saved == "error" ? <strong className="alert alert-danger"> El usuario no se ha podido actualizar</strong> : ""}

        <form className="config-form" onSubmit={updateUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" defaultValue={auth.name} />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name="surname" defaultValue={auth.surname} />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" defaultValue={auth.nick} />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biografia</label>
            <textarea name="bio" defaultValue={auth.bio} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" defaultValue={auth.email} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="file0">Avatar</label>
            <div className="general-info__container-avatar">
              {auth.image != "default.png" && (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
              {auth.image == "default.png" && (
                <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
              )}
            </div>
            <br />
            <input type="file" name="file0" id="file" />
          </div>
          <br />
          <input type="submit" value={tituloSubmit} className="btn btn-success" />
        </form>
        <br />
      </div>
    </>
  );
};
