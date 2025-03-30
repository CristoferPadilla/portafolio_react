export function InfoSection({ descriptionProfile, fullName, urlCv }) {
  return (
    <article className="info-container">
      <div className="info-div" style={{ textAlign: "center" }}>
        <h2 className="info-title">
          Hola, Soy {fullName || "Usuario"} 
        </h2>
        <p className="info-description">{descriptionProfile}</p>
        <div className="portafolio-link-container" style={{ marginTop: "20px" }}>
          <a
            href={urlCv}
            download={`CV_${fullName || 'Usuario'}.pdf`}  // Esto fuerza la descarga
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#0A2D2EF5",
              color: "white",
              borderRadius: "50px",
              padding: "10px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            Descargar CV
          </a>
        </div>
      </div>
      <aside className="image-container">
        <div
          className="Circulo justify-center items-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {fullName.charAt(0)}
        </div>
      </aside>
    </article>
  );
}