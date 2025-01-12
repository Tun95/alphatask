import { Routes, Route } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFoundScreen from "./utilities/404 error/PageNotFound";
import DashboardScreen from "./screens/dashboardscreen/DashboardScreen";
import NavBar from "./common/navbar/NavBar";
import BottomNav from "./common/bottom nav/BottomNav";

function App() {
  return (
    <div className="app">
      <NavBar />
      <BottomNav />
      <Routes>
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/" element={<DashboardScreen />} />
      </Routes>
    </div>
  );
}

export default App;
