import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormComponent() {
  const [projects, setProjects] = useState([
    {
      title: "",
      description: "",
      year: "",
      type_technologies: [],
      image: null,
    },
  ]);
  const [socialLinks, setSocialLinks] = useState([{ name: "", link: "" }]);
  const [formData, setFormData] = useState({
    full_name: "",
    description: "",
    spoken_languages: [],
    programming_languages: [],
  });

  const navigate = useNavigate();

  const [cvFile, setCvFile] = useState(null);

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        year: "",
        type_technologies: [],
        image: null,
      },
    ]);
  };

  const handleRemoveProject = (index) => {
    if (projects.length > 1) {
      const newProjects = [...projects];
      newProjects.splice(index, 1);
      setProjects(newProjects);
    }
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { name: "", link: "" }]);
  };

  const handleProjectChange = (index, event) => {
    const { name, value } = event.target;
    const newProjects = [...projects];

    if (name === "year") {
      newProjects[index][name] = parseInt(value, 10) || ""; 
    } else {
      newProjects[index][name] = value;
    }
    setProjects(newProjects);
  };

  const handleProjectTechnologiesChange = (index, event) => {
    const newProjects = [...projects];
    newProjects[index].type_technologies = event.target.value
      .split(",")
      .map((item) => item.trim());
    setProjects(newProjects);
  };

  const handleProjectImageChange = (index, event) => {
    const newProjects = [...projects];
    newProjects[index].image = event.target.files[0];
    setProjects(newProjects);
  };

  const handleSocialLinkChange = (index, event) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index][event.target.name] = event.target.value;
    setSocialLinks(newSocialLinks);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["spoken_languages", "programming_languages"].includes(name)) {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleCvFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Create a JSON payload for the other fields
    const payload = {
      full_name: formData.full_name,
      description: formData.description,
      spoken_languages: formData.spoken_languages,
      programming_languages: formData.programming_languages,
      projects: projects.map((project) => ({
        title: project.title,
        description: project.description,
        year: project.year ? Number(project.year) : null,
        type_technologies: project.type_technologies,
        image_file: project.image ? project.image.name : null,
      })),
      social_links: socialLinks.map((link) => ({
        name: link.name,
        link: link.link,
      })),
      cv_file: cvFile ? cvFile.name : null,
    };

    // Append the JSON payload as a string
    formDataToSend.append("json_payload", JSON.stringify(payload));

    // Append the CV file
    if (cvFile) {
      formDataToSend.append("cv_file", cvFile);
    }

    // Append the project images to the form data
    projects.forEach((project, index) => {
      if (project.image) {
        formDataToSend.append(`project_image_${index}`, project.image);
      }
    });
    try {
      const response = await fetch("https://apiport.onrender.com/portfolio/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Portfolio created successfully!");
        navigate("/portafolio_react/home");
      } else {
        console.error("Failed to create portfolio:", response.status);
        const errorData = await response.json();
        console.error("Error Data", errorData, formDataToSend);
        console.error("Payload", payload);
        console.log(formDataToSend);
        console.log(JSON.stringify(payload));
      }
    } catch (error) {
      console.error("Error creating portfolio:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen  flex items-center justify-center">
      {/* Full screen */}
      <div className="w-full max-w-screen-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Take up the screen width for md devices */}
        <div className="flex justify-end items-center mb-4">
          <button className="text-blue-500 hover:text-blue-700 text-sm">
            Mi cuenta
          </button>
        </div>

        <div className="justify-center flex flex-col items-center">
          <h1 className="text-4xl font-semibold text-gray-700">
            Crea tu propio Portafolio
          </h1>
          <p className="text-gray-600 text-2xl mb-6">Ingresa tus datos</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Datos personales */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Datos personales
            </h2>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="full_name"
              >
                Nombre Completo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="full_name"
                type="text"
                name="full_name"
                placeholder="Type here"
                value={formData.full_name}
                onChange={handleInputChange}
              />
              <p className="text-gray-500 text-xs italic">Assistive Text</p>
            </div>

            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="description"
              >
                Descripción
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="description"
                type="text"
                name="description"
                placeholder="Type here"
                value={formData.description}
                onChange={handleInputChange}
              />
              <p className="text-gray-500 text-xs italic">
                Toma la libertad de escribir un poco sobre ti
              </p>
            </div>

            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="idiomas"
              >
                Idiomas
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="idiomas"
                type="text"
                placeholder="Type here (comma-separated)"
                name="spoken_languages"
                value={formData.spoken_languages.join(", ")}
                onChange={handleInputChange}
              />
              <p className="text-gray-500 text-xs italic">
                Ingresa los idiomas que dominas
              </p>
            </div>

            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="programmingLanguages"
              >
                Lenguajes y frameworks de programación
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="programmingLanguages"
                type="text"
                name="programming_languages"
                placeholder="List your programming languages (comma-separated)"
                value={formData.programming_languages.join(", ")}
                onChange={handleInputChange}
              />
              <p className="text-gray-500 text-xs italic">
                Enter comma-separated languages
              </p>
            </div>

            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="cv_file"
              >
                CV File
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="cv_file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCvFileChange}
                required
              />
              <p className="text-gray-500 text-xs italic">
                Upload your CV (PDF, DOC, DOCX)
              </p>
            </div>
          </div>

          {/* Información profesional */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Información profesional
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor={`project-title-${index}`}
                  >
                    Proyectos
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id={`project-title-${index}`}
                    type="text"
                    name="title"
                    placeholder="Type here"
                    value={project.title}
                    onChange={(event) => handleProjectChange(index, event)}
                  />
                  <p className="text-gray-500 text-xs italic">
                    Ingresa el título de tu proyecto
                  </p>
                </div>

                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor={`project-description-${index}`}
                  >
                    Descripción del proyecto
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id={`project-description-${index}`}
                    type="text"
                    name="description"
                    placeholder="Type here"
                    value={project.description}
                    onChange={(event) => handleProjectChange(index, event)}
                  />
                  <p className="text-gray-500 text-xs italic">
                    Escribe una breve descripción del proyecto
                  </p>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor={`project-year-${index}`}
                  >
                    Year
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id={`project-year-${index}`}
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={project.year}
                    onChange={(event) => handleProjectChange(index, event)}
                  />
                  <p className="text-gray-500 text-xs italic">
                    Year of project
                  </p>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor={`project-type_technologies-${index}`}
                  >
                    Tipo de software que se desarrolló
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id={`project-type_technologies-${index}`}
                    type="text"
                    name="type_technologies"
                    placeholder="List type of technologies for this project (comma-separated)"
                    value={project.type_technologies.join(", ")}
                    onChange={(event) =>
                      handleProjectTechnologiesChange(index, event)
                    }
                  />
                  <p className="text-gray-500 text-xs italic">
                    Enter comma-separated technologies
                  </p>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor={`project-image-${index}`}
                  >
                    Imagen del proyecto
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id={`project-image-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleProjectImageChange(index, event)}
                  />
                  <p className="text-gray-500 text-xs italic">
                    Sube una imagen de tu proyecto
                  </p>
                </div>

                <div className="mt-2 flex items-center">
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="ml-2 bg-[#0A2D2E] hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Redes sociales */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Redes sociales
            </h2>

            <div className="mt-4"></div>

            {socialLinks.map((link, index) => (
              <div key={index} className="mt-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor={`social-name-${index}`}
                >
                  Social Media
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id={`social-name-${index}`}
                  type="text"
                  name="name"
                  placeholder="Type here"
                  value={link.name}
                  onChange={(event) => handleSocialLinkChange(index, event)}
                />
                <p className="text-gray-500 text-xs italic">
                  Ingresa el nombre de tu red social
                </p>

                <div className="mt-2 flex items-center">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    id={`social-link-${index}`}
                    type="text"
                    name="link"
                    placeholder="Type here"
                    value={link.link}
                    onChange={(event) => handleSocialLinkChange(index, event)}
                  />
                  <button
                    type="button"
                    onClick={handleAddSocialLink}
                    className="ml-2 bg-[#0A2D2E] hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-500 text-xs italic">
                  Ingresa el link de tu red social
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-[#064E3B] hover:bg-[#06583a] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              CREAR
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-500 text-xs">
              Powered By FleTechnologies M.R.
            </p>
            <p className="text-gray-500 text-xs">
              Copyright @2020 All rights reserved
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
