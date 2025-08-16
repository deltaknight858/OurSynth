import baseConfig from "@oursynth/shared-config";
import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");

const config = {
  ...baseConfig,
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      colors: {
        ...baseConfig.theme.extend.colors,
        // Neon Colors specific to domains app
        "neon-cyan": "#00FFFF",
        "neon-magenta": "#FF00FF",
        "neon-lime": "#7FFF00",
      },
      // Frosted Glass / Glass Morphism specific to domains app
      backgroundColor: {
        glass: "rgba(255, 255, 255, 0.05)",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.2)",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    ...baseConfig.plugins,
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".backdrop-blur-glass": {
          "backdrop-filter": "blur(10px)",
          "-webkit-backdrop-filter": "blur(10px)",
        },
      });
    }),
  ],
};

export default config;
