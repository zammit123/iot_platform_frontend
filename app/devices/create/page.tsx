"use client";

import DeviceForm from "@/components/Forms/devices/DeviceForm";
import { useCreateDevice } from "@/hooks/devices";
import { Device } from "@/schemas/devices";
import { statusToObject } from "@/utils/query-keys/queries/devices/devices";
import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function CreateDevicePage() {
  const { createDevice, isPending } = useCreateDevice();
  const { push } = useRouter();

  const onSubmit = useCallback(
    async (data: Device) => {
      const status = statusToObject(data?.statusFields ?? []);
      delete data.statusFields;

      try {
        await createDevice({ ...data, status });
        alert("Device created successfully!");
        push("/devices");
      } catch (error) {
        console.error("Error creating device:", error);
        alert("Failed to create device.");
      }
    },
    [createDevice, push]
  );

  return (
    <Grid container spacing={4}>
      <Grid size={6}>
        <Stack gap={4}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Create Device
          </Typography>
          <DeviceForm loading={isPending} onSubmit={onSubmit} />
        </Stack>
      </Grid>
      <Grid size={6}>
        {/* TODO - add a component for explaining device details */}
      </Grid>
    </Grid>
  );
}
