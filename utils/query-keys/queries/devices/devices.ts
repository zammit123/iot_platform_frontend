export const DEVICES_KEY = "devices";

// This would be replaced in production by returning a list of devices from the database
export const DEVICE_TYPES = [
  {
    id: 0,
    name: "Light",
  },
  {
    id: 1,
    name: "Thermostat",
  },
  {
    id: 2,
    name: "Camera",
  },
];

export function statusToArray(
  status: Record<string, string>
): { key: string; value: string }[] {
  return Object.entries(status).map(([key, value]) => ({ key, value }));
}

export function statusToObject(
  statusArray: { key: string; value: string }[]
): Record<string, string> {
  return Object.fromEntries(statusArray.map(({ key, value }) => [key, value]));
}
