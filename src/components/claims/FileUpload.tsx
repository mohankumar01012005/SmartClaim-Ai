
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, X, File, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import LoadingSpinner from '../UI/LoadingSpinner';

interface FileUploadProps {
  onUploadComplete: (fileData: FileData) => void;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

export interface FileData {
  name: string;
  size: number;
  type: string;
  url: string;
}

export default function FileUpload({ 
  onUploadComplete, 
  maxSize = 10, // Default 10MB
  acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png'] 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const validateFile = (file: File): { valid: boolean; message?: string } => {
    if (file.size > maxSize * 1024 * 1024) {
      return { valid: false, message: `File size exceeds the ${maxSize}MB limit` };
    }
    
    if (!acceptedTypes.includes(file.type)) {
      return { valid: false, message: `File type ${file.type} is not supported` };
    }
    
    return { valid: true };
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const validation = validateFile(droppedFile);
      
      if (!validation.valid) {
        setErrorMessage(validation.message || 'Invalid file');
        toast({
          title: "Upload Error",
          description: validation.message,
          variant: "destructive"
        });
        return;
      }
      
      setFile(droppedFile);
      handleUpload(droppedFile);
    }
  }, [maxSize, acceptedTypes, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const validation = validateFile(selectedFile);
      
      if (!validation.valid) {
        setErrorMessage(validation.message || 'Invalid file');
        toast({
          title: "Upload Error",
          description: validation.message,
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = (file: File) => {
    setIsUploading(true);
    setUploadStatus('uploading');
    setProgress(0);
    
    // Simulate upload progress
    let simulatedProgress = 0;
    const interval = setInterval(() => {
      simulatedProgress += Math.random() * 10;
      if (simulatedProgress > 95) {
        simulatedProgress = 95;
        clearInterval(interval);
        
        // Simulate upload completion after a delay
        setTimeout(() => {
          setProgress(100);
          setIsUploading(false);
          setUploadStatus('success');
          
          // Create a fake URL for the file
          const fileData: FileData = {
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file)
          };
          
          onUploadComplete(fileData);
          
          toast({
            title: "Upload Complete",
            description: "Your file has been uploaded successfully.",
          });
        }, 500);
      }
      setProgress(Math.min(simulatedProgress, 100));
    }, 200);
  };

  const resetUpload = () => {
    setFile(null);
    setProgress(0);
    setIsUploading(false);
    setUploadStatus('idle');
    setErrorMessage('');
  };

  const containerVariants = {
    default: { 
      borderColor: 'rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    dragging: { 
      borderColor: 'rgba(59, 130, 246, 0.5)',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      scale: 1.01,
    },
    success: {
      borderColor: 'rgba(34, 197, 94, 0.5)',
      backgroundColor: 'rgba(34, 197, 94, 0.05)',
    },
    error: {
      borderColor: 'rgba(239, 68, 68, 0.5)',
      backgroundColor: 'rgba(239, 68, 68, 0.05)',
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {uploadStatus === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900 flex items-center justify-between"
          >
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
              <div>
                <p className="text-sm font-medium">{file?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {file && (file.size / (1024 * 1024)).toFixed(2)} MB • Uploaded successfully
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetUpload}
              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : uploadStatus === 'error' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900 flex items-center justify-between"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              <div>
                <p className="text-sm font-medium">Upload failed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{errorMessage}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetUpload}
              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="default"
            animate={
              isDragging 
                ? "dragging" 
                : uploadStatus === 'success' 
                  ? "success" 
                  : uploadStatus === 'error' 
                    ? "error" 
                    : "default"
            }
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              w-full h-48 rounded-lg border-2 border-dashed transition-all duration-200
              flex flex-col items-center justify-center p-4 relative overflow-hidden
              backdrop-blur-sm
              ${isDragging ? 'border-primary/50 bg-primary/5' : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50'}
            `}
          >
            {isUploading ? (
              <div className="w-full flex flex-col items-center">
                <LoadingSpinner size="md" message="Uploading file..." />
                <div className="w-full mt-4">
                  <Progress value={progress} className="h-2 w-full" />
                  <p className="text-xs text-center mt-2 text-gray-500">{Math.round(progress)}%</p>
                </div>
                
                {file && (
                  <div className="flex items-center mt-4">
                    <File className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                      {file.name}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <FileUp className="w-10 h-10 text-primary/50 mb-2" />
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Drag & Drop</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  or <span className="text-primary font-medium">browse</span> to upload
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                  Supported formats: PDF, JPEG, PNG (max {maxSize}MB)
                </p>
                
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept={acceptedTypes.join(',')}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
