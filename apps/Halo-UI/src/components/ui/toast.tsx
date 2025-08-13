
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const viewportPositions = {
  "top-right": "top-0 right-0 flex-col-reverse",
  "top-left": "top-0 left-0 flex-col-reverse",
  "bottom-right": "bottom-0 right-0 flex-col",
  "bottom-left": "bottom-0 left-0 flex-col",
}

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?: keyof typeof viewportPositions
  }
>(({ className, position = "top-right", ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed z-[100] flex max-h-screen w-full p-4 md:max-w-[420px]",
      viewportPositions[position],
      "backdrop-blur-[2px]",
      className
    )}
    role="status"
    aria-live="polite"
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-xl border p-4 pr-6 shadow-lg transition-all duration-500 ease-out data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-top-full data-[state=open]:backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "border-neutral-200/60 bg-white/90 backdrop-blur-md shadow-xl shadow-neutral-900/10 dark:border-neutral-800/60 dark:bg-neutral-950/90 dark:shadow-neutral-100/5",
        info: "border-blue-400/50 bg-gradient-to-r from-blue-50/95 to-cyan-50/95 text-blue-900 backdrop-blur-md shadow-xl shadow-blue-500/25 ring-1 ring-blue-400/30 dark:border-blue-400/40 dark:from-blue-950/95 dark:to-cyan-950/95 dark:text-blue-100 dark:shadow-blue-400/20 dark:ring-blue-400/20",
        success: "border-emerald-400/50 bg-gradient-to-r from-emerald-50/95 to-green-50/95 text-emerald-900 backdrop-blur-md shadow-xl shadow-emerald-500/25 ring-1 ring-emerald-400/30 dark:border-emerald-400/40 dark:from-emerald-950/95 dark:to-green-950/95 dark:text-emerald-100 dark:shadow-emerald-400/20 dark:ring-emerald-400/20",
        warning: "border-amber-400/50 bg-gradient-to-r from-amber-50/95 to-yellow-50/95 text-amber-900 backdrop-blur-md shadow-xl shadow-amber-500/25 ring-1 ring-amber-400/30 dark:border-amber-400/40 dark:from-amber-950/95 dark:to-yellow-950/95 dark:text-amber-100 dark:shadow-amber-400/20 dark:ring-amber-400/20",
        error: "border-red-400/50 bg-gradient-to-r from-red-50/95 to-rose-50/95 text-red-900 backdrop-blur-md shadow-xl shadow-red-500/25 ring-1 ring-red-400/30 dark:border-red-400/40 dark:from-red-950/95 dark:to-rose-950/95 dark:text-red-100 dark:shadow-red-400/20 dark:ring-red-400/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}