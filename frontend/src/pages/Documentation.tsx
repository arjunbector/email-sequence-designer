import React from 'react';
import Layout from '@/components/Layout';

const Documentation = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Email Sequence Designer Documentation</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-700 mb-4">
            Email Sequence Designer is a powerful tool that helps you create and manage email sequences visually. 
            You can design complex email workflows by connecting different types of nodes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Node Types</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-2">Lead Source Node</h3>
              <p className="text-gray-700">
                The starting point of your sequence. It represents where your leads come from, such as form submissions, 
                manual imports, or API integrations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-2">Cold Email Node</h3>
              <p className="text-gray-700">
                Represents an email that will be sent to your leads. You can configure the subject line, 
                email body, and other email-specific settings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-2">Wait Node</h3>
              <p className="text-gray-700">
                Adds a delay between actions in your sequence. You can specify the wait duration in minutes, 
                hours, or days.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Building a Sequence</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              1. Start with a Lead Source node by clicking the "Add Lead Source" button.
            </p>
            <p className="text-gray-700">
              2. Add email nodes and wait nodes as needed by using the respective buttons in the toolbar.
            </p>
            <p className="text-gray-700">
              3. Connect nodes by clicking and dragging from one node's handle to another node's handle.
            </p>
            <p className="text-gray-700">
              4. Configure each node by clicking on it and filling in the required information.
            </p>
            <p className="text-gray-700">
              5. Save your sequence using the save button in the toolbar.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Tips and Best Practices</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Always start your sequence with a Lead Source node</li>
            <li>Use Wait nodes between emails to space out your communication</li>
            <li>Keep your email content personalized and relevant</li>
            <li>Regularly save your sequences to prevent losing changes</li>
            <li>Test your sequence thoroughly before activating it</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Keyboard Shortcuts</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <ul className="space-y-2 text-gray-700">
              <li><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl/Cmd + S</kbd> - Save sequence</li>
              <li><kbd className="px-2 py-1 bg-gray-100 rounded">Delete</kbd> - Remove selected node</li>
              <li><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl/Cmd + Z</kbd> - Undo last action</li>
              <li><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl/Cmd + Shift + Z</kbd> - Redo last action</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Documentation;