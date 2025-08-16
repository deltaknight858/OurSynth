import React, { createContext, useContext, ReactNode } from "react";
import HaloErrorBoundary, { HaloErrorBoundaryProps } from "./HaloErrorBoundary";

interface ErrorBoundaryContextType {
  resetErrorBoundary: () => void;
}

const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | undefined>(undefined);

interface HaloErrorBoundaryProviderProps extends Omit<HaloErrorBoundaryProps, 'children'> {
  children: ReactNode;
}

/**
 * Enhanced ErrorBoundary that provides context for child components
 * to reset the error boundary from within the component tree
 */
export default function HaloErrorBoundaryProvider({ 
  children, 
  ...errorBoundaryProps 
}: HaloErrorBoundaryProviderProps) {
  const resetErrorBoundary = () => {
    // Force re-render by changing key
    window.location.reload();
  };

  const contextValue: ErrorBoundaryContextType = {
    resetErrorBoundary,
  };

  return (
    <ErrorBoundaryContext.Provider value={contextValue}>
      <HaloErrorBoundary {...errorBoundaryProps}>
        {children}
      </HaloErrorBoundary>
    </ErrorBoundaryContext.Provider>
  );
}

/**
 * Hook to access error boundary context
 * Allows child components to reset their parent error boundary
 */
export function useErrorBoundaryContext(): ErrorBoundaryContextType {
  const context = useContext(ErrorBoundaryContext);
  if (!context) {
    throw new Error("useErrorBoundaryContext must be used within a HaloErrorBoundaryProvider");
  }
  return context;
}