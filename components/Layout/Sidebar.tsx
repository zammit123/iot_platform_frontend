import {
  Analytics,
  CloudQueue,
  Dashboard,
  DeviceHub,
  Memory,
  NetworkCheck,
  Security,
  Settings,
  Storage,
  Timeline,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

// Move to a routes file with permissions in the future
const sidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Devices", icon: <DeviceHub />, path: "/devices" },
  { text: "Analytics", icon: <Analytics />, path: "#" },
  { text: "Network Status", icon: <NetworkCheck />, path: "#" },
  { text: "Data Storage", icon: <Storage />, path: "#" },
  { text: "Performance", icon: <Timeline />, path: "#" },
  { text: "Memory Usage", icon: <Memory />, path: "#" },
  { text: "Cloud Services", icon: <CloudQueue />, path: "#" },
  { text: "Security", icon: <Security />, path: "#" },
  { text: "Settings", icon: <Settings />, path: "#" },
];

export const drawerWidth = 280;

export default function Sidebar() {
  const { push } = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      push(sidebarItems[index].path);
    },
    [push]
  );

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ px: 3, py: 0.7, borderBottom: "1px solid #e2e8f0" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
          Control Hub
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mt: 0 }}>
          Device Management System
        </Typography>
      </Box>

      <List sx={{ pt: 2 }}>
        {sidebarItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 0.5 }}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                slotProps={{
                  primary: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
