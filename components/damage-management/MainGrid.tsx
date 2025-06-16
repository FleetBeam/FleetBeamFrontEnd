import { useEffect, useState } from "react";
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
import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SvgIcon,
  SvgIconProps,
  useColorScheme,
  useTheme,
} from "@mui/material";

import { damageRows, repairedRows, plannedRepairRows } from "./rows";
import {
  damageColumns,
  repairedColumns,
  plannedRepairColumns,
} from "./columns";
import { useDamagesByVehicle } from "hooks/damage-management/useDamagesByVehicle";
import { GridColDef, GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import { SxProps, Theme } from "@mui/material";
import { useAllVehicles } from "hooks/damage-management/useAllVehicles";
import { Damage } from "@/types/entities";
import dayjs from "dayjs";

type VisualName = keyof typeof visualVectors;
export interface BusVisualProps extends SvgIconProps {
  name: VisualName;
  sx?: SxProps<Theme>;
  svgColor: string;
}

const busModel = "Bus";
const BusVisuals = ["Front", "Back", "Right", "Left", "Top"];

function BusVisual({ name, ...props }: BusVisualProps) {
  const BusVisualComponent = visualVectors[name];

  if (!BusVisualComponent) return <span>Icon not found</span>;

  return <BusVisualComponent name={""} {...props} />;
}

export type DamageProps = {
  id: number;
  date: string; // format: "DD.MM.YYYY"
  time: string; // format: "HH:mm"
  category: string | undefined;
  reason: string | undefined;
  user: string;
  persnumber: number;
  comment: string;
  position: string;
  left: number;
  top: number;
};

export type DamageMap = { [key: string]: DamageProps[] };

type TableCategory = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

type TableCategories = {
  [key: string]: TableCategory;
};

export default function MainGrid() {
  const [selectedTable, setSelectedTable] =
    useState<keyof typeof tableCategories>("Aktuelle Schäden");
  const [selectedVisual, setSelectedVisual] = useState("Front");
  const [open, setOpen] = useState(false);
  const [singleView, setSingleView] = useState(false);
  const [newDamages, setNewDamages] = useState<DamageProps[]>([]);
  const [currentDamageProps, setDamageProps] = useState<
    Partial<DamageProps | GridValidRowModel | undefined>
  >({});
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | "">("");
  const { vehicles, vehiclesLoading, vehiclesError } = useAllVehicles();
  const { damages, isLoading, error } = useDamagesByVehicle(
    selectedVehicleId || 0
  );

  const { colorScheme } = useColorScheme();

  const [tableCategories, setTableCategories] = useState<TableCategories>({
    "Aktuelle Schäden": { rows: [], columns: damageColumns },
    "Reparierte Schäden": { rows: [], columns: repairedColumns },
    Reparaturplanung: { rows: [], columns: plannedRepairColumns },
  });
  useEffect(() => {
    if (!damages) return;

    const aktuelleSchaeden = damages.filter(
      (damage: Damage) => damage.repair == null
    );
    const reparierteSchaeden = damages.filter((damage: Damage) =>
      damage.repair
        ? dayjs(
            damage?.repair.end_date.split("T")[0] +
              "T" +
              damage?.repair.end_time
          ).isBefore(dayjs())
        : false
    );
    const reparaturplanung = damages.filter((damage: Damage) =>
      damage.repair
        ? dayjs(
            damage?.repair.end_date.split("T")[0] +
              "T" +
              damage?.repair.end_time
          ).isAfter(dayjs())
        : false
    );

    setTableCategories({
      "Aktuelle Schäden": {
        rows: aktuelleSchaeden as GridRowsProp,
        columns: damageColumns,
      },
      "Reparierte Schäden": {
        rows: reparierteSchaeden,
        columns: repairedColumns,
      },
      Reparaturplanung: {
        rows: reparaturplanung,
        columns: plannedRepairColumns,
      },
    });
  }, [damages]);

  const handleClose = () => setOpen(false);

  const handleDamageClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const clickedDamageProps = [
      ...(tableCategories[selectedTable].rows as DamageProps[]),
      ...newDamages,
    ].find((entry: DamageProps) => entry.id === id);

    setSingleView(!singleView);
    setDamageProps(clickedDamageProps);
  };

  const handleVehicleChange = (event: SelectChangeEvent<number>) => {
    setSelectedVehicleId(event.target.value as number);
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
    setOpen(true);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Backdrop open={isLoading} style={{ zIndex: 1300, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Schaden verwalten
      </Typography>
      <FormControl sx={{ mb: 2, width: 300 }}>
        <InputLabel id="vehicle-select-label">Fahrzeug auswählen</InputLabel>
        {vehiclesLoading ? (
          <CircularProgress size={24} />
        ) : (
          <Select
            labelId="vehicle-select-label"
            value={selectedVehicleId}
            onChange={handleVehicleChange}
            label="Fahrzeug auswählen"
          >
            {vehicles?.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.external_id}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
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
                  sx={{ width: "100%", height: "50px"}}
                  svgColor={ (colorScheme == "dark") ? "white" : "black" }
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
              {tableCategories[selectedTable].rows.length > 0
                ? tableCategories[selectedTable].rows
                    .filter((entry) => entry.position == selectedVisual)
                    .map((entry, index) => {
                      return (
                        <IconButton
                          onClick={(e) => handleDamageClick(e, entry.id)}
                          sx={{
                            position: "absolute",
                            left: `calc(${entry.left_percentage}% - 15px)`,
                            top: `calc(${entry.top_percentage}% - 15px)`,
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
                      );
                    })
                : null}
            </>
            <BusVisual
              name={busModel + selectedVisual}
              sx={{ width: "100%", height: "100%" }}
              svgColor={ (colorScheme == "dark") ? "white" : "black" }
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
        {(
          Object.keys(tableCategories) as Array<keyof typeof tableCategories>
        ).map((name, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
            <Chip
              size="medium"
              label={`${name} ( ${
                name != "Aktuelle Schäden"
                  ? tableCategories[name].rows.length
                  : tableCategories[name].rows.length + newDamages.length
              } )`}
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
                ? currentDamageProps
                  ? [currentDamageProps as GridValidRowModel]
                  : []
                : selectedTable !== "Aktuelle Schäden"
                ? tableCategories[selectedTable].rows
                : [
                    ...tableCategories[selectedTable].rows,
                    ...(newDamages as GridValidRowModel[]),
                  ]
            }
          />
        </Grid>
      </Grid>

      <DamageDialog
        open={open}
        damageProps={currentDamageProps as DamageProps}
        onClose={handleClose}
        selectedVehicleId={selectedVehicleId}
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
