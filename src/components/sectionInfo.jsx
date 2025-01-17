

export function InfoSection({ descriptionProfile, info, info2 }) {
  return (
    <article className="info-container">
      <div className="info-div">
        <h2 className="info-title">
          Acerca de mí
        </h2>
        <p className="info-description">
          {descriptionProfile}
        </p>
        <span className="info-span">
            <strong>{info}</strong>
        </span>
        <br />
        <br />
        <span className="info-span">
            <strong>{info2}</strong>
        </span>
      </div>
      <aside className="image-container">
        <img src='/portafolio_react/mobile_app.svg' alt="Programación" className="info-image" />
      </aside>
    </article>
  );
}
