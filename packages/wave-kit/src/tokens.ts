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

export const waveTailwindColors = {
  ink: "wave-ink",
  paper: "wave-paper",
  blue: {
    deep: "wave-blue-deep",
    base: "wave-blue",
    vivid: "wave-blue-vivid",
    light: "wave-blue-light",
  },
  red: {
    deep: "wave-red-deep",
    base: "wave-red",
    vivid: "wave-red-vivid",
    hot: "wave-red-hot",
  },
  yellow: {
    orange: "wave-orange",
    amber: "wave-amber",
    base: "wave-yellow",
    pale: "wave-yellow-pale",
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
    token: "wave-blue-vivid",
    role: "Depth, navigation, and cool wave polarity.",
    shades: ["#2a3550", "#34507a", "#1e6aa0", "#2090c8", "#4dabd9", "#7dd3fc"],
    shadeTokens: [
      "wave-blue-950",
      "wave-blue-800",
      "wave-blue",
      "wave-blue-vivid",
      "wave-blue-300",
      "wave-blue-light",
    ],
  },
  {
    name: "Heat red",
    anchor: "#dc2626",
    token: "wave-red-vivid",
    role: "Heat, urgency, and warm wave polarity.",
    shades: ["#b91c1c", "#dc2626"],
    shadeTokens: ["wave-red", "wave-red-vivid"],
  },
  {
    name: "Energy orange",
    anchor: "#f97316",
    token: "wave-orange",
    role: "The transition from heat into light.",
    shades: ["#ea580c", "#f97316", "#fb923c"],
    shadeTokens: ["wave-orange-deep", "wave-orange", "wave-orange-light"],
  },
  {
    name: "Light yellow",
    anchor: "#fbbf24",
    token: "wave-amber",
    role: "Peaks, highlights, and maximum energy.",
    shades: ["#fbbf24", "#fde68a", "#fef3c7"],
    shadeTokens: ["wave-amber", "wave-yellow", "wave-yellow-pale"],
  },
] as const;

export const wavePalette = waveColorFamilies.flatMap((family) => family.shades);
