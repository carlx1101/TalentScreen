import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// import 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.css';
// import 'filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, MapPin, Upload } from 'lucide-react';

// Register FilePond plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

interface FormData {
  name: string;
  ssm_number: string;
  ssm_document: File | null;
  industry: string;
  company_size: string;
  company_type: string;
  address: string;
  logo: File | null;
  banner: File | null;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
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
  'Other'
];

export default function CompanyOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ssmDocument, setSsmDocument] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    ssm_number: '',
    ssm_document: null,
    industry: '',
    company_size: '',
    company_type: '',
    address: '',
    logo: null,
    banner: null,
    website: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('ssm_number', formData.ssm_number);
    if (ssmDocument) submitData.append('ssm_document', ssmDocument);
    submitData.append('industry', formData.industry);
    submitData.append('company_size', formData.company_size);
    submitData.append('company_type', formData.company_type);
    submitData.append('address', formData.address);
    if (logoFile) submitData.append('logo', logoFile);
    if (bannerFile) submitData.append('banner', bannerFile);
    submitData.append('website', formData.website);
    submitData.append('facebook', formData.facebook);
    submitData.append('twitter', formData.twitter);
    submitData.append('instagram', formData.instagram);
    submitData.append('youtube', formData.youtube);

    router.post('/onboarding/company', submitData, {
      onFinish: () => setProcessing(false),
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formData.name && formData.ssm_number && ssmDocument;
      case 1:
        return formData.industry && formData.company_size && formData.company_type;
      case 2:
        return true; // Address step is optional for now
      case 3:
        return true; // Branding step is optional
      case 4:
        return true; // Team step is for future
      default:
        return false;
    }
  };

  return (
    <>
      <Head title="Company Onboarding" />

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-8">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Complete Your Company Profile
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Let's set up your company details to get started
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between">
                {['Company Details', 'Company Info', 'Address', 'Branding & Links', 'Invite Team'].map((title, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-sm ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                      {title}
                    </span>
                    {index < 4 && (
                      <div className={`w-16 h-0.5 mx-4 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Company Details */}
              {currentStep === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Company Details</CardTitle>
                    <CardDescription>
                      Basic information about your company
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Company Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ssm_number">SSM Number *</Label>
                      <Input
                        id="ssm_number"
                        value={formData.ssm_number}
                        onChange={(e) => setFormData({...formData, ssm_number: e.target.value})}
                        placeholder="Enter SSM registration number"
                      />
                    </div>

                    <div>
                      <Label>SSM Document * (PDF, max 5MB)</Label>
                      <FilePond
                        acceptedFileTypes={['application/pdf']}
                        maxFileSize="5MB"
                        onaddfile={(error, file) => {
                          if (!error) {
                            setSsmDocument(file.file as File);
                          }
                        }}
                        onremovefile={() => setSsmDocument(null)}
                        labelIdle='Drag & Drop your SSM document or <span class="filepond--label-action">Browse</span>'
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Company Info */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>
                      Additional details about your company
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="company_size">Company Size *</Label>
                      <Select value={formData.company_size} onValueChange={(value) => setFormData({...formData, company_size: value})}>
                        <SelectTrigger>
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
                    </div>

                    <div>
                      <Label htmlFor="company_type">Company Type *</Label>
                      <Select value={formData.company_type} onValueChange={(value) => setFormData({...formData, company_type: value})}>
                        <SelectTrigger>
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
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Address */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Company Address</CardTitle>
                    <CardDescription>
                      Location details (Google Maps integration coming soon)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <div className="flex gap-2">
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="Enter company address"
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" size="icon">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Google Maps integration will be available soon
                      </p>
                    </div>

                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Map will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Branding & Links */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Branding & Links</CardTitle>
                    <CardDescription>
                      Upload your company logo, banner, and social media links
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Company Logo (3MB, 500x500px)</Label>
                      <FilePond
                        acceptedFileTypes={['image/*']}
                        maxFileSize="3MB"
                        onaddfile={(error, file) => {
                          if (!error) {
                            setLogoFile(file.file as File);
                          }
                        }}
                        onremovefile={() => setLogoFile(null)}
                        labelIdle='Drag & Drop your logo or <span class="filepond--label-action">Browse</span>'
                      />
                    </div>

                    <div>
                      <Label>Company Banner (5MB, 1200x300px recommended)</Label>
                      <FilePond
                        acceptedFileTypes={['image/*']}
                        maxFileSize="5MB"
                        onaddfile={(error, file) => {
                          if (!error) {
                            setBannerFile(file.file as File);
                          }
                        }}
                        onremovefile={() => setBannerFile(null)}
                        labelIdle='Drag & Drop your banner or <span class="filepond--label-action">Browse</span>'
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          type="url"
                          value={formData.facebook}
                          onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                          placeholder="https://facebook.com/yourcompany"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter/X</Label>
                        <Input
                          id="twitter"
                          type="url"
                          value={formData.twitter}
                          onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                          placeholder="https://twitter.com/yourcompany"
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          type="url"
                          value={formData.instagram}
                          onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                          placeholder="https://instagram.com/yourcompany"
                        />
                      </div>
                      <div>
                        <Label htmlFor="youtube">YouTube</Label>
                        <Input
                          id="youtube"
                          type="url"
                          value={formData.youtube}
                          onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                          placeholder="https://youtube.com/yourcompany"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 5: Invite Team */}
              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Invite Team Members</CardTitle>
                    <CardDescription>
                      Invite your team members to join (Coming soon)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Team Invitation</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        This feature will be available in the next update.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={processing || !isStepValid(currentStep)}
                  >
                    {processing ? 'Creating...' : 'Complete Setup'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
