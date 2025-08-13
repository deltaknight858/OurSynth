
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  const positions = ["top-right", "top-left", "bottom-right", "bottom-left"] as const
  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || "top-right"
    if (!acc[position]) {
      acc[position] = []
    }
    acc[position].push(toast)
    return acc
  }, {} as Record<typeof positions[number], typeof toasts>)

  return (
    <ToastProvider>
      {positions.map((position) =>
        groupedToasts[position]?.length ? (
          <ToastViewport key={position} position={position}>
            {groupedToasts[position].map(({ id, title, description, action, ...props }) => (
              <Toast key={id} {...props}>
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
                {action}
                <ToastClose />
              </Toast>
            ))}
          </ToastViewport>
        ) : null
      )}
    </ToastProvider>
  )
}
