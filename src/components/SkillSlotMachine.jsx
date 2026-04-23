import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export function SkillSlotMachine({ abilities }) {
  const ITEM_HEIGHT = 100;
  const VISIBLE_ITEMS = 3;
  const ITEMS_PER_SPIN = 25;

  const generateRandomStrip = (length) => {
    return Array.from({ length }).map(() => abilities[Math.floor(Math.random() * abilities.length)]);
  };

  const [reels, setReels] = useState([
    generateRandomStrip(3),
    generateRandomStrip(3),
    generateRandomStrip(3)
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);

  const spinSlots = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowModal(false);
    setLeverPulled(true);

    setTimeout(() => setLeverPulled(false), 400);

    let strip1 = [...reels[0], ...generateRandomStrip(ITEMS_PER_SPIN - VISIBLE_ITEMS)];
    let strip2 = [...reels[1], ...generateRandomStrip(ITEMS_PER_SPIN - VISIBLE_ITEMS)];
    let strip3 = [...reels[2], ...generateRandomStrip(ITEMS_PER_SPIN - VISIBLE_ITEMS)];

    const forceWin = Math.random() < 0.20;

    const winIndex = ITEMS_PER_SPIN - 2;

    if (forceWin) {
      const winAbility = abilities[Math.floor(Math.random() * abilities.length)];
      strip1[winIndex] = winAbility;
      strip2[winIndex] = winAbility;
      strip3[winIndex] = winAbility;
    } else {
      if (strip1[winIndex].name === strip2[winIndex].name && strip2[winIndex].name === strip3[winIndex].name) {
        strip3[winIndex] = abilities[(abilities.indexOf(strip3[winIndex]) + 1) % abilities.length];
      }
    }

    setReels([strip1, strip2, strip3]);

    setTimeout(() => {
      setIsSpinning(false);
      setReels([
        strip1.slice(-3),
        strip2.slice(-3),
        strip3.slice(-3)
      ]);

      const middle1 = strip1[winIndex];
      const middle2 = strip2[winIndex];
      const middle3 = strip3[winIndex];

      if (middle1.name === middle2.name && middle2.name === middle3.name) {
        setTimeout(() => {
          setShowModal(true);
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = "https://drive.google.com/uc?export=download&id=1Cy5oWQBAWyNAAszeDZU5FMJmxaBVofz4";
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 2000);
        }, 400);
      }
    }, 3200);
  };

  if (!abilities || abilities.length === 0) return null;

  return (
    <section className="bg-gray-50 pb-20 pt-10 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 mb-12 max-w-xl mx-auto text-lg">
          ¿Quieres conocer más sobre mis habilidades? Te aconsejo tirar de la palanca.
        </p>

        <motion.div
          className="flex flex-row items-end justify-center max-w-4xl mx-auto"
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <div className="bg-gradient-to-b from-[#0A2D2E] to-teal-950 p-6 md:p-8 rounded-3xl border-8 border-teal-800 shadow-[0_20px_50px_rgba(10,45,46,0.6)] relative">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-black text-2xl px-8 py-1 rounded-full border-4 border-teal-300 shadow-[0_0_30px_rgba(20,184,166,0.8)] z-20 uppercase tracking-widest flex items-center gap-2">
              <span className="animate-pulse"></span> Mis habilidades <span className="animate-pulse"></span>
            </div>
            <div className="bg-white p-3 rounded-xl border-4 border-teal-700 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] flex gap-2 relative overflow-hidden">

              <div className="absolute top-[106px] left-0 right-0 h-[100px] border-y-4 border-teal-500/80 bg-teal-500/15 z-10 pointer-events-none shadow-[0_0_15px_rgba(20,184,166,0.5)] flex items-center justify-between px-2">
                <div className="w-4 h-4 rounded-full bg-teal-400 shadow-[0_0_10px_teal] animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-teal-400 shadow-[0_0_10px_teal] animate-pulse"></div>
              </div>

              {reels.map((strip, reelIndex) => (
                <div key={reelIndex} className="w-20 md:w-28 h-[300px] bg-teal-50 rounded-lg overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] border border-teal-200">
                  <motion.div
                    className="flex flex-col w-full absolute top-0 left-0"
                    animate={{ y: isSpinning ? -(strip.length - VISIBLE_ITEMS) * ITEM_HEIGHT : 0 }}
                    transition={{
                      duration: isSpinning ? 2 + reelIndex * 0.5 : 0,
                      ease: isSpinning ? [0.15, 0.85, 0.35, 1] : "linear"
                    }}
                  >
                    {strip.map((ability, itemIndex) => (
                      <div key={`${reelIndex}-${itemIndex}`} className="w-full h-[100px] flex flex-col items-center justify-center border-b border-gray-200 bg-white">
                        <img src={ability.icon} alt={ability.name} className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-sm mb-1" />
                        <p className="text-[9px] md:text-[11px] font-bold text-gray-700 truncate w-full px-1 text-center leading-tight">{ability.name}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center px-4">
              <div className="flex gap-2">
                {[1, 2, 3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_8px_teal]"></div>)}
              </div>
              <div className="bg-teal-950 px-4 py-1 rounded border border-teal-700 text-teal-300 font-mono text-sm shadow-inner">
                WIN PAYS
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_8px_teal]"></div>)}
              </div>
            </div>
          </div>

          <div className="relative h-[250px] w-12 md:w-16 bg-gradient-to-r from-[#0A2D2E] to-teal-800 rounded-r-3xl border-y-4 border-r-4 border-teal-700 flex justify-center py-4 shadow-2xl ml-[-4px] z-[-1]">
            <div className="w-2 h-[180px] bg-black rounded-full absolute top-8 shadow-inner"></div>
            <motion.div
              className="absolute w-4 md:w-6 h-24 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full cursor-pointer z-10 shadow-xl flex flex-col items-center justify-start hover:brightness-110"
              animate={{ y: leverPulled ? 110 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              onClick={spinSlots}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-teal-400 to-teal-700 rounded-full shadow-[0_10px_15px_rgba(0,0,0,0.6)] -mt-6 md:-mt-8 border-2 border-teal-800/50 flex items-center justify-center">
                <div className="w-4 h-4 bg-white/30 rounded-full absolute top-2 left-2 blur-[1px]"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            >
              <motion.div
                initial={{ scale: 0.5, y: 100, rotate: -10 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-gradient-to-b from-teal-50 to-white rounded-3xl p-8 max-w-md w-full mx-auto text-center shadow-[0_0_50px_rgba(20,184,166,0.5)] border-4 border-teal-500 relative overflow-hidden"
              >
                {/* Lluvia de monedas / confeti */}
                <div className="absolute inset-0 pointer-events-none opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>


                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-[#0A2D2E] mb-4 relative z-10 uppercase">
                  ¡LO LOGRASTE!
                </h3>

                <p className="text-gray-700 mb-8 text-lg relative z-10 font-medium">
                  Has logrado la combinación perfecta. <br /><br />
                  <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-lg border border-teal-300 shadow-sm block">
                    Descargando el gran premio...
                  </span>
                </p>

                <button
                  onClick={() => setShowModal(false)}
                  className="relative z-10 bg-gradient-to-r from-teal-600 to-[#0A2D2E] text-white px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all shadow-lg hover:shadow-teal-500/50 hover:-translate-y-1"
                >
                  ¡Aceptar!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

SkillSlotMachine.propTypes = {
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
