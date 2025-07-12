import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import axios from '@/lib/axios';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Edit, Save, X } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Register FilePond plugins
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

interface Skill {
  id: number;
  name: string;
  can: {
    update_skill: boolean;
    delete_skill: boolean;
  };
}

interface EmploymentBenefit {
  id: number;
  name: string;
  icon_path: string;
  can: {
    update_employment_benefit: boolean;
    delete_employment_benefit: boolean;
  };
}

interface Props {
  skills: Skill[];
  employmentBenefits: EmploymentBenefit[];
  can: {
    create_skill: boolean;
    create_employment_benefit: boolean;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Admin',
    href: '/admin',
  },
  {
    title: 'Job Listing Configuration',
    href: '/admin/job-listing-configuration',
  },
];

export default function JobListingConfiguration({ skills: initialSkills, employmentBenefits: initialEmploymentBenefits, can }: Props) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [employmentBenefits, setEmploymentBenefits] = useState<EmploymentBenefit[]>(initialEmploymentBenefits);
  const [processing, setProcessing] = useState(false);

  // Form references for validation
  const skillFormRef = useRef<HTMLFormElement>(null);
  const benefitFormRef = useRef<HTMLFormElement>(null);

  // Skills state
  const [newSkillName, setNewSkillName] = useState('');
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [editingSkillName, setEditingSkillName] = useState('');

  // Employment Benefits state
  const [newBenefitName, setNewBenefitName] = useState('');
  const [newBenefitIcon, setNewBenefitIcon] = useState<File | null>(null);
  const [editingBenefitId, setEditingBenefitId] = useState<number | null>(null);
  const [editingBenefitName, setEditingBenefitName] = useState('');
  const [editingBenefitIcon, setEditingBenefitIcon] = useState<File | null>(null);
  const [editingBenefitIconPath, setEditingBenefitIconPath] = useState<string>('');

  // Alert Dialog state
  const [deleteSkillId, setDeleteSkillId] = useState<number | null>(null);
  const [deleteBenefitId, setDeleteBenefitId] = useState<number | null>(null);

  // Skills handlers
  const handleCreateSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!skillFormRef.current?.reportValidity()) {
      return;
    }

    setProcessing(true);
    try {
      const response = await axios.post('/admin/skills', {
        name: newSkillName,
      });
      toast.success('Skill created successfully');

      const newSkill = response.data.skill || {
        id: Date.now(),
        name: newSkillName,
        can: {
          update_skill: true,
          delete_skill: true,
        }
      };

      setSkills(prevSkills => [...prevSkills, newSkill]);
      setNewSkillName('');
    } catch (error) {
      console.error('Error creating skill:', error);
      toast.error('Failed to create skill');
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdateSkill = async (skillId: number) => {
    if (!skillFormRef.current?.reportValidity()) {
      return;
    }

    setProcessing(true);
    try {
      await axios.put(`/admin/skills/${skillId}`, {
        name: editingSkillName,
      });
      toast.success('Skill updated successfully');

      setSkills(prevSkills =>
        prevSkills.map(skill =>
          skill.id === skillId
            ? { ...skill, name: editingSkillName }
            : skill
        )
      );
      setEditingSkillId(null);
      setEditingSkillName('');
    } catch (error) {
      console.error('Error updating skill:', error);
      toast.error('Failed to update skill');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteSkill = async (skillId: number) => {
    setProcessing(true);
    try {
      await axios.delete(`/admin/skills/${skillId}`);
      toast.success('Skill deleted successfully');

      setSkills(prevSkills => prevSkills.filter(skill => skill.id !== skillId));
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill');
    } finally {
      setProcessing(false);
      setDeleteSkillId(null);
    }
  };

  const startEditingSkill = (skill: Skill) => {
    setEditingSkillId(skill.id);
    setEditingSkillName(skill.name);
  };

  const cancelEditingSkill = () => {
    setEditingSkillId(null);
    setEditingSkillName('');
  };

  // Employment Benefits handlers
  const handleCreateEmploymentBenefit = async () => {
    if (!benefitFormRef.current?.reportValidity()) {
      return;
    }

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('name', newBenefitName);
      if (newBenefitIcon) {
        formData.append('icon', newBenefitIcon);
      }

      const response = await axios.post('/admin/employment-benefits', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Employment benefit created successfully');

      const newBenefit = response.data.employment_benefit || {
        id: Date.now(),
        name: newBenefitName,
        icon_path: '',
        can: {
          update_employment_benefit: true,
          delete_employment_benefit: true,
        }
      };

      setEmploymentBenefits(prevBenefits => [...prevBenefits, newBenefit]);
      setNewBenefitName('');
      setNewBenefitIcon(null);
    } catch (error) {
      console.error('Error creating employment benefit:', error);
      toast.error('Failed to create employment benefit');
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdateEmploymentBenefit = async (benefitId: number) => {
    if (!benefitFormRef.current?.reportValidity()) {
      return;
    }

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('name', editingBenefitName);
      if (editingBenefitIcon) {
        formData.append('icon', editingBenefitIcon);
      }

      await axios.put(`/admin/employment-benefits/${benefitId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Employment benefit updated successfully');

      setEmploymentBenefits(prevBenefits =>
        prevBenefits.map(benefit =>
          benefit.id === benefitId
            ? { ...benefit, name: editingBenefitName }
            : benefit
        )
      );
      setEditingBenefitId(null);
      setEditingBenefitName('');
      setEditingBenefitIcon(null);
    } catch (error) {
      console.error('Error updating employment benefit:', error);
      toast.error('Failed to update employment benefit');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteEmploymentBenefit = async (benefitId: number) => {
    setProcessing(true);
    try {
      await axios.delete(`/admin/employment-benefits/${benefitId}`);
      toast.success('Employment benefit deleted successfully');

      setEmploymentBenefits(prevBenefits => prevBenefits.filter(benefit => benefit.id !== benefitId));
    } catch (error) {
      console.error('Error deleting employment benefit:', error);
      toast.error('Failed to delete employment benefit');
    } finally {
      setProcessing(false);
      setDeleteBenefitId(null);
    }
  };

  const startEditingBenefit = (benefit: EmploymentBenefit) => {
    setEditingBenefitId(benefit.id);
    setEditingBenefitName(benefit.name);
    setEditingBenefitIcon(null);
    setEditingBenefitIconPath(benefit.icon_path);
  };

  const cancelEditingBenefit = () => {
    setEditingBenefitId(null);
    setEditingBenefitName('');
    setEditingBenefitIcon(null);
    setEditingBenefitIconPath('');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Job Listing Configuration" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Job Listing Configuration
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage skills and employment benefits for job listings
          </p>
        </div>

        {/* Skills Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Skills Management
              </CardTitle>
              <CardDescription>
                Create and manage skills for job listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Create New Skill */}
              {can.create_skill && (
                <form ref={skillFormRef} className="mb-6 p-4 border rounded-lg" onSubmit={handleCreateSkill}>
                  <Label htmlFor="new-skill" className="text-sm font-medium">New Skill</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="new-skill"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      placeholder="Enter skill name"
                      className="flex-1"
                      required
                      minLength={1}
                      maxLength={255}
                    />
                    <Button
                      disabled={processing || !newSkillName.trim()}
                      size="sm"
                      type="submit"
                    >
                      Add
                    </Button>
                  </div>
                </form>
              )}

              {/* Existing Skills */}
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                    {editingSkillId === skill.id ? (
                      <form ref={skillFormRef} className="flex items-center gap-2 flex-1">
                        <Input
                          value={editingSkillName}
                          onChange={(e) => setEditingSkillName(e.target.value)}
                          className="flex-1"
                          required
                          minLength={1}
                          maxLength={255}
                        />
                        <Button
                          onClick={() => handleUpdateSkill(skill.id)}
                          disabled={processing || !editingSkillName.trim()}
                          size="sm"
                          type="button"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={cancelEditingSkill}
                          variant="outline"
                          size="sm"
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </form>
                    ) : (
                      <>
                        <span className="text-sm">{skill.name}</span>
                        <div className="flex gap-2">
                          {skill.can.update_skill && (
                            <Button
                              onClick={() => startEditingSkill(skill)}
                              variant="outline"
                              size="sm"
                              disabled={processing}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {skill.can.delete_skill && (
                            <AlertDialog open={deleteSkillId === skill.id} onOpenChange={(open) => !open && setDeleteSkillId(null)}>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  disabled={processing}
                                  onClick={() => setDeleteSkillId(skill.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Skill</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the skill "{skill.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteSkill(skill.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Employment Benefits Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Employment Benefits Management
              </CardTitle>
              <CardDescription>
                Create and manage employment benefits with icons
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Create New Employment Benefit */}
              {can.create_employment_benefit && (
                <form ref={benefitFormRef} className="mb-6 p-4 border rounded-lg space-y-4">
                  <div>
                    <Label htmlFor="new-benefit" className="text-sm font-medium">New Employment Benefit</Label>
                    <Input
                      id="new-benefit"
                      value={newBenefitName}
                      onChange={(e) => setNewBenefitName(e.target.value)}
                      placeholder="Enter benefit name"
                      className="mt-1"
                      required
                      minLength={1}
                      maxLength={255}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Icon (SVG only, max 1MB)</Label>
                    <div className="relative mt-1">
                      {!newBenefitIcon && (
                        <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0' required />
                      )}
                      <FilePond
                        files={newBenefitIcon ? [newBenefitIcon] : []}
                        onupdatefiles={(files) => setNewBenefitIcon(files[0]?.file as File || null)}
                        acceptedFileTypes={['image/svg+xml']}
                        maxFileSize="1MB"
                        labelIdle="Drag & Drop SVG icon or <span class='filepond--label-action'>Browse</span>"
                        credits={false}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateEmploymentBenefit}
                    disabled={processing || !newBenefitName.trim() || !newBenefitIcon}
                    className="w-full"
                    type="button"
                  >
                    Add Benefit
                  </Button>
                </form>
              )}

              {/* Existing Employment Benefits */}
              <div className="space-y-2">
                {employmentBenefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-center justify-between p-3 border rounded-lg">
                    {editingBenefitId === benefit.id ? (
                      <form ref={benefitFormRef} className="flex items-center gap-2 flex-1">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={editingBenefitName}
                            onChange={(e) => setEditingBenefitName(e.target.value)}
                            placeholder="Benefit name"
                            required
                            minLength={1}
                            maxLength={255}
                          />
                          <div className="relative">
                            {!editingBenefitIcon && (
                              <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0' />
                            )}
                            <FilePond
                              files={
                                editingBenefitIcon
                                  ? [editingBenefitIcon]
                                  : editingBenefitIconPath
                                    ? [{ source: editingBenefitIconPath, options: { type: 'input' } }]
                                    : []
                              }
                              onupdatefiles={(files) => setEditingBenefitIcon(files[0]?.file as File || null)}
                              acceptedFileTypes={['image/svg+xml']}
                              maxFileSize="1MB"
                              labelIdle="Drag & Drop new SVG icon or <span class='filepond--label-action'>Browse</span>"
                              credits={false}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => handleUpdateEmploymentBenefit(benefit.id)}
                            disabled={processing || !editingBenefitName.trim()}
                            size="sm"
                            type="button"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={cancelEditingBenefit}
                            variant="outline"
                            size="sm"
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          {benefit.icon_path && (
                            <div className="w-8 h-8 flex items-center justify-center">
                              <img
                                src={benefit.icon_path}
                                alt={benefit.name}
                                className="w-6 h-6"
                              />
                            </div>
                          )}
                          <span className="text-sm">{benefit.name}</span>
                        </div>
                        <div className="flex gap-2">
                          {benefit.can.update_employment_benefit && (
                            <Button
                              onClick={() => startEditingBenefit(benefit)}
                              variant="outline"
                              size="sm"
                              disabled={processing}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {benefit.can.delete_employment_benefit && (
                            <AlertDialog open={deleteBenefitId === benefit.id} onOpenChange={(open) => !open && setDeleteBenefitId(null)}>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  disabled={processing}
                                  onClick={() => setDeleteBenefitId(benefit.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Employment Benefit</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the employment benefit "{benefit.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteEmploymentBenefit(benefit.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
