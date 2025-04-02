
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string | number;
    increased: boolean;
  };
  delay?: number;
}

export default function StatCard({ title, value, icon: Icon, change, delay = 0 }: StatCardProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: delay * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="glass-card border-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
              </p>
              <p className="text-3xl font-bold mt-1">{value}</p>
              
              {change && (
                <div className="flex items-center mt-1">
                  <span 
                    className={`text-xs font-medium ${
                      change.increased ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {change.increased ? '+' : '-'}{change.value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Icon className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
