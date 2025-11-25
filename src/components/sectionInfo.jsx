export function InfoSection({ descriptionProfile }) {
  return (
    <article className="info-container">
      <div className="info-div" style={{ textAlign: "center" }}>
        <h2 className="info-title">
          Hola, Soy Cristofer Padilla Desarrollador Front End Web y Móvil
        </h2>

        <p className="info-description">{descriptionProfile}</p>

        {/* Botones */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {/* Ver CV */}
          <a
            href="https://drive.google.com/file/d/1Cy5oWQBAWyNAAszeDZU5FMJmxaBVofz4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#0A2D2EF5",
              color: "white",
              borderRadius: "50px",
              padding: "10px 20px",
              fontSize: "1.1rem",
              transition: "0.3s",
            }}
          >
            Ver CV
          </a>

          {/* Descargar CV */}
          <a
            href="https://drive.google.com/uc?export=download&id=1Cy5oWQBAWyNAAszeDZU5FMJmxaBVofz4"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#0A2D2EF5",
              color: "white",
              borderRadius: "50px",
              padding: "10px 20px",
              fontSize: "1.1rem",
              transition: "0.3s",
            }}
          >
            Descargar CV
          </a>
        </div>
      </div>

      <aside className="image-container">
        <div className="Circulo">
          <img src="/h.jpg" alt="Foto de perfil" />
        </div>
      </aside>
    </article>
  );
}
