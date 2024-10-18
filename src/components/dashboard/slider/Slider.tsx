import SliderCards from "./SliderCards";
import "./styles.scss";
import Slider from "react-slick";
import s1 from "../../../assets/slider/s1.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const data = [
  {
    img: s1,
    title: "Latest News & Updates",
    description:
      "Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus.",
  },
  {
    img: s1,
    title: "Latest News & Updates",
    description:
      "Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus.",
  },
  {
    img: s1,
    title: "Latest News & Updates",
    description:
      "Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus.",
  },
];

interface ArrowProps {
  onClick?: () => void;
}

// NextArrow component
const NextArrow: React.FC<ArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div className="control_btn l_flex" onClick={onClick}>
      <button className="next l_flex">
        <KeyboardArrowRightIcon className="icon" />
      </button>
    </div>
  );
};

// PrevArrow component
const PrevArrow: React.FC<ArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div className="control_btn l_flex" onClick={onClick}>
      <button className="prev l_flex">
        <KeyboardArrowLeftIcon className="icon" />
      </button>
    </div>
  );
};

function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };
  return (
    <div className="slider_component">
      {" "}
      <div className="news_list">
        <Slider {...settings} className="slick_slider">
          {data?.map((item, index) => (
            <SliderCards item={item} index={index} key={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SliderComponent;
