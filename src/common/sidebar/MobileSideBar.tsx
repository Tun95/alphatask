import "./styles.scss";
import Drawer from "@mui/material/Drawer";
import React from "react";
import SideBar from "./SideBar";
import menu from "../../assets/icons/menu.png";
import { useAppContext } from "../../utilities/utils/Utils";
import { Anchor } from "../../context/Context";

function MobileSideBar() {
  const { state, toggleDrawer } = useAppContext();
  const { drawer } = state;

  return (
    <div className="mobile_side_bar">
      <div className="m_side_bar_content">
        <div>
          {["left"].map((anchor, index) => (
            <React.Fragment key={index}>
              <div
                className="img"
                onClick={() => toggleDrawer(anchor as Anchor, true)} 
              >
                <img src={menu} alt="side bar" className="white_image" />
              </div>

              <Drawer
                anchor={anchor as Anchor}
                open={drawer[anchor as Anchor]} 
                onClose={() => toggleDrawer(anchor as Anchor, false)} 
                className="side_bar_drawer"
                PaperProps={{
                  sx: {
                    backgroundColor: "var(--color-white)",

                    "@media (max-width: 420px)": {
                      width: "100%",
                    },
                  },
                }}
              >
                <div className="main">
                  <SideBar anchor={anchor as Anchor} />
                </div>
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileSideBar;
