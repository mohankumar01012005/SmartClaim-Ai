import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Claim {
  claimNumber: string;
  patient: string;
  date: string;
  amount: number;
  status: "approved" | "pending" | "rejected" | "processing";
}

export default function RecentClaimsTable() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [totalClaims, setTotalClaims] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchClaims = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:3000/${userId}/claims`);
        console.log("API Response: ", response.data);

        // Extract claims correctly from API response
        const formattedClaims = response.data.claims.map((claim: any) => ({
          claimNumber: claim.claimNumber, // Correct Claim ID
          patient: claim.HolderDetails[0]?.patientName || "Unknown",
          date: claim.HolderDetails[0]?.dateOfClaim || "N/A",
          amount: parseFloat(claim.HolderDetails[0]?.totalAmount.replace(/[₹,]/g, "")) || 0,
          status: "pending", // Default status since it's not provided in API
        }));

        setClaims(formattedClaims);

        // Calculate total claims & total amount
        setTotalClaims(formattedClaims.length);
        setTotalAmount(formattedClaims.reduce((sum: number, claim: Claim) => sum + claim.amount, 0));
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, []);

  const getStatusBadge = (status: Claim["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case "pending":
        return <Badge className="bg-amber-500 text-white">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      case "processing":
        return <Badge className="bg-blue-500 text-white">Processing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const rowVariants = {
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
    <motion.div initial="hidden" animate="visible" variants={tableVariants} className="w-full">
      <Card className="glass-card border-0 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Recent Claims</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/claims" className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {/* Total Claims & Total Amount */}
          <div className="flex justify-between mb-4 text-lg font-semibold">
            <span>Total Claims: {totalClaims}</span>
            <span>Total Amount: ₹{totalAmount.toFixed(2)}</span>
          </div>

          {/* Claims Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.length > 0 ? (
                claims.map((claim) => (
                  <motion.tr key={claim.claimNumber} variants={rowVariants}>
                    <TableCell className="font-medium">{claim.claimNumber}</TableCell>
                    <TableCell>{claim.patient}</TableCell>
                    <TableCell>{claim.date}</TableCell>
                    <TableCell>₹{claim.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="sm">
                        <Link to={`/claims/${claim.claimNumber}`}>View</Link>
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                    No claims found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
