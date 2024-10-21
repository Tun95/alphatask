import { useAppContext } from "../../../utilities/utils/Utils";

interface SliderCardProps {
  item: {
    img: string;
    title: string;
    description: string;
  };
  index: number;
}

function SliderCards({ item, index }: SliderCardProps) {
  const { state: appState } = useAppContext();

  const { theme } = appState;
  return (
    <div className="slider_card">
      <div className="slider_content">
        <div className="img">
          <img src={item.img} alt={`Slide ${index}`} />
        </div>
        <div className={`title_desc ${theme === "dark" ? "title_desc_dark" : ""}`}>
          <div className="title">
            <h4>{item.title}</h4>
          </div>
          <div className="description">
            <small>
              <p>{item.description}</p>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderCards;
