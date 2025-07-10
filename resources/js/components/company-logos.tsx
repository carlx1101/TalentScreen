"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface LogosProps {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "Microsoft",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-2",
      description: "Google",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-3",
      description: "Apple",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-4",
      description: "Amazon",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-5",
      description: "Meta",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-6",
      description: "Netflix",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      className: "h-6 w-auto",
    },
    {
      id: "logo-7",
      description: "Spotify",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-8",
      description: "Tesla",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg",
      className: "h-8 w-auto",
    },
  ],
}: LogosProps) => {
  return (
    <section className="py-8 md:py-8 lg:py-8">
      <div className="pt-4 md:pt-4 lg:pt-4">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-full">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, stopOnInteraction: false })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos }; 