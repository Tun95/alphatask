import "./styles.scss";
import logo from "../../assets/logo/logo.png";
import MobileSideBar from "../sidebar/MobileSideBar";

function NavBar() {
  return (
    <>
      <div className="nav_bar">
        <div className="mobile_nav c_flex">
          {" "}
          <div className="logo_text a_flex">
            <div className="img">
              <img src={logo} alt="logo" />
            </div>
            <div className="text">
              <h2>Alphat</h2>
            </div>
          </div>
          <div className="side_bar_icon">
            <MobileSideBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
