import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export function SkillAstronautHUD({ abilities }) {
  const [selectedTech, setSelectedTech] = useState(abilities[0] || null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  if (!abilities || abilities.length === 0) return null;

  const categories = [
    { id: 'ALL', label: 'TODO EL EQUIPAMIENTO' },
    { id: 'Frontend', label: 'FRONTEND' },
    { id: 'Móvil', label: 'MÓVIL' },
    { id: 'Backend', label: 'BACKEND & BD' },
    { id: 'Herramientas', label: 'HERRAMIENTAS' },
  ];

  const getCleanCategory = (tagStr) => {
    if (!tagStr) return 'Herramientas';
    if (tagStr.includes('Frontend')) return 'Frontend';
    if (tagStr.includes('Móvil')) return 'Móvil';
    if (tagStr.includes('Backend') || tagStr.includes('Bases')) return 'Backend';
    return 'Herramientas';
  };

  const filteredAbilities = abilities.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return getCleanCategory(item.tags) === activeCategory;
  });

  return (
    <section className="bg-white py-12 px-4 select-none text-white font-sans overflow-hidden">
      <style>{`
        .hud-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .hud-scrollbar::-webkit-scrollbar-track {
          background: rgba(3, 20, 21, 0.8);
          border-radius: 9999px;
        }
        .hud-scrollbar::-webkit-scrollbar-thumb {
          background: #2dd4bf;
          border-radius: 9999px;
          box-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
        }
        .hud-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5eead4;
        }
        .hud-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #2dd4bf rgba(3, 20, 21, 0.8);
        }
      `}</style>
      <div className="container mx-auto max-w-5xl">
        {/* PANEL PRINCIPAL HUD ESTILO NASA / SCI-FI ELEGANTE */}
        <div className="bg-[#051c1d] border-2 border-teal-500/40 rounded-2xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(10,45,46,0.35)] relative overflow-hidden">
          
          {/* Adornos HUD en esquinas */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-400"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-400"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-400"></div>

          {/* BARRA SUPERIOR DE TELEMETRÍA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-teal-800/60 pb-4 mb-6 gap-2">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-teal-400 animate-ping"></span>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase block">
                  STATUS: ONLINE 
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-wide text-white uppercase">
                  HABILIDADES
                </h2>
              </div>
            </div>
            <div className="bg-teal-950/80 border border-teal-500/30 px-3 py-1 rounded font-mono text-[11px] text-teal-300">
              MISIÓN: EN BUSCA DE UNA OPORTUNIDAD
            </div>
          </div>

          {/* CUERPO DEL HUD EN DOS COLUMNAS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMNA IZQUIERDA: PERFIL Y MÉTRICAS DE EXPERIENCIA (4 cols) */}
            <div className="lg:col-span-4 bg-[#082627]/80 border border-teal-800/50 rounded-xl p-5 flex flex-col items-center text-center relative">
              {/* MONITOR DE RITMO CARDÍACO / CONSTANTES VITALES HUD */}
              <div className="w-full bg-[#031415] border border-teal-500/50 rounded-xl p-3.5 mb-4 relative overflow-hidden flex flex-col justify-between shadow-inner">
                {/* Cuadrícula Radar de Fondo */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#2dd4bf_1px,transparent_1px),linear-gradient(to_bottom,#2dd4bf_1px,transparent_1px)] bg-[size:16px_16px]"></div>

                {/* Encabezado del Monitor */}
                <div className="flex items-center justify-between z-10 mb-1">
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-teal-400 font-bold tracking-wider">PULSE // ECG</span>
                  </div>
                  <span className="text-teal-300 font-mono text-[11px] font-bold bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                    78 BPM
                  </span>
                </div>

                {/* Onda del Ritmo Cardíaco (ECG) en SVG con animación */}
                <div className="w-full h-14 relative z-10 flex items-center justify-center my-1">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 50">
                    {/* Línea guía tenue */}
                    <line x1="0" y1="25" x2="300" y2="25" stroke="#134e4a" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Onda de latido ECG animada */}
                    <motion.path
                      d="M 0 25 L 40 25 L 45 20 L 50 30 L 55 5 L 62 45 L 68 25 L 75 25 L 80 21 L 85 25 L 140 25 L 145 20 L 150 30 L 155 5 L 162 45 L 168 25 L 175 25 L 180 21 L 185 25 L 240 25 L 245 20 L 250 30 L 255 5 L 262 45 L 268 25 L 300 25"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0.2, pathOffset: 0 }}
                      animate={{ pathLength: [0.3, 1, 0.3], pathOffset: [0, 1] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                      style={{ filter: "drop-shadow(0px 0px 6px #2dd4bf)" }}
                    />
                  </svg>
                </div>

                {/* Telemetría Vital Inferior */}
                <div className="flex items-center justify-between font-mono text-[9px] text-teal-300/80 z-10 border-t border-teal-900/80 pt-1.5">
                  <span>VITAL: OPTIMAL</span>
                  <span>O2: 99%</span>
                  <span>SYS: 120/80</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white tracking-wide mb-0.5">CRISTOFER PADILLA</h3>
              <span className="text-xs font-mono text-teal-300 mb-4">INGENIERÍA</span>

              {/* BARRAS DE EXPERIENCIA POR TIEMPO */}
              <div className="w-full space-y-3 font-mono text-[11px] text-left border-t border-teal-800/60 pt-4">
                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>FRONTEND</span>
                    <span className="text-teal-400 font-bold">1 AÑO</span>
                  </div>
                  <div className="w-full bg-teal-950 rounded-full h-1.5 overflow-hidden border border-teal-800/60">
                    <div className="bg-teal-400 h-full rounded-full w-[65%] shadow-[0_0_8px_teal]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>MOBILE</span>
                    <span className="text-teal-400 font-bold">6 MESES</span>
                  </div>
                  <div className="w-full bg-teal-950 rounded-full h-1.5 overflow-hidden border border-teal-800/60">
                    <div className="bg-teal-400 h-full rounded-full w-[50%] shadow-[0_0_8px_teal]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>BACKEND & DATABASE</span>
                    <span className="text-teal-400 font-bold">2 MESES</span>
                  </div>
                  <div className="w-full bg-teal-950 rounded-full h-1.5 overflow-hidden border border-teal-800/60">
                    <div className="bg-teal-400 h-full rounded-full w-[40%] shadow-[0_0_8px_teal]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: SELECCIÓN DE EQUIPAMIENTO / MÓDULOS (8 cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              {/* FILTROS DE CATEGORÍA HUD */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-teal-400 text-gray-950 shadow-[0_0_15px_rgba(45,212,191,0.6)]'
                        : 'bg-teal-950/80 text-teal-300 border border-teal-800/60 hover:bg-teal-900/60'
                    }`}
                  >
                    [{cat.label}]
                  </button>
                ))}
              </div>

              {/* GRILLA DE MÓDULOS DE EQUIPAMIENTO */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mb-5 min-h-[120px]">
                {filteredAbilities.map((ability) => {
                  const isSelected = selectedTech?.name === ability.name;

                  return (
                    <motion.button
                      key={ability.name}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedTech(ability)}
                      onMouseEnter={() => setSelectedTech(ability)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all duration-200 cursor-pointer relative ${
                        isSelected
                          ? 'bg-teal-950 border-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.4)]'
                          : 'bg-[#082627]/60 border-teal-900/40 hover:border-teal-500/50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-950 p-1.5 border border-teal-800/50 flex items-center justify-center shrink-0">
                        <img src={ability.icon} alt={ability.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate">{ability.name}</h4>
                        <span className="text-[9px] font-mono text-teal-300 block truncate">{ability.tags}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* CONSOLA DE INSPECCIÓN DE ESPECIFICACIONES DE MÓDULO */}
              <AnimatePresence mode="wait">
                {selectedTech && (
                  <motion.div
                    key={selectedTech.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#031415] border border-teal-500/50 rounded-xl p-4 relative font-mono"
                  >
                    <div className="flex items-center justify-between border-b border-teal-900 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-teal-400 font-bold">MODULE SPEC:</span>
                        <span className="text-sm font-black text-white uppercase">{selectedTech.name}</span>
                      </div>
                      <span className="text-[10px] text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                        DEPLOYED: {selectedTech.date || '2023'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {selectedTech.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

SkillAstronautHUD.propTypes = {
  abilities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string,
      date: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};
