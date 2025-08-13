import React, { useState } from "react";
import { HaloErrorBoundary, HaloButton, HaloCard } from "@/components/halo";
import { AlertTriangle, Zap, Code, RefreshCw } from "lucide-react";

// Component that throws an error on demand
function ErrorProneComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Intentional error for demonstration purposes!");
  }
  
  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/30">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
          Component Working Perfectly!
        </h3>
      </div>
      <p className="text-green-700 dark:text-green-300 text-sm">
        This component is running without any issues. Click the "Trigger Error" button to see the ErrorBoundary in action.
      </p>
    </div>
  );
}

// Nested component with its own error boundary
function NestedSection() {
  const [hasNestedError, setHasNestedError] = useState(false);

  return (
    <HaloCard className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200/30 dark:border-blue-800/30">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5" />
          Nested Error Boundary Example
        </h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
          This section has its own ErrorBoundary that won't affect the parent page.
        </p>
        
        <HaloErrorBoundary
          onError={(error) => {
            console.log("Nested error caught:", error.message);
          }}
          onReset={() => {
            setHasNestedError(false);
            console.log("Nested error boundary reset");
          }}
          showStack={true}
        >
          <ErrorProneComponent shouldThrow={hasNestedError} />
          <div className="mt-4">
            <HaloButton
              onClick={() => setHasNestedError(true)}
              variant="outline"
              className="bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Trigger Nested Error
            </HaloButton>
          </div>
        </HaloErrorBoundary>
      </div>
    </HaloCard>
  );
}

export default function ErrorBoundaryDemo() {
  const [hasMainError, setHasMainError] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleGlobalReset = () => {
    setHasMainError(false);
    setResetKey(prev => prev + 1);
    console.log("Global error boundary reset");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20 mb-6">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            ErrorBoundary Demo
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Explore the HaloErrorBoundary component with different error scenarios, 
            custom fallbacks, and reset capabilities.
          </p>
        </div>

        {/* Main Error Boundary with Custom Reset */}
        <HaloErrorBoundary
          key={resetKey}
          onError={(error) => {
            console.log("Main error caught:", error.message);
          }}
          onReset={handleGlobalReset}
          showStack={process.env.NODE_ENV === "development"}
        >
          <div className="space-y-8">
            {/* Main Error Demo */}
            <HaloCard className="bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200/30 dark:border-orange-800/30">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Main Error Boundary Test
                </h2>
                <p className="text-orange-700 dark:text-orange-300 text-sm mb-6">
                  This will trigger the page-level ErrorBoundary. The entire page content 
                  will be replaced with the error UI.
                </p>
                
                <ErrorProneComponent shouldThrow={hasMainError} />
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <HaloButton
                    onClick={() => setHasMainError(true)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg shadow-red-500/20"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Trigger Page Error
                  </HaloButton>
                  
                  <HaloButton
                    onClick={handleGlobalReset}
                    variant="outline"
                    className="border-neutral-300 dark:border-neutral-600"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Page
                  </HaloButton>
                </div>
              </div>
            </HaloCard>

            {/* Nested Error Boundary */}
            <NestedSection />

            {/* Custom Fallback Example */}
            <HaloCard className="bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200/30 dark:border-violet-800/30">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-violet-900 dark:text-violet-100 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Custom Fallback Example
                </h2>
                <p className="text-violet-700 dark:text-violet-300 text-sm mb-6">
                  This ErrorBoundary uses a custom fallback component instead of the default error UI.
                </p>
                
                <HaloErrorBoundary
                  fallback={
                    <div className="rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 border border-violet-200 dark:border-violet-700 p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-violet-900 dark:text-violet-100 mb-2">
                        Custom Error Fallback
                      </h3>
                      <p className="text-violet-700 dark:text-violet-300 text-sm">
                        This is a custom fallback UI that replaces the default error boundary display.
                      </p>
                      <HaloButton
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                      >
                        Reload to Fix
                      </HaloButton>
                    </div>
                  }
                  onError={(error) => console.log("Custom fallback error:", error.message)}
                >
                  <CustomFallbackDemo />
                </HaloErrorBoundary>
              </div>
            </HaloCard>

            {/* Usage Examples */}
            <HaloCard>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Usage Examples
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-4">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                      Basic Usage
                    </h3>
                    <pre className="text-neutral-700 dark:text-neutral-300 text-xs overflow-x-auto">
{`<HaloErrorBoundary>
  <YourComponent />
</HaloErrorBoundary>`}
                    </pre>
                  </div>
                  
                  <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-4">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                      With Custom Handlers
                    </h3>
                    <pre className="text-neutral-700 dark:text-neutral-300 text-xs overflow-x-auto">
{`<HaloErrorBoundary
  onError={(error, errorInfo) => {
    console.log('Error caught:', error.message);
    // Send to error tracking service
  }}
  onReset={() => {
    // Custom reset logic
    setData(initialData);
  }}
  showStack={isDevelopment}
>
  <YourComponent />
</HaloErrorBoundary>`}
                    </pre>
                  </div>
                </div>
              </div>
            </HaloCard>
          </div>
        </HaloErrorBoundary>
      </div>
    </div>
  );
}

// Component for custom fallback demo
function CustomFallbackDemo() {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error("Custom fallback demo error!");
  }
  
  return (
    <div className="text-center">
      <p className="text-violet-700 dark:text-violet-300 mb-4">
        This component will show a custom fallback when it errors.
      </p>
      <HaloButton
        onClick={() => setShouldError(true)}
        variant="outline"
        className="border-violet-300 dark:border-violet-600 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20"
      >
        Trigger Custom Fallback
      </HaloButton>
    </div>
  );
}