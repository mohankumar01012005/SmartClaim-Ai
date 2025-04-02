
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  PlusCircle,
  FilterX,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Claim {
  id: string;
  patient: string;
  provider: string;
  date: string;
  amount: string;
  status: 'approved' | 'pending' | 'rejected' | 'processing' | 'review' | 'submitted';
}

export default function Claims() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  // Mock data
  const claims: Claim[] = [
    { id: 'CL-2024-001', patient: 'John Smith', provider: 'City Hospital', date: '2023-07-15', amount: '$1,250', status: 'approved' },
    { id: 'CL-2024-002', patient: 'Jane Doe', provider: 'Metro Medical Center', date: '2023-07-12', amount: '$850', status: 'pending' },
    { id: 'CL-2024-003', patient: 'Robert Johnson', provider: 'Central Clinic', date: '2023-07-10', amount: '$2,300', status: 'processing' },
    { id: 'CL-2024-004', patient: 'Emily Wilson', provider: 'Wellness Physicians', date: '2023-07-08', amount: '$1,100', status: 'rejected' },
    { id: 'CL-2024-005', patient: 'Michael Brown', provider: 'City Hospital', date: '2023-07-05', amount: '$950', status: 'approved' },
    { id: 'CL-2024-006', patient: 'Sarah Davis', provider: 'Health Partners', date: '2023-07-03', amount: '$1,750', status: 'review' },
    { id: 'CL-2024-007', patient: 'David Miller', provider: 'Metro Medical Center', date: '2023-07-01', amount: '$2,100', status: 'submitted' },
    { id: 'CL-2024-008', patient: 'Jessica Taylor', provider: 'Central Clinic', date: '2023-06-28', amount: '$780', status: 'approved' },
    { id: 'CL-2024-009', patient: 'Thomas Anderson', provider: 'Wellness Physicians', date: '2023-06-25', amount: '$1,350', status: 'pending' },
    { id: 'CL-2024-010', patient: 'Amanda Martinez', provider: 'Health Partners', date: '2023-06-22', amount: '$1,620', status: 'processing' },
  ];

  const getStatusBadge = (status: Claim['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500 text-white">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 text-white">Processing</Badge>;
      case 'review':
        return <Badge className="bg-purple-500 text-white">Under Review</Badge>;
      case 'submitted':
        return <Badge className="bg-gray-500 text-white">Submitted</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(claim.status);
    
    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter([]);
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Claims</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View and manage all your medical claims
            </p>
          </div>

          <Button asChild className="mt-4 lg:mt-0 gradient-blue">
            <Link to="/claims/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Claim
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="glass-card border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search claims..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-gray-950/50"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <SlidersHorizontal className="mr-2 h-4 w-4" />
                          Filter
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('approved')}
                          onCheckedChange={(checked) => {
                            checked
                              ? setStatusFilter([...statusFilter, 'approved'])
                              : setStatusFilter(statusFilter.filter(s => s !== 'approved'));
                          }}
                        >
                          Approved
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('pending')}
                          onCheckedChange={(checked) => {
                            checked
                              ? setStatusFilter([...statusFilter, 'pending'])
                              : setStatusFilter(statusFilter.filter(s => s !== 'pending'));
                          }}
                        >
                          Pending
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('processing')}
                          onCheckedChange={(checked) => {
                            checked
                              ? setStatusFilter([...statusFilter, 'processing'])
                              : setStatusFilter(statusFilter.filter(s => s !== 'processing'));
                          }}
                        >
                          Processing
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('rejected')}
                          onCheckedChange={(checked) => {
                            checked
                              ? setStatusFilter([...statusFilter, 'rejected'])
                              : setStatusFilter(statusFilter.filter(s => s !== 'rejected'));
                          }}
                        >
                          Rejected
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('review')}
                          onCheckedChange={(checked) => {
                            checked
                              ? setStatusFilter([...statusFilter, 'review'])
                              : setStatusFilter(statusFilter.filter(s => s !== 'review'));
                          }}
                        >
                          Under Review
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('submitted')}
                          onCheckedChange={(checked) => {
                            checked
                              ? setStatusFilter([...statusFilter, 'submitted'])
                              : setStatusFilter(statusFilter.filter(s => s !== 'submitted'));
                          }}
                        >
                          Submitted
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {(searchTerm || statusFilter.length > 0) && (
                      <Button variant="outline" onClick={clearFilters}>
                        <FilterX className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0">
              <CardHeader className="pb-0">
                <CardTitle>All Claims</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredClaims.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Claim ID</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClaims.map((claim) => (
                          <TableRow key={claim.id}>
                            <TableCell className="font-medium">{claim.id}</TableCell>
                            <TableCell>{claim.patient}</TableCell>
                            <TableCell>{claim.provider}</TableCell>
                            <TableCell>{claim.date}</TableCell>
                            <TableCell>{claim.amount}</TableCell>
                            <TableCell>{getStatusBadge(claim.status)}</TableCell>
                            <TableCell>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/claims/${claim.id}`}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No claims found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {searchTerm || statusFilter.length > 0
                        ? "Try adjusting your search or filters"
                        : "You haven't submitted any claims yet"}
                    </p>
                    {!(searchTerm || statusFilter.length > 0) && (
                      <Button asChild className="gradient-blue">
                        <Link to="/claims/new">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Submit New Claim
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
