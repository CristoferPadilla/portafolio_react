import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormComponent() {
  // Estado inicial que coincide exactamente con la estructura esperada
  const [formData, setFormData] = useState({
    full_name: "",
    description: "",
    spoken_languages: [],
    programming_languages: [],
    projects: [
      {
        title: "",
        description: "",
        type_technologies: [],
        year: new Date().getFullYear(),
        image_file: null
      }
    ],
    social_links: [
      {
        name: "",
        link: ""
      }
    ],
    cv_file: null
  });

  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("personal");

  // ==================== MÉTODOS DEL FORMULARIO ====================

  // Manejar cambios en campos básicos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (["spoken_languages", "programming_languages"].includes(name)) {
      setFormData({
        ...formData,
        [name]: value.split(",")
          .map(item => item.trim())
          .filter(item => item)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Validación en tiempo real
      if (["full_name", "description"].includes(name)) {
        validateField(name, value);
      }
    }
  };

  // Validar campo individual
  const validateField = (name, value) => {
    const newErrors = {...errors};
    
    if (name === "full_name" && !value.trim()) {
      newErrors.full_name = "Nombre completo es requerido";
    } else if (name === "description" && (!value.trim() || value.trim().length < 10)) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres";
    } else {
      delete newErrors[name];
    }
    
    setErrors(newErrors);
  };

  // Manejar archivo CV
  const handleCvFileChange = (e) => {
    setFormData({
      ...formData,
      cv_file: e.target.files[0]
    });
  };

  // ==================== MÉTODOS PARA PROYECTOS ====================

  // Manejar cambios en proyectos
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    
    if (name === "year") {
      updatedProjects[index][name] = parseInt(value) || new Date().getFullYear();
    } else if (name === "type_technologies") {
      updatedProjects[index][name] = value.split(",")
        .map(item => item.trim())
        .filter(item => item);
    } else {
      updatedProjects[index][name] = value;
    }
    
    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  // Manejar imagen de proyecto
  const handleProjectImageChange = (index, e) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index].image_file = e.target.files[0];
    
    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  // Añadir nuevo proyecto
  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: "",
          description: "",
          type_technologies: [],
          year: new Date().getFullYear(),
          image_file: null
        }
      ]
    });
  };

  // Eliminar proyecto
  const handleRemoveProject = (index) => {
    if (formData.projects.length > 1) {
      const updatedProjects = [...formData.projects];
      updatedProjects.splice(index, 1);
      
      setFormData({
        ...formData,
        projects: updatedProjects
      });
    }
  };

  // ==================== MÉTODOS PARA REDES SOCIALES ====================

  // Manejar cambios en redes sociales
  const handleSocialLinkChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSocialLinks = [...formData.social_links];
    
    if (name === "link" && value && !value.startsWith("http")) {
      updatedSocialLinks[index][name] = `https://${value}`;
    } else {
      updatedSocialLinks[index][name] = value;
    }
    
    setFormData({
      ...formData,
      social_links: updatedSocialLinks
    });
  };

  // Añadir nueva red social
  const handleAddSocialLink = () => {
    setFormData({
      ...formData,
      social_links: [
        ...formData.social_links,
        {
          name: "",
          link: ""
        }
      ]
    });
  };

  // ==================== VALIDACIÓN COMPLETA ====================

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Nombre completo es requerido";
    }
    
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres";
    }
    
    // Validar proyectos
    formData.projects.forEach((project, index) => {
      if (!project.title.trim()) {
        newErrors[`project_${index}_title`] = "Título del proyecto es requerido";
      }
    });
    
    // Validar redes sociales
    formData.social_links.forEach((link, index) => {
      if (link.name.trim() && !link.link.trim()) {
        newErrors[`social_${index}_link`] = "Enlace es requerido si nombre está completado";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==================== ENVÍO DEL FORMULARIO ====================

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // 1. Prepara los datos estructurados correctamente
      const portfolioRequest = {
        full_name: formData.full_name.trim(),
        description: formData.description.trim(),
        spoken_languages: formData.spoken_languages,
        programming_languages: formData.programming_languages,
        projects: formData.projects.map(project => ({
          title: project.title.trim(),
          description: project.description.trim(),
          type_technologies: project.type_technologies,
          year: project.year
        })),
        social_links: formData.social_links
          .filter(link => link.name.trim() || link.link.trim())
          .map(link => ({
            name: link.name.trim(),
            link: link.link.startsWith("http") ? link.link : `https://${link.link}`
          }))
      };
  
      // 2. Crea el FormData y añade los datos correctamente
      const formDataToSend = new FormData();
      
      // IMPORTANTE: Añade el objeto como JSON stringificado
      formDataToSend.append(
        "portfolio_request", 
        new Blob([JSON.stringify(portfolioRequest)], {
          type: "multipart/form-data"
        }),
        "portfolio_request.json"
      );
  
      // 3. Añade los archivos
      if (formData.cv_file) {
        formDataToSend.append("cv_file", formData.cv_file);
      }
  
      formData.projects.forEach((project, index) => {
        if (project.image_file) {
          formDataToSend.append(
            `project_images_${index}`,
            project.image_file
          );
        }
      });
  
      // 4. Envía la solicitud
      const response = await fetch("https://apiport.onrender.com/portfolio", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formDataToSend
      });
  
      // 5. Maneja la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Detalles del error del servidor:", errorData);
        
        let errorMessage = "Error al enviar el formulario";
        if (response.status === 422) {
          errorMessage = "Errores de validación:\n";
          if (Array.isArray(errorData.detail)) {
            errorData.detail.forEach(err => {
              errorMessage += `${err.loc?.join('.') || 'campo'}: ${err.msg}\n`;
            });
          } else {
            errorMessage += JSON.stringify(errorData.detail, null, 2);
          }
        }
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      navigate("/portfolio_react/home", { state: { portfolio: result } });
    } catch (error) {
      console.error("Error completo:", error);
      alert(error.message);
    }
  };

  // ==================== NAVEGACIÓN ====================

  const hasData = () => {
    return (
      formData.full_name.trim() ||
      formData.description.trim() ||
      formData.spoken_languages.length > 0 ||
      formData.programming_languages.length > 0 ||
      formData.cv_file ||
      formData.projects.some(p => p.title.trim() || p.description.trim() || p.image_file) ||
      formData.social_links.some(s => s.name.trim() || s.link.trim())
    );
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

  // ==================== RENDERIZADO ====================

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
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
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
          title="Regresar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div className="p-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Crea tu Portafolio
          </h1>
          <p className="text-gray-600 mt-2">Ingresa tus datos por secciones</p>
        </div>

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
                  Nombre Completo*
                </label>
                <input
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.full_name ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción*
                </label>
                <textarea
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
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
              {formData.projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <h3 className="font-medium mb-4">Proyecto {index + 1}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Título del proyecto*
                      </label>
                      <input
                        className={`w-full px-4 py-2 border rounded-lg ${
                          errors[`project_${index}_title`] ? "border-red-500" : ""
                        }`}
                        type="text"
                        name="title"
                        value={project.title}
                        onChange={(e) => handleProjectChange(index, e)}
                      />
                      {errors[`project_${index}_title`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`project_${index}_title`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Descripción
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border rounded-lg"
                        name="description"
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, e)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Año
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-lg"
                        type="number"
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
                        onChange={(e) => handleProjectChange(index, {
                          target: {
                            name: "type_technologies",
                            value: e.target.value
                          }
                        })}
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

                    {formData.projects.length > 1 && (
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
              {formData.social_links.map((link, index) => (
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
                        className={`w-full px-4 py-2 border rounded-lg ${
                          errors[`social_${index}_link`] ? "border-red-500" : ""
                        }`}
                        type="url"
                        name="link"
                        value={link.link}
                        onChange={(e) => handleSocialLinkChange(index, e)}
                        placeholder="https://..."
                      />
                      {errors[`social_${index}_link`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`social_${index}_link`]}
                        </p>
                      )}
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

          <div className="text-center mt-8 pt-4 border-t text-xs text-gray-500">
            <p>Powered By FleTechnologies M.R.</p>
            <p>Copyright @2020 All rights reserved</p>
          </div>
        </form>
      </div>
    </div>
  );
}