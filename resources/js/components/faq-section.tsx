import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const FAQSection = ({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our platform and services.",
  faqs,
  className = "",
  maxWidth = "2xl",
}: FAQSectionProps) => {
  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl", 
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <section className={`py-8 md:py-16 ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border rounded-lg px-6 py-2 bg-card shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>


      </div>
    </section>
  );
};

export { FAQSection };
export type { FAQItem, FAQSectionProps }; 