import "./styles.scss";
import { Table, Tag } from "antd";
import { useState } from "react";
import type { TablePaginationConfig } from "antd/es/table";
import { data, DataType } from "../../../data/Data";
import { formatDate } from "../../../utilities/utils/Utils";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const { Column } = Table;

function TableComponent() {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  return (
    <div className="table_component">
      <div className="filters_section"></div>
      <div className="table_section">
        <Table<DataType>
          dataSource={data}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
            position: ["bottomLeft"],
            showTotal: (total) => `Total ${total} items`,
          }}
          onChange={handleTableChange}
        >
          <Column title="Event Name" dataIndex="eventName" key="eventName" />
          <Column
            title="Date"
            dataIndex="date"
            key="date"
            render={(date: string) => formatDate(date)}
          />
          <Column title="Speakers" dataIndex="speakers" key="speakers" />
          <Column
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
                  <FiberManualRecordIcon className="icon"/>
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
