// SideBar.tsx
import "./styles.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import logo from "../../assets/logo/logo.png";
import user from "../../assets/icons/user.png";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Switch } from "antd";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { CommentOutlined, SettingOutlined } from "@ant-design/icons";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "../../utilities/utils/Utils";
import { Anchor } from "../../context/Context";
import { NotificationModal } from "../modals/Modals";

interface SideBarProps {
  anchor: Anchor;
}

const SideBar: React.FC<SideBarProps> = ({ anchor }) => {
  const { toggleDrawer, collapsed, setCollapsed, handleOpenModal } =
    useAppContext();

  //Notification Modal
  const openModal = () => {
    handleOpenModal("notification");
  };

  return (
    <>
      {" "}
      <div className={`side_bar ${collapsed ? "collapsed" : ""}`}>
        <div className="content">
          {/* Logo section */}
          <div className="logo_icon c_flex">
            <div className="logo-section a_flex">
              <img src={logo} alt="Logo" className="logo" />
              {!collapsed && <h2 className="logo_text">Alphat</h2>}
            </div>
            <div className="close_icon l_flex">
              <CloseIcon
                className="icon"
                onClick={() => toggleDrawer(anchor as Anchor, false)}
              />
            </div>
          </div>

          {/* Menu items */}
          <div className="menu">
            <div className="top">
              <div className="menu_item">
                <HomeOutlinedIcon className="icon" />
                {!collapsed && <span className="list_item"> Home</span>}
              </div>
              <div className="menu_item">
                <CalendarMonthOutlinedIcon className="icon" />
                {!collapsed && <span className="list_item"> Events</span>}
              </div>
              <div className="menu_item">
                <RecordVoiceOverOutlinedIcon className="icon" />
                {!collapsed && <span className="list_item"> Speakers</span>}
              </div>
              <div className="menu_item">
                <ArticleOutlinedIcon className="icon" />
                {!collapsed && <span className="list_item"> Reports</span>}
              </div>
            </div>

            <div className="bottom">
              <div className="menu_item" onClick={openModal}>
                <NotificationsNoneOutlinedIcon className="icon" />
                {collapsed && (
                  <span className="dot">
                    <FiberManualRecordIcon className="dot_icon" />
                  </span>
                )}
                <div className="notifictaion_counter c_flex">
                  {" "}
                  {!collapsed && (
                    <>
                      <span className="list_item"> Notifications</span>
                      <span className="couter l_flex">
                        <small className="count">3</small>
                      </span>{" "}
                    </>
                  )}
                </div>
              </div>
              <div className="menu_item">
                <CommentOutlined className="icon" />
                {!collapsed && <span className="list_item"> Messages</span>}
              </div>
              <div className="menu_item">
                <SettingOutlined className="icon" />
                {!collapsed && <span className="list_item"> Settings</span>}
              </div>

              {/* Collapse/Expand functionality */}
              <div
                className="menu_item collapse_item"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? (
                  <KeyboardDoubleArrowLeftIcon className="icon" />
                ) : (
                  <KeyboardDoubleArrowRightIcon className="icon" />
                )}
                {!collapsed && <span className="list_item"> Collapse</span>}
              </div>

              <div className="menu_item dark_mode">
                <Switch size="small" defaultChecked className="switch" />
                {!collapsed && <span className="list_item"> Dark mode</span>}
              </div>

              <div className="menu_item user_info">
                <img src={user} alt="User" className="user_icon" />
                {!collapsed && (
                  <div className="name_email">
                    <span className="name">Redra Devi</span>
                    <span className="email">rudra.dev@gmail.com</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Notification modal */}
      <NotificationModal />
    </>
  );
};

export default SideBar;
