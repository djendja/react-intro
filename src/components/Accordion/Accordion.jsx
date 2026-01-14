import { useEffect, useState } from "react"
import { AccordionItem } from "./AccordionItem/AccordionItem";
import { getBooks } from "../../api/Api";

export const Accordion = () => {
    const [accordions, setAccordions] = useState([]);

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

    return <div>
       {accordions?.map((accordion) => {
            return <AccordionItem key={accordion?.index} title={accordion?.title} description={accordion?.description}/>
       })}
    </div>
}