import { Navbar } from "@/components/app-nav";
import { Footer } from "@/components/app-footer";
import JobSearchPage from "@/components/job-search-page";
export default function JobSearch() {
    return (
        <>
            <Navbar />
            <JobSearchPage />
            <Footer />
        </>
    );
}