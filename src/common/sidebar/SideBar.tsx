import "./styles.scss";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function SideBar() {
  return (
    <div className="side_bar">
      <div className="content">
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
}

export default SideBar;
