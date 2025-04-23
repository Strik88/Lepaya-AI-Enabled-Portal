import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { X, FileText, Upload } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  // In a real app, we would have a URL to the file or the actual File object
  // For this demo, we'll just store some metadata
  preview?: string;
}

interface FileUploadProps {
  label?: string;
  description?: string;
  files: FileInfo[];
  onFilesChange: (files: FileInfo[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFileTypes?: string[];
  className?: string;
  error?: string;
}

export function FileUpload({
  label,
  description = 'Drag and drop files here, or click to select files',
  files,
  onFilesChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedFileTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'],
  className,
  error,
}: FileUploadProps) {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        alert(`You can only upload a maximum of ${maxFiles} files.`);
        return;
      }

      const newFiles: FileInfo[] = acceptedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        preview: URL.createObjectURL(file),
      }));

      onFilesChange([...files, ...newFiles]);
    },
    [files, maxFiles, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-[#2C3138] mb-1">{label}</label>
      )}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-md p-6 cursor-pointer transition-colors',
          isDragActive ? 'border-[#4E4CEC] bg-[#F6F6FE]' : 'border-[#EFEFEF] hover:border-[#4E4CEC]',
          error && 'border-[#FF6060]'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="w-10 h-10 text-[#4E4CEC] mb-2" />
          <p className="text-[#2C3138] mb-1">{description}</p>
          <p className="text-[#C0C0C0] text-xs">
            Max {maxFiles} files, up to {formatBytes(maxSize)} each. 
            Supported formats: {acceptedFileTypes.join(', ')}
          </p>
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-xs font-medium text-[#FF6060]">{error}</p>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center p-3 bg-[#F6F6F6] rounded-md"
            >
              <FileText className="w-5 h-5 text-[#2C3138] mr-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2C3138] truncate">{file.name}</p>
                <p className="text-xs text-[#C0C0C0]">{formatBytes(file.size)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 h-8 w-8"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 