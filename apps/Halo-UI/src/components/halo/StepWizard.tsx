
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, AlertCircle, SkipForward } from "lucide-react";
import HaloButton from "./HaloButton";
import HaloCard from "./HaloCard";
import HaloBadge from "./HaloBadge";
import HaloProgress from "./HaloProgress";

export interface StepDefinition {
  id: string;
  title: string;
  component: React.ComponentType<StepComponentProps>;
  optional?: boolean;
  skipLabel?: string;
}

export interface StepComponentProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  onSkip?: () => void;
  setError: (error: string | null) => void;
  isLoading?: boolean;
  data?: any;
}

export interface ValidationError {
  stepId: string;
  message: string;
}

export interface StepWizardProps {
  steps: StepDefinition[];
  currentStepId?: string;
  onNext: (stepId: string, data?: any) => void;
  onBack: (stepId: string) => void;
  onFinish: (allData: Record<string, any>) => void;
  onSkip?: (stepId: string) => void;
  persistProgress?: boolean;
  persistKey?: string;
  className?: string;
  variant?: "elevated" | "glass" | "minimal";
  showProgressBar?: boolean;
  allowBackNavigation?: boolean;
  validationErrors?: ValidationError[];
  isLoading?: boolean;
}

interface StepState {
  completed: boolean;
  data?: any;
  error?: string;
  skipped?: boolean;
}

