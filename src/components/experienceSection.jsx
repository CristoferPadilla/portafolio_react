// export function ExperienceSection({experience}) {
//     return (
//         <section className="experience-container">
//             <h2 className="experience-title">Experiencia</h2>
//             {experience.map(({title, date, details}) => (
//                 <article key={title} className="experience-article">
//                     <h3 className="experience-article-title">{title}</h3>
//                     <p className="experience-article-date">{date}</p>
//                     <ul className="experience-article-list">
//                         {details.map((detail) => (
//                             <li key={detail} className="experience-article-list-item">{detail}</li>
//                         ))}
//                     </ul>
//                 </article>
//             ))}
//         </section>
//     );
// }

export function MyWork({ myWork }) {
  return (
    
    <article className="my-work-container">
        <h1 className="info-title">Mis proyectos</h1>
      {myWork.map(({ name, description, image }) => (
        <div className="my-work-list-container">
          <img className="my-work-image" src={image} alt="" />
          <strong className="my-work-name">{name}</strong>
          <span className="my-work-description">{description}</span>
        </div>
      ))}
    </article>
  );
}
