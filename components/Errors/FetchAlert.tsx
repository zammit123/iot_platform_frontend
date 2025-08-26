import { Alert, AlertTitle, Button } from "@mui/material";

interface Props {
  title: string;
  error: string;
  refetch: () => void;
}

export default function FetchAlert({ title, error, refetch }: Props) {
  return (
    <Alert
      severity="error"
      variant="outlined"
      action={
        <Button onClick={refetch} color="inherit" size="small">
          Retry
        </Button>
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {error}
    </Alert>
  );
}
