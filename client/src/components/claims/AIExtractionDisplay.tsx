
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Edit, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ExtractedData = {
  patientInfo: {
    name: string;
    dob: string;
    id: string;
    address: string;
  };
  providerInfo: {
    name: string;
    id: string;
    address: string;
  };
  claimDetails: {
    serviceDate: string;
    totalAmount: string;
    cptCodes: string[];
    diagnosisCodes: string[];
    description: string;
  };
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
};

interface AIExtractionDisplayProps {
  data: ExtractedData;
  isLoading?: boolean;
  confidenceScore?: number;
}

export default function AIExtractionDisplay({
  data,
  isLoading = false,
  confidenceScore = 85
}: AIExtractionDisplayProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<ExtractedData>(data);

  const handleSaveChanges = () => {
    setEditMode(false);
    // Here you would typically send the edited data back to the parent component or API
  };

  const handleInputChange = (section: keyof ExtractedData, field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const confidenceColor = () => {
    if (confidenceScore >= 80) return "text-green-500";
    if (confidenceScore >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const renderConfidenceBadge = () => {
    let color: "default" | "secondary" | "destructive" | "outline" | null = null;
    
    if (confidenceScore >= 80) {
      color = "default";
    } else if (confidenceScore >= 60) {
      color = "secondary";
    } else {
      color = "destructive";
    }
    
    return (
      <Badge variant={color} className="ml-2">
        {confidenceScore}% Confidence
      </Badge>
    );
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="w-full"
    >
      <Card className="glass-card border-0 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            <CardTitle className="text-xl">
              Extracted Information {renderConfidenceBadge()}
            </CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={editMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => editMode ? handleSaveChanges() : setEditMode(true)}
                  className={editMode ? "gradient-blue" : ""}
                >
                  {editMode ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Information
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{editMode ? "Save your changes" : "Edit extracted information"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patientInfo" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="patientInfo">Patient</TabsTrigger>
              <TabsTrigger value="providerInfo">Provider</TabsTrigger>
              <TabsTrigger value="claimDetails">Claim</TabsTrigger>
              <TabsTrigger value="insuranceInfo">Insurance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="patientInfo">
              <motion.div 
                variants={fadeInUp}
                className="space-y-4 pt-4"
              >
                {editMode ? (
                  <>
                    <div>
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        value={editedData.patientInfo.name}
                        onChange={(e) => handleInputChange('patientInfo', 'name', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientDOB">Date of Birth</Label>
                      <Input
                        id="patientDOB"
                        value={editedData.patientInfo.dob}
                        onChange={(e) => handleInputChange('patientInfo', 'dob', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientID">Patient ID</Label>
                      <Input
                        id="patientID"
                        value={editedData.patientInfo.id}
                        onChange={(e) => handleInputChange('patientInfo', 'id', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientAddress">Address</Label>
                      <Input
                        id="patientAddress"
                        value={editedData.patientInfo.address}
                        onChange={(e) => handleInputChange('patientInfo', 'address', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <DataItem label="Patient Name" value={data.patientInfo.name} />
                    <DataItem label="Date of Birth" value={data.patientInfo.dob} />
                    <DataItem label="Patient ID" value={data.patientInfo.id} />
                    <DataItem label="Address" value={data.patientInfo.address} />
                  </div>
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="providerInfo">
              <motion.div 
                variants={fadeInUp}
                className="space-y-4 pt-4"
              >
                {editMode ? (
                  <>
                    <div>
                      <Label htmlFor="providerName">Provider Name</Label>
                      <Input
                        id="providerName"
                        value={editedData.providerInfo.name}
                        onChange={(e) => handleInputChange('providerInfo', 'name', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="providerID">Provider ID</Label>
                      <Input
                        id="providerID"
                        value={editedData.providerInfo.id}
                        onChange={(e) => handleInputChange('providerInfo', 'id', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="providerAddress">Address</Label>
                      <Input
                        id="providerAddress"
                        value={editedData.providerInfo.address}
                        onChange={(e) => handleInputChange('providerInfo', 'address', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <DataItem label="Provider Name" value={data.providerInfo.name} />
                    <DataItem label="Provider ID" value={data.providerInfo.id} />
                    <DataItem label="Address" value={data.providerInfo.address} />
                  </div>
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="claimDetails">
              <motion.div 
                variants={fadeInUp}
                className="space-y-4 pt-4"
              >
                {editMode ? (
                  <>
                    <div>
                      <Label htmlFor="serviceDate">Service Date</Label>
                      <Input
                        id="serviceDate"
                        value={editedData.claimDetails.serviceDate}
                        onChange={(e) => handleInputChange('claimDetails', 'serviceDate', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalAmount">Total Amount</Label>
                      <Input
                        id="totalAmount"
                        value={editedData.claimDetails.totalAmount}
                        onChange={(e) => handleInputChange('claimDetails', 'totalAmount', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={editedData.claimDetails.description}
                        onChange={(e) => handleInputChange('claimDetails', 'description', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <DataItem label="Service Date" value={data.claimDetails.serviceDate} />
                    <DataItem label="Total Amount" value={data.claimDetails.totalAmount} />
                    <DataItem label="Description" value={data.claimDetails.description} />
                    
                    <div className="pt-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">CPT Codes</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {data.claimDetails.cptCodes.map((code, index) => (
                          <Badge key={index} variant="outline">{code}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Diagnosis Codes</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {data.claimDetails.diagnosisCodes.map((code, index) => (
                          <Badge key={index} variant="outline">{code}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="insuranceInfo">
              <motion.div 
                variants={fadeInUp}
                className="space-y-4 pt-4"
              >
                {editMode ? (
                  <>
                    <div>
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        id="insuranceProvider"
                        value={editedData.insuranceInfo.provider}
                        onChange={(e) => handleInputChange('insuranceInfo', 'provider', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="policyNumber">Policy Number</Label>
                      <Input
                        id="policyNumber"
                        value={editedData.insuranceInfo.policyNumber}
                        onChange={(e) => handleInputChange('insuranceInfo', 'policyNumber', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupNumber">Group Number</Label>
                      <Input
                        id="groupNumber"
                        value={editedData.insuranceInfo.groupNumber}
                        onChange={(e) => handleInputChange('insuranceInfo', 'groupNumber', e.target.value)}
                        className="bg-white/50 dark:bg-gray-950/50"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <DataItem label="Insurance Provider" value={data.insuranceInfo.provider} />
                    <DataItem label="Policy Number" value={data.insuranceInfo.policyNumber} />
                    <DataItem label="Group Number" value={data.insuranceInfo.groupNumber} />
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
          
          {confidenceScore < 70 && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    Low confidence detection
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                    Please review the extracted information carefully as our AI has lower confidence in some of the detected fields.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface DataItemProps {
  label: string;
  value: string;
}

function DataItem({ label, value }: DataItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <span className="text-base">{value}</span>
    </div>
  );
}
