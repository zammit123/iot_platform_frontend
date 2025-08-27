"use client";

import { useGetDevices } from "@/hooks/devices";
import { DeviceHub } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function DeviceCountCard() {
  const { devices, isError, isPending } = useGetDevices();

  return (
    <Card
      sx={{
        bgcolor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        height: "100%",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <DeviceHub sx={{ color: "hsl(var(--primary))", mr: 1 }} />
          <Typography variant="h6">Connected Devices</Typography>
        </Box>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "hsl(var(--primary))" }}
        >
          {isPending ? (
            <CircularProgress size={24} />
          ) : isError ? (
            "Error fetching devices"
          ) : (
            devices?.length
          )}
        </Typography>
        <Chip label="+12 today" size="small" color="primary" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
}
