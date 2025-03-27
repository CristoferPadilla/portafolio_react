export function InfoSection({ descriptionProfile}) {
  return (
    <article className="info-container">
      <div className="info-div" style={{ textAlign: "center" }}>
        {/* Make it dynamic in here */}
        <h2 className="info-title">
          Hola, Soy Cristofer Padilla Desarrollador Web y Móvil
        </h2>
        <p className="info-description">{descriptionProfile}</p>
        <li
          className="portafolio-li"
          style={{ color: "black", fontSize: "1.2rem", gap: "10px" }}
          href="https://drive.google.com/file/d/1x9_wv1YR_ST-1jlvL7wYvmN5dnuE8ziE/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <a
            style={{
              backgroundColor: "#0A2D2EF5",
              color: "white",
              borderRadius: "50px",
              padding: "10px",
            }}
            href="https://drive.google.com/file/d/1x9_wv1YR_ST-1jlvL7wYvmN5dnuE8ziE/view?usp=sharing"
          >
            Descargar CV
          </a>
        </li>
      </div>
      <aside className="image-container">
        <div className="Circulo"></div>
        {/* <img src='/portafolio_react/mobile_app.svg' alt="Programación" className="info-image" /> */}
      </aside>
    </article>
  );
}
