// import { useState } from "react"
import "./accordionItem.scss";

interface AccordionItemProps {
  title: string;
  description: string;
  cover: string;
  isExpanded?: boolean;
  onToggle: () => void;
}

export const AccordionItem = ({
  title,
  description,
  cover,
  isExpanded,
  onToggle,
}: AccordionItemProps) => {
  // const [expand, setExpand] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-item__wrapper">
        <img src={cover} alt={title} />
        <h3 className="accordion-item__title">{title}</h3>
        <button onClick={onToggle} className="accordion-item__expand-button">
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && <p style={{ width: "50%" }}>{description}</p>}
    </div>
  );
};
