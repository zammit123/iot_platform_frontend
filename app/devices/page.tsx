"use client";

import { Typography, Paper, Stack, Button } from "@mui/material";
import { useGetDevices } from "@/hooks/devices";
import FetchAlert from "@/components/Errors/FetchAlert";
import FullPageLoading from "@/components/Loading/FullPageLoading";
import DeviceDataGrid from "@/components/Datagrids/devices/DeviceDataGrid";
import NextLink from "next/link";

export default function Devices() {
  const { devices, isPending, isError, refetch } = useGetDevices();

  if (isPending) return <FullPageLoading />;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Stack
        direction="row"
        gap={4}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Devices
        </Typography>
        <Button
          size="small"
          component={NextLink}
          href="/devices/create"
          variant="outlined"
        >
          Create Device
        </Button>
      </Stack>

      {isError ? (
        <FetchAlert
          title="Error fetching devices"
          error={"Unable to fetch devices. Please try again."}
          refetch={refetch}
        />
      ) : (
        <DeviceDataGrid devices={devices} />
      )}
    </Paper>
  );
}
