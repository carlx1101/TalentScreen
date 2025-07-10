import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from "lucide-react";
import { Logos } from '@/components/company-logos';
import { Navbar } from '@/components/app-nav';
import { FeatureSection } from '@/components/feature-section-list';
import { AnnouncementBanner } from '@/components/announcement-banner';  
import { FAQSection } from '@/components/faq-section';
import { UsecaseSection } from '@/components/usecase-section';
import { Footer } from '@/components/app-footer';
import { HowItWorksSection } from '@/components/how-it-works-section';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>  
            <Navbar />


            {/* Hero */}
            <div>
                <div className="container mx-auto px-4 py-6 md:px-6 lg:py-12 2xl:max-w-[1600px]">

                {/* Title */}
                <div className="mx-auto mt-5 max-w-4xl text-center">
                    <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl">
                        Your AI Interviewer for Perfect Talent Matches
                        
                    </h1>
                </div>
                {/* End Title */}
                <div className="mx-auto mt-5 max-w-4xl text-center">
                    <p className="text-muted-foreground text-xl">
                        Revolutionize your hiring process with AI-powered interviews and intelligent candidate screening. 
                        Find the perfect talent match faster and more efficiently than ever before.
                    </p>
                </div>
        
        
                </div>
            </div>
            {/* End Hero */}  

            {/* Video Mockup */}
            <div className="container mx-auto px-4 py-12 md:px-6 lg:py-10 2xl:max-w-[1600px]">  
                <div className="mx-auto max-w-6xl text-center">
                    <iframe 
                        width="100%" 
                        height="600" 
                        src="https://www.youtube.com/embed/osx5jGk1IN4?autoplay=1&mute=1" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                        className="aspect-video w-full rounded-lg"
                    ></iframe>
                </div>
            </div>
            {/* End Video Mockup */}


            {/* Company Logo */}
            <Logos 
                heading=''
            />
            {/* End Company Logo */}



            <FeatureSection 
                title="AI Powered Interview"
                description="Revolutionize your hiring process with AI-powered interviews and intelligent candidate screening. 
                Find the perfect talent match faster and more efficiently than ever before." 
                features={[
                    { text: 'AI-powered interviews' },
                    { text: 'Intelligent candidate screening' },
                    { text: 'Find the perfect talent match faster and more efficiently than ever before.' }
                ]}
                image={{ src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg', alt: 'logo' }}
            />

            <FeatureSection 
                title="AI Interview Platform"
                description="Revolutionize your hiring process with AI-powered interviews and intelligent candidate screening. 
                Find the perfect talent match faster and more efficiently than ever before." 
                features={[
                    { text: 'AI-powered interviews' },
                    { text: 'Intelligent candidate screening' },
                    { text: 'Find the perfect talent match faster and more efficiently than ever before.' }
                ]}
                imagePosition="left"
                image={{ src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg', alt: 'logo' }}
            />

            <HowItWorksSection />


            <UsecaseSection />



            <FAQSection 
                title="Frequently Asked Questions"
                faqs={[
                    { id: '1', question: 'What is the AI Interview Platform?', answer: 'The AI Interview Platform is a platform that allows you to conduct AI-powered interviews and intelligent candidate screening.' },
                    { id: '2', question: 'How does the AI Interview Platform work?', answer: 'The AI Interview Platform works by using AI to conduct interviews and intelligent candidate screening.' },
                    { id: '3', question: 'What is the AI Interview Platform?', answer: 'The AI Interview Platform is a platform that allows you to conduct AI-powered interviews and intelligent candidate screening.' },
                ]}
                
            />  
            <Footer />

        </>
    );
}
