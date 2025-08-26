import ConfirmationDialog from "@/components/Dialogs/ConfirmationDialog";
import { useDeleteDevice } from "@/hooks/devices";
import { DevicePartial } from "@/schemas/devices";
import { DeleteForever, Edit, MoreVert } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";

interface Props {
  devices: DevicePartial[] | undefined;
}

export default function DeviceDataGrid({ devices }: Props) {
  const { push } = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const [id, setId] = useState<string>();

  const handleOpenMenu = useCallback(
    (event: MouseEvent<HTMLElement>, rowId: string) => {
      setAnchorEl(event.currentTarget);
      setSelectedRowId(rowId);
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
    setSelectedRowId(null);
  }, []);

  const { deleteDevice, isPending } = useDeleteDevice(id);

  const onConfirm = useCallback(async () => {
    if (id) {
      try {
        await deleteDevice();
        alert("Device deleted successfully!");
      } catch (error) {
        console.error("Failed to delete device:", error);
        alert("Failed to delete device.");
      } finally {
        setId(undefined);
        handleCloseMenu();
      }
    }
  }, [id, deleteDevice, handleCloseMenu]);

  const onCancel = useCallback(() => {
    setId(undefined);
    handleCloseMenu();
  }, [handleCloseMenu]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={devices || []}
        columns={[
          { field: "id", headerName: "ID", width: 350 },
          { field: "name", headerName: "Name", width: 300 },
          { field: "location", headerName: "Location", width: 150 },
          {
            field: "actions",
            headerName: "",
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
              <Box
                alignContent="center"
                alignItems="center"
                display="flex"
                gap={1}
                sx={{ width: "100%", height: "100%", justifyContent: "center" }}
              >
                <Button
                  sx={{ display: "flex", alignItems: "center" }}
                  size="small"
                  onClick={(e) => handleOpenMenu(e, String(params.row.id))}
                >
                  <MoreVert fontSize="small" />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedRowId === params.row.id}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    sx={{ fontSize: 14 }}
                    disabled={isPending}
                    onClick={() => push(`/devices/${params.row.id}`)}
                  >
                    <Edit color="primary" sx={{ fontSize: 20, mr: 1 }} /> Edit
                    Device
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: 14 }}
                    onClick={() => setId(params.row.id)}
                    disabled={isPending}
                  >
                    <DeleteForever color="error" sx={{ fontSize: 20, mr: 1 }} />{" "}
                    Delete device
                  </MenuItem>
                </Menu>
              </Box>
            ),
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }],
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />

      <ConfirmationDialog
        open={!!id}
        onConfirm={onConfirm}
        onCancel={onCancel}
        loading={isPending}
      />
    </div>
  );
}
