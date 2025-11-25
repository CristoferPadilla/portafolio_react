import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
// import { DashboardScreen } from "./views/dashboard.jsx";
import { Portafolio } from "./views/portafolio.jsx";
/* import { LoginScreen } from "./views/loginScreen.jsx"; */
import { FormScreen } from "./views/formScreen.jsx";
import { ComunityScreen } from "./views/comunity.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="portafolio_react/home" element={<ComunityScreen />} />
      <Route path="portafolio_react/portafolio" element={<Portafolio />} />
      {/* <Route path="portafolio_react/" element={<LoginScreen />} /> */}
      <Route path="portafolio_react/" element={<Portafolio />} />
      <Route path="portafolio_react/form" element={<FormScreen />} />
    </Routes>
  </BrowserRouter>
);