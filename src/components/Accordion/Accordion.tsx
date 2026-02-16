import { useEffect, useState } from "react"
import { AccordionItem } from "./AccordionItem/AccordionItem";
import { getBooks } from "../../api/Api";
import { useAppContext } from "../../hooks/useAppContext";
import type { BookProps } from "../../api/Api.models";

export const Accordion = () => {
    const [accordions, setAccordions] = useState<BookProps[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { lang }  = useAppContext();

    type ID  = string | Number;

    interface User {
        id: ID;
        name: string;
        email: string;
    }
    
    // interface Admin extends User {
    //     permissions: string[];
    // }

    // interface User {
    //     password: string;
    // }


    // let value: unknown = "hello";

    // if(typeof value === "string") {
    //     value.toUpperCase();
    // }

    let user: {name: string, email: string} = {name: 'gdaaf', email: 'fsafafa'};

    let user2: User = {id: 1, name: 'fsafa', email: 'fsfasfa'};

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

    const handleToggle = (index: number) => {
        console.log(expandedIndex, index);
        
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return <div>
        <p>{lang}</p>
       {accordions?.map((accordion, index) => {
            return <AccordionItem key={accordion?.index} title={accordion?.title} description={accordion?.description} cover={accordion?.cover} onToggle={() => handleToggle(index)} isExpanded={expandedIndex === index}/>
       })}
    </div>
}