import React, { useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { defineStepper } from '@stepperize/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { MultiSelection } from '@/components/ui/multi-selection';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TooltipProvider } from '@/components/ui/tooltip';

// ISO 639-1 language codes with names
const languages = [
  { label: 'Afrikaans', value: 'af' },
  { label: 'Albanian', value: 'sq' },
  { label: 'Amharic', value: 'am' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Armenian', value: 'hy' },
  { label: 'Azerbaijani', value: 'az' },
  { label: 'Basque', value: 'eu' },
  { label: 'Belarusian', value: 'be' },
  { label: 'Bengali', value: 'bn' },
  { label: 'Bosnian', value: 'bs' },
  { label: 'Bulgarian', value: 'bg' },
  { label: 'Catalan', value: 'ca' },
  { label: 'Cebuano', value: 'ceb' },
  { label: 'Chinese (Simplified)', value: 'zh-CN' },
  { label: 'Chinese (Traditional)', value: 'zh-TW' },
  { label: 'Croatian', value: 'hr' },
  { label: 'Czech', value: 'cs' },
  { label: 'Danish', value: 'da' },
  { label: 'Dutch', value: 'nl' },
  { label: 'English', value: 'en' },
  { label: 'Estonian', value: 'et' },
  { label: 'Filipino', value: 'fil' },
  { label: 'Finnish', value: 'fi' },
  { label: 'French', value: 'fr' },
  { label: 'Galician', value: 'gl' },
  { label: 'Georgian', value: 'ka' },
  { label: 'German', value: 'de' },
  { label: 'Greek', value: 'el' },
  { label: 'Gujarati', value: 'gu' },
  { label: 'Haitian Creole', value: 'ht' },
  { label: 'Hausa', value: 'ha' },
  { label: 'Hawaiian', value: 'haw' },
  { label: 'Hebrew', value: 'he' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Hmong', value: 'hmn' },
  { label: 'Hungarian', value: 'hu' },
  { label: 'Icelandic', value: 'is' },
  { label: 'Igbo', value: 'ig' },
  { label: 'Indonesian', value: 'id' },
  { label: 'Irish', value: 'ga' },
  { label: 'Italian', value: 'it' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Javanese', value: 'jv' },
  { label: 'Kannada', value: 'kn' },
  { label: 'Kazakh', value: 'kk' },
  { label: 'Khmer', value: 'km' },
  { label: 'Korean', value: 'ko' },
  { label: 'Kurdish', value: 'ku' },
  { label: 'Kyrgyz', value: 'ky' },
  { label: 'Lao', value: 'lo' },
  { label: 'Latin', value: 'la' },
  { label: 'Latvian', value: 'lv' },
  { label: 'Lithuanian', value: 'lt' },
  { label: 'Luxembourgish', value: 'lb' },
  { label: 'Macedonian', value: 'mk' },
  { label: 'Malagasy', value: 'mg' },
  { label: 'Malay', value: 'ms' },
  { label: 'Malayalam', value: 'ml' },
  { label: 'Maltese', value: 'mt' },
  { label: 'Maori', value: 'mi' },
  { label: 'Marathi', value: 'mr' },
  { label: 'Mongolian', value: 'mn' },
  { label: 'Myanmar (Burmese)', value: 'my' },
  { label: 'Nepali', value: 'ne' },
  { label: 'Norwegian', value: 'no' },
  { label: 'Odia (Oriya)', value: 'or' },
  { label: 'Pashto', value: 'ps' },
  { label: 'Persian', value: 'fa' },
  { label: 'Polish', value: 'pl' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Punjabi', value: 'pa' },
  { label: 'Romanian', value: 'ro' },
  { label: 'Russian', value: 'ru' },
  { label: 'Samoan', value: 'sm' },
  { label: 'Scots Gaelic', value: 'gd' },
  { label: 'Serbian', value: 'sr' },
  { label: 'Sesotho', value: 'st' },
  { label: 'Shona', value: 'sn' },
  { label: 'Sindhi', value: 'sd' },
  { label: 'Sinhala (Sinhalese)', value: 'si' },
  { label: 'Slovak', value: 'sk' },
  { label: 'Slovenian', value: 'sl' },
  { label: 'Somali', value: 'so' },
  { label: 'Spanish', value: 'es' },
  { label: 'Sundanese', value: 'su' },
  { label: 'Swahili', value: 'sw' },
  { label: 'Swedish', value: 'sv' },
  { label: 'Tagalog (Filipino)', value: 'tl' },
  { label: 'Tajik', value: 'tg' },
  { label: 'Tamil', value: 'ta' },
  { label: 'Telugu', value: 'te' },
  { label: 'Thai', value: 'th' },
  { label: 'Turkish', value: 'tr' },
  { label: 'Ukrainian', value: 'uk' },
  { label: 'Urdu', value: 'ur' },
  { label: 'Uzbek', value: 'uz' },
  { label: 'Vietnamese', value: 'vi' },
  { label: 'Welsh', value: 'cy' },
  { label: 'Xhosa', value: 'xh' },
  { label: 'Yiddish', value: 'yi' },
  { label: 'Yoruba', value: 'yo' },
  { label: 'Zulu', value: 'zu' },
];

const employmentTypes = [
  { label: 'Full Time', value: 'full time' },
  { label: 'Part Time', value: 'part time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
  { label: 'Freelance', value: 'freelance' },
];

const workModes = [
  { label: 'Physical', value: 'physical' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Flexible', value: 'flexible' },
];

const currencies = [
  "AFN","ALL","DZD","AOA","ARS","AMD","AWG","AUD","AZN","BSD","BHD","BDT","BBD",
  "BYN","BZD","BMD","BTN","BTC","BOB","BAM","BWP","BRL","GBP","BND","BGN","BIF",
  "KHR","CAD","CVE","KYD","XOF","XAF","XPF","CLP","CNY","COP","KMF","CDF","CRC",
  "HRK","CUC","CZK","DKK","DJF","DOP","XCD","EGP","ERN","ETB","EUR","FKP","FJD",
  "GMD","GEL","GHS","GIP","GTQ","GNF","GYD","HTG","HNL","HKD","HUF","ISK","INR",
  "IDR","IRR","IQD","ILS","JMD","JPY","JOD","KZT","KES","KWD","KGS","LAK","LBP",
  "LSL","LRD","LYD","MOP","MKD","MGA","MWK","MYR","MVR","MRU","MUR","MXN","MDL",
  "MNT","MAD","MZN","MMK","NAD","NPR","ANG","TWD","NZD","NIO","NGN","KPW","NOK",
  "OMR","PKR","PAB","PGK","PYG","PEN","PHP","PLN","QAR","RON","RUB","RWF","SAR",
  "SDG","SRD","SZL","SEK","CHF","STN","VES","ZMW"
];

// Define the stepper steps
const stepper = defineStepper(
  { id: 'title', title: 'Job Title', description: 'Enter the job title' },
  { id: 'description', title: 'Job Description', description: 'Describe the job role and requirements' },
  { id: 'employment-details', title: 'Employment Details', description: 'Type, mode, skills, and languages' },
  { id: 'location', title: 'Work Location', description: 'Precise job location' },
  { id: 'salary', title: 'Salary (Optional)', description: 'Currency and salary range' },
  { id: 'benefits', title: 'Benefits (Optional)', description: 'Employment benefits and status' }
);

interface CreateJobListingData {
  title: string;
  description: string;
  employment_type: string;
  mode: string[];
  skills: string[];
  languages: string[];
  location: string;
  salary_currency: string;
  salary_min: string;
  salary_max: string;
  benefits: string[];
  is_active: boolean;
  [key: string]: string | string[] | boolean; // Add index signature for FormDataType constraint
}

interface Props {
  skills: { label: string; value: string }[];
  employmentBenefits: { label: string; value: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Job Listings',
    href: '/job-listings',
  },
  {
    title: 'Create Job Listing',
    href: '/job-listings/create',
  },
];

export default function CreateJobListing({ skills, employmentBenefits }: Props) {
  const { current, next, prev, isFirst, isLast, goTo } = stepper.useStepper();
  const formRef = useRef<HTMLFormElement>(null);

  const { data, setData, post, processing, errors } = useForm<CreateJobListingData>({
    title: '',
    description: '',
    employment_type: '',
    mode: [],
    skills: [],
    languages: [],
    location: '',
    salary_currency: '',
    salary_min: '',
    salary_max: '',
    benefits: [],
    is_active: true,
  });

  const handleNext = () => {
    if (!isLast) {
      // For optional steps (salary and benefits), allow proceeding without validation
      if (current.id === 'salary' || current.id === 'benefits') {
        next();
      } else if (formRef.current?.reportValidity()) {
        next();
      }
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      prev();
    }
  };

  const handleSubmit = () => {
    post('/job-listings', {
      onSuccess: () => {
        toast.success('Job listing created successfully');
      },
      onError: (errs) => {
        Object.values(errs).forEach((msg) => {
          if (Array.isArray(msg)) {
            msg.forEach((m) => toast.error(m));
          } else {
            toast.error(msg);
          }
        });
      },
    });
  };

  const renderStepContent = () => {
    switch (current.id) {
      case 'title':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Enter job title"
                className="mt-1"
                required
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title}</p>
              )}
            </div>
          </div>
        );

      case 'description':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="description">Job Description <span className="text-destructive">*</span></Label>
              <TooltipProvider>
                <MinimalTiptapEditor
                  value={data.description}
                  onChange={(content) => setData('description', content as string)}
                  className="w-full mt-1"
                  editorContentClassName="p-5"
                  output="html"
                  autofocus={true}
                  editable={true}
                  editorClassName="focus:outline-hidden"
                />
              </TooltipProvider>
              {errors.description && (
                <p className="text-sm text-destructive mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        );

      case 'employment-details':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="employment_type">Employment Type <span className="text-destructive">*</span></Label>
              <Select value={data.employment_type} onValueChange={(value) => setData('employment_type', value)} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.employment_type && (
                <p className="text-sm text-destructive mt-1">{errors.employment_type}</p>
              )}
            </div>

            <div>
              <Label>Work Mode <span className="text-destructive">*</span></Label>
              <MultiSelection
                value={data.mode}
                options={workModes}
                onValueSelected={(selection) => setData('mode', selection || [])}
                isLoading={false}
              />
              {errors.mode && (
                <p className="text-sm text-destructive mt-1">{errors.mode}</p>
              )}
            </div>

            <div>
              <Label>Required Skills <span className="text-destructive">*</span></Label>
              <MultiSelection
                value={data.skills}
                options={skills}
                onValueSelected={(selection) => setData('skills', selection || [])}
                isLoading={false}
              />
              {errors.skills && (
                <p className="text-sm text-destructive mt-1">{errors.skills}</p>
              )}
            </div>

            <div>
              <Label>Required Languages <span className="text-destructive">*</span></Label>
              <MultiSelection
                value={data.languages}
                options={languages}
                onValueSelected={(selection) => setData('languages', selection || [])}
                isLoading={false}
              />
              {errors.languages && (
                <p className="text-sm text-destructive mt-1">{errors.languages}</p>
              )}
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="location">Work Location <span className="text-destructive">*</span></Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => setData('location', e.target.value)}
                placeholder="Enter precise job location (e.g., Kuala Lumpur, Malaysia)"
                className="mt-1"
                required
              />
              {errors.location && (
                <p className="text-sm text-destructive mt-1">{errors.location}</p>
              )}
            </div>

            <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Please provide the precise location where the job will be performed.
              </p>
            </div>
          </div>
        );

      case 'salary':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="salary_currency">Currency</Label>
                <Select value={data.salary_currency} onValueChange={(value) => setData('salary_currency', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.salary_currency && (
                  <p className="text-sm text-destructive mt-1">{errors.salary_currency}</p>
                )}
              </div>

              <div>
                <Label htmlFor="salary_min">Minimum Salary</Label>
                <Input
                  id="salary_min"
                  type="number"
                  value={data.salary_min}
                  onChange={(e) => setData('salary_min', e.target.value)}
                  placeholder="Min salary"
                  className="mt-1"
                  min="0"
                />
                {errors.salary_min && (
                  <p className="text-sm text-destructive mt-1">{errors.salary_min}</p>
                )}
              </div>

              <div>
                <Label htmlFor="salary_max">Maximum Salary</Label>
                <Input
                  id="salary_max"
                  type="number"
                  value={data.salary_max}
                  onChange={(e) => setData('salary_max', e.target.value)}
                  placeholder="Max salary"
                  className="mt-1"
                  min="0"
                />
                {errors.salary_max && (
                  <p className="text-sm text-destructive mt-1">{errors.salary_max}</p>
                )}
              </div>
            </div>

            <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This step is optional. If you specify a currency, both minimum and maximum salary values are required.
              </p>
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div className="space-y-6">
            <div>
              <Label>Employment Benefits</Label>
              <MultiSelection
                value={data.benefits}
                options={employmentBenefits}
                onValueSelected={(selection) => setData('benefits', selection || [])}
                isLoading={false}
              />
              {errors.benefits && (
                <p className="text-sm text-destructive mt-1">{errors.benefits}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={data.is_active}
                onCheckedChange={(checked) => setData('is_active', checked)}
              />
              <Label htmlFor="is_active">Job listing is active</Label>
            </div>
            {errors.is_active && (
              <p className="text-sm text-destructive mt-1">{errors.is_active}</p>
            )}

            <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This step is optional. Active job listings will be visible to potential candidates.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Job Listing" />
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Create New Job Listing</CardTitle>
            <CardDescription>
              Fill out all the required information to create a new job listing for your company.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Vertical Stepper (Desktop) */}
              <div className="w-80 flex-shrink-0 hidden xl:block">
                <nav aria-label="Job Listing Creation Steps" className="group">
                  <ol className="flex flex-col gap-2" aria-orientation="vertical">
                    {stepper.steps.map((step, index, array) => (
                      <React.Fragment key={step.id}>
                        <li className="flex items-center gap-4 flex-shrink-0">
                          <Button
                            type="button"
                            role="tab"
                            variant={index <= stepper.utils.getIndex(current.id) ? 'default' : 'secondary'}
                            aria-current={current.id === step.id ? 'step' : undefined}
                            aria-posinset={index + 1}
                            aria-setsize={stepper.steps.length}
                            aria-selected={current.id === step.id}
                            className="flex size-10 items-center justify-center rounded-full"
                            onClick={() => goTo(step.id)}
                          >
                            {index + 1}
                          </Button>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{step.title}</span>
                            <span className="text-xs text-muted-foreground">{step.description}</span>
                          </div>
                        </li>
                        {index < array.length - 1 && (
                          <div className="flex gap-4">
                            <div
                              className="flex justify-center"
                              style={{
                                paddingInlineStart: '1.25rem',
                              }}
                            >
                              <Separator
                                orientation="vertical"
                                className={`w-[1px] h-full ${
                                  index < stepper.utils.getIndex(current.id) ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </ol>
                </nav>
              </div>

              {/* Circular Stepper (Mobile) */}
              <div className="xl:hidden flex flex-col items-center mb-8 w-full">
                <div className="relative w-20 h-20 flex items-center justify-center mx-auto">
                  <svg className="absolute top-0 left-0" width="80" height="80">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 36}
                      strokeDashoffset={2 * Math.PI * 36 * (1 - (stepper.utils.getIndex(current.id) + 1) / stepper.steps.length)}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.4s' }}
                    />
                  </svg>
                  <span className="relative z-10 text-3xl font-bold text-primary">
                    {stepper.utils.getIndex(current.id) + 1}
                  </span>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-base font-semibold text-primary">{current.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{current.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Step {stepper.utils.getIndex(current.id) + 1} of {stepper.steps.length}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">{current.title}</h3>
                    <span className="text-sm text-muted-foreground hidden xl:block">
                      Step {stepper.utils.getIndex(current.id) + 1} of {stepper.steps.length}
                    </span>
                  </div>
                  <form ref={formRef}>
                    {renderStepContent()}
                  </form>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isFirst}
                  >
                    Previous
                  </Button>
                  <div className="flex gap-2">
                    {/* Show Skip button for optional steps */}
                    {(current.id === 'salary' || current.id === 'benefits') && !isLast && (
                      <Button
                        variant="outline"
                        onClick={handleNext}
                      >
                        Skip
                      </Button>
                    )}
                    {isLast ? (
                      <Button onClick={handleSubmit} disabled={processing}>
                        {processing ? 'Creating...' : 'Create Job Listing'}
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
