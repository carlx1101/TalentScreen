"use client";

import * as React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BriefcaseIcon,
  BuildingIcon,
  MapPinIcon,
  DollarSignIcon,
  StarIcon,
  BookmarkIcon,
  TrendingUpIcon,
  BarChartIcon,
  UsersIcon,
  CalendarIcon,
  SearchIcon,
  CodeIcon,
  SettingsIcon,
  HeartIcon,
  LightbulbIcon,
  PaletteIcon,
  TrendingUpIcon as MarketingIcon,
} from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  companyName: string;
  companyLogo: string;
  location: string;
  locationType: "remote" | "onsite" | "hybrid";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  experienceLevel: "entry" | "mid" | "senior" | "lead" | "executive";
  postedDate: string;
  salary: string;
  description: string;
  featured: boolean;
  highlight: "new" | "trending" | "competitive" | "popular" | undefined;
  perks: string[];
  category: string;
}

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [selectedWorkingMode, setSelectedWorkingMode] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 5 rows × 3 columns = 15 jobs per page on desktop

  // Job categories
  const categories = [
    { name: "All", icon: <BriefcaseIcon className="mr-2 h-auto w-3 flex-shrink-0" /> },
    { name: "Engineering", icon: <CodeIcon className="mr-2 h-auto w-3 flex-shrink-0" /> },
    { name: "Product", icon: <SettingsIcon className="mr-2 h-auto w-3 flex-shrink-0" /> },
    { name: "Design", icon: <PaletteIcon className="mr-2 h-auto w-3 flex-shrink-0" /> },
    { name: "Data Science", icon: <LightbulbIcon className="mr-2 h-auto w-3 flex-shrink-0" /> },
    { name: "Marketing", icon: <MarketingIcon className="mr-2 h-auto w-3 flex-shrink-0" /> },
    { name: "Healthcare", icon: <HeartIcon className="mr-2 h-auto w-3 flex-shrink-0" /> },
  ];

  // Job type options
  const jobTypes = [
    { value: "All", label: "All Types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  // Working mode options
  const workingModes = [
    { value: "All", label: "All Modes" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" },
  ];

  // Sample job position data
  const jobPositions: JobPosition[] = [
    {
      id: "senior-frontend-engineer",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      companyName: "TechVision",
      companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=48&h=48&fit=crop&crop=center",
      location: "San Francisco, CA",
      locationType: "hybrid",
      employmentType: "full-time",
      experienceLevel: "senior",
      postedDate: "2023-09-15",
      salary: "$130,000 - $160,000",
      description: "Lead the development of our flagship product using React, TypeScript, and modern web technologies. Join a talented team working on cutting-edge solutions.",
      featured: true,
      highlight: "competitive",
      perks: ["Flexible hours", "Remote options", "Health insurance", "401(k) match", "Learning budget"],
      category: "Engineering",
    },
    {
      id: "product-manager",
      title: "Product Manager",
      department: "Product",
      companyName: "InnovateCorp",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=48&h=48&fit=crop&crop=center",
      location: "New York, NY",
      locationType: "hybrid",
      employmentType: "full-time",
      experienceLevel: "senior",
      postedDate: "2023-09-18",
      salary: "$120,000 - $150,000",
      description: "Define the product vision and strategy for our SaaS platform. Collaborate with cross-functional teams to deliver exceptional user experiences.",
      featured: true,
      highlight: "new",
      perks: ["Unlimited PTO", "Health benefits", "Remote work options", "Stock options", "Catered lunches"],
      category: "Product",
    },
    {
      id: "senior-data-scientist",
      title: "Senior Data Scientist",
      department: "Data Science",
      companyName: "DataDriven",
      companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=48&h=48&fit=crop&crop=center",
      location: "Remote",
      locationType: "remote",
      employmentType: "full-time",
      experienceLevel: "senior",
      postedDate: "2023-09-16",
      salary: "$140,000 - $170,000",
      description: "Apply machine learning and statistical techniques to solve complex business problems. Work with large datasets to extract insights and drive decision-making.",
      featured: true,
      highlight: "trending",
      perks: ["Remote-first culture", "Flexible schedule", "Quarterly team retreats", "Health & wellness stipend", "Home office budget"],
      category: "Data Science",
    },
    {
      id: "ux-design-lead",
      title: "UX Design Lead",
      department: "Design",
      companyName: "CreativeMinds",
      companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=48&h=48&fit=crop&crop=center",
      location: "Los Angeles, CA",
      locationType: "onsite",
      employmentType: "full-time",
      experienceLevel: "lead",
      postedDate: "2023-09-17",
      salary: "$130,000 - $160,000",
      description: "Lead a team of designers to create intuitive, engaging user experiences. Collaborate with product and engineering teams to deliver cohesive products.",
      featured: true,
      highlight: "popular",
      perks: ["Creative studio environment", "Latest design tools", "Healthcare coverage", "Gym membership", "Casual dress code"],
      category: "Design",
    },
    {
      id: "marketing-manager",
      title: "Marketing Manager",
      department: "Marketing",
      companyName: "GrowthCo",
      companyLogo: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=48&h=48&fit=crop&crop=center",
      location: "Chicago, IL",
      locationType: "hybrid",
      employmentType: "full-time",
      experienceLevel: "mid",
      postedDate: "2023-09-19",
      salary: "$90,000 - $120,000",
      description: "Drive marketing campaigns and brand strategy. Work with cross-functional teams to increase user acquisition and engagement.",
      featured: true,
      highlight: "new",
      perks: ["Creative freedom", "Team events", "Professional development", "Healthcare", "Flexible PTO"],
      category: "Marketing",
    },
    {
      id: "nurse-practitioner",
      title: "Nurse Practitioner",
      department: "Healthcare",
      companyName: "MedCare",
      companyLogo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=48&h=48&fit=crop&crop=center",
      location: "Boston, MA",
      locationType: "onsite",
      employmentType: "full-time",
      experienceLevel: "mid",
      postedDate: "2023-09-20",
      salary: "$95,000 - $125,000",
      description: "Provide comprehensive healthcare services to patients. Work in a collaborative environment with physicians and healthcare teams.",
      featured: true,
      highlight: "competitive",
      perks: ["Comprehensive benefits", "Continuing education", "Retirement plan", "Malpractice insurance", "Work-life balance"],
      category: "Healthcare",
    },
    {
      id: "backend-engineer",
      title: "Backend Engineer",
      department: "Engineering",
      companyName: "ServerStack",
      companyLogo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=48&h=48&fit=crop&crop=center",
      location: "Austin, TX",
      locationType: "hybrid",
      employmentType: "full-time",
      experienceLevel: "mid",
      postedDate: "2023-09-21",
      salary: "$100,000 - $130,000",
      description: "Build scalable backend services and APIs. Work with databases, microservices, and cloud infrastructure.",
      featured: true,
      highlight: "new",
      perks: ["Tech stipend", "Remote work", "Health insurance", "401k", "Learning budget"],
      category: "Engineering",
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      department: "Engineering",
      companyName: "CloudFirst",
      companyLogo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=48&h=48&fit=crop&crop=center",
      location: "Denver, CO",
      locationType: "remote",
      employmentType: "full-time",
      experienceLevel: "senior",
      postedDate: "2023-09-22",
      salary: "$120,000 - $145,000",
      description: "Manage CI/CD pipelines, cloud infrastructure, and automation tools. Work with AWS, Docker, and Kubernetes.",
      featured: true,
      highlight: "trending",
      perks: ["Remote first", "Flexible hours", "Stock options", "Health benefits", "Home office budget"],
      category: "Engineering",
    },
    {
      id: "graphic-designer",
      title: "Graphic Designer",
      department: "Design",
      companyName: "BrandStudio",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=48&h=48&fit=crop&crop=center",
      location: "Portland, OR",
      locationType: "hybrid",
      employmentType: "full-time",
      experienceLevel: "mid",
      postedDate: "2023-09-23",
      salary: "$70,000 - $90,000",
      description: "Create visual content for digital and print media. Work on branding, marketing materials, and web graphics.",
      featured: true,
      highlight: "popular",
      perks: ["Creative freedom", "Adobe CC license", "Flexible schedule", "Health coverage", "Design budget"],
      category: "Design",
    },
    {
      id: "sales-manager",
      title: "Sales Manager",
      department: "Sales",
      companyName: "SalesForce Pro",
      companyLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=center",
      location: "Miami, FL",
      locationType: "onsite",
      employmentType: "full-time",
      experienceLevel: "senior",
      postedDate: "2023-09-24",
      salary: "$80,000 - $120,000 + Commission",
      description: "Lead sales team and drive revenue growth. Manage client relationships and develop sales strategies.",
      featured: true,
      highlight: "competitive",
      perks: ["Commission bonus", "Car allowance", "Travel opportunities", "Health benefits", "Performance bonuses"],
      category: "Marketing",
    },
    {
      id: "physical-therapist",
      title: "Physical Therapist",
      department: "Healthcare",
      companyName: "WellCare Clinic",
      companyLogo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=48&h=48&fit=crop&crop=center",
      location: "Phoenix, AZ",
      locationType: "onsite",
      employmentType: "full-time",
      experienceLevel: "mid",
      postedDate: "2023-09-25",
      salary: "$75,000 - $95,000",
      description: "Provide rehabilitation services to patients. Develop treatment plans and help patients recover from injuries.",
      featured: true,
      highlight: "new",
      perks: ["Continuing education", "Health benefits", "Flexible scheduling", "Professional development", "Wellness programs"],
      category: "Healthcare",
    },
    {
      id: "data-analyst",
      title: "Data Analyst",
      department: "Data Science",
      companyName: "InsightCorp",
      companyLogo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=48&h=48&fit=crop&crop=center",
      location: "Atlanta, GA",
      locationType: "hybrid",
      employmentType: "full-time",
      experienceLevel: "entry",
      postedDate: "2023-09-26",
      salary: "$65,000 - $85,000",
      description: "Analyze business data to provide insights and recommendations. Create reports and visualizations for stakeholders.",
      featured: true,
      highlight: "trending",
      perks: ["Training provided", "Mentorship program", "Health insurance", "401k match", "Learning resources"],
      category: "Data Science",
    },
    {
      id: "product-designer",
      title: "Product Designer",
      department: "Design",
      companyName: "DesignLab",
      companyLogo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=48&h=48&fit=crop&crop=center",
      location: "Seattle, WA",
      locationType: "remote",
      employmentType: "full-time",
      experienceLevel: "senior",
      postedDate: "2023-09-27",
      salary: "$110,000 - $140,000",
      description: "Design user interfaces and experiences for web and mobile applications. Collaborate with product and engineering teams.",
      featured: true,
      highlight: "competitive",
      perks: ["Remote work", "Design tools provided", "Conference budget", "Health benefits", "Equity"],
      category: "Design",
    },
    {
      id: "content-manager",
      title: "Content Manager",
      department: "Marketing",
      companyName: "MediaHub",
      companyLogo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=48&h=48&fit=crop&crop=center",
      location: "Nashville, TN",
      locationType: "hybrid",
      employmentType: "full-time",
      experienceLevel: "mid",
      postedDate: "2023-09-28",
      salary: "$60,000 - $80,000",
      description: "Create and manage content strategy across multiple channels. Write, edit, and optimize content for SEO.",
      featured: true,
      highlight: "popular",
      perks: ["Creative projects", "Flexible hours", "Professional development", "Health coverage", "Remote options"],
      category: "Marketing",
    },
    {
      id: "mobile-developer",
      title: "Mobile Developer",
      department: "Engineering",
      companyName: "AppTech",
      companyLogo: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=48&h=48&fit=crop&crop=center",
      location: "San Diego, CA",
      locationType: "onsite",
      employmentType: "full-time",
      experienceLevel: "senior",
      postedDate: "2023-09-29",
      salary: "$115,000 - $145,000",
      description: "Develop iOS and Android applications using React Native and native technologies. Work on consumer-facing mobile apps.",
      featured: true,
      highlight: "new",
      perks: ["Latest devices", "App store bonuses", "Health benefits", "Stock options", "Innovation time"],
      category: "Engineering",
    },
    {
      id: "hr-specialist",
      title: "HR Specialist",
      department: "Human Resources",
      companyName: "PeopleFirst",
      companyLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=center",
      location: "Dallas, TX",
      locationType: "hybrid",
      employmentType: "full-time",
      experienceLevel: "mid",
      postedDate: "2023-09-30",
      salary: "$55,000 - $75,000",
      description: "Support HR operations including recruitment, employee relations, and policy administration. Help create a positive workplace culture.",
      featured: true,
      highlight: "trending",
      perks: ["People-focused culture", "Professional development", "Work-life balance", "Health benefits", "Flexible PTO"],
      category: "Marketing",
    },
  ];

  // Filter jobs based on search term, category, job type, and working mode
  const filteredJobs = jobPositions.filter((job) => {
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || job.category === activeCategory;
    const matchesJobType = selectedJobType === "All" || job.employmentType === selectedJobType;
    const matchesWorkingMode = selectedWorkingMode === "All" || job.locationType === selectedWorkingMode;
    
    return matchesSearch && matchesCategory && matchesJobType && matchesWorkingMode;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, selectedJobType, selectedWorkingMode]);

  // Calculate days ago from date
  const getDaysAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  // Format location type for display
  const formatLocationType = (type: string) => {
    switch (type) {
      case "remote":
        return "Remote";
      case "hybrid":
        return "Hybrid";
      case "onsite":
        return "On-site";
      default:
        return type;
    }
  };

  // Format employment type for display
  const formatEmploymentType = (type: string) => {
    switch (type) {
      case "full-time":
        return "Full-time";
      case "part-time":
        return "Part-time";
      case "contract":
        return "Contract";
      case "internship":
        return "Internship";
      default:
        return type;
    }
  };

  // Get appropriate highlight icon and color
  const getHighlightDetails = (highlight: JobPosition["highlight"]) => {
    switch (highlight) {
      case "new":
        return {
          icon: <StarIcon className="h-4 w-4" />,
          label: "New",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        };
      case "trending":
        return {
          icon: <TrendingUpIcon className="h-4 w-4" />,
          label: "Trending",
          color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        };
      case "competitive":
        return {
          icon: <BarChartIcon className="h-4 w-4" />,
          label: "Competitive",
          color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        };
      case "popular":
        return {
          icon: <UsersIcon className="h-4 w-4" />,
          label: "Popular",
          color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
        };
      default:
        return null;
    }
  };



  return (
    <>
      {/* Hero Search Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:px-6 lg:py-12 2xl:max-w-[1400px]">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Find Your Dream Job
            </h1>
            <p className="text-muted-foreground mt-3 text-xl">
              Discover opportunities that match your skills and aspirations.
            </p>
            <div className="relative mx-auto mt-7 max-w-4xl sm:mt-12">
              {/* Search and Filters */}
              <div className="bg-background rounded-lg border p-3 shadow-lg">
                <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
                  {/* Search Input */}
                  <div className="flex-[2_0_0%]">
                    <Label htmlFor="job-search" className="sr-only">
                      Search jobs
                    </Label>
                    <Input
                      name="job-search"
                      id="job-search"
                      placeholder="Search jobs, companies, or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Job Type Dropdown */}
                  <div className="lg:w-36 flex-1">
                    <Label htmlFor="job-type" className="sr-only">
                      Job Type
                    </Label>
                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Working Mode Dropdown */}
                  <div className="lg:w-36 flex-1">
                    <Label htmlFor="working-mode" className="sr-only">
                      Working Mode
                    </Label>
                    <Select value={selectedWorkingMode} onValueChange={setSelectedWorkingMode}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {workingModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {/* End Search and Filters */}
              {/* SVG Element */}
              <div className="absolute end-0 top-0 hidden translate-x-20 -translate-y-12 md:block">
                <svg
                  className="h-auto w-16 text-orange-500"
                  width={121}
                  height={135}
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
              {/* SVG Element */}
              <div className="absolute start-0 bottom-0 hidden -translate-x-32 translate-y-10 md:block">
                <svg
                  className="h-auto w-40 text-cyan-500"
                  width={347}
                  height={188}
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
            </div>
            {/* Category Filter Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-1 sm:mt-20">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={activeCategory === category.name ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.name)}
                  className={activeCategory === category.name ? "bg-primary text-primary-foreground" : ""}
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="container mx-auto px-4 py-6">
        {currentJobs.length > 0 ? (
          <>
            {/* Results Info - Top */}
            <div className="mb-6 text-right">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} jobs
              </p>
            </div>

            {/* Job Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentJobs.map((job) => {
                const highlightDetails = job.highlight
                  ? getHighlightDetails(job.highlight)
                  : null;

                return (
                  <Card key={job.id} className="flex h-full flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="bg-card relative flex h-12 w-12 items-center justify-center rounded-md border">
                          <img
                            src={job.companyLogo || "https://via.placeholder.com/48"}
                            alt={job.companyName}
                            className="h-12 w-12 object-cover rounded-md"
                          />
                        </div>
                        {highlightDetails && (
                          <Badge
                            variant="secondary"
                            className={`flex items-center gap-1 ${highlightDetails.color}`}
                          >
                            {highlightDetails.icon}
                            {highlightDetails.label}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-3">
                        <CardTitle>{job.title}</CardTitle>
                        <div className="mt-1 flex items-center gap-1">
                          <BuildingIcon className="text-muted-foreground h-3.5 w-3.5" />
                          <CardDescription className="!mt-0">
                            {job.companyName}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-col gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">{job.location}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {formatLocationType(job.locationType)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <BriefcaseIcon className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">{job.department}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {formatEmploymentType(job.employmentType)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSignIcon className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="text-muted-foreground h-4 w-4" />
                          <span className="text-sm">
                            Posted {getDaysAgo(job.postedDate)}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mt-2 text-sm">
                        {job.description}
                      </p>

                      <div className="mt-auto">
                        <p className="text-muted-foreground mb-1.5 text-xs font-medium">
                          Perks & Benefits:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.perks.slice(0, 3).map((perk, index) => (
                            <Badge
                              variant="secondary"
                              key={index}
                              className="text-xs"
                            >
                              {perk}
                            </Badge>
                          ))}
                          {job.perks.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.perks.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-3 pt-2">
                      <Button variant="outline" size="sm" className="w-1/2">
                        <BookmarkIcon className="mr-1 h-4 w-4" />
                        Save
                      </Button>
                      <Button size="sm" className="w-1/2">
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}

            {/* Results Info - Bottom */}
            <div className="mt-8 text-right">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} jobs
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No jobs found matching your criteria.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
                setSelectedJobType("All");
                setSelectedWorkingMode("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

      </div>
    </>
  );
}

export { JobSearchPage }; 