// import { useState } from "react";

// export function PokeScreen() {
//   const [pokemonData, setPokemonData] = useState(null); // Almacena los datos del Pokémon
//   const [searchName, setSearchName] = useState(""); // Almacena el nombre a buscar
//   const [error, setError] = useState(null); // Almacena errores de la API

//   async function FetchPokemon() {
//     const pokeApi = `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`; 
//     try {
//       const response = await fetch(pokeApi);

//       if (!response.ok) {
//         throw new Error("No se encontró el Pokémon");
//       }

//       const data = await response.json();
//       setPokemonData(data); // Guarda los datos en el estado
//       setError(null); // Limpia errores anteriores
//     } catch (err) {
//       setError(err.message);
//       setPokemonData(null); // Limpia los datos si hay un error
//     }
//   }

//   return (
//     <article className="pk-screen-container">
//       <div className="pk-view-visualization">
//         {pokemonData ? (
//           <>
//             {/* Imagen y nombre del Pokémon */}
//             <img
//               className="pk-image"
//               src={pokemonData.sprites.front_default}
//               alt={pokemonData.name}
//             />
//             <aside>
//               <p className="pk-description">
//                 <strong>Nombre:</strong> {pokemonData.name}
//               </p>
//               <p className="pk-description">
//                 <strong>Altura:</strong> {pokemonData.height / 10} m
//               </p>
//               <p className="pk-description">
//                 <strong>Peso:</strong> {pokemonData.weight / 10} kg
//               </p>
//             </aside>
//           </>
//         ) : error ? (
//           <p className="pk-error">{error}</p>
//         ) : (
//           <p className="pk-placeholder">Busca un Pokémon</p>
//         )}
//       </div>

//       {/* Footer con input y botón */}
//       <footer className="pk-footer">
//         <input
//           placeholder="Buscar Pokémon"
//           className="pk-input"
//           type="text"
//           value={searchName} // Input controlado
//           onChange={(e) => setSearchName(e.target.value)} // Actualiza el nombre
//         />
//         <button className="pk-searchButton" onClick={FetchPokemon}>
//           Buscar
//         </button>
//       </footer>
//     </article>
//   );
// }
