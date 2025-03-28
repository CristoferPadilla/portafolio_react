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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
  const [activeTab, setActiveTab] = useState("personal");

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

  const hasData = () => {
    // Verificar si hay datos en el formulario principal
    if (formData.full_name || formData.description || 
        formData.spoken_languages.length > 0 || 
        formData.programming_languages.length > 0 || 
        cvFile) {
      return true;
    }
    
    // Verificar si hay datos en los proyectos
    if (projects.some(project => 
      project.title || project.description || 
      project.year || project.type_technologies.length > 0 || 
      project.image)) {
      return true;
    }
    
    // Verificar si hay datos en los enlaces sociales
    if (socialLinks.some(link => link.name || link.link)) {
      return true;
    }
    
    return false;
  };

  const handleGoBack = () => {
    if (hasData()) {
      setShowConfirmModal(true);
    } else {
      navigate(-1);
    }
  };

  const confirmGoBack = () => {
    setShowConfirmModal(false);
    navigate(-1);
  };

  const cancelGoBack = () => {
    setShowConfirmModal(false);
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      {showConfirmModal && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white border-2 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">¿Estás seguro?</h3>
            <p className="mb-6 text-gray-700">Tienes datos sin guardar. ¿Realmente quieres salir?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelGoBack}
                className="px-4 py-2 border rounded-lg hover:bg-gray-200 transition text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmGoBack}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-screen-md bg-white shadow-md rounded-lg overflow-hidden relative">
        {/* Botón para regresar */}
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
          title="Regresar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Encabezado */}
        <div className="p-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Crea tu Portafolio
          </h1>
          <p className="text-gray-600 mt-2">Ingresa tus datos por secciones</p>
        </div>

        {/* Pestañas */}
        <div className="flex border-b">
          <button
            className={`py-3 px-6 font-medium text-sm ${activeTab === "personal" ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("personal")}
          >
            Datos Personales
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm ${activeTab === "professional" ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("professional")}
          >
            Proyectos
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm ${activeTab === "social" ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("social")}
          >
            Redes Sociales
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Sección Datos Personales */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre Completo
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-gray-500 text-xs mt-1">
                  Toma la libertad de escribir un poco sobre ti
                </p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Idiomas
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  name="spoken_languages"
                  value={formData.spoken_languages.join(", ")}
                  onChange={handleInputChange}
                  placeholder="Inglés, Español, Francés..."
                />
                <p className="text-gray-500 text-xs mt-1">
                  Separa con comas los idiomas que dominas
                </p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Lenguajes de programación
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  name="programming_languages"
                  value={formData.programming_languages.join(", ")}
                  onChange={handleInputChange}
                  placeholder="JavaScript, Python, Java..."
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Curriculum Vitae
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvFileChange}
                  required
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
                  onClick={() => setActiveTab("professional")}
                >
                  Siguiente: Proyectos
                </button>
              </div>
            </div>
          )}

          {/* Sección Proyectos */}
          {activeTab === "professional" && (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <h3 className="font-medium mb-4">Proyecto {index + 1}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Título del proyecto
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-lg"
                        type="text"
                        name="title"
                        value={project.title}
                        onChange={(e) => handleProjectChange(index, e)}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Descripción
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-lg"
                        type="text"
                        name="description"
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, e)}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Año
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-lg"
                        type="text"
                        name="year"
                        value={project.year}
                        onChange={(e) => handleProjectChange(index, e)}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Tecnologías utilizadas
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-lg"
                        type="text"
                        value={project.type_technologies.join(", ")}
                        onChange={(e) => handleProjectTechnologiesChange(index, e)}
                        placeholder="React, Node.js, MongoDB..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Imagen del proyecto
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-lg"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProjectImageChange(index, e)}
                      />
                    </div>

                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(index)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Eliminar proyecto
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  className="text-gray-600 px-6 py-2 rounded-lg border hover:bg-gray-50 transition"
                  onClick={() => setActiveTab("personal")}
                >
                  Anterior
                </button>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    + Añadir Proyecto
                  </button>
                  <button
                    type="button"
                    className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
                    onClick={() => setActiveTab("social")}
                  >
                    Siguiente: Redes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sección Redes Sociales */}
          {activeTab === "social" && (
            <div className="space-y-6">
              {socialLinks.map((link, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <h3 className="font-medium mb-4">Red Social {index + 1}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre de la red
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-lg"
                        type="text"
                        name="name"
                        value={link.name}
                        onChange={(e) => handleSocialLinkChange(index, e)}
                        placeholder="LinkedIn, GitHub, Twitter..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Enlace
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-lg"
                        type="text"
                        name="link"
                        value={link.link}
                        onChange={(e) => handleSocialLinkChange(index, e)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  className="text-gray-600 px-6 py-2 rounded-lg border hover:bg-gray-50 transition"
                  onClick={() => setActiveTab("professional")}
                >
                  Anterior
                </button>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleAddSocialLink}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    + Añadir Red
                  </button>
                  <button
                    type="submit"
                    className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
                  >
                    Enviar Portafolio
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8 pt-4 border-t text-xs text-gray-500">
            <p>Powered By FleTechnologies M.R.</p>
            <p>Copyright @2020 All rights reserved</p>
          </div>
        </form>
      </div>
    </div>
  );
}