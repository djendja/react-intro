import { useState } from "react"
import './accordionItem.scss';

export const AccordionItem = ({title, description}) => {
    const [expand, setExpand] = useState(false);    

    return <div className="accordion-item">
        <div className="accordion-item__wrapper">
            <h3 className="accordion-item__title">{title}</h3>
            <button onClick={() => setExpand(!expand)} className="accordion-item__expand-button">{expand ? '-' : '+'}</button>
        </div>
       {expand  && <p>{description}</p>}
    </div>
}