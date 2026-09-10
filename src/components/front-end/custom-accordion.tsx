"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  answer: string | React.ReactNode;
  question: string;
}

interface CustomAccordionProps {
  faqs: FAQItem[];
}

export default function CustomAccordion({ faqs }: CustomAccordionProps) {
  return (
    <Accordion className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger className="text-left text-gray-900 hover:text-blue-600">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
