import { Card } from "@/components/ui/card";

interface Step {
  id: string;
  title: string;
  summary: string;
  image: string;
  stepNumber?: number;
}

interface HowItWorksSectionProps {
  heading?: string; 
  description?: string;
  steps?: Step[];
}

const HowItWorksSection = ({
  heading = "How It Works",
  description = "Discover how our AI-powered interview platform transforms the hiring process with simple, effective steps.",
  steps = [
    {
      id: "step-1",
      title: "Create Your Job Posting",
      summary: "Post your job requirements and let our AI analyze the key skills and qualifications needed for the perfect candidate match.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
      stepNumber: 1,
    },
    {
      id: "step-2", 
      title: "AI Candidate Screening",
      summary: "Our advanced AI reviews applications, screens candidates based on your criteria, and identifies the most promising talent automatically.",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=300&fit=crop",
      stepNumber: 2,
    },
    {
      id: "step-3",
      title: "Automated Video Interviews",
      summary: "Qualified candidates complete AI-powered video interviews that assess technical skills, communication, and cultural fit in real-time.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
      stepNumber: 3,
    },
    {
      id: "step-4",
      title: "Get Ranked Results",
      summary: "Receive detailed candidate rankings with AI-generated insights, interview highlights, and hiring recommendations to make informed decisions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      stepNumber: 4,
    },
  ],
}: HowItWorksSectionProps) => {
  return (
    <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {steps.map((step) => (
            <Card
              key={step.id} 
              className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                <div className="sm:col-span-5">
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center gap-3">

                    
            
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground md:mt-5">
                    {step.summary}
                  </p>
                </div>
                <div className="order-first sm:order-last sm:col-span-5">
                  <div className="aspect-16/9 overflow-clip rounded-lg border border-border">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="h-full w-full object-cover transition-opacity duration-200 fade-in"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HowItWorksSection };
export type { Step, HowItWorksSectionProps };
