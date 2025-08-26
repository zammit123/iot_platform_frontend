"use client";

import { useParams, useRouter } from "next/navigation";
import { Grid, Stack, Typography } from "@mui/material";
import { useGetDevice, useUpdateDevice } from "@/hooks/devices";
import FullPageLoading from "@/components/Loading/FullPageLoading";
import FetchAlert from "@/components/Errors/FetchAlert";
import DeviceForm from "@/components/Forms/devices/DeviceForm";
import { useCallback } from "react";
import { Device } from "@/schemas/devices";
import { statusToObject } from "@/utils/query-keys/queries/devices/devices";

export default function DeviceDetails() {
  const { push } = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const {
    device,
    isPending: isPendingDevice,
    isError: isErrorDevice,
    refetch,
  } = useGetDevice(id);

  const { updateDevice, isPending: isPendingUpdate } = useUpdateDevice(id);

  const onSubmit = useCallback(
    async (data: Device) => {
      const status = statusToObject(data?.statusFields ?? []);
      delete data.statusFields;
      try {
        await updateDevice({ ...data, status });
        alert("Device updated successfully!");
        push("/devices");
      } catch (error) {
        console.error("Error updating device:", error);
        alert("Failed to update device.");
      }
    },
    [updateDevice, push]
  );

  if (isPendingDevice) return <FullPageLoading />;

  if (isErrorDevice || !device)
    return (
      <FetchAlert
        title="Error fetching device"
        error={"Device not found"}
        refetch={refetch}
      />
    );

  return (
    <Stack gap={4}>
      <Grid container spacing={4}>
        <Grid size={6}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Edit Device
          </Typography>
          <DeviceForm
            deviceValues={device}
            loading={isPendingUpdate}
            onSubmit={onSubmit}
          />
        </Grid>
        <Grid size={6}>{/* TODO - add editing history */}</Grid>
      </Grid>
    </Stack>
  );
}
