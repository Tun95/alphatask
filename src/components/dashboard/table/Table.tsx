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
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const { Column } = Table;

function TableComponent() {
  const { state, handleOpenModal } = useAppContext();

  const { theme } = state;

  const [selectedEvent, setSelectedEvent] = useState<DataType | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speakerFilter, setSpeakerFilter] = useState("");
  const [filteredData, setFilteredData] = useState<DataType[]>(data);

  //===========================
  // Create a filtered version of data whenever filters change
  //===========================
  useEffect(() => {
    const tempFilteredData = data.filter((item) => {
      const matchesSearch = item.eventName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = dateFilter ? item.date === dateFilter : true;
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      const matchesSpeaker = speakerFilter
        ? item.speakers.includes(speakerFilter)
        : true;

      return matchesSearch && matchesDate && matchesStatus && matchesSpeaker;
    });

    // Set filteredData based on the current filters
    setFilteredData(tempFilteredData);
  }, [searchTerm, dateFilter, statusFilter, speakerFilter]);

  //==============
  // Sorting logic
  //==============
  const handleSortChange = (value: string) => {
    const sortedData = [...filteredData];

    switch (value) {
      case "recent":
        sortedData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "name-asc":
        sortedData.sort((a, b) => a.eventName.localeCompare(b.eventName));
        break;
      case "name-desc":
        sortedData.sort((a, b) => b.eventName.localeCompare(a.eventName));
        break;
      case "status":
        sortedData.sort((a, b) => {
          const statusOrder: { [key: string]: number } = {
            Completed: 1,
            "In Progress": 2,
          };
          return (
            (statusOrder[a.status as keyof typeof statusOrder] || 3) -
            (statusOrder[b.status as keyof typeof statusOrder] || 3)
          );
        });
        break;
      default:
        break;
    }

    // Update filtered data state if necessary
    setPagination({ ...pagination, current: 1 });
    setFilteredData(sortedData);
  };

  const openModal = (record: DataType) => {
    setSelectedEvent(record);
    handleOpenModal("event");
  };

  const [isMobileView, setIsMobileView] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 620);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const toggleExpand = (key: React.Key) => {
    setExpandedRowKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  //=================
  // EXPORT HANDLER
  //=================
  const handleExportCSV = () => {
    // Prepare CSV data
    const csvData = filteredData.map((item) => ({
      EventName: item.eventName,
      Date: item.date,
      Status: item.status,
      Speakers: item.speakers.join(", "),
    }));

    // Convert to CSV format
    const csvRows = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ];
    const csvString = csvRows.join("\n");

    // Create a blob and download the CSV file
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="table_component">
        <div
          className={`filters_section c_flex ${
            theme === "dark" && "filters_section_dark"
          }`}
        >
          <div className="left_boxes a_flex">
            <form
              className="form_group search_box a_flex"
              onSubmit={(e) => e.preventDefault()}
            >
              <SearchIcon className="icon" />
              <input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            {/* DATE */}
            <div className="form_group">
              <select
                name="date"
                id="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Date</option>
                {[...new Set(data.map((item) => item.date))].map(
                  (date, index) => (
                    <option value={date} key={index}>
                      {date}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form_group">
              <select
                name="status"
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
            <div className="form_group">
              <select
                name="speakers"
                id="speakers"
                value={speakerFilter}
                onChange={(e) => setSpeakerFilter(e.target.value)}
              >
                <option value="">Name</option>
                {[...new Set(data.flatMap((item) => item.speakers))].map(
                  (speaker, index) => (
                    <option value={speaker} key={index}>
                      {speaker}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="count_list">
              <h5>
                Displaying <span>{filteredData.length}</span> results
              </h5>
            </div>
          </div>
          <div className="right_boxes a_flex">
            <div className="form_group sort a_flex">
              <label htmlFor="sort">Sort:</label>
              <select
                name="sort"
                id="sort"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="status">Status (Completed first)</option>
              </select>
            </div>

            {/* EXPORT AS CSV DOWNLOAD */}
            <span className="choose_icon_btn a_flex">
              <div className="form_group">
                <button className="main_btn dounload_btn a_flex">
                  <MoreVertIcon className="icon" />
                </button>
              </div>{" "}
              <div className="form_group">
                <button
                  className="main_btn export_btn a_flex"
                  onClick={handleExportCSV}
                >
                  <DownloadOutlined className="icon" />
                  <p>Export</p>
                </button>
              </div>
            </span>
          </div>
        </div>
        <div
          className={`table_section ${
            theme === "dark" && "table_section_dark"
          }`}
        >
          <Table<DataType>
            dataSource={filteredData}
            className={`table `}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20"],
              position: ["bottomLeft"], // Pagination at the bottom left
              itemRender: (_, type, originalElement) => {
                if (type === "prev") {
                  return (
                    <a className="pagination-icon l_flex">
                      <NavigateBeforeIcon className="pag_icon" />
                    </a>
                  );
                }
                if (type === "next") {
                  return (
                    <a className="pagination-icon l_flex">
                      <NavigateNextIcon className="pag_icon" />
                    </a>
                  );
                }
                return originalElement;
              },
              locale: {
                items_per_page: "",
              },
            }}
            onChange={handleTableChange}
            expandable={
              isMobileView
                ? {
                    expandedRowRender: (record) => (
                      <div className="expanded_content">
                        <div className="exp_content c_flex">
                          <p>{record.speakers[0]}</p>
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
              className="columns event_column"
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
                  className="columns"
                  render={(date: string) => formatDate(date)}
                />
                <Column
                  title="Speakers"
                  dataIndex="speakers"
                  key="speakers"
                  className="columns"
                  render={(speakers: string[]) => speakers[0]}
                />
              </>
            )}
            <Column
              className="columns status_column"
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
      <EventDetailsModal event={selectedEvent} />
    </>
  );
}

export default TableComponent;
