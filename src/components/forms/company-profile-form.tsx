import * as React from 'react';
import { useState } from 'react';
import { PlusCircle, Trash2, Link as LinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AIField } from '@/components/ui/ai-input';
import { FileUpload, FileInfo } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Link } from '@/lib/types';

interface CompanyProfileFormProps {
  companyId: string;
}

export function CompanyProfileForm({ companyId }: CompanyProfileFormProps) {
  // Form state
  const [organizationDescription, setOrganizationDescription] = useState('');
  const [revenueGeneration, setRevenueGeneration] = useState('');
  const [industryInformation, setIndustryInformation] = useState('');
  const [challenges, setChallenges] = useState('');
  const [strategicPriorities, setStrategicPriorities] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [links, setLinks] = useState<Link[]>([]);
  const [files, setFiles] = useState<FileInfo[]>([]);

  // New link state
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const handleAddLink = () => {
    if (newLinkTitle && newLinkUrl) {
      setLinks([
        ...links,
        {
          id: Date.now().toString(),
          title: newLinkTitle,
          url: newLinkUrl,
        },
      ]);
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save this data to an API
    console.log({
      companyId,
      organizationDescription,
      revenueGeneration,
      industryInformation,
      challenges,
      strategicPriorities,
      additionalInformation,
      links,
      files,
    });

    alert('Company profile saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <AIField
          multiline={true}
          label="Organization Description"
          value={organizationDescription}
          onChange={setOrganizationDescription}
          aiPrompt="Generate a description of the organization focusing on what they do and their main business areas"
          placeholder="Describe what the organization does..."
        />

        <AIField
          multiline={true}
          label="Revenue Generation"
          value={revenueGeneration}
          onChange={setRevenueGeneration}
          aiPrompt="Generate a description of how the organization generates revenue"
          placeholder="Describe how the organization generates revenue..."
        />

        <AIField
          multiline={true}
          label="Industry Information"
          value={industryInformation}
          onChange={setIndustryInformation}
          aiPrompt="Generate information about the industry this organization operates in"
          placeholder="Provide information about the industry..."
        />

        <AIField
          multiline={true}
          label="Business Challenges"
          value={challenges}
          onChange={setChallenges}
          aiPrompt="Generate a list of business challenges this organization might be facing"
          placeholder="Describe the business challenges..."
        />

        <AIField
          multiline={true}
          label="Strategic Priorities"
          value={strategicPriorities}
          onChange={setStrategicPriorities}
          aiPrompt="Generate strategic priorities for this organization in the next 1-3 years"
          placeholder="List the strategic priorities..."
        />

        <AIField
          multiline={true}
          label="Additional Information"
          value={additionalInformation}
          onChange={setAdditionalInformation}
          aiPrompt="Generate additional relevant information about this organization"
          placeholder="Any additional information..."
        />
      </div>

      <div className="border-t border-[#EFEFEF] pt-6">
        <h3 className="text-lg font-medium text-[#2C3138] mb-4">External Links</h3>
        
        <div className="space-y-4">
          {links.length > 0 && (
            <div className="space-y-2">
              {links.map((link) => (
                <div key={link.id} className="flex items-center p-3 bg-[#F6F6F6] rounded-md">
                  <LinkIcon className="w-5 h-5 text-[#4E4CEC] mr-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2C3138] truncate">{link.title}</p>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-[#4E4CEC] truncate hover:underline"
                    >
                      {link.url}
                    </a>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-8 w-8"
                    onClick={() => handleRemoveLink(link.id)}
                  >
                    <Trash2 className="w-4 h-4 text-[#FF6060]" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <Input
                label="Link Title"
                value={newLinkTitle}
                onChange={(e) => setNewLinkTitle(e.target.value)}
                placeholder="e.g., Company Website"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="URL"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleAddLink}
            disabled={!newLinkTitle || !newLinkUrl}
            className="mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </div>
      </div>

      <div className="border-t border-[#EFEFEF] pt-6">
        <FileUpload
          label="Upload Documents"
          files={files}
          onFilesChange={setFiles}
          description="Upload RFP or other relevant documents"
        />
      </div>

      <div className="border-t border-[#EFEFEF] pt-6 flex justify-end">
        <Button type="submit">Save Company Profile</Button>
      </div>
    </form>
  );
} 