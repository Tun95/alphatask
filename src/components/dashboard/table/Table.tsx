import "./styles.scss";
import { Table, Tag } from "antd";
import { useState, useEffect } from "react";
import type { TablePaginationConfig } from "antd/es/table";
import { data, DataType } from "../../../data/Data";
import { formatDate } from "../../../utilities/utils/Utils";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const { Column } = Table;

function TableComponent() {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

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
    <div className="table_component">
      <div className="filters_section"></div>
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
            render={(text, record) =>
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
                  {text}
                </div>
              ) : (
                text
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
              <Column title="Speakers" dataIndex="speakers" key="speakers" />
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
  );
}

export default TableComponent;
