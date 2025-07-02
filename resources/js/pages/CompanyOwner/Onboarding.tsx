import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { defineStepper } from '@stepperize/react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Register FilePond plugins
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType, FilePondPluginImagePreview);

interface OnboardingData {
  // Step 1
  company_name: string;
  ssm_number: string;
  ssm_document: File | null;

  // Step 2
  industry: string;
  company_size: string;
  company_type: string;

  // Step 3
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;

  // Step 4
  logo: File | null;
  banner: File | null;
  website: string;
  social_media: string;

  // Step 5
  team_members: string[];

  [key: string]: string | File | null | string[]; // Add index signature for FormDataType constraint
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Consulting',
  'Marketing',
  'Other'
];

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

const companyTypes = [
  'Private Limited',
  'Public Limited',
  'Partnership',
  'Sole Proprietorship',
  'LLC',
  'Corporation',
  'Non-Profit',
  'Other'
];

const countries = [
  'Malaysia',
  'Singapore',
  'Indonesia',
  'Thailand',
  'Philippines',
  'Vietnam',
  'Other'
];

// Define the stepper steps
const stepper = defineStepper(
  { id: 'company-info', title: 'Company Information', description: 'Basic company details and SSM registration' },
  { id: 'company-profile', title: 'Company Profile', description: 'Industry and company characteristics' },
  { id: 'company-address', title: 'Company Address', description: 'Physical location and contact details' },
  { id: 'company-branding', title: 'Company Branding', description: 'Logo, banner, and online presence' },
  { id: 'team-setup', title: 'Team Setup', description: 'Invite team members to join' }
);

