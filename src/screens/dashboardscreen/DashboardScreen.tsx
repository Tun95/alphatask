import { Helmet } from "react-helmet-async";
import "./styles.scss";
import NavBar from "../../common/navbar/NavBar";
import SideBar from "../../common/sidebar/SideBar";
import Widget from "../../components/dashboard/widgets/Widget";
import BarChart from "../../components/dashboard/chart/Chart";
import SliderComponent from "../../components/dashboard/slider/Slider";
import TableComponent from "../../components/dashboard/table/Table";

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
            <div className="side_menu">
              <SideBar anchor="left" />
            </div>
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
            <div className="chart_slider_section">
              <div className="header">
                <h4>Event Registrations per month</h4>
              </div>
              <div className="chart_slider ">
                <div className="bar_chart">
                  <BarChart />
                </div>
                <div className="slider">
                  <SliderComponent />
                </div>
              </div>
            </div>
            <div className="table_filters">
              <TableComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
