export const waveColors = {
  ink: "#000000",
  paper: "#f4f1e8",
  blue: {
    deep: "#07111f",
    base: "#126aa0",
    vivid: "#2090c8",
    light: "#7dd3fc",
  },
  red: {
    deep: "#5a1010",
    base: "#b91c1c",
    vivid: "#dc2626",
    hot: "#ff3b30",
  },
  yellow: {
    orange: "#f97316",
    amber: "#fbbf24",
    base: "#fde68a",
    pale: "#fef3c7",
  },
} as const;

export const waveRadii = {
  control: "3px",
  panel: "6px",
  image: "4px",
} as const;

export const waveColorFamilies = [
  {
    name: "Signal blue",
    anchor: "#2090c8",
    role: "Depth, navigation, and cool wave polarity.",
    shades: ["#2a3550", "#34507a", "#1e6aa0", "#2090c8", "#4dabd9", "#7dd3fc"],
  },
  {
    name: "Heat red",
    anchor: "#dc2626",
    role: "Heat, urgency, and warm wave polarity.",
    shades: ["#b91c1c", "#dc2626"],
  },
  {
    name: "Energy orange",
    anchor: "#f97316",
    role: "The transition from heat into light.",
    shades: ["#ea580c", "#f97316", "#fb923c"],
  },
  {
    name: "Light yellow",
    anchor: "#fbbf24",
    role: "Peaks, highlights, and maximum energy.",
    shades: ["#fbbf24", "#fde68a", "#fef3c7"],
  },
] as const;

export const wavePalette = waveColorFamilies.flatMap((family) => family.shades);
