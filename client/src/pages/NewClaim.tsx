import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "../hooks/use-toast";
import { supabase } from "@/lib/supaBaseClient";

export default function NewClaim() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Force re-render input
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ Added navigation

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file!");
      return;
    }

    setPreview(URL.createObjectURL(file));

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from("summerize")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Upload Error:", error);
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
      return;
    }

    const { data: urlData } = supabase.storage.from("summerize").getPublicUrl(filePath);
    setUploadSuccess(true);

    toast({
      title: "File Uploaded",
      description: "Your file has been uploaded successfully!",
    });

    try {
      const response = await axios.post(`http://localhost:3000/${userId}/add-claim`, {
        image: urlData.publicUrl,
      });

      if (response.status === 201) {
        toast({
          title: "Claim Added",
          description: "Your claim is added. Redirecting to your dashboard...",
          variant: "success",
        });

        setTimeout(() => {
          navigate("/dashboard"); // ✅ Redirect to dashboard
        }, 1500);
      } else {
        setUploadSuccess(false);
        toast({
          title: "Claim Submission Failed",
          description: "Something went wrong while adding your claim.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong!",
        variant: "destructive",
      });
    }

    setFileInputKey(Date.now());
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
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6"
        >
          <motion.div>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Upload Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Information</AlertTitle>
                  <AlertDescription>
                    Please upload a clear image or PDF of your medical invoice.
                    The AI system will extract information from it. Supported formats: PDF, PNG, JPG (max 10MB).
                  </AlertDescription>
                </Alert>

                {!uploadSuccess && (
                  <input key={fileInputKey} type="file" accept="image/*" onChange={handleImageChange} />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
