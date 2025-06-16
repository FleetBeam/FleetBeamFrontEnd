import { useState, useEffect } from "react";

export type Category = {
  id: number;
  title: string;
};

export type Subcategory = {
  id: number;
  title: string;
  parent_id: number;
};

export const categories = [
  { id: 1, title: "Getriebe / Motor" },
  { id: 2, title: "Feder / Reifen" },
  { id: 3, title: "Bremsen" },
  { id: 4, title: "Aufbau" },
  { id: 5, title: "Tacho" },
  { id: 6, title: "EFAD und Boardinformation" },
  { id: 7, title: "E-Anlage" },
  { id: 8, title: "Heizung" },
  { id: 9, title: "Türen" },
  { id: 10, title: "Wischer" },
  { id: 11, title: "Lenkung" },
];

export const subcategories = [
  { id: 1, title: "Ölkontrollwarnlampe geht an", parent_id: 1 },
  { id: 2, title: "Kühlwassertemperatur zu hoch", parent_id: 1 },
  { id: 3, title: "Motordrehzahl zu hoch", parent_id: 1 },
  { id: 4, title: "Motordrehzahl zu niedrig", parent_id: 1 },
  { id: 5, title: "Abgase im Wagen", parent_id: 1 },
  { id: 6, title: "Auspuff qualmt stark", parent_id: 1 },
  { id: 7, title: "Auspuff zu laut", parent_id: 1 },
  { id: 8, title: "Motor geht nicht aus", parent_id: 1 },
  { id: 9, title: "Harte Schaltung", parent_id: 1 },
  { id: 10, title: "Flüssigkeitsverlust unter Fahrzeug", parent_id: 1 },
  { id: 11, title: "Keine Kickdown-Funktion", parent_id: 1 },
  { id: 12, title: "Gangwahl", parent_id: 1 },
  { id: 13, title: "Gangwahl blinkt", parent_id: 1 },
  { id: 14, title: "Keine Retarder-Funktion", parent_id: 1 },
  { id: 15, title: "EMR / EDC Kontrolle leuchtet auf", parent_id: 1 },
  { id: 16, title: "Getriebetemperatur dauernd zu hoch", parent_id: 1 },

  { id: 17, title: "Wg. schlägt durch", parent_id: 2 },
  { id: 18, title: "E-Cas Warnleuchte geht an", parent_id: 2 },
  { id: 19, title: "Absenkung", parent_id: 2 },
  { id: 20, title: "Reifenschaden", parent_id: 2 },

  { id: 21, title: "Bremslicht leuchtet konstant", parent_id: 3 },
  { id: 22, title: "Bremswirkung - schlägt", parent_id: 3 },
  { id: 23, title: "Bremswirkung - einseitig", parent_id: 3 },
  { id: 24, title: "Luftverlust im Stand", parent_id: 3 },
  { id: 25, title: "Bremse blockiert", parent_id: 3 },
  { id: 26, title: "Haltestellenbremse", parent_id: 3 },
  { id: 27, title: "ABS/ASR-Kontrollleuchte geht an", parent_id: 3 },

  { id: 28, title: "Blech- / Lackschaden", parent_id: 4 },
  { id: 29, title: "Innenspiegel", parent_id: 4 },
  { id: 30, title: "Außenspiegel", parent_id: 4 },
  { id: 31, title: "Fahrersitz - quietscht", parent_id: 4 },
  { id: 32, title: "Fahrgastbestuhlung", parent_id: 4 },
  { id: 33, title: "Feuerlöscher gebraucht", parent_id: 4 },
  { id: 34, title: "Undichtigkeit (Scheibe)", parent_id: 4 },
  { id: 35, title: "Fahrerkabinentür", parent_id: 4 },
  { id: 36, title: "Taschenfach", parent_id: 4 },
  { id: 37, title: "Nothammer fehlt", parent_id: 4 },

  { id: 38, title: "Tachonadel keine Anzeige", parent_id: 5 },
  { id: 39, title: "Tachouhr defekt", parent_id: 5 },
  { id: 40, title: "Tachonadel bleibt hängen", parent_id: 5 },
  { id: 41, title: "Abweichungen", parent_id: 5 },
  { id: 42, title: "Kassenverriegelung", parent_id: 5 },
  { id: 43, title: "Zahllist lose", parent_id: 5 },
  { id: 44, title: "Uhrzeit", parent_id: 5 },
  { id: 45, title: "Datum", parent_id: 5 },

  { id: 46, title: "Funk", parent_id: 6 },
  { id: 47, title: "Haltestellenfortschaltung", parent_id: 6 },
  { id: 48, title: "Modul wird nicht angenommen", parent_id: 6 },
  { id: 49, title: "Haltestellenansage", parent_id: 6 },
  { id: 50, title: "Druckwerkstörung", parent_id: 6 },
  { id: 51, title: "Entwerteranlage", parent_id: 6 },
  { id: 52, title: "Matrixanzeige", parent_id: 6 },
  { id: 53, title: "Haltestelleninnenanzeige", parent_id: 6 },

  { id: 54, title: "Innenbeleuchtung", parent_id: 7 },
  { id: 55, title: "Außenbeleuchtung", parent_id: 7 },
  { id: 56, title: "Blinkerschalter", parent_id: 7 },
  { id: 57, title: "Stoplicht", parent_id: 7 },
  { id: 58, title: "Ladekontrolle geht nicht aus", parent_id: 7 },

  { id: 59, title: "Raumheizgerät", parent_id: 8 },
  { id: 60, title: "Fahrerheizung", parent_id: 8 },
  { id: 61, title: "Raumheizung schaltet nicht ein", parent_id: 8 },
  { id: 62, title: "Webasto (Zusatzheizung)", parent_id: 8 },

  { id: 63, title: "Fahrgasttür schließt / öffnet nicht", parent_id: 9 },
  { id: 64, title: "Druckwelle", parent_id: 9 },
  { id: 65, title: "Keine Türfreigabe / Fahrfreigabe", parent_id: 9 },
  { id: 66, title: "Lichtschranke", parent_id: 9 },
  { id: 67, title: "Trittmatenkontakt", parent_id: 9 },
  { id: 68, title: "Türdurchläufer", parent_id: 9 },
  { id: 69, title: "Teleskop-Stange Vordertrüte", parent_id: 9 },

  { id: 70, title: "Wischeranlage", parent_id: 10 },
  { id: 71, title: "Wischerintervall", parent_id: 10 },
  { id: 72, title: "Wischerblatt", parent_id: 10 },
  { id: 73, title: "Scheibenwaschanlage defekt", parent_id: 10 },
  { id: 74, title: "leer", parent_id: 10 },

  { id: 75, title: "Lenkung flattert", parent_id: 11 },
  { id: 76, title: "Lenkung schwergängig", parent_id: 11 },
  { id: 77, title: "Lenkrad", parent_id: 11 },
  { id: 78, title: "Lenkradstellung", parent_id: 11 },
];

type UseCategoriesReturn = {
  fetchedCategories: Category[];
  fetchedSubcategories: Subcategory[];
};

export function useCategories(): UseCategoriesReturn {
  const [fetchedCategories, setCategories] = useState<Category[]>([]);
  const [fetchedSubcategories, setSubcategories] = useState<Subcategory[]>([]);
  useEffect(() => {
    setCategories(categories);
    setSubcategories(subcategories);
  }, []);

  return { fetchedCategories, fetchedSubcategories };
}
