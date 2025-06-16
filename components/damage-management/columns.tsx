import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const damageColumns: GridColDef[] = [
  {
    field: "date",
    headerName: "Erfassungsdatum",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => {
      return dayjs(params.row.date).format("DD.MM.YYYY");
    },
  },
  {
    field: "time",
    headerName: "Erfassungszeit",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => {
      return dayjs(params.row.time, "HH:mm:ss").format("HH:mm");
    },
  },
  {
    field: "category",
    headerName: "Kategorie",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => {
      const category = params.row.category;
      return category ? category.title : "-";
    },
  },
  {
    field: "subcategory",
    headerName: "Grund",
    flex: 0.5,
    minWidth: 200,
    renderCell: (params) => {
      const subcategory = params.row.subcategory;
      return subcategory ? subcategory.title : "-";
    },
  },
  {
    field: "user",
    headerName: "Fahrer",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 80,
    renderCell: (params) => {
      return params.row.user &&
        params.row.user.firstname &&
        params.row.user.lastname
        ? `${params.row.user.firstname} ${params.row.user.lastname}`
        : "Unbekannter User";
    },
  },
  {
    field: "persnumber",
    headerName: "Dienst-Nr.",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => {
      return params.row.user.worker_id
        ? params.row.user.worker_id
        : "Unbekannte Dienstnummer";
    },
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
  {
    field: "date",
    headerName: "Erfassungsdatum",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => {
      return dayjs(params.row.date).format("DD.MM.YYYY");
    },
  },
  {
    field: "time",
    headerName: "Erfassungszeit",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => {
      return dayjs(params.row.time, "HH:mm:ss").format("HH:mm");
    },
  },
  {
    field: "workshop",
    headerName: "Werkstatt",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => {
      return params.row.repair
        ? params.row.repair.workshop.name
        : "Unbekannte Werkstatt";
    },
  },
  {
    field: "category",
    headerName: "Kategorie",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => {
      const category = params.row.category;
      return category ? category.title : "-";
    },
  },
  {
    field: "subcategory",
    headerName: "Grund",
    flex: 0.5,
    minWidth: 200,
    renderCell: (params) => {
      const subcategory = params.row.subcategory;
      return subcategory ? subcategory.title : "-";
    },
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
  {
    field: "date",
    headerName: "Erfassungsdatum",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => {
      return dayjs(params.row.date).format("DD.MM.YYYY");
    },
  },
  {
    field: "time",
    headerName: "Erfassungszeit",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => {
      return dayjs(params.row.time, "HH:mm:ss").format("HH:mm");
    },
  },
  {
    field: "workshop",
    headerName: "Werkstatt",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => {
      return params.row.repair
        ? params.row.repair.workshop.name
        : "Unbekannte Werkstatt";
    },
  },
  {
    field: "category",
    headerName: "Kategorie",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => {
      const category = params.row.category;
      return category ? category.title : "-";
    },
  },
  {
    field: "subcategory",
    headerName: "Grund",
    flex: 0.5,
    minWidth: 200,
    renderCell: (params) => {
      const subcategory = params.row.subcategory;
      return subcategory ? subcategory.title : "-";
    },
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
