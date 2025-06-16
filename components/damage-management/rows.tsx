import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";

export const damageRows: GridRowsProp = [
  {
    id: 1,
    date: "12.03.2022",
    time: "08:01",
    category: "Getriebe/Motor",
    reason: "Auspuff zu laut",
    user: "Karsten Meyer",
    persnumber: 1453456,
    comment: "130 Dezibel gemessen",
    position: "",
    left: 0,
    top: 0,
  },
  {
    id: 2,
    date: "23.12.2024",
    time: "12:46",
    category: "Bremsen",
    reason: "Bremse blockiert",
    user: "Markus Müller",
    persnumber: 1454535,
    comment: "Bremse vorne rechts sieht ziemlich abgenutzt aus.",
    position: "",
    left: 0,
    top: 0,
  },
  {
    id: 3,
    date: "22.01.2025",
    time: "03:55",
    category: "EFAD und Boardinformation",
    reason: "Druckwerkstörung",
    user: "Destan Sokoloff",
    persnumber: 1432423,
    comment: "Störungsmeldung ploppt auf",
    position: "",
    left: 0,
    top: 0,
  },
  {
    id: 4,
    date: "10.05.2025",
    time: "20:13",
    category: "Tacho",
    reason: "Tachouhr defekt",
    user: "Karsten Meyer",
    persnumber: 1453456,
    comment: "Die Nadel liegt unter dem Nullpunkt und bewegt sich nicht"
  },
];

export const repairedRows: GridRowsProp = [
  {
    id: 7,
    date: "12.11.2019",
    time: "15:00",
    workshop: "Fachwerk Solingen",
    category: "Heizung",
    reason: "Fahrerheizung",
    comment: "",

  },
];




export const plannedRepairRows: GridRowsProp = [
  {
    id: 3,
    date: "10.08.2025",
    time: "15:00",
    workshop: "Fachwerk Solingen",
    category: "EFAD und Boardinformation",
    reason: "Druckwerkstörung",
    comment: "Störungsmeldung ploppt auf",

  },
  {
    id: 4,
    date: "10.08.2025",
    time: "15:00",
    workshop: "Fachwerk Solingen",
    category: "Tacho",
    reason: "Tachouhr defekt",
    comment: "Die Nadel liegt unter dem Nullpunkt und bewegt sich nicht"
  },
];

