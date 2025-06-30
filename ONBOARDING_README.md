# Company Onboarding System

This project includes a comprehensive company onboarding system that guides new users through setting up their company profile.

## Features

### Registration Flow
- New users are automatically assigned the "company owner" role upon registration
- Users are redirected to the onboarding page after successful registration
- Onboarding is unskippable - users without a company are always redirected to onboarding

### 5-Step Onboarding Process

#### Step 1: Company Details
- Company Name (required)
- SSM Number (required)
- SSM Document Upload (PDF only, max 5MB)

#### Step 2: Company Information
- Industry (dropdown selection)
- Company Size (dropdown selection)
- Company Type (dropdown selection)

#### Step 3: Company Address
- Address input field
- Google Maps integration placeholder (awaiting API key)
- Location button for current location (future feature)

#### Step 4: Branding & Links
- Company Logo upload (3MB, 500x500px recommended)
- Company Banner upload (5MB, 1200x300px recommended)
- Website link
- Social media links (Facebook, Twitter/X, Instagram, YouTube)

#### Step 5: Invite Team Members
- Placeholder for future team invitation feature
- Email invitation or copy link functionality (coming soon)

## Technical Implementation

### Backend
- **Database**: `companies` table with all required fields
- **Model**: `Company` model with relationships to `User`
- **Controller**: `OnboardingController` handles form submission and validation
- **Middleware**: `RedirectIfNoCompany` ensures onboarding completion
- **File Storage**: Files are stored in `storage/app/public/` with organized folders

### Frontend
- **Stepper**: Custom stepper implementation (replaced @stepperize/react due to compatibility issues)
- **File Upload**: FilePond for drag-and-drop file uploads
- **Form Validation**: Client-side validation with step-by-step progression
- **UI Components**: shadcn/ui components for consistent design

### File Upload Structure
```
storage/app/public/
├── ssm_documents/     # SSM registration documents
├── company_logos/     # Company logos
└── company_banners/   # Company banners
```

## Usage

### For Users
1. Register with email and password
2. Automatically redirected to onboarding
3. Complete all required steps (Steps 1 & 2 are mandatory)
4. Upload company documents and branding materials
5. Submit to create company profile
6. Redirected to dashboard upon completion

### For Developers
- Add Google Maps API key to enable address step functionality
- Implement team invitation system in Step 5
- Customize validation rules in `OnboardingController`
- Modify file upload limits and accepted formats as needed

## Validation Rules

### Required Fields
- Company Name
- SSM Number
- SSM Document (PDF, max 5MB)
- Industry
- Company Size
- Company Type

### Optional Fields
- Address
- Logo (image, max 3MB)
- Banner (image, max 5MB)
- Website URL
- Social media URLs

## Security Features
- File type validation for uploads
- File size limits enforced
- CSRF protection on all forms
- Authentication required for all onboarding routes
- Unskippable onboarding ensures data completeness

## Future Enhancements
- Google Maps API integration for address selection
- Team member invitation system
- Email notifications for onboarding completion
- Company profile editing after onboarding
- Multi-language support
- Advanced file validation and processing 
