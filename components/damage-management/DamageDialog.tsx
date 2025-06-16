import React, { useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Box,
  CardContent,
  TextField,
} from "@mui/material";
import { DamageMap, DamageProps } from "./MainGrid";
import CategoryTree from "./CategoryTree";
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import { DamageDTO } from "@/types/entities";
import { useCreateDamage } from "hooks/damage-management/useCreateDamage";
import { useCategories } from "hooks/damage-management/useCategories";
import { useSubcategories } from "hooks/damage-management/useSubcategories";

dayjs.extend(utc);

export type DamageDialogProps = {
  damageProps: DamageProps;
  open: boolean;
  onClose: () => void;
  selectedVehicleId: number | "";
};

export default function DamageDialog({
  open,
  damageProps,
  onClose,
  selectedVehicleId
}: DamageDialogProps) {
  console.log("vehicleId Changed", selectedVehicleId)
  const { categories  } = useCategories();
  const { subcategories } = useSubcategories();
  const { mutate: createDamage, isPending, isSuccess, isError } = useCreateDamage();

  const [text, setText] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = () => {
    const selectedCategories = selectedId?.split('.');
    const now = dayjs(new Date());
    const nowDate = dayjs().utc().startOf("day");
    const newDamageDTO: DamageDTO = {
      vehicleId: Number(selectedVehicleId),
      date: nowDate.toISOString(),
      time: now.format("HH:mm:ss"),
      categoryId: Number(selectedCategories ? selectedCategories[0] : 1),
      subcategoryId: Number(selectedCategories ? selectedCategories[1] : 1),
      userId: 0,
      comment: text,
      position: damageProps.position,
      topPercentage: String(damageProps.top),
      leftPercentage: String(damageProps.left),
      repairId: null
    };

    createDamage(newDamageDTO);

    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 600, maxWidth: "90vw" },
      }}
    >
      <DialogTitle>Schadensursache</DialogTitle>
      <DialogContent>
        <CategoryTree
          fetchedCategories={categories}
          fetchedSubcategories={subcategories}
          selectedId={selectedId}
          onSelect={(id: number | null) => setSelectedId(String(id))}
        />
        <DialogTitle>Bemerkung</DialogTitle>

        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{ "& .MuiOutlinedInput-root": { height: "100%" } }}
            id="outlined-multiline-static"
            multiline
            value={text}
            rows={4}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Schaden aufnehmen
        </Button>
        <Button onClick={onClose}>Abbrechen</Button>
      </DialogActions>
    </Dialog>
  );
}

