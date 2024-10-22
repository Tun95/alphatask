import React, { useEffect } from "react";
import "./styles.scss";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAppContext } from "../../utilities/utils/Utils";
import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {
  const { state } = useAppContext();
  const { theme } = state;

  const navigate = useNavigate();
  const location = useLocation();

  // Keep track of the current path and set the active tab based on the path
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/events":
        setValue(1);
        break;
      case "/speakers":
        setValue(2);
        break;
      case "/reports":
        setValue(3);
        break;
      case "/profile":
        setValue(4);
        break;
      default:
        setValue(0); 
    }
  }, [location.pathname]);

  const backgroundColor = theme === "dark" ? "#484554" : "#ffffff"; 

  return (
    <div className="bottom_nav">
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          className={`bottom_menu ${theme === "dark" && "bottom_menu_dark"}`}
          onChange={(_, newValue) => {
            setValue(newValue);
            // Navigate to the corresponding route
            switch (newValue) {
              case 0:
                navigate("/");
                break;
              case 1:
                navigate("/events");
                break;
              case 2:
                navigate("/speakers");
                break;
              case 3:
                navigate("/reports");
                break;
              case 4:
                navigate("/profile");
                break;
              default:
                navigate("/"); // Default to Home
            }
          }}
          sx={{ bgcolor: backgroundColor }}
        >
          <BottomNavigationAction
            disableRipple
            className="menus"
            label="Home"
            icon={<HomeOutlinedIcon className="icon" />}
          />
          <BottomNavigationAction
            disableRipple
            className="menus"
            label="Events"
            icon={<CalendarMonthOutlinedIcon className="icon" />}
          />
          <BottomNavigationAction
            disableRipple
            className="menus"
            label="Speakers"
            icon={<RecordVoiceOverOutlinedIcon className="icon" />}
          />
          <BottomNavigationAction
            disableRipple
            className="menus"
            label="Report"
            icon={<ArticleOutlinedIcon className="icon" />}
          />
          <BottomNavigationAction
            disableRipple
            className="menus_profile"
            label="Profile"
            icon={<AccountCircleOutlinedIcon className="icon" />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default BottomNav;
