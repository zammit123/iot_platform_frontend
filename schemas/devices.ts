import { z } from "zod";

const statusString = () =>
  z
    .string()
    .min(2, `Must be at least 2 characters`)
    .max(100, `Must be at most 100 characters`);

export const DeviceSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2, "Device name is required"),
  type: z.int("Device type is required"),
  location: z.string().max(100).optional(),
  status: z.record(
    statusString(),
    statusString()
      .or(z.number().transform(String))
      .or(z.boolean().transform(String))
  ),
  statusFields: z
    .array(
      z.object({
        key: statusString(),
        value: statusString()
          .or(z.number().transform(String))
          .or(z.boolean().transform(String)),
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
