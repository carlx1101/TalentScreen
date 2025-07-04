import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
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
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'sonner';
import { type Company } from '@/types';

// Register FilePond plugins
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType, FilePondPluginImagePreview);

interface EditCompanyData {
    name: string;
    ssm_number: string;
    industry: string;
    company_size: string;
    company_type: string;
    address: string;
    website: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    ssm_document: File | null;
    logo: File | null;
    banner: File | null;
    method: 'put';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Edit Company',
        href: '/company/edit',
    },
];

interface Props {
    company: Company;
}

export default function EditCompany({ company }: Props) {
    const { data, setData, post, processing, errors } = useForm<Required<EditCompanyData>>({
        name: company.name || '',
        ssm_number: company.ssm_number || '',
        industry: company.industry || '',
        company_size: company.company_size || '',
        company_type: company.company_type || '',
        address: company.address || '',
        website: company.website || '',
        facebook: company.facebook || '',
        twitter: company.twitter || '',
        instagram: company.instagram || '',
        youtube: company.youtube || '',
        ssm_document: null,
        logo: null,
        banner: null,
        method: 'put'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/company/update', {
            onSuccess: () => {
                toast.success('Company information updated successfully');
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Company" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Company Information</CardTitle>
                            <CardDescription>
                                Update your company details and branding information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Basic Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name">Company Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter your company name"
                                                className="mt-1"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-destructive mt-1">{errors.name}</p>
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
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Enter company address"
                                            className="mt-1"
                                        />
                                        {errors.address && (
                                            <p className="text-sm text-destructive mt-1">{errors.address}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Online Presence */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Online Presence</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="website">Website</Label>
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
                                            <Label htmlFor="facebook">Facebook</Label>
                                            <Input
                                                id="facebook"
                                                type="url"
                                                value={data.facebook}
                                                onChange={(e) => setData('facebook', e.target.value)}
                                                placeholder="https://facebook.com/yourcompany"
                                                className="mt-1"
                                            />
                                            {errors.facebook && (
                                                <p className="text-sm text-destructive mt-1">{errors.facebook}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="twitter">Twitter</Label>
                                            <Input
                                                id="twitter"
                                                type="url"
                                                value={data.twitter}
                                                onChange={(e) => setData('twitter', e.target.value)}
                                                placeholder="https://twitter.com/yourcompany"
                                                className="mt-1"
                                            />
                                            {errors.twitter && (
                                                <p className="text-sm text-destructive mt-1">{errors.twitter}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="instagram">Instagram</Label>
                                            <Input
                                                id="instagram"
                                                type="url"
                                                value={data.instagram}
                                                onChange={(e) => setData('instagram', e.target.value)}
                                                placeholder="https://instagram.com/yourcompany"
                                                className="mt-1"
                                            />
                                            {errors.instagram && (
                                                <p className="text-sm text-destructive mt-1">{errors.instagram}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="youtube">YouTube</Label>
                                            <Input
                                                id="youtube"
                                                type="url"
                                                value={data.youtube}
                                                onChange={(e) => setData('youtube', e.target.value)}
                                                placeholder="https://youtube.com/yourcompany"
                                                className="mt-1"
                                            />
                                            {errors.youtube && (
                                                <p className="text-sm text-destructive mt-1">{errors.youtube}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Documents and Media */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Documents & Media</h3>

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
                                        />
                                        {errors.ssm_document && (
                                            <p className="text-sm text-destructive mt-1">{errors.ssm_document}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            <Label>Company Banner (5MB max, 1200x400px recommended)</Label>
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
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Company'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
