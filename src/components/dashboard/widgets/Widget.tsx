import "./styles.scss";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";

// Format numbers with commas (e.g., 2,300,454)
const formatNumberWithCommas = (num: number): string => {
  const validNumber = isNaN(num) || num === null || num === undefined ? 0 : num; // Fallback to 0 if num is invalid
  return validNumber.toLocaleString();
};

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
        icon: JSX.Element;
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
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "speakers":
      data = {
        title: "Active Speakers",
        isMoney: false,
        icon: (
          <ReceiptOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "users":
      data = {
        title: "Total Rgistrations",
        isMoney: false,
        icon: (
          <HowToVoteOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;
    case "revenue":
      data = {
        title: "Total Revenue",
        isMoney: true,
        icon: (
          <NewspaperOutlinedIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
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
        <span className="title">{data.title}</span>
        <div className="couter_percentage">
          <span className="counter">
            {data.isMoney
              ? `$${dataType.toLocaleString()}`
              : formatNumberWithCommas(dataType)}
          </span>
          <span className="percentage_icon">
            <div className="icon">{data.icon}</div>.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Widget;
