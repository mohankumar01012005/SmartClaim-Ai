
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import FileUpload, { FileData } from '../components/claims/FileUpload';
import AIExtractionDisplay from '../components/claims/AIExtractionDisplay';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "../hooks/use-toast";

export default function NewClaim() {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUploadComplete = (data: FileData) => {
    setFileData(data);
    startProcessing();
  };

  const startProcessing = () => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingComplete(true);
      setExtractedData({
        patientInfo: {
          name: 'John Smith',
          dob: '05/12/1985',
          id: 'P-12345678',
          address: '123 Main St, Anytown, CA 90210',
        },
        providerInfo: {
          name: 'City Hospital',
          id: 'NPI-9876543',
          address: '456 Medical Center Blvd, Anytown, CA 90210',
        },
        claimDetails: {
          serviceDate: '07/10/2023',
          totalAmount: '$1,250.00',
          cptCodes: ['99213', '85025', '80053'],
          diagnosisCodes: ['I10', 'E11.9'],
          description: 'Office visit with lab work',
        },
        insuranceInfo: {
          provider: 'Blue Shield Insurance',
          policyNumber: 'BSI-1234567',
          groupNumber: 'GRP-7890',
        },
      });
    }, 3000);
  };

  const handleSubmitClaim = () => {
    toast({
      title: "Claim Submitted",
      description: "Your claim has been submitted successfully!",
    });
    navigate('/claims');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/claims" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Claims
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold gradient-text">Submit New Claim</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload and process your medical claim documents
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Upload Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Information</AlertTitle>
                  <AlertDescription>
                    Please upload a clear image or PDF of your medical invoice. The AI system will extract information from it.
                    Supported formats: PDF, PNG, JPG (max 10MB).
                  </AlertDescription>
                </Alert>
                
                <FileUpload 
                  onUploadComplete={handleUploadComplete}
                  maxSize={10}
                  acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
                />
              </CardContent>
            </Card>
          </motion.div>

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <LoadingSpinner size="lg" message="AI is processing your document..." />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center max-w-md">
                    Our AI is analyzing your document to extract claim information.
                    This typically takes 5-10 seconds.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {processingComplete && extractedData && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Alert className="mb-4 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-800 dark:text-green-300">Processing Complete</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    Document successfully processed. Please review the extracted information below and make any necessary corrections.
                  </AlertDescription>
                </Alert>
                
                <AIExtractionDisplay data={extractedData} confidenceScore={85} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-end mt-4"
              >
                <Button
                  onClick={handleSubmitClaim}
                  className="gradient-blue"
                >
                  Submit Claim
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
