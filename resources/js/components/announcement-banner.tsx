import { Link } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";

interface AnnouncementBannerProps {
  mainText: string;
  linkText?: string;
  linkHref?: string;
  subText?: string;
  backgroundColor?: "muted" | "primary" | "secondary" | "accent" | "destructive";
  textColor?: "default" | "white" | "primary" | "muted";
  dismissible?: boolean;
  className?: string;
}

const AnnouncementBanner = ({
  mainText,
  linkText,
  linkHref = "#",
  subText,
  backgroundColor = "muted",
  textColor = "default",
  dismissible = false,
  className = "",
}: AnnouncementBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const backgroundClasses = {
    muted: "bg-muted",
    primary: "bg-primary",
    secondary: "bg-secondary", 
    accent: "bg-accent",
    destructive: "bg-destructive",
  };

  const textClasses = {
    default: "text-foreground",
    white: "text-white",
    primary: "text-primary-foreground",
    muted: "text-muted-foreground",
  };

  const linkClasses = {
    default: "font-semibold underline-offset-4 hover:underline",
    white: "font-semibold underline-offset-4 hover:underline text-white",
    primary: "font-semibold underline-offset-4 hover:underline text-primary-foreground",
    muted: "font-semibold underline-offset-4 hover:underline text-muted-foreground",
  };

  return (
    <div className={`${backgroundClasses[backgroundColor]} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex items-center justify-between gap-x-6 p-4">
          <div className={`flex w-full items-center gap-x-4 text-sm ${textClasses[textColor]}`}>
            <p className="flex-1 text-center">
              {linkText && linkHref ? (
                <Link
                  href={linkHref}
                  className={linkClasses[textColor]}
                >
                  {linkText}
                </Link>
              ) : (
                <span className="font-semibold">{mainText}</span>
              )}
              
              {linkText && (
                <span className="ml-1">{mainText}</span>
              )}
              
              {subText && (
                <span className="hidden sm:inline">
                  {" "}
                  — {subText}
                </span>
              )}
            </p>
          </div>
          
          {dismissible && (
            <button
              onClick={() => setIsVisible(false)}
              className={`flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors ${textClasses[textColor]}`}
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { AnnouncementBanner };
export type { AnnouncementBannerProps };
