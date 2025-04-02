
import React from 'react';
import Layout from '../components/layout/Layout';
import SignupForm from '../components/auth/SignupForm';

export default function Signup() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Join ClaimAI Vista to manage your medical claims
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
}
