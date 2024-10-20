import { useAppContext } from "../../utilities/utils/Utils";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";
import { DataType } from "../../data/Data";
import sp from "../../assets/icons/sp.png";

interface EventDetailsModalProps {
  event: DataType | null;
}
export function EventDetailsModal({ event }: EventDetailsModalProps) {
  const { currentModal, handleCloseModal } = useAppContext();
  if (!event) return null; // No event selected, don't render the modal

  console.log("EVENT DETAILS:", event);

  return (
    <div>
      <Modal
        open={currentModal === "event"}
        onClose={handleCloseModal}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
        className="event_modal_drawer"
      >
        <Box className="events_menu_modal drawer_modal  ">
          <div className="drawer_close_icon">
            <span onClick={handleCloseModal} className="span_icon l_flex">
              <CloseIcon className="icon" />
            </span>
          </div>
          <div className="header_box">
            <div className="header">
              <div className="name">
                <h3>{event?.eventName}</h3>
              </div>
              <div className="date">
                <small>
                  <p>{event.date}</p>
                </small>
              </div>
              <div className="description">
                <small>
                  <p>{event.description}</p>
                </small>
              </div>
            </div>
            <div className="speaker">
              <div className="img a_flex">
                {event.speakers.map(() => (
                  <img src={sp} alt="speaker" className="speaker_img"  />
                ))}
              </div>
              <div className="sp_list">
                <small className="a_flex">
                  <span className="count">
                    {event?.speakers?.length} Guest Speakers:{" "}
                  </span>
                  <span className="sp a_flex">
                    {" "}
                    {event.speakers.map((speaker, index) => (
                      <p key={index}>{speaker}</p>
                    ))}
                  </span>
                </small>
              </div>
              <div className="attendees">
                <p>{event.attendees} Attendees</p>
              </div>
            </div>
          </div>
          <div className="btns">
            <div className="btn_section c_flex">
              <div className="edit">
                <button className="edit_btn">Edit</button>
              </div>
              <div className="delete_mark_btn a_flex">
                <div className="delete">
                  <button className="delete_btn">Delete</button>
                </div>
                <div className="mark">
                  <button className="mark_btn">Mark as Completed</button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
