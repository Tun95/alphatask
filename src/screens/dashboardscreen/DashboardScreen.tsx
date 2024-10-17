import { Helmet } from "react-helmet-async";
import "./styles.scss";
import NavBar from "../../common/navbar/NavBar";
import SideBar from "../../common/sidebar/SideBar";
function DashboardScreen() {
  return (
    <div className="dashboard_screen">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="dashborad_content">
        <div className="content f_flex">
          <div className="left">
            <SideBar />
          </div>
          <div className="right">
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
