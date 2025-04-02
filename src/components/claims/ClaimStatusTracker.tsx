
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, FileQuestion, FileCheck, FilePen, Activity } from 'lucide-react';

type ClaimStatus = 'submitted' | 'review' | 'processing' | 'pending' | 'approved' | 'rejected';

interface ClaimStatusTrackerProps {
  claimId: string;
  status: ClaimStatus;
  submittedDate: string;
  estimatedCompletionDate?: string;
  lastUpdated: string;
  insurerName: string;
  amount: string;
}

export default function ClaimStatusTracker({
  claimId,
  status,
  submittedDate,
  estimatedCompletionDate,
  lastUpdated,
  insurerName,
  amount
}: ClaimStatusTrackerProps) {
  const getStatusInfo = (status: ClaimStatus) => {
    switch (status) {
      case 'submitted':
        return {
          label: 'Submitted',
          color: 'bg-blue-500',
          icon: <FileQuestion className="h-5 w-5 text-blue-500" />,
          description: 'Your claim has been submitted and is awaiting initial review.'
        };
      case 'review':
        return {
          label: 'Under Review',
          color: 'bg-purple-500',
          icon: <FilePen className="h-5 w-5 text-purple-500" />,
          description: 'Your claim is currently being reviewed by our team.'
        };
      case 'processing':
        return {
          label: 'Processing',
          color: 'bg-amber-500',
          icon: <Activity className="h-5 w-5 text-amber-500" />,
          description: 'Your claim is being processed and verified.'
        };
      case 'pending':
        return {
          label: 'Pending Insurer',
          color: 'bg-orange-500',
          icon: <Clock className="h-5 w-5 text-orange-500" />,
          description: 'Your claim has been sent to the insurer and is awaiting their review.'
        };
      case 'approved':
        return {
          label: 'Approved',
          color: 'bg-green-500',
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          description: 'Your claim has been approved! Payment processing will begin shortly.'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'bg-red-500',
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          description: 'Your claim has been rejected. Please review the details or contact support.'
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-500',
          icon: <FileQuestion className="h-5 w-5 text-gray-500" />,
          description: 'Status information unavailable.'
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  const steps = [
    { id: 'submitted', label: 'Submitted', icon: <FileQuestion className="h-4 w-4" /> },
    { id: 'review', label: 'Review', icon: <FilePen className="h-4 w-4" /> },
    { id: 'processing', label: 'Processing', icon: <Activity className="h-4 w-4" /> },
    { id: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4" /> },
    { id: 'approved', label: 'Approved', icon: <FileCheck className="h-4 w-4" /> }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === status);
  
  // If rejected, we'll show a special case
  const isRejected = status === 'rejected';

  // Determine which steps are active
  const getStepStatus = (index: number) => {
    if (isRejected) {
      return index <= currentStepIndex ? 'active' : 'incomplete';
    }
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'active';
    return 'incomplete';
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Card className="glass-card border-0 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-xl">Claim #{claimId}</CardTitle>
            <Badge className={statusInfo.color + " text-white"}>{statusInfo.label}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
              <p className="font-medium">{submittedDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
              <p className="font-medium">{lastUpdated}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Insurer</p>
              <p className="font-medium">{insurerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
              <p className="font-medium">{amount}</p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            {statusInfo.icon}
            <p className="ml-2 text-sm">{statusInfo.description}</p>
          </div>
          
          {!isRejected && estimatedCompletionDate && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span className="font-medium">Estimated completion:</span> {estimatedCompletionDate}
            </div>
          )}

          <div className="relative">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`rounded-full p-2 transition-all
                        ${status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
                          status === 'active' ? (isRejected ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400') : 
                          'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}
                    >
                      {status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : isRejected && status === 'active' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span className={`text-xs mt-1 font-medium
                      ${status === 'completed' ? 'text-green-600 dark:text-green-400' : 
                        status === 'active' ? (isRejected ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400') : 
                        'text-gray-400'}`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="relative h-1 bg-gray-200 dark:bg-gray-800 rounded-full mt-2">
              {!isRejected && (
                <div 
                  className="absolute h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                  style={{ 
                    width: `${Math.min(((currentStepIndex + 0.5) / (steps.length - 1)) * 100, 100)}%` 
                  }}
                />
              )}
              {isRejected && (
                <div 
                  className="absolute h-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"
                  style={{ 
                    width: `${Math.min(((currentStepIndex + 0.5) / (steps.length - 1)) * 100, 100)}%` 
                  }}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
