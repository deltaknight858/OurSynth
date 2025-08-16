# Halo UI Quick Guide: Tokens, Motion, and Customization

Welcome to your first design system! Here’s how to manage and customize your UI tokens and motion presets for a modern, cinematic app.

---

## 🎨 Color & Glass Tokens

- **Neon Colors:**
  - `neon.primary` – Main accent (cyan/blue)
  - `neon.success` – Success/active (green)
  - `neon.warning` – Warning/error (yellow/orange)
- **Glass Surfaces:**
  - `glass.bg` – Glass background (`bg-white/10 backdrop-blur-md`)
  - `glass.border` – Subtle border (`border-white/20`)

**How to use:**
- Use these as Tailwind classes or CSS variables in your components.
- Example: `className="glass-bg glass-border border-neon-primary"`

---

## 🌀 Motion Tokens (Framer Motion)

- **spring:floatUp** – For icons or elements entering from below
- **spring:fadeIn** – For fading in text or overlays
- **spring:slideIn** – For horizontal transitions (e.g., stepper, nav)
- **spring:pulse** – For glowing/pulsing status or beacons

**How to use:**
- Import and spread the token into your `motion.div` or `motion.span`:
  ```tsx
  <motion.div variants={springFloatUp} initial="initial" animate="animate">...</motion.div>
  ```
- Adjust stiffness/damping for snappier or softer motion.

---

## 🧩 Shared Token Example (tokens.ts)

```ts
// packages/halo-ui/src/tokens.ts
export const neon = {
  primary: '#00fff0',
  success: '#00ff90',
  warning: '#ffb300',
};
export const glass = {
  bg: 'bg-white/10 backdrop-blur-md',
  border: 'border-white/20',
};
export const springFloatUp = {
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 24 } },
};
export const springFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
};
```

---

## 🛠 Customizing Your System

- **Change colors:** Edit the `neon` or `glass` values in your tokens file.
- **Change motion:** Adjust `stiffness`, `damping`, or `duration` in your motion tokens.
- **Global update:** Import your tokens into any component and use them for instant, consistent changes.

---

## 🚀 Pro Tips

- Extract tokens early for easy scaling.
- Use Tailwind’s `@apply` for custom utility classes if needed.
- Preview changes in Storybook or a component showcase page.
- Don’t be afraid to experiment—your design system should evolve with your app!

---

Happy building! 🚀
