import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0ea5e9", // Modern cyan blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#10b981", // Emerald green
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    grey: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          color: "#0f172a",
          borderRight: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#0f172a",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          borderBottom: "1px solid #e2e8f0",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#475569",
          borderRadius: "6px",
          margin: "2px 0",
          "&:hover": {
            backgroundColor: "#f1f5f9",
            color: "#0f172a",
          },
          "&.Mui-selected": {
            backgroundColor: "#0ea5e9",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#0284c7",
            },
            "& .MuiListItemIcon-root": {
              color: "#ffffff",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
});
