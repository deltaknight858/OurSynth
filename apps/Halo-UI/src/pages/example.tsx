import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/halo/ThemeToggle";

export default function ExamplePage() {
  const { isDark } = useTheme();
  
  return (
    <div className="min-h-screen bg-halo-bg text-halo-fg p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Halo UI Theme Example</h1>
          <ThemeToggle />
        </div>
        
        <div className="grid gap-6">
          {/* Theme demonstration cards */}
          <div className="p-6 rounded-halo bg-halo-bg-elev border border-halo-fg/10">
            <h2 className="text-xl font-semibold mb-4">Current Theme</h2>
            <p className="text-halo-muted">
              The active theme is: <span className="text-halo-primary font-medium">{isDark ? "Dark" : "Light"}</span>
            </p>
          </div>
          
          {/* Color showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-halo bg-halo-primary/20 text-halo-primary">
              Primary Color
            </div>
            <div className="p-4 rounded-halo bg-halo-secondary/20 text-halo-secondary">
              Secondary Color
            </div>
            <div className="p-4 rounded-halo bg-halo-tertiary/20 text-halo-tertiary">
              Tertiary Color
            </div>
          </div>
          
          {/* Glass card example */}
          <div className="halo-glass rounded-halo p-6">
            <h2 className="text-xl font-semibold mb-4">Glassmorphism</h2>
            <p className="text-halo-muted">
              This card demonstrates the glass effect with backdrop blur
            </p>
          </div>
          
          {/* Elevation example */}
          <div className="p-6 rounded-halo bg-halo-bg-elev halo-hover">
            <h2 className="text-xl font-semibold mb-4">Elevation & Hover</h2>
            <p className="text-halo-muted">
              This card shows elevated background color and hover animation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}