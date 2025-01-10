export function AbilitysList({ abilities }) {
  return (
    <article className="ab-list-container">
      <h3 className="info-title">Habilidades</h3>
      <ul className="ab-list">
        {abilities.map(({ name, description, icon, years }) => (
          <li key={name} className="ab-list-item">
            <img src={icon} alt={name} className="ab-icon" />
            <div className="ab-list-info">
              <h4 className="ab-name">{name}</h4>
              <p className="ab-description">{description}</p>
              <p className="ab-years">Experiencia: {years}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

