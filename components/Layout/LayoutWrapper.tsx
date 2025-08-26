"use client";

import { theme } from "@/app/theme";
import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import Footer from "./Footer";
import { ReactNode } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />

        <NavBar />

        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar />
          <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