export default function Onboarding() {
  const [teamMembers, setTeamMembers] = useState<string[]>(['']);
  const { current, next, prev, isFirst, isLast, goTo } = stepper.useStepper();

  const { data, setData, post, processing, errors } = useForm<OnboardingData>({
    // Step 1
    company_name: '',
    ssm_number: '',
    ssm_document: null,

    // Step 2
    industry: '',
    company_size: '',
    company_type: '',

    // Step 3
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',

    // Step 4
    logo: null,
    banner: null,
    website: '',
    social_media: '',

    // Step 5
    team_members: []
  });

  const handleNext = () => {
    if (!isLast) {
      next();
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      prev();
    }
  };

  const handleSubmit = () => {
    setData('team_members', teamMembers.filter(email => email.trim() !== ''));
    post('/company-owner/onboarding', {
      onSuccess: () => {
        toast.success('Company onboarding completed successfully');
      },
      onError: (errs) => {
        Object.values(errs).forEach((msg) => {
          console.log(msg);
          if (Array.isArray(msg)) {
            msg.forEach((m) => toast.error(m));
          } else {
            toast.error(msg);
          }
        });
      },
    });
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, '']);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, value: string) => {
    const updated = [...teamMembers];
    updated[index] = value;
    setTeamMembers(updated);
  };

  const renderStepContent = () => {
    switch (current.id) {
      case 'company-info':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={data.company_name}
                onChange={(e) => setData('company_name', e.target.value)}
                placeholder="Enter your company name"
                className="mt-1"
                required
              />
              {errors.company_name && (
                <p className="text-sm text-destructive mt-1">{errors.company_name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="ssm_number">SSM Number</Label>
              <Input
                id="ssm_number"
                value={data.ssm_number}
                onChange={(e) => setData('ssm_number', e.target.value)}
                placeholder="Enter SSM registration number"
                className="mt-1"
                required
              />
              {errors.ssm_number && (
                <p className="text-sm text-destructive mt-1">{errors.ssm_number}</p>
              )}
            </div>

            <div>
              <Label>SSM Document (PDF only, max 5MB)</Label>
              <FilePond
                files={data.ssm_document ? [data.ssm_document] : []}
                onupdatefiles={(files) => setData('ssm_document', files[0]?.file as File || null)}
                acceptedFileTypes={['application/pdf']}
                maxFileSize="5MB"
                labelIdle="Drag & Drop your SSM document or <span class='filepond--label-action'>Browse</span>"
                className="mt-1"
                credits={false}
                required
              />
              {errors.ssm_document && (
                <p className="text-sm text-destructive mt-1">{errors.ssm_document}</p>
              )}
            </div>
          </div>
        );

      case 'company-profile':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={data.industry} onValueChange={(value) => setData('industry', value)} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-destructive mt-1">{errors.industry}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company_size">Company Size</Label>
              <Select value={data.company_size} onValueChange={(value) => setData('company_size', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.company_size && (
                <p className="text-sm text-destructive mt-1">{errors.company_size}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company_type">Company Type</Label>
              <Select value={data.company_type} onValueChange={(value) => setData('company_type', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  {companyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.company_type && (
                <p className="text-sm text-destructive mt-1">{errors.company_type}</p>
              )}
            </div>
          </div>
        );

      case 'company-address':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                placeholder="Enter street address"
                className="mt-1"
              />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={data.city}
                  onChange={(e) => setData('city', e.target.value)}
                  placeholder="Enter city"
                  className="mt-1"
                />
                {errors.city && (
                  <p className="text-sm text-destructive mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={data.state}
                  onChange={(e) => setData('state', e.target.value)}
                  placeholder="Enter state"
                  className="mt-1"
                />
                {errors.state && (
                  <p className="text-sm text-destructive mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  value={data.postal_code}
                  onChange={(e) => setData('postal_code', e.target.value)}
                  placeholder="Enter postal code"
                  className="mt-1"
                />
                {errors.postal_code && (
                  <p className="text-sm text-destructive mt-1">{errors.postal_code}</p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={data.country} onValueChange={(value) => setData('country', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-sm text-destructive mt-1">{errors.country}</p>
                )}
              </div>
            </div>

            <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
              <p className="text-muted-foreground">
                Google Maps integration will be available once API key is configured
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Geolocation and map preview will be added here
              </p>
            </div>
          </div>
        );

      case 'company-branding':
        return (
          <div className="space-y-6">
            <div>
              <Label>Company Logo (3MB max, 500x500px recommended)</Label>
              <FilePond
                files={data.logo ? [data.logo] : []}
                onupdatefiles={(files) => setData('logo', files[0]?.file as File || null)}
                acceptedFileTypes={['image/*']}
                maxFileSize="3MB"
                labelIdle="Drag & Drop your company logo or <span class='filepond--label-action'>Browse</span>"
                className="mt-1"
                credits={false}
              />
              {errors.logo && (
                <p className="text-sm text-destructive mt-1">{errors.logo}</p>
              )}
            </div>

            <div>
              <Label>Company Banner (5MB max, 1200x300px recommended)</Label>
              <FilePond
                files={data.banner ? [data.banner] : []}
                onupdatefiles={(files) => setData('banner', files[0]?.file as File || null)}
                acceptedFileTypes={['image/*']}
                maxFileSize="5MB"
                labelIdle="Drag & Drop your company banner or <span class='filepond--label-action'>Browse</span>"
                className="mt-1"
                credits={false}
              />
              {errors.banner && (
                <p className="text-sm text-destructive mt-1">{errors.banner}</p>
              )}
            </div>

            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                value={data.website}
                onChange={(e) => setData('website', e.target.value)}
                placeholder="https://yourcompany.com"
                className="mt-1"
              />
              {errors.website && (
                <p className="text-sm text-destructive mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <Label htmlFor="social_media">Social Media Link</Label>
              <Input
                id="social_media"
                type="url"
                value={data.social_media}
                onChange={(e) => setData('social_media', e.target.value)}
                placeholder="https://linkedin.com/company/yourcompany"
                className="mt-1"
              />
              {errors.social_media && (
                <p className="text-sm text-destructive mt-1">{errors.social_media}</p>
              )}
            </div>
          </div>
        );

      case 'team-setup':
        return (
          <div className="space-y-6">
            <div>
              <Label>Invite Team Members</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Add email addresses of team members you'd like to invite
              </p>

              {teamMembers.map((email, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => updateTeamMember(index, e.target.value)}
                    placeholder="team@yourcompany.com"
                    className="flex-1"
                  />
                  {teamMembers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTeamMember(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addTeamMember}
                className="mt-2"
              >
                Add Another Member
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Or share this link</h4>
              <div className="flex gap-2">
                <Input
                  value={`${window.location.origin}/invite/company`}
                  readOnly
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(`${window.location.origin}/invite/company`)}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Head title="Company Onboarding" />
      <div className="min-h-screen bg-background py-8">
        <div className="w-full px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to TalentScreen</h1>
            <p className="text-muted-foreground mt-2">
              Let's set up your company profile. This will only take a few minutes.
            </p>
          </div>

          <Card className="mb-8 mx-auto max-w-5xl">
            <CardHeader>
              <CardTitle>Company Onboarding</CardTitle>
              <CardDescription>
                Complete all steps to set up your company profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Custom Circular Stepper */}
              {/* Desktop Stepper */}
              <div className="hidden md:flex justify-between items-center mb-12 w-full overflow-x-auto">
                {stepper.steps.map((step, index) => {
                  const isActive = current.id === step.id;
                  const isCompleted = stepper.utils.getIndex(current.id) > index;
                  return (
                    <React.Fragment key={step.id}>
                      <button
                        type="button"
                        onClick={() => goTo(step.id)}
                        className="flex flex-col items-center focus:outline-none group"
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <div className={`flex items-center justify-center rounded-full border-2 transition-all duration-200 w-12 h-12 text-lg font-bold
                          ${isActive ? 'bg-primary text-primary-foreground border-primary shadow-lg' :
                            isCompleted ? 'bg-green-500 text-white border-green-500' :
                            'bg-background text-muted-foreground border-border'}
                        `}>
                          {index + 1}
                        </div>
                        <span className={`mt-2 text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{step.title}</span>
                        <span className="text-xs text-muted-foreground text-center max-w-[8rem] mt-1">{step.description}</span>
                      </button>
                      {index < stepper.steps.length - 1 && (
                        <div className="flex-1 h-1 mx-2 bg-border rounded-full min-w-[32px]" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Mobile Stepper: Circular Progress */}
              <div className="flex md:hidden flex-col items-center mb-8">
                <div className="relative w-20 h-20 flex items-center justify-center">
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
              <div className="mb-8">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirst}
                >
                  Previous
                </Button>
                {isLast ? (
                  <Button onClick={handleSubmit} disabled={processing}>
                    {processing ? 'Submitting...' : 'Complete Setup'}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
