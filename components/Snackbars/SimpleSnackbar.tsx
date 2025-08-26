import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

interface Props {
  color: "default" | "inherit" | "primary" | "secondary";
  open: boolean;
  message: string;
  onClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
}

export default function SimpleSnackbar({
  color,
  open,
  message,
  onClose,
}: Props) {
  return (
    <div>
      <Snackbar
        color={color}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
      />
    </div>
  );
}
