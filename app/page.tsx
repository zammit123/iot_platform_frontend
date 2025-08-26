import { Box, Card, CardContent, Typography, Chip, Grid } from "@mui/material";
import {
  DeviceHub,
  TrendingUp,
  Security,
  CloudQueue,
  Https,
} from "@mui/icons-material";
import SensorReadings from "@/components/Charts/SensorReadings";

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Welcome to The Control Hub
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              bgcolor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              height: "100%",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <DeviceHub sx={{ color: "hsl(var(--primary))", mr: 1 }} />
                <Typography variant="h6">Connected Devices</Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "hsl(var(--primary))" }}
              >
                247
              </Typography>
              <Chip
                label="+12 today"
                size="small"
                color="primary"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              bgcolor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              height: "100%",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp sx={{ color: "hsl(var(--secondary))", mr: 1 }} />
                <Typography variant="h6">Data Points</Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "hsl(var(--secondary))" }}
              >
                1.2M
              </Typography>
              <Chip
                label="Real-time"
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: "hsl(var(--secondary))",
                  color: "white",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              bgcolor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              height: "100%",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Security sx={{ color: "hsl(var(--accent))", mr: 1 }} />
                <Typography variant="h6">Security Status</Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "hsl(var(--accent))",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Https
                    sx={{ fontSize: 26, verticalAlign: "middle", mr: 1 }}
                  />{" "}
                  Secure
                </Typography>
              </Box>
              <Typography color="secondary" variant="body2">
                No security alerts
              </Typography>
              <Chip
                label="All systems protected"
                size="small"
                sx={{ mt: 1, bgcolor: "hsl(var(--accent))", color: "white" }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              bgcolor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              height: "100%",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CloudQueue
                  sx={{ color: "hsl(var(--muted-foreground))", mr: 1 }}
                />
                <Typography variant="h6">Cloud Storage</Typography>
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                78%
              </Typography>
              <Chip
                label="2.1TB used"
                size="small"
                variant="outlined"
                sx={{ mt: 1 }}
                color="warning"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <SensorReadings />
        </Grid>
      </Grid>
    </Box>
  );
}
