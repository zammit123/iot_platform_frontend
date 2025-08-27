import { z } from "zod";

const statusString = () =>
  z
    .string()
    .min(1, `Must be at least 1 character`)
    .max(100, `Must be at most 100 characters`);

export const DeviceSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2, "Device name is required"),
  type: z.int("Device type is required"),
  description: z.string().optional(),
  location: z.string().max(100).optional(),
  status: z.record(statusString(), statusString().transform(String)),
  statusFields: z
    .array(
      z.object({
        key: statusString(),
        value: statusString().transform(String),
      })
    )
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Device = z.infer<typeof DeviceSchema>;

export const DevicePartialSchema = DeviceSchema.pick({
  id: true,
  name: true,
  location: true,
});

export type DevicePartial = z.infer<typeof DevicePartialSchema>;
