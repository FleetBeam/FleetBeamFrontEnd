import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import visualVectors from "./AllBusVisuals";
import Chip from "@mui/material/Chip";
import CustomDataGrid from "./CustomDataGrid";
import CloseIcon from "@mui/icons-material/Close";
import DamageDialog from "./DamageDialog";
import { damageRows, repairedRows, plannedRepairRows } from "./rows";
import {
  damageColumns,
  repairedColumns,
  plannedRepairColumns,
} from "./columns";
import { useDamagesByVehicle } from "hooks/damage-management/useDamagesByVehicle";

type VisualName = keyof typeof visualVectors;
interface BusVisualProps extends SvgProps {
  name: VisualName;
}

const busModel = "Bus";
const BusVisuals = ["Front", "Back", "Right", "Left", "Top"];
const tableCategories = {
  "Aktuelle Schäden": { rows: damageRows, columns: damageColumns },
  "Reparierte Schäden": { rows: repairedRows, columns: repairedColumns },
  Reparaturplanung: { rows: plannedRepairRows, columns: plannedRepairColumns },
};

function BusVisual({ name, ...props }: BusVisualProps) {
  const BusVisualComponent = visualVectors[name];

  if (!BusVisualComponent) return <span>Icon not found</span>;

  return <BusVisualComponent {...props} />;
}

export type DamageProps = {
  id: number;
  date: string; // format: "DD.MM.YYYY"
  time: string; // format: "HH:mm"
  category: string;
  reason: string;
  user: string;
  persnumber: number;
  comment: string;
  position: string;
  left: number;
  top: number;
};

type DamageMap = { [key: string]: DamageProps[] };

export default function MainGrid() {
  const [selectedTable, setSelectedTable] = useState("Aktuelle Schäden");
  const [selectedVisual, setSelectedVisual] = useState("Front");
  const [registeredDamages, setRegisteredDamages] = useState<DamageMap>({});
  const [open, setOpen] = useState(false);
  const [singleView, setSingleView] = useState(false);
  const [newDamages, setNewDamages] = useState<DamageProps[]>([]);
  const [currentDamageProps, setDamageProps] = useState<DamageProps>({});
  const { damages, loading, error } = useDamagesByVehicle(1);
  console.log(damages)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDamageClick = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    e.preventDefault(); // Stops default browser behavior
    e.stopPropagation();
    const clickedDamageProps = [
      ...tableCategories[selectedTable].rows,
      ...newDamages,
    ].find((entry: DamageProps) => entry.id === id);

    setSingleView(!singleView);
    setDamageProps(clickedDamageProps);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const leftPercent = (x / rect.width) * 100;
    const topPercent = (y / rect.height) * 100;

    const newDamageProps = {
      category: "",
      reason: "",
      date: "",
      time: "",
      user: "",
      persnumber: 0,
      comment: "",
      position: selectedVisual,
      left: leftPercent,
      top: topPercent,
    };

    setDamageProps(newDamageProps);

    /*setRegisteredDamages((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newPoint],
    }));*/

    setOpen(true);

    console.log(registeredDamages);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Schaden verwalten
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ width: "80%", mb: (theme) => theme.spacing(2) }}
      >
        {BusVisuals.map((name, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 2 }}>
            <Card
              onClick={() => setSelectedVisual(name)}
              variant="outlined"
              sx={{
                height: "100%",
                flexGrow: 1,
                cursor: "pointer",
                background:
                  name == selectedVisual
                    ? "var(--template-palette-background-paper)"
                    : "rgba(var(--template-palette-background-defaultChannel) / 1)",
              }}
            >
              <CardContent>
                <BusVisual
                  name={busModel + name}
                  sx={{ width: "100%", height: "50px" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6, lg: 2 }}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Card
          onClick={(e) => handleClick(e, selectedVisual)}
          variant="outlined"
          sx={{
            height: "100%",
            flexGrow: 1,
            cursor: "pointer",
            position: "relative",
          }}
        >
          <CardContent>
            <>
              {registeredDamages.hasOwnProperty(selectedVisual)
                ? registeredDamages[selectedVisual].map((entry, index) => (
                    <IconButton
                      onClick={(e) => handleDamageClick(e, entry.id)}
                      sx={{
                        position: "absolute",
                        left: `calc(${entry.left}% - 15px)`,
                        top: `calc(${entry.top}% - 15px)`,
                        borderRadius: "100%",
                        border: "0px",
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: "var(--IconButton-hoverBg)",
                        },
                      }}
                    >
                      <CloseIcon
                        key={index}
                        fontSize="large"
                        style={{ fill: "red" }}
                      />
                    </IconButton>
                  ))
                : null}
            </>
            <BusVisual
              name={busModel + selectedVisual}
              sx={{ width: "100%", height: "100%" }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid
        container
        spacing={2}
        columns={3}
        sx={{ width: "max-content", mb: (theme) => theme.spacing(2), gap: 2 }}
      >
        {Object.keys(tableCategories).map((name, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
            <Chip
              size="large"
              label={`${name} ( ${
                name != "Aktuelle Schäden"
                  ? tableCategories[name].rows.length
                  : tableCategories[name].rows.length + newDamages.length
              } )`}
              color=""
              onClick={() => setSelectedTable(name)}
              sx={{
                width: "250px",
                border: "1px solid var(--template-palette-divider)",
                background:
                  name == selectedTable
                    ? "var(--template-palette-background-paper)"
                    : "rgba(var(--template-palette-background-defaultChannel) / 1)",
                cursor: "pointer",
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomDataGrid
            columns={tableCategories[selectedTable].columns}
            rows={
              singleView
                ? [currentDamageProps]
                : selectedTable != "Aktuelle Schäden"
                ? tableCategories[selectedTable].rows
                : [...tableCategories[selectedTable].rows, ...newDamages]
            }
          />
        </Grid>
      </Grid>

      <DamageDialog
        open={open}
        setRegisteredDamages={setRegisteredDamages}
        damageProps={currentDamageProps}
        onClose={handleClose}
        setNewDamages={setNewDamages}
      />

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}></Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack
            gap={2}
            direction={{ xs: "column", sm: "row", lg: "column" }}
          ></Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
