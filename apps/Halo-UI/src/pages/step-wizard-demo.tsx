
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  StepWizard,
  StepDefinition,
  StepComponentProps,
  ValidationError,
  HaloCard,
  HaloInput,
  HaloTextarea,
  HaloSelect,
  HaloCheckbox,
  HaloButton,
  HaloBadge,
  ThemeToggle
} from "@/components/halo";
import { User, Mail, Settings, CheckCircle, AlertTriangle, Rocket } from "lucide-react";
import ThemeLayout from "@/components/layout/ThemeLayout";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Step 1: Personal Information
function PersonalInfoStep({ onNext, setError }: StepComponentProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setError("Please fix the validation errors before continuing");
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <p className="text-[rgb(var(--halo-muted))]">
          Let's start by getting to know you. Please provide your basic information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HaloInput
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          error={!!errors.firstName}
          variant="elevated"
        />
        
        <HaloInput
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          error={!!errors.lastName}
          variant="elevated"
        />
      </div>

      <HaloInput
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={!!errors.email}
        variant="elevated"
      />

      <HaloInput
        label="Phone Number (Optional)"
        type="tel"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        variant="elevated"
      />

      <div className="flex justify-end pt-4">
        <HaloButton variant="primary" onClick={handleNext}>
          Continue
        </HaloButton>
      </div>
    </div>
  );
}

// Step 2: Preferences (Optional)
function PreferencesStep({ onNext, onSkip, setError }: StepComponentProps) {
  const [preferences, setPreferences] = useState({
    theme: "",
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    language: "en",
    timezone: ""
  });

  const themeOptions = [
    { value: "light", label: "Light Theme" },
    { value: "dark", label: "Dark Theme" },
    { value: "auto", label: "System Default" }
  ];

  const timezoneOptions = [
    { value: "UTC", label: "UTC" },
    { value: "EST", label: "Eastern Time" },
    { value: "PST", label: "Pacific Time" },
    { value: "GMT", label: "Greenwich Mean Time" }
  ];

  const handleNext = () => {
    setError(null);
    onNext(preferences);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <p className="text-[rgb(var(--halo-muted))]">
          Customize your experience by setting your preferences. This step is optional.
        </p>
        <HaloBadge variant="tertiary" className="mt-2">
          Optional Step - You can skip this
        </HaloBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HaloSelect
          label="Preferred Theme"
          options={themeOptions}
          value={preferences.theme}
          onChange={(value) => setPreferences({ ...preferences, theme: value })}
          placeholder="Choose theme"
          variant="elevated"
        />

        <HaloSelect
          label="Timezone"
          options={timezoneOptions}
          value={preferences.timezone}
          onChange={(value) => setPreferences({ ...preferences, timezone: value })}
          placeholder="Select timezone"
          variant="elevated"
        />
      </div>

      <div>
        <h4 className="font-semibold text-[rgb(var(--halo-fg))] mb-4">Notification Preferences</h4>
        <div className="space-y-3">
          <HaloCheckbox
            label="Email Notifications"
            description="Receive updates and important information via email"
            checked={preferences.notifications.email}
            onChange={(e) => setPreferences({
              ...preferences,
              notifications: { ...preferences.notifications, email: e.target.checked }
            })}
            variant="primary"
          />
          
          <HaloCheckbox
            label="Push Notifications"
            description="Get real-time notifications on your device"
            checked={preferences.notifications.push}
            onChange={(e) => setPreferences({
              ...preferences,
              notifications: { ...preferences.notifications, push: e.target.checked }
            })}
            variant="secondary"
          />
          
          <HaloCheckbox
            label="SMS Notifications"
            description="Receive urgent notifications via SMS"
            checked={preferences.notifications.sms}
            onChange={(e) => setPreferences({
              ...preferences,
              notifications: { ...preferences.notifications, sms: e.target.checked }
            })}
            variant="tertiary"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <HaloButton variant="ghost" onClick={handleSkip}>
          Skip This Step
        </HaloButton>
        <HaloButton variant="primary" onClick={handleNext}>
          Save Preferences
        </HaloButton>
      </div>
    </div>
  );
}

// Step 3: Review & Confirmation
function ReviewStep({ onNext, data }: StepComponentProps) {
  const [agreed, setAgreed] = useState(false);

  const handleFinish = () => {
    if (agreed) {
      onNext({ confirmed: true, agreedToTerms: true });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <p className="text-[rgb(var(--halo-muted))]">
          Please review your information before completing the setup.
        </p>
      </div>

      <HaloCard variant="glass" className="p-6">
        <h4 className="font-semibold text-[rgb(var(--halo-fg))] mb-4 flex items-center gap-2">
          <User size={18} />
          Personal Information
        </h4>
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[rgb(var(--halo-muted))]">Name:</span>
              <p className="font-medium">{data.firstName} {data.lastName}</p>
            </div>
            <div>
              <span className="text-[rgb(var(--halo-muted))]">Email:</span>
              <p className="font-medium">{data.email}</p>
            </div>
            {data.phone && (
              <div>
                <span className="text-[rgb(var(--halo-muted))]">Phone:</span>
                <p className="font-medium">{data.phone}</p>
              </div>
            )}
          </div>
        )}
      </HaloCard>

      <div className="border border-[rgba(var(--halo-fg),0.1)] rounded-2xl p-6">
        <HaloCheckbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="By checking this box, you confirm that you have read and agree to our terms"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          variant="primary"
          size="lg"
        />
      </div>

      <div className="flex justify-end pt-4">
        <HaloButton 
          variant="primary" 
          onClick={handleFinish}
          disabled={!agreed}
          className="flex items-center gap-2"
        >
          <Rocket size={16} />
          Complete Setup
        </HaloButton>
      </div>
    </div>
  );
}

