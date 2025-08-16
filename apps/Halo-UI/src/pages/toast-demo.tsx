
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Info, CheckCircle, AlertTriangle, XCircle, Bell, Code2, Palette } from "lucide-react"
import ThemeLayout from "@/components/layout/ThemeLayout"

export default function ToastDemo() {
  const { toast } = useToast()
  const [position, setPosition] = useState<"top-right" | "top-left" | "bottom-right" | "bottom-left">("top-right")
  const [variant, setVariant] = useState<"default" | "info" | "success" | "warning" | "error">("default")
  const [title, setTitle] = useState("Toast Title")
  const [description, setDescription] = useState("This is a toast notification message")
  const [duration, setDuration] = useState(5000)

  const showToast = (overrides = {}) => {
    toast({
      title,
      description,
      variant,
      position,
      duration,
      ...overrides,
    })
  }

  const presetToasts = [
    {
      title: "Info",
      variant: "info" as const,
      toast: { title: "Information", description: "Here's some helpful information for you", variant: "info" as const }
    },
    {
      title: "Success",
      variant: "success" as const,
      toast: { title: "Success!", description: "Your action was completed successfully", variant: "success" as const }
    },
    {
      title: "Warning",
      variant: "warning" as const,
      toast: { title: "Warning", description: "Please check your input and try again", variant: "warning" as const }
    },
    {
      title: "Error",
      variant: "error" as const,
      toast: { title: "Error", description: "Something went wrong. Please try again", variant: "error" as const }
    }
  ]

  const positionOptions = [
    { value: "top-right", label: "Top Right" },
    { value: "top-left", label: "Top Left" },
    { value: "bottom-right", label: "Bottom Right" },
    { value: "bottom-left", label: "Bottom Left" },
  ]

  return (
    <ThemeLayout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <Bell className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                Toast System Demo
              </h1>
            </div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Explore our comprehensive toast notification system with neon highlights, multiple positions, and smooth animations.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Code2 className="h-3 w-3 mr-1" />
                Portal-based
              </Badge>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                <Palette className="h-3 w-3 mr-1" />
                Accessible
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
              <TabsTrigger value="presets">Quick Presets</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-neutral-200/60 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-blue-500" />
                      Customize Toast
                    </CardTitle>
                    <CardDescription>
                      Configure your toast notification settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Select value={position} onValueChange={(value: "top-right" | "top-left" | "bottom-right" | "bottom-left") => setPosition(value)}>
                          <SelectTrigger id="position">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {positionOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="variant">Variant</Label>
                        <Select value={variant} onValueChange={(value: "default" | "info" | "success" | "warning" | "error") => setVariant(value)}>
                          <SelectTrigger id="variant">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="error">Error</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Toast title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Toast description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (ms)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        placeholder="5000"
                      />
                    </div>

                    <Button onClick={() => showToast()} className="w-full" size="lg">
                      Show Toast
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-neutral-200/60 shadow-lg">
                  <CardHeader>
                    <CardTitle>Position Preview</CardTitle>
                    <CardDescription>
                      Test different positions with quick buttons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {positionOptions.map((pos) => (
                        <Button
                          key={pos.value}
                          variant="outline"
                          onClick={() => toast({
                            title: `${pos.label} Toast`,
                            description: `This toast appears in ${pos.label.toLowerCase()}`,
                            position: pos.value as "top-right" | "top-left" | "bottom-right" | "bottom-left",
                            variant: "info"
                          })}
                          className="h-16 flex-col"
                        >
                          <span className="font-medium">{pos.label}</span>
                          <span className="text-xs text-neutral-500">Click to test</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="presets" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {presetToasts.map((preset) => {
                  const icons = {
                    info: Info,
                    success: CheckCircle,
                    warning: AlertTriangle,
                    error: XCircle,
                  }
                  const Icon = icons[preset.variant as keyof typeof icons]

                  return (
                    <Card key={preset.variant} className="border-neutral-200/60 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                          preset.variant === 'info' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                          preset.variant === 'success' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400' :
                          preset.variant === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400' :
                          'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{preset.title}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {preset.toast.description}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => toast({ ...preset.toast, position })}
                          className="w-full"
                        >
                          Show {preset.title}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card className="border-neutral-200/60 shadow-lg">
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>
                    Complete API documentation for the toast system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">useToast Hook</h3>
                    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 font-mono text-sm">
                      <div>const {`{ toast, dismiss, toasts }`} = useToast()</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">toast() Method</h3>
                    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 font-mono text-sm space-y-2">
                      <div>toast({`{`}</div>
                      <div className="pl-4">title?: string | ReactNode</div>
                      <div className="pl-4">description?: string | ReactNode</div>
                      <div className="pl-4">variant?: "default" | "info" | "success" | "warning" | "error"</div>
                      <div className="pl-4">position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"</div>
                      <div className="pl-4">duration?: number</div>
                      <div className="pl-4">action?: ToastActionElement</div>
                      <div>{`}`})</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Portal-based rendering with accessibility support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Multiple positioning options
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Neon edge highlights for variants
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Smooth slide-in with blur and fade-down animations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Swipe-to-dismiss gesture support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Customizable duration and actions
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Toaster />
      </div>
    </ThemeLayout>
  )
}
