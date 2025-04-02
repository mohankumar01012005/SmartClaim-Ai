
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ClaimStatusTracker from '../components/claims/ClaimStatusTracker';
import AIExtractionDisplay from '../components/claims/AIExtractionDisplay';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Printer, Download, ChevronLeft, Share2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ClaimDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('details');
  
  // Mock data
  const claimData = {
    id: id || 'CL-2024-001',
    status: 'pending' as const,
    submittedDate: 'Jul 15, 2023',
    estimatedCompletionDate: 'Jul 22, 2023',
    lastUpdated: 'Jul 17, 2023',
    insurerName: 'Blue Shield Insurance',
    amount: '$1,250.00',
  };
  
  const extractedData = {
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
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
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
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Claim #{id}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Submitted on {claimData.submittedDate}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6"
        >
          <motion.div variants={itemVariants}>
            <ClaimStatusTracker {...claimData} />
          </motion.div>

          {claimData.status === 'rejected' && (
            <motion.div variants={itemVariants}>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Claim Rejected</AlertTitle>
                <AlertDescription>
                  This claim has been rejected by the insurer. The reason provided was: "Missing or incorrect information on the claim form." Please review the details and resubmit if necessary.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 overflow-hidden">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="details">Claim Details</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="history">Activity History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="p-6">
                    <AIExtractionDisplay data={extractedData} confidenceScore={85} />
                  </TabsContent>
                  
                  <TabsContent value="documents" className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-950/50 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center">
                          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 mr-4">
                            <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">Medical Invoice</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 2.4 MB • Uploaded on {claimData.submittedDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-950/50 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center">
                          <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 mr-4">
                            <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium">Insurance Card</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">JPG • 1.1 MB • Uploaded on {claimData.submittedDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-950/50 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center">
                          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2 mr-4">
                            <Download className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium">Doctor's Note</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 0.8 MB • Uploaded on {claimData.submittedDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="p-6">
                    <div className="space-y-6">
                      <div className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                        <div>
                          <p className="font-medium">Claim Submitted</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{claimData.submittedDate} at 10:23 AM</p>
                          <p className="mt-2 text-sm">Claim was submitted for processing with 3 supporting documents.</p>
                        </div>
                      </div>
                      
                      <div className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                        <div>
                          <p className="font-medium">AI Processing Completed</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{claimData.submittedDate} at 10:25 AM</p>
                          <p className="mt-2 text-sm">AI system extracted claim information with 85% confidence.</p>
                        </div>
                      </div>
                      
                      <div className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500"></div>
                        <div>
                          <p className="font-medium">Claim Reviewed</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{claimData.lastUpdated} at 2:45 PM</p>
                          <p className="mt-2 text-sm">Claim was reviewed by our team and sent to the insurance provider.</p>
                        </div>
                      </div>
                      
                      <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500"></div>
                        <div>
                          <p className="font-medium">Pending Insurer Review</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{claimData.lastUpdated} at 3:10 PM</p>
                          <p className="mt-2 text-sm">Claim is currently being reviewed by {claimData.insurerName}.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