export default function StepWizard({
  steps,
  currentStepId,
  onNext,
  onBack,
  onFinish,
  onSkip,
  persistProgress = false,
  persistKey = "step-wizard-progress",
  className = "",
  variant = "elevated",
  showProgressBar = true,
  allowBackNavigation = true,
  validationErrors = [],
  isLoading = false,
  ...props
}: StepWizardProps) {
  const [stepStates, setStepStates] = useState<Record<string, StepState>>({});
  const [currentStep, setCurrentStep] = useState<string>(
    currentStepId || steps[0]?.id || ""
  );

  // Load persisted progress
  useEffect(() => {
    if (persistProgress && typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(persistKey);
        if (saved) {
          const { stepStates: savedStates, currentStep: savedCurrent } = JSON.parse(saved);
          setStepStates(savedStates || {});
          if (savedCurrent && steps.find(s => s.id === savedCurrent)) {
            setCurrentStep(savedCurrent);
          }
        }
      } catch (error) {
        console.warn("Failed to load step wizard progress:", error);
      }
    }
  }, [persistProgress, persistKey]);

  // Save progress to localStorage
  const saveProgress = useCallback((newStepStates: Record<string, StepState>, newCurrentStep: string) => {
    if (persistProgress && typeof window !== "undefined") {
      try {
        localStorage.setItem(persistKey, JSON.stringify({
          stepStates: newStepStates,
          currentStep: newCurrentStep
        }));
      } catch (error) {
        console.warn("Failed to save step wizard progress:", error);
      }
    }
  }, [persistProgress, persistKey]);

  // Update current step when prop changes
  useEffect(() => {
    if (currentStepId && currentStepId !== currentStep) {
      setCurrentStep(currentStepId);
    }
  }, [currentStepId]);

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const currentStepDef = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Calculate progress
  const completedSteps = Object.values(stepStates).filter(state => state.completed || state.skipped).length;
  const progressPercentage = steps.length > 0 ? (completedSteps / steps.length) * 100 : 0;

  // Get current step error from validation errors
  const currentStepError = validationErrors.find(error => error.stepId === currentStep)?.message;

  const handleNext = useCallback((data?: any) => {
    const newStepStates = {
      ...stepStates,
      [currentStep]: {
        ...stepStates[currentStep],
        completed: true,
        data,
        error: null,
        skipped: false
      }
    };

    setStepStates(newStepStates);

    if (isLastStep) {
      // Collect all data and finish
      const allData = steps.reduce((acc, step) => {
        const stepState = newStepStates[step.id];
        if (stepState?.data !== undefined) {
          acc[step.id] = stepState.data;
        }
        return acc;
      }, {} as Record<string, any>);

      onFinish(allData);
    } else {
      const nextStep = steps[currentStepIndex + 1];
      setCurrentStep(nextStep.id);
      saveProgress(newStepStates, nextStep.id);
      onNext(nextStep.id, data);
    }
  }, [stepStates, currentStep, isLastStep, currentStepIndex, steps, onNext, onFinish, saveProgress]);

  const handleBack = useCallback(() => {
    if (!isFirstStep && allowBackNavigation) {
      const prevStep = steps[currentStepIndex - 1];
      setCurrentStep(prevStep.id);
      saveProgress(stepStates, prevStep.id);
      onBack(prevStep.id);
    }
  }, [isFirstStep, allowBackNavigation, currentStepIndex, steps, stepStates, onBack, saveProgress]);

  const handleSkip = useCallback(() => {
    if (currentStepDef?.optional && onSkip) {
      const newStepStates = {
        ...stepStates,
        [currentStep]: {
          ...stepStates[currentStep],
          completed: false,
          skipped: true,
          error: null
        }
      };

      setStepStates(newStepStates);

      if (isLastStep) {
        const allData = steps.reduce((acc, step) => {
          const stepState = newStepStates[step.id];
          if (stepState?.data !== undefined) {
            acc[step.id] = stepState.data;
          }
          return acc;
        }, {} as Record<string, any>);

        onFinish(allData);
      } else {
        const nextStep = steps[currentStepIndex + 1];
        setCurrentStep(nextStep.id);
        saveProgress(newStepStates, nextStep.id);
        onSkip(currentStep);
      }
    }
  }, [currentStepDef, onSkip, stepStates, currentStep, isLastStep, steps, onFinish, currentStepIndex, saveProgress]);

  const setStepError = useCallback((error: string | null) => {
    setStepStates(prev => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        error
      }
    }));
  }, [currentStep]);

  if (!currentStepDef) {
    return null;
  }

  const StepComponent = currentStepDef.component;
  const currentStepState = stepStates[currentStep];
  const displayError = currentStepError || currentStepState?.error;

  return (
    <div className={`step-wizard ${className}`} {...props}>
      {/* Progress Header */}
      <HaloCard variant={variant} className="mb-6 p-6">
        {/* Step Progress Indicators */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1">
            {steps.map((step, index) => {
              const state = stepStates[step.id];
              const isActive = step.id === currentStep;
              const isCompleted = state?.completed || false;
              const isSkipped = state?.skipped || false;
              const isPast = index < currentStepIndex;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`
                        w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium
                        transition-all duration-300 relative
                        ${isActive 
                          ? "border-[rgb(var(--halo-primary))] bg-[rgba(var(--halo-primary),0.1)] text-[rgb(var(--halo-primary))] halo-glow-primary" 
                          : isCompleted 
                            ? "border-green-500 bg-green-500/10 text-green-500" 
                            : isSkipped
                              ? "border-amber-500 bg-amber-500/10 text-amber-500"
                              : isPast
                                ? "border-[rgba(var(--halo-fg),0.3)] bg-[rgba(var(--halo-fg),0.05)] text-[rgba(var(--halo-fg),0.6)]"
                                : "border-[rgba(var(--halo-fg),0.2)] bg-[rgba(var(--halo-bg),0.5)] text-[rgba(var(--halo-fg),0.4)]"
                        }
                      `}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        boxShadow: isActive ? "0 0 20px rgba(var(--halo-primary), 0.3)" : "none"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCompleted ? (
                        <Check size={16} />
                      ) : isSkipped ? (
                        <SkipForward size={16} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </motion.div>
                    
                    <motion.div
                      className="mt-2 text-center"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0.6,
                        scale: isActive ? 1.05 : 1
                      }}
                    >
                      <p className={`text-xs font-medium ${isActive ? "text-[rgb(var(--halo-fg))]" : "text-[rgb(var(--halo-muted))]"}`}>
                        {step.title}
                      </p>
                      {step.optional && (
                        <HaloBadge variant="ghost" size="sm" className="mt-1">
                          Optional
                        </HaloBadge>
                      )}
                    </motion.div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`
                      flex-1 h-0.5 mx-4 min-w-[2rem] transition-all duration-500
                      ${index < currentStepIndex ? "bg-[rgb(var(--halo-primary))]" : "bg-[rgba(var(--halo-fg),0.1)]"}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Overall Progress Bar */}
        {showProgressBar && (
          <div className="mb-4">
            <HaloProgress
              value={progressPercentage}
              variant="primary"
              animated
              showValue
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-[rgb(var(--halo-muted))]">
              <span>Step {currentStepIndex + 1} of {steps.length}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
          </div>
        )}

        {/* Current Step Title */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[rgb(var(--halo-fg))] mb-2">
            {currentStepDef.title}
          </h2>
          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium"
            >
              <AlertCircle size={16} />
              {displayError}
            </motion.div>
          )}
        </div>
      </HaloCard>

      {/* Step Content */}
      <HaloCard variant={variant} className="mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <StepComponent
              onNext={handleNext}
              onBack={handleBack}
              onSkip={currentStepDef.optional ? handleSkip : undefined}
              setError={setStepError}
              isLoading={isLoading}
              data={currentStepState?.data}
            />
          </motion.div>
        </AnimatePresence>
      </HaloCard>

      {/* Navigation Footer */}
      <HaloCard variant={variant} className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isFirstStep && allowBackNavigation && (
              <HaloButton
                variant="ghost"
                onClick={handleBack}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </HaloButton>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStepDef.optional && onSkip && (
              <HaloButton
                variant="tertiary"
                onClick={handleSkip}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <SkipForward size={16} />
                {currentStepDef.skipLabel || "Skip"}
              </HaloButton>
            )}
            
            <HaloButton
              variant="primary"
              onClick={() => handleNext()}
              loading={isLoading}
              className="flex items-center gap-2"
            >
              {isLastStep ? "Finish" : "Next"}
              {!isLastStep && <ChevronRight size={16} />}
            </HaloButton>
          </div>
        </div>
      </HaloCard>
    </div>
  );
}