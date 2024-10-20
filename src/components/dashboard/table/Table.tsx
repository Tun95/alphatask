import "./styles.scss";
import { Table, Tag } from "antd";
import { useState, useEffect } from "react";
import type { TablePaginationConfig } from "antd/es/table";
import { data, DataType } from "../../../data/Data";
import { formatDate, useAppContext } from "../../../utilities/utils/Utils";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { EventDetailsModal } from "../../../common/modals/Modals";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { DownloadOutlined } from "@ant-design/icons";

const { Column } = Table;

function TableComponent() {
  const { handleOpenModal } = useAppContext();

  const [selectedEvent, setSelectedEvent] = useState<DataType | null>(null); // New state for selected event
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const openModal = (record: DataType) => {
    setSelectedEvent(record); // Store the event data
    handleOpenModal("event"); // Open the modal
  };

  const [isMobileView, setIsMobileView] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  // Update state based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 620);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const toggleExpand = (key: React.Key) => {
    setExpandedRowKeys(
      (prevKeys) =>
        prevKeys.includes(key)
          ? prevKeys.filter((k) => k !== key) // collapse
          : [...prevKeys, key] // expand
    );
  };

  return (
    <>
      {" "}
      <div className="table_component">
        <div className="filters_section c_flex">
          <div className="left_boxes a_flex">
            <form className="form_group search_box a_flex">
              <SearchIcon className="icon" />
              <input type="search" placeholder="Search..." />
            </form>
            <div className="form_group">
              <input type="date" />
            </div>
            <div className="form_group">
              <select name="status" id="status">
                <option value="" selected>
                  Status
                </option>
                <option value="completed">completed</option>
                <option value="inprogress">in progress</option>
              </select>
            </div>
            <div className="form_group">
              <select name="status" id="status">
                <option value="" selected>
                  Name
                </option>
                {data.map((item, index) => (
                  <option value={item.speakers} key={index}>
                    {item.speakers}
                  </option>
                ))}
              </select>
            </div>
            <div className="count_list">
              <h5>
                Displaying <span>100</span> results
              </h5>
            </div>
          </div>
          <div className="right_boxes a_flex">
            <div className="form_group sort a_flex">
              <label htmlFor="status">Sort:</label>
              <select name="status" id="status">
                <option value="recent">Most Recent</option>
                <option value="inprogress">in progress</option>
              </select>
            </div>
            <span className="choose_icon_btn a_flex">
              <div className="form_group">
                <button className="main_btn download_btn">
                  <MoreVertIcon className="dounload_icon" />
                </button>
              </div>
              <div className="form_group">
                <button className="main_btn export_btn a_flex">
                  <DownloadOutlined className="icon" />
                  <p>Export</p>
                </button>
              </div>
            </span>
          </div>
        </div>
        <div className="table_section">
          <Table<DataType>
            dataSource={data}
            className="table"
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
              position: ["bottomLeft"],
              showTotal: (total) => `Total ${total} items`,
            }}
            onChange={handleTableChange}
            expandable={
              isMobileView
                ? {
                    expandedRowRender: (record) => (
                      <div className="expanded_content">
                        <div className="exp_content c_flex">
                          <p>{record.speakers}</p>
                          <p>{formatDate(record.date)}</p>
                        </div>
                      </div>
                    ),
                    rowExpandable: () => true,
                    expandedRowKeys: expandedRowKeys,
                    onExpand: (_, record) => toggleExpand(record.key),
                    expandIcon: ({ onExpand, record }) => (
                      <span
                        className="expand_icons"
                        onClick={(e) => onExpand(record, e)}
                        style={{ cursor: "pointer" }}
                      >
                        {expandedRowKeys.includes(record.key) ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowRightIcon />
                        )}
                      </span>
                    ),
                  }
                : undefined
            }
          >
            <Column
              title="Event Name"
              dataIndex="eventName"
              key="eventName"
              className="event_column"
              render={(text, record: DataType) =>
                isMobileView ? (
                  <div
                    onClick={() => toggleExpand(record.key)}
                    className="event_name_expand a_flex"
                  >
                    {expandedRowKeys.includes(record.key) ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                    <span
                      onClick={() => openModal(record)}
                      style={{ cursor: "pointer" }}
                    >
                      {text}
                    </span>
                  </div>
                ) : (
                  <span
                    onClick={() => openModal(record)}
                    style={{ cursor: "pointer" }}
                  >
                    {text}
                  </span>
                )
              }
            />
            {!isMobileView && (
              <>
                <Column
                  title="Date"
                  dataIndex="date"
                  key="date"
                  render={(date: string) => formatDate(date)}
                />
                <Column
                  title="Speakers"
                  dataIndex="speakers"
                  key="speakers"
                  render={(speakers: string[]) => speakers[0]} // Display the first speaker only
                />
              </>
            )}
            <Column
              className="status_column"
              title="Status"
              dataIndex="status"
              key="status"
              render={(status: string) => (
                <Tag style={{ border: "none", background: "transparent" }}>
                  <span
                    className={`status a_flex ${
                      status === "Completed" ? "status_green" : "status_blue"
                    }`}
                  >
                    <FiberManualRecordIcon className="icon" />
                    <span>{status}</span>
                  </span>
                </Tag>
              )}
            />
          </Table>
        </div>
      </div>
      {/* Event Details Modal modal */}
      <EventDetailsModal event={selectedEvent} />
    </>
  );
}

export default TableComponent;
