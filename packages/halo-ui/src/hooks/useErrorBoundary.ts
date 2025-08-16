import { useState, useCallback } from "react";

interface UseErrorBoundaryReturn {
  triggerError: (error?: Error) => void;
  resetError: () => void;
  hasError: boolean;
}

/**
 * Hook to programmatically trigger or reset error boundaries
 * Useful for testing error boundaries or triggering errors from event handlers
 */
export function useErrorBoundary(): UseErrorBoundaryReturn {
  const [error, setError] = useState<Error | null>(null);

  const triggerError = useCallback((customError?: Error) => {
    const errorToThrow = customError || new Error("Programmatically triggered error");
    setError(errorToThrow);
    // Throw in next tick to ensure React can catch it
    setTimeout(() => {
      throw errorToThrow;
    }, 0);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  // Re-throw the error on render if one exists
  if (error) {
    throw error;
  }

  return {
    triggerError,
    resetError,
    hasError: Boolean(error),
  };
}

/**
 * Hook to provide error boundary context to child components
 * Allows children to reset their parent error boundary
 */
export function useErrorReset() {
  const [resetKey, setResetKey] = useState(0);

  const resetErrorBoundary = useCallback(() => {
    setResetKey(prev => prev + 1);
  }, []);

  return {
    resetKey,
    resetErrorBoundary,
  };
}