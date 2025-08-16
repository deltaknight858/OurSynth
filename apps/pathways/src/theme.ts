import { createTheme, ThemeOptions } from '@mui/material/styles';

// Base theme configuration shared between light and dark themes
const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: `0 8px 32px ${theme.palette.action.hover}`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: `${theme.palette.background.paper}dd`,
            border: `1px solid ${theme.palette.divider}80`,
            boxShadow: `0 12px 40px ${theme.palette.action.selected}`,
          },
        }),
        elevation1: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
        },
        elevation3: {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          fontWeight: 500,
          textTransform: 'none',
          padding: '10px 24px',
          transition: 'all 0.3s ease-in-out',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 6px 20px ${theme.palette.action.hover}`,
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        }),
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'translateY(-2px)',
            boxShadow: `0 6px 20px ${theme.palette.primary.main}40`,
          },
        }),
        outlined: ({ theme }) => ({
          border: `1px solid ${theme.palette.primary.main}33`,
          backgroundColor: `${theme.palette.background.paper}80`,
          backdropFilter: 'blur(10px)',
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: `${theme.palette.background.paper}cc`,
            border: `1px solid ${theme.palette.primary.main}66`,
            transform: 'translateY(-2px)',
          },
        }),
        text: ({ theme }) => ({
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'translateY(-1px)',
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 16,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            backgroundColor: `${theme.palette.background.paper}dd`,
            border: `1px solid ${theme.palette.divider}80`,
            boxShadow: `0 12px 40px ${theme.palette.action.selected}`,
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            backgroundColor: `${theme.palette.background.paper}80`,
            backdropFilter: 'blur(10px)',
            borderRadius: 12,
            transition: 'all 0.3s ease-in-out',
            '& fieldset': {
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease-in-out',
            },
            '&:hover fieldset': {
              border: `1px solid ${theme.palette.divider}80`,
            },
            '&.Mui-focused fieldset': {
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 0 3px ${theme.palette.primary.main}1a`,
            },
            '&:hover': {
              backgroundColor: `${theme.palette.background.paper}cc`,
            },
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: `${theme.palette.background.paper}e6`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}80`,
          borderRadius: 16,
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: `${theme.palette.background.paper}e6`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}80`,
          borderRadius: 12,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: `${theme.palette.primary.main}1a`,
          border: `1px solid ${theme.palette.primary.main}4d`,
          borderRadius: 8,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: `${theme.palette.primary.main}33`,
            border: `1px solid ${theme.palette.primary.main}66`,
            transform: 'translateY(-1px)',
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'scale(1.05)',
          },
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: 'color 0.3s ease-in-out',
        },
      },
    },
  },
};

// Light theme (Primary - Electric Purple)
const lightThemeOptions: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    background: {
      default: '#0a0a0f', // Deep dark base
      paper: '#a020f00d', // Subtle purple tint (5% opacity)
    },
    primary: {
      main: '#a020f0', // Electric purple
      light: '#d946ef', // Bright electric purple
      dark: '#7c1fa8', // Deep purple
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e879f9', // Bright purple accent
      light: '#f3e8ff', // Light purple glow
      dark: '#a21caf', // Deep electric purple
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff', // Sharp white text
      secondary: '#c4b5fd', // Purple-tinted secondary text
    },
    error: {
      main: '#ff4757', // Electric red
      light: '#ff6b7a',
      dark: '#c44569',
    },
    warning: {
      main: '#ffa502', // Electric orange
      light: '#ffb84d',
      dark: '#cc8400',
    },
    success: {
      main: '#7bed9f', // Electric green
      light: '#95e1a3',
      dark: '#5fbf7f',
    },
    divider: '#a020f033', // Purple divider with 20% opacity
    action: {
      hover: '#a020f014', // Purple hover with 8% opacity
      selected: '#a020f028', // Purple selected with 16% opacity
    },
  },
};

// Dark theme variant with accessible colors
const darkThemePaletteOverrides = {
  mode: 'dark' as const,
  background: {
    default: '#0a0a0a',
    paper: '#00000099', // Dark paper with 60% opacity
  },
  primary: {
    main: '#ffffff',
    light: '#ffffff',
    dark: '#cccccc',
    contrastText: '#000000',
  },
  secondary: {
    main: '#22d3ee', // Accessible bright cyan instead of lime green
    light: '#67e8f9', // Light cyan
    dark: '#0891b2', // Dark cyan
    contrastText: '#000000',
  },
  text: {
    primary: '#ffffff',
    secondary: '#cccccc',
  },
  divider: '#ffffff33', // White divider with 20% opacity
  action: {
    hover: '#ffffff14', // White hover with 8% opacity
    selected: '#ffffff28', // White selected with 16% opacity
  },
};

// Create the main theme
const theme = createTheme(lightThemeOptions);

// Create the dark theme by deep-merging palette overrides
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    ...lightThemeOptions.palette,
    ...darkThemePaletteOverrides,
  },
});

export default theme;
