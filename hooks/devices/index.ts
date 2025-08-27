import {
  Device,
  DevicePartial,
  DevicePartialSchema,
  DeviceSchema,
} from "@/schemas/devices";
import {
  DEVICES_KEY,
  statusToArray,
} from "@/utils/query-keys/queries/devices/devices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const useGetDevices = () => {
  const {
    data: devices,
    isPending,
    isError,
    refetch,
  } = useQuery<DevicePartial[]>({
    queryKey: [DEVICES_KEY],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/devices`);
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      } catch (error) {
        console.error("Failed to fetch devices:", error);
        throw error;
      }
    },
    select: (data) => {
      if (!data) return [];

      const parsed = z.array(DevicePartialSchema).safeParse(data);
      if (!parsed.success) return [];

      return parsed.data;
    },
  });

  return { devices, isPending, isError, refetch };
};

export const useGetDevice = (id: string) => {
  const {
    data: device,
    isPending,
    isError,
    refetch,
  } = useQuery<Device | null>({
    queryKey: [DEVICES_KEY, id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/devices/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      } catch (error) {
        console.error(`Failed to fetch device with id ${id}:`, error);
        throw error;
      }
    },
    select: (data) => {
      if (!data) return null;

      const parsed = DeviceSchema.safeParse(data);
      if (!parsed.success) return null;

      const validDevice = parsed.data;
      return {
        ...validDevice,
        statusFields: statusToArray(validDevice?.status),
      };
    },
    enabled: !!id,
  });

  return { device, isPending, isError, refetch };
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createDevice,
    isPending,
    isError,
  } = useMutation({
    // Clear the cache for the devices list
    mutationKey: [DEVICES_KEY],
    mutationFn: async (newDevice: Device) => {
      try {
        const res = await fetch(`/api/devices`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDevice),
        });
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      } catch (error) {
        console.error("Failed to create device:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the main devices list
      queryClient.invalidateQueries({ queryKey: [DEVICES_KEY] });
    },
  });

  return { createDevice, isPending, isError };
};

export const useUpdateDevice = (id: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateDevice,
    isPending,
    isError,
  } = useMutation({
    mutationKey: [DEVICES_KEY, id],
    mutationFn: async (updatedDevice: Device) => {
      try {
        const res = await fetch(`/api/devices/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDevice),
        });
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      } catch (error) {
        console.error(`Failed to update device with id ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the main devices list
      queryClient.invalidateQueries({ queryKey: [DEVICES_KEY] });

      // Invalidate the single device query
      queryClient.invalidateQueries({ queryKey: [DEVICES_KEY, id] });
    },
  });

  return { updateDevice, isPending, isError };
};

export const useDeleteDevice = (id?: string) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteDevice,
    isPending,
    isError,
  } = useMutation({
    mutationKey: [DEVICES_KEY, id],
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/devices/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      } catch (error) {
        console.error(`Failed to delete device with id ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the main devices list
      queryClient.invalidateQueries({ queryKey: [DEVICES_KEY] });

      // Invalidate the single device query
      queryClient.invalidateQueries({ queryKey: [DEVICES_KEY, id] });
    },
  });

  return { deleteDevice, isPending, isError };
};
