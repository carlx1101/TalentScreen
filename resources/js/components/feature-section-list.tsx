import { Check } from "lucide-react";

interface Feature {
  text: string;
}

interface FeatureSectionProps {
  title: string;
  description: string;
  features: Feature[];
  image: {
    src: string;
    alt: string;
  };
  imagePosition?: "left" | "right";
  className?: string;
}

const FeatureSection = ({
  title,
  description,
  features,
  image,
  imagePosition = "right",
  className = "",
}: FeatureSectionProps) => {
  // Content section
  const ContentSection = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Features List */}
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <p className="text-foreground font-medium">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Image section
  const ImageSection = () => (
    <div className="relative">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-secondary/20 blur-xl" />
    </div>
  );

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {imagePosition === "left" ? (
            <>
              <ImageSection />
              <ContentSection />
            </>
          ) : (
            <>
              <ContentSection />
              <ImageSection />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export { FeatureSection }; 
