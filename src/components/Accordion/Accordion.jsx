import { useEffect, useState } from "react"
import { AccordionItem } from "./AccordionItem/AccordionItem";
import { getBooks } from "../../api/Api";
import { useAppContext } from "../../hooks/useAppContext";

export const Accordion = () => {
    const [accordions, setAccordions] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { lang }  = useAppContext();

    useEffect(() => {
        const controller = new AbortController();

        const loadAccordions = async () => {
            try {
                const data = await getBooks(controller.signal);
                setAccordions(data);
            }
            catch(error) {
                console.log('Error', error);
                throw error;
            }
        }

        loadAccordions();

        () => controller.abort();
    }, [])

    const handleToggle = (index) => {
        console.log(expandedIndex, index);
        
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return <div>
        <p>{lang}</p>
       {accordions?.map((accordion, index) => {
            return <AccordionItem arrayIndex={index} key={accordion?.index} title={accordion?.title} description={accordion?.description} cover={accordion?.cover} onToggle={() => handleToggle(index)} isExpanded={accordion?.isExpanded} accordions={accordions} setAccordions={setAccordions}/>
       })}
    </div>
}