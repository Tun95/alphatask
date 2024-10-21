import "./styles.scss";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { formatNumberWithCommas } from "../../../utilities/utils/Utils";

interface WidgetProps {
  type: "events" | "speakers" | "users" | "revenue";
  TotalEvent?: number;
  TotalSpeakers?: number;
  TotalUsers?: number;
  TotalRevenue?: number;
}

const Widget: React.FC<WidgetProps> = ({
  type,
  TotalEvent = 0,
  TotalSpeakers = 0,
  TotalUsers = 0,
  TotalRevenue = 0,
}) => {
  let data:
    | {
        title: string;
        isMoney: boolean;
        percentageChange: number;
        isIncrease: boolean;
      }
    | undefined;

  // Determine the amount based on the type prop
  const dataType =
    type === "events"
      ? TotalEvent
      : type === "speakers"
      ? TotalSpeakers
      : type === "users"
      ? TotalUsers
      : type === "revenue"
      ? TotalRevenue
      : 0;

  // Switch statement to handle different widget types
  switch (type) {
    case "events":
      data = {
        title: "Total Events",
        isMoney: false,

        percentageChange: 25,
        isIncrease: true,
      };
      break;
    case "speakers":
      data = {
        title: "Active Speakers",
        isMoney: false,

        percentageChange: 15,
        isIncrease: true,
      };
      break;
    case "users":
      data = {
        title: "Total Registrations",
        isMoney: false,

        percentageChange: 30,
        isIncrease: true,
      };
      break;
    case "revenue":
      data = {
        title: "Total Revenue",
        isMoney: true,

        percentageChange: -10,
        isIncrease: false,
      };
      break;
    default:
      data = undefined;
      break;
  }

  if (!data) return null; // Handle invalid type

  return (
    <div className="widget">
      <div className="left">
        <div className="title_info a_flex">
          <span className="title">{data.title}</span>
          <span className="info_icon">
            <InfoOutlinedIcon className="icon" />
          </span>
        </div>
        <div className="counter_percentage a_flex">
          <span className="counter">
            {data.isMoney
              ? `$${dataType.toLocaleString()}`
              : formatNumberWithCommas(dataType)}
          </span>
          <span className="percentage_section">
            <div
              className={`percentage a_flex ${
                data.isIncrease ? "increase" : "decrease"
              }`}
            >
              {data.isIncrease ? (
                <CallMadeOutlinedIcon className="percentage_icon" />
              ) : (
                <CallReceivedOutlinedIcon className="percentage_icon" />
              )}
              {data.isIncrease ? "+" : "-"}
              {Math.abs(data.percentageChange)?.toFixed(1)}%
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Widget;
