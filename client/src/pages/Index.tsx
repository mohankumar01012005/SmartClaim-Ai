
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, FileText, Bot, Shield, BarChart4 } from 'lucide-react';

export default function Index() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Invoice Processing",
      description: "Upload medical invoices and our AI extracts all relevant information automatically."
    },
    {
      icon: <Bot className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
      title: "AI-Powered Extraction",
      description: "Advanced machine learning models identify and extract data with high accuracy."
    },
    {
      icon: <Shield className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Secure & Compliant",
      description: "HIPAA-compliant platform with end-to-end encryption for your sensitive medical data."
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
      title: "Detailed Analytics",
      description: "Track claims, monitor processing status, and analyze your healthcare expenses."
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter gradient-text">
                AI-Powered Medical Claim Processing
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Streamline your healthcare claims with advanced AI that automatically extracts, processes, and tracks medical invoices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="px-8 gradient-blue">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Sign In</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 md:mt-16 lg:mt-20 relative max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop"
                alt="Medical claim dashboard"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/20 backdrop-blur-lg rounded-full z-[-1]" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/20 backdrop-blur-lg rounded-full z-[-1]" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover how our AI-powered platform simplifies and streamlines medical claim processing
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full glass-card border-0 overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-blue-100/50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three simple steps to process your medical claims
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="glass-card rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">01</div>
                <h3 className="text-xl font-bold mb-2">Upload Your Invoice</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Simply upload your medical invoices to our secure platform.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-[-30px] transform -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-gray-300 dark:text-gray-700" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="glass-card rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">02</div>
                <h3 className="text-xl font-bold mb-2">AI Extracts Data</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI automatically extracts all relevant information from your documents.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-[-30px] transform -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-gray-300 dark:text-gray-700" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="glass-card rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">03</div>
                <h3 className="text-xl font-bold mb-2">Track Your Claim</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor the status of your claim from submission to completion.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-2xl overflow-hidden relative"
          >
            <div className="gradient-blue py-12 md:py-16 px-6 md:px-12 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Simplify Your Medical Claims?
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  Join thousands of users who have streamlined their medical claim processing
                </p>
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                  <Link to="/signup">Get Started Today</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
