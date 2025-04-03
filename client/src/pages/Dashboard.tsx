
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import ClaimsChart from '../components/dashboard/ClaimsChart';
import RecentClaimsTable from '../components/dashboard/RecentClaimsTable';
import { FileCheck, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Mock data
  const stats = [
   
  ];

  const areaChartData = [
    { name: 'Jan', claims: 4 },
    { name: 'Feb', claims: 6 },
    { name: 'Mar', claims: 8 },
    { name: 'Apr', claims: 10 },
    { name: 'May', claims: 7 },
    { name: 'Jun', claims: 9 },
    { name: 'Jul', claims: 12 },
  ];

  const barChartData = [
    { name: 'Jan', approved: 3, pending: 2, rejected: 1 },
    { name: 'Feb', approved: 4, pending: 1, rejected: 1 },
    { name: 'Mar', approved: 5, pending: 2, rejected: 1 },
    { name: 'Apr', approved: 6, pending: 3, rejected: 1 },
    { name: 'May', approved: 5, pending: 1, rejected: 1 },
    { name: 'Jun', approved: 6, pending: 2, rejected: 1 },
    { name: 'Jul', approved: 8, pending: 3, rejected: 1 },
  ];

  const recentClaims = [
    { id: 'CL-2024-001', patient: 'John Smith', date: '2023-07-15', amount: '$1,250', status: 'approved' as const },
    { id: 'CL-2024-002', patient: 'Jane Doe', date: '2023-07-12', amount: '$850', status: 'pending' as const },
    { id: 'CL-2024-003', patient: 'Robert Johnson', date: '2023-07-10', amount: '$2,300', status: 'processing' as const },
    { id: 'CL-2024-004', patient: 'Emily Wilson', date: '2023-07-08', amount: '$1,100', status: 'rejected' as const },
    { id: 'CL-2024-005', patient: 'Michael Brown', date: '2023-07-05', amount: '$950', status: 'approved' as const },
  ];

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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, here's an overview of your medical claims
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 lg:mt-0"
          >
            <Button asChild className="gradient-blue">
              <Link to="/claims/new">
                Upload New Claim
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              delay={index}
            />
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
         
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <RecentClaimsTable claims={recentClaims} />
        </motion.div>
      </div>
    </Layout>
  );
}