// Success Step
function SuccessStep({ data }: StepComponentProps) {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>

      <div>
        <h3 className="text-3xl font-bold text-[rgb(var(--halo-fg))] mb-4">
          Welcome aboard! 🎉
        </h3>
        <p className="text-[rgb(var(--halo-muted))] text-lg">
          Your account has been successfully set up. You can now start exploring all the features.
        </p>
      </div>

      {data && (
        <HaloCard variant="glass" className="p-6 max-w-md mx-auto">
          <h4 className="font-semibold mb-3">Setup Summary</h4>
          <div className="text-sm space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-[rgb(var(--halo-muted))]">Name:</span>
              <span>{data.firstName} {data.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--halo-muted))]">Email:</span>
              <span>{data.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--halo-muted))]">Status:</span>
              <HaloBadge variant="primary" size="sm">Active</HaloBadge>
            </div>
          </div>
        </HaloCard>
      )}

      <HaloButton variant="primary" className="mt-8">
        Get Started
      </HaloButton>
    </div>
  );
}

export default function StepWizardDemo() {
  const [currentStep, setCurrentStep] = useState("personal-info");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalData, setFinalData] = useState<any>(null);
  const { toast } = useToast();

  const steps: StepDefinition[] = [
    {
      id: "personal-info",
      title: "Personal Information",
      component: PersonalInfoStep,
    },
    {
      id: "preferences",
      title: "Preferences",
      component: PreferencesStep,
      optional: true,
      skipLabel: "Skip Setup"
    },
    {
      id: "review",
      title: "Review & Confirm",
      component: ReviewStep,
    }
  ];

  const handleNext = (stepId: string, data?: any) => {
    console.log("Next step:", stepId, data);
    setCurrentStep(stepId);
    setValidationErrors([]);
    
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Step Completed",
        description: `Successfully moved to ${steps.find(s => s.id === stepId)?.title}`,
      });
    }, 500);
  };

  const handleBack = (stepId: string) => {
    console.log("Back to step:", stepId);
    setCurrentStep(stepId);
    setValidationErrors([]);
  };

  const handleSkip = (stepId: string) => {
    console.log("Skipped step:", stepId);
    toast({
      title: "Step Skipped",
      description: `You skipped ${steps.find(s => s.id === stepId)?.title}`,
      variant: "default"
    });
  };

  const handleFinish = (allData: Record<string, any>) => {
    console.log("Wizard completed with data:", allData);
    setIsLoading(true);
    
    // Simulate final API call
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
      setFinalData(allData["personal-info"]);
      toast({
        title: "Setup Complete! 🎉",
        description: "Your account has been successfully configured.",
      });
    }, 1000);
  };

  const resetWizard = () => {
    setCurrentStep("personal-info");
    setIsCompleted(false);
    setFinalData(null);
    setValidationErrors([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("step-wizard-demo");
    }
  };

  if (isCompleted) {
    return (
      <ThemeLayout>
        <div className="min-h-screen halo-noise relative">
          <ThemeToggle />
          
          <div className="pt-16 pb-24 px-4">
            <div className="max-w-2xl mx-auto">
              <SuccessStep 
                onNext={() => {}}
                onBack={() => {}}
                setError={() => {}}
                data={finalData}
              />
              
              <div className="text-center mt-12">
                <HaloButton variant="ghost" onClick={resetWizard}>
                  Try Again
                </HaloButton>
              </div>
            </div>
          </div>
        </div>
      </ThemeLayout>
    );
  }

  return (
    <ThemeLayout>
      <div className="min-h-screen halo-noise relative">
        <ThemeToggle />
        
        <div className="pt-16 pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <HaloBadge variant="primary" className="mb-4">
                <Rocket size={14} className="mr-1" />
                Setup Wizard Demo
              </HaloBadge>
              
              <h1 className="text-4xl font-bold text-[rgb(var(--halo-fg))] mb-4">
                Account Setup Wizard
              </h1>
              
              <p className="text-[rgb(var(--halo-muted))] text-lg max-w-2xl mx-auto">
                Experience our sophisticated multi-step wizard with progress tracking, 
                validation, optional steps, and persistent state management.
              </p>
            </motion.div>

            {/* Step Wizard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StepWizard
                steps={steps}
                currentStepId={currentStep}
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
                onFinish={handleFinish}
                persistProgress
                persistKey="step-wizard-demo"
                variant="elevated"
                showProgressBar
                allowBackNavigation
                validationErrors={validationErrors}
                isLoading={isLoading}
              />
            </motion.div>

            {/* Reset Button */}
            <div className="text-center mt-8">
              <HaloButton variant="ghost" onClick={resetWizard} size="sm">
                Reset Demo
              </HaloButton>
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    </ThemeLayout>
  );
}