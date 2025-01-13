import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({

  //QUITAR EL BASE PARA QUE FUNCIONE LOCAL, Y PONER EL BASE PARA QUE FUNCIONE EL DEPLOY
  base: '/portafolio_react/',
  plugins: [react()],
})
