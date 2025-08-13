import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, ChevronDown, ChevronUp, Bug } from "lucide-react";
import HaloButton from "./HaloButton";
import HaloCard from "./HaloCard";

export interface HaloErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  showStack?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showStackTrace: boolean;
  isResetting: boolean;
}

export default class HaloErrorBoundary extends Component<HaloErrorBoundaryProps, State> {
  private resetTimeoutId: number | null = null;

  constructor(props: HaloErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showStackTrace: false,
      isResetting: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.group("🚨 ErrorBoundary Caught Error");
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);
      console.groupEnd();
    }
  }

  handleReset = () => {
    this.setState({ isResetting: true });

    // Clear any existing timeout
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId);
    }

    // Call custom reset handler if provided
    if (this.props.onReset) {
      this.props.onReset();
    }

    // Reset error boundary state after a brief delay for visual feedback
    this.resetTimeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        showStackTrace: false,
        isResetting: false,
      });
    }, 800);
  };

  toggleStackTrace = () => {
    this.setState((prevState) => ({
      showStackTrace: !prevState.showStackTrace,
    }));
  };

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId);
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, showStackTrace, isResetting } = this.state;
      const { showStack = true } = this.props;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
          <HaloCard className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border-red-200/30 dark:border-red-800/30 shadow-2xl shadow-red-500/10">
            <div className="p-8">
              {/* Error Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Oops! Something went wrong
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    We encountered an unexpected error. Don't worry, this has been logged and our team will investigate.
                  </p>
                </div>
              </div>

              {/* Error Summary */}
              {error && (
                <div className="mb-6">
                  <div className="rounded-xl bg-red-50/80 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 p-4">
                    <div className="flex items-start gap-3">
                      <Bug className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                          Error Details
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-300 font-mono break-words">
                          {error.message || "An unknown error occurred"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stack Trace Toggle */}
              {showStack && error && (
                <div className="mb-6">
                  <button
                    onClick={this.toggleStackTrace}
                    className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 group"
                  >
                    {showStackTrace ? (
                      <ChevronUp className="w-4 h-4 group-hover:translate-y-[-1px] transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-[1px] transition-transform duration-200" />
                    )}
                    <span className="font-medium">
                      {showStackTrace ? "Hide" : "Show"} technical details
                    </span>
                  </button>

                  {/* Stack Trace */}
                  <div className={`mt-3 overflow-hidden transition-all duration-300 ${showStackTrace ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 overflow-auto">
                      <pre className="text-xs text-neutral-300 font-mono whitespace-pre-wrap break-words">
                        {error.stack || "No stack trace available"}
                        {errorInfo?.componentStack && (
                          <>
                            {"\n\nComponent Stack:"}
                            {errorInfo.componentStack}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <HaloButton
                  onClick={this.handleReset}
                  disabled={isResetting}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 hover:translate-y-[-1px]"
                >
                  <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
                  {isResetting ? "Resetting..." : "Try again"}
                </HaloButton>

                <HaloButton
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 hover:translate-y-[-1px]"
                >
                  Reload page
                </HaloButton>
              </div>

              {/* Helpful Tips */}
              <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-neutral-700/50">
                <p className="text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed">
                  <strong>What you can do:</strong> Try refreshing the page, check your internet connection, or contact support if the problem persists. 
                  {process.env.NODE_ENV === "development" && (
                    <> Check the console for more technical details.</>
                  )}
                </p>
              </div>
            </div>
          </HaloCard>
        </div>
      );
    }

    return this.props.children;
  }
}