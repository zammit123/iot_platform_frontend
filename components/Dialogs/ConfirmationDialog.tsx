import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  open,
  loading,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={onCancel}
          color="secondary"
          variant="outlined"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          size="small"
          onClick={onConfirm}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
