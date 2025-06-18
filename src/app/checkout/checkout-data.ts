export const COUNTRY_OPTIONS = [
  { label: "Malta", value: "MT" },
  { label: "Italy", value: "IT" },
  { label: "Greece", value: "GR" },
  { label: "Tunisia", value: "TN" },
  { label: "Libya", value: "LY" },
  { label: "Albania", value: "AL" },
];

export const STATE_OPTIONS: Record<string, { label: string; value: string }[]> =
  {
    MT: [
      { label: "Gozo", value: "GZ" },
      { label: "Valletta", value: "VA" },
    ],
    IT: [
      { label: "Lazio", value: "LA" },
      { label: "Sicily", value: "SI" },
    ],
    GR: [
      { label: "Attica", value: "AT" },
      { label: "Central Macedonia", value: "CM" },
    ],
    TN: [
      { label: "Tunis", value: "TU" },
      { label: "Sfax", value: "SF" },
    ],
    LY: [
      { label: "Tripoli", value: "TR" },
      { label: "Benghazi", value: "BE" },
    ],
    AL: [
      { label: "Tirana", value: "TI" },
      { label: "Durres", value: "DU" },
    ],
  };
