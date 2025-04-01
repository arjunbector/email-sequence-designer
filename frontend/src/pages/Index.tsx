
import React, { Suspense, lazy } from 'react';
import Layout from '@/components/Layout';

// Import the EmailSequenceBuilder with lazy loading
// This is necessary because React Flow uses browser APIs
const EmailSequenceBuilder = lazy(() => import('@/components/EmailSequenceBuilder'));

const Index = () => {
  return (
    <Layout>
      <div className="h-full">
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading Email Sequence Builder...</div>}>
          <EmailSequenceBuilder />
        </Suspense>
      </div>
    </Layout>
  );
};

export default Index;
