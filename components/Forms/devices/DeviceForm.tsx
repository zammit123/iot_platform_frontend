"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Divider, Stack } from "@mui/material";
import { Device, DeviceSchema } from "@/schemas/devices";
import KeyValueBuilder from "./KeyValueBuilder";
import { DEVICE_TYPES } from "@/utils/query-keys/queries/devices/devices";
import { useEffect } from "react";

interface Props {
  deviceValues?: Device;
  loading: boolean;
  onSubmit: (data: Device) => void;
}

const DEFAULT_VALUES: Device = {
  id: crypto.randomUUID(),
  name: "",
  type: 0,
  location: "",
  status: {},
  statusFields: [],
};

export default function DeviceForm({ deviceValues, loading, onSubmit }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Device>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: deviceValues ?? DEFAULT_VALUES,
  });

  // Scroll the user to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "grid", gap: 2, maxWidth: 600 }}
    >
      <Stack gap={2} divider={<Divider />}>
        <Stack gap={2}>
          <h2>Device Information</h2>

          {/* Only display the UUID for existing devices */}
          {deviceValues && (
            <TextField
              label="UUID"
              {...register("id")}
              error={!!errors.id}
              helperText={errors.id?.message}
              size="small"
              disabled
            />
          )}

          <TextField
            label="Device Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            size="small"
          />

          <TextField
            select
            label="Device Type"
            {...register("type", { valueAsNumber: true })}
            error={!!errors.type}
            helperText={errors.type?.message}
            size="small"
            slotProps={{ select: { native: true } }}
          >
            {DEVICE_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </TextField>

          <TextField
            label="Location"
            {...register("location")}
            error={!!errors.location}
            helperText={errors.location?.message}
            size="small"
          />
        </Stack>

        <Stack gap={2}>
          <h2>Status</h2>

          <KeyValueBuilder control={control} errors={errors} />
        </Stack>

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Saving" : "Save"}
        </Button>
      </Stack>
    </Box>
  );
}
