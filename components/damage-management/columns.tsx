import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";

export const damageColumns: GridColDef[] = [
  { field: "date", headerName: "Erfassungsdatum", flex: 1.5, minWidth: 100 },
  { field: "time", headerName: "Erfassungszeit", flex: 1.5, minWidth: 100 },
  { field: "category", headerName: "Kategorie", flex: 1.5, minWidth: 200 },
  {
    field: "reason",
    headerName: "Grund",
    flex: 0.5,
    minWidth: 200,
    //renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "user",
    headerName: "Fahrer",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "persnumber",
    headerName: "Dienst-Nr.",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "comment",
    headerName: "Bemerkung",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 300,
  },
];

export const repairedColumns: GridColDef[] = [
  { field: "date", headerName: "Reparaturdatum", flex: 1.5, minWidth: 100 },
  { field: "time", headerName: "Reparaturuhrzeit", flex: 1.5, minWidth: 100 },
  { field: "workshop", headerName: "Werkstatt", flex: 1.5, minWidth: 100 },
  { field: "category", headerName: "Kategorie", flex: 1.5, minWidth: 200 },
  {
    field: "reason",
    headerName: "Grund",
    flex: 0.5,
    minWidth: 200,
    //renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "comment",
    headerName: "Bemerkung",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 300,
  },
];


export const plannedRepairColumns: GridColDef[] = [
  { field: "date", headerName: "Reparaturdatum", flex: 1.5, minWidth: 100 },
  { field: "time", headerName: "Reparaturuhrzeit", flex: 1.5, minWidth: 100 },
  { field: "workshop", headerName: "Werkstatt", flex: 1.5, minWidth: 100 },
  { field: "category", headerName: "Kategorie", flex: 1.5, minWidth: 200 },
  {
    field: "reason",
    headerName: "Grund",
    flex: 0.5,
    minWidth: 200,
    //renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "comment",
    headerName: "Bemerkung",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 300,
  },
];