import { useAppContext } from "../../utilities/utils/Utils";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";

export function NotificationModal() {
  const { currentModal, handleCloseModal } = useAppContext();

  //Login Menu
  const navigateToLogin = () => {
    handleCloseModal();
  };
  //Register Menu
  const navigateToRegister = () => {
    handleCloseModal();
  };

  return (
    <div>
      <Modal
        open={currentModal === "notification"}
        onClose={handleCloseModal}
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
        className="bill_modal_drawer"
      >
        <Box className="bills_menu_modal drawer_modal otp_menu login_menu">
          <div className="drawer_close_icon">
            <span onClick={handleCloseModal} className="span_icon l_flex">
              <CloseIcon className="icon" />
            </span>
          </div>
          <div className="header_box">
            <div className="header">
              <h2>Oops, I'm sorry!!!</h2>
            </div>
            <div className="text">
              <small>
                You have to register or login your credentials to have access to
                perform operations
              </small>
            </div>
            <div className="btn">
              <div className="reg_confirm_btn">
                {" "}
                <button onClick={navigateToRegister} className="main_btn">
                  Register
                </button>
              </div>
              <div className="login_btn">
                <button onClick={navigateToLogin} className="main_btn">
                  Log In
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
