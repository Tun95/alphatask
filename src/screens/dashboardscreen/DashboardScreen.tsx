import { Helmet } from "react-helmet-async";
import "./styles.scss";
import NavBar from "../../common/navbar/NavBar";
import SideBar from "../../common/sidebar/SideBar";
import Widget from "../../components/dashboard/widgets/Widget";
function DashboardScreen() {
  const TotalEvent = 100000;
  const TotalSpeakers = 25;
  const TotalUsers = 300;
  const TotalRevenue = 500000;

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

          <div className="right ">
            <div className="nav">
              {" "}
              <NavBar />
            </div>
            <div className="widgets">
              <Widget TotalEvent={TotalEvent} type="events" />
              <Widget TotalSpeakers={TotalSpeakers} type="speakers" />
              <Widget TotalUsers={TotalUsers} type="users" />
              <Widget TotalRevenue={TotalRevenue} type="revenue" />
            </div>
            <div className="chart_slider">
              <div className="chart"></div>
              <div className="slider"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
