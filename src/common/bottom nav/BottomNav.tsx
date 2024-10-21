import React from "react";
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

function BottomNav() {
  const { state } = useAppContext();
  const { theme } = state;

  const [value, setValue] = React.useState(0);

  const backgroundColor = theme === "dark" ? "#484554" : "#ffffff"; // Example light color

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
