import { Device } from "@/schemas/devices";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import {
  useFieldArray,
  Controller,
  Control,
  FieldErrors,
} from "react-hook-form";

interface KeyValueBuilderProps {
  control: Control<Device>;
  errors: FieldErrors<Device>;
}

export default function KeyValueBuilder({
  control,
  errors,
}: KeyValueBuilderProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "statusFields",
  });

  return (
    <>
      {fields.map((item, index) => (
        <Stack key={item.id} direction="row" spacing={1} alignItems="center">
          <Controller
            name={`statusFields.${index}.key`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Field Name"
                error={!!errors.statusFields?.[index]?.key}
                helperText={errors.statusFields?.[index]?.key?.message}
                fullWidth
                size="small"
              />
            )}
          />
          <Controller
            name={`statusFields.${index}.value`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Value"
                error={!!errors.statusFields?.[index]?.value}
                helperText={errors.statusFields?.[index]?.value?.message}
                fullWidth
                size="small"
              />
            )}
          />
          <IconButton color="error" onClick={() => remove(index)}>
            <RemoveCircleOutline />
          </IconButton>
        </Stack>
      ))}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={() => append({ key: "", value: "" })}
        >
          Add Field
        </Button>
      </Box>
    </>
  );
}
