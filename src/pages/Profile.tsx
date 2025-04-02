
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCog, Shield, Bell, CreditCard } from 'lucide-react';
import { useToast } from "../hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="personal" className="flex gap-2 items-center">
              <UserCog className="h-4 w-4" />
              <span className="hidden sm:inline">Personal Info</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2 items-center">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex gap-2 items-center">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
          </TabsList>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <TabsContent value="personal">
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <Card className="glass-card border-0 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" className="bg-white/50 dark:bg-gray-950/50" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" className="bg-white/50 dark:bg-gray-950/50" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" className="bg-white/50 dark:bg-gray-950/50" />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="(555) 123-4567" className="bg-white/50 dark:bg-gray-950/50" />
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main St" className="bg-white/50 dark:bg-gray-950/50" />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="Anytown" className="bg-white/50 dark:bg-gray-950/50" />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue="CA" className="bg-white/50 dark:bg-gray-950/50" />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" defaultValue="90210" className="bg-white/50 dark:bg-gray-950/50" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} className="gradient-blue">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src="/placeholder.svg" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-2 w-full">
                      <Button className="w-full">Upload New Image</Button>
                      <Button variant="outline" className="w-full">Remove Image</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="security">
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" className="bg-white/50 dark:bg-gray-950/50" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" className="bg-white/50 dark:bg-gray-950/50" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" className="bg-white/50 dark:bg-gray-950/50" />
                      </div>
                      <div className="flex justify-end">
                        <Button className="gradient-blue">Update Password</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button>Enable 2FA</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <motion.div variants={itemVariants}>
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Claim Status Updates</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications when your claim status changes
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="claim-status-email" className="text-sm">Email</Label>
                          <Input type="checkbox" id="claim-status-email" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="claim-status-sms" className="text-sm">SMS</Label>
                          <Input type="checkbox" id="claim-status-sms" className="h-4 w-4" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Payment Notifications</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications about payments related to your claims
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="payment-email" className="text-sm">Email</Label>
                          <Input type="checkbox" id="payment-email" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="payment-sms" className="text-sm">SMS</Label>
                          <Input type="checkbox" id="payment-sms" className="h-4 w-4" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Document Requests</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications when additional documents are required
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="document-email" className="text-sm">Email</Label>
                          <Input type="checkbox" id="document-email" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="document-sms" className="text-sm">SMS</Label>
                          <Input type="checkbox" id="document-sms" className="h-4 w-4" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing & Promotions</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive updates about new features and special offers
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="marketing-email" className="text-sm">Email</Label>
                          <Input type="checkbox" id="marketing-email" className="h-4 w-4" />
                          <Label htmlFor="marketing-sms" className="text-sm">SMS</Label>
                          <Input type="checkbox" id="marketing-sms" className="h-4 w-4" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} className="gradient-blue">
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="billing">
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <Card className="glass-card border-0 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-950/50 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center">
                          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 mr-4">
                            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2025</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Delete</Button>
                        </div>
                      </div>
                      
                      <Button className="w-full">Add New Payment Method</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="billingName">Name</Label>
                        <Input id="billingName" defaultValue="John Doe" className="bg-white/50 dark:bg-gray-950/50" />
                      </div>
                      <div>
                        <Label htmlFor="billingAddress">Billing Address</Label>
                        <Input id="billingAddress" defaultValue="123 Main St" className="bg-white/50 dark:bg-gray-950/50" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingCity">City</Label>
                          <Input id="billingCity" defaultValue="Anytown" className="bg-white/50 dark:bg-gray-950/50" />
                        </div>
                        <div>
                          <Label htmlFor="billingZip">ZIP Code</Label>
                          <Input id="billingZip" defaultValue="90210" className="bg-white/50 dark:bg-gray-950/50" />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} className="gradient-blue">
                          Save Billing Info
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </Layout>
  );
}
