import { Routes, Route } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFoundScreen from "./utilities/404 error/PageNotFound";
import DashboardScreen from "./screens/dashboardscreen/DashboardScreen";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/" element={<DashboardScreen />} />
      </Routes>
    </div>
  );
}

export default App;
