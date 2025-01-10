import { useState } from "react";

export function TwitterFollowCard({
  name,
  userName,
  userPhoto,
  formatUserName,
}) {
  //Incluso puedo poner childrens en los componentes
  //En react/js se puede pasar funciones como parametros

  //devuelve un array de 2 elementos de state  =useState(false);
  //la primera o el estado default isFollowing = state[0];
  //la segunda o la funcion que cambia el estado setIsFollowing = state[1];

  const  [isFollowing, setIsFollowing]  = useState(false);

  //Para que react sea más dinámico
  const isFollow = isFollowing ? "Siguiendo" : "Seguir";
  const className = isFollowing
    ? "tw-follow-card-is-following tw-follow-card-button"
    : "tw-follow-card-button";
  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <article className="tw-follow-card">
      <header className="tw-follow-card-header">
        <img
          className="tw-follow-card-avatar"
          src={userPhoto}
          alt="Avatar de twitter"
        />
        <div className="tw-follow-card-info">
          <strong>{name}</strong>
          <span className="tw-follow-card-username">
            {formatUserName(userName)}
          </span>
        </div>
      </header>
      <aside>
        <button className={className} onClick={handleClick}>
          <span className="tw-follow-text">{isFollow}</span>
          <span className="tw-stop-following"> Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}
