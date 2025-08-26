import { Box, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      component="footer"
      elevation={0}
      sx={{
        mt: "auto",
        py: 2,
        px: 3,
        bgcolor: "#ffffff",
        color: "#475569",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography
            variant="body2"
            component="a"
            href="#"
            sx={{
              color: "inherit",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Support
          </Typography>
          <Typography
            variant="body2"
            component="a"
            href="#"
            sx={{
              color: "inherit",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Documentation
          </Typography>
          <Typography
            variant="body2"
            component="a"
            href="#"
            sx={{
              color: "inherit",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Contact
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
