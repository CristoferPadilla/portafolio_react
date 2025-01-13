

export function InfoSection({ descriptionProfile, info, info2 }) {
  return (
    <div className="info-container">
      <aside className="info-aside">
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
      </aside>
      <aside className="image-container">
        <img src='/portafolio_react/mobile_app.svg' alt="Programación" className="info-image" />
      </aside>
    </div>
  );
}
