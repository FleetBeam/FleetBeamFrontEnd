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
import DamageProps from "./MainGrid";
import { useCategories, Category, Subcategory } from "./categories";
import CategoryTree from "./CategoryTree";
import dayjs from 'dayjs';

export type DamageDialogProps = {
  damageProps: DamageProps;
  open: boolean;
  setRegisteredDamages: () => void;
  setNewDamages: () => void;
  onClose: () => void;
};

export default function DamageDialog({
  open,
  damageProps,
  setRegisteredDamages,
  setNewDamages,
  onClose,
}: DamageDialogProps) {
  const { fetchedCategories, fetchedSubcategories } = useCategories();
  const [text, setText] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const counterRef = useRef(50); 

  const handleConfirm = () => {
    const categories = selectedId?.split('.');
    const now = dayjs(new Date());
    counterRef.current += 1;
    const newDamageProps: DamageProps = {
      id: counterRef.current,
      date: now.format("DD.MM.YYYY"),
      time: now.format("HH:mm"),
      category: fetchedCategories.find((category: Category) => category.id == categories[0]).title,
      reason: fetchedSubcategories.find((subcategory: Subcategory) => subcategory.id == categories[1]).title,
      user: "Destan Sokoloff",
      persnumber: 1432423,
      comment: text,
      position: damageProps.position,
      left: damageProps.left,
      top: damageProps.top,
    };

    setRegisteredDamages((prev) => ({
      ...prev,
      [damageProps.position]: [...(prev[damageProps.position] || []), newDamageProps],
    }));
    setNewDamages((prev) => [...prev, newDamageProps]);
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
          fetchedCategories={fetchedCategories}
          fetchedSubcategories={fetchedSubcategories}
          selectedId={selectedId}
          onSelect={(id: string) => setSelectedId(id)}
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
