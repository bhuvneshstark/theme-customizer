export interface ThemeConfig {
  // Brand
  storeName: string;
  storeTagline: string;

  // Colors (hex values)
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardBackgroundColor: string;
  headerColor: string;
  heroGradientFrom: string;
  heroGradientTo: string;

  // Typography
  headingFont: string;
  bodyFont: string;
  baseFontSize: number;
  headingWeight: number;

  // Layout
  gridColumns: number;
  cardStyle: "flat" | "elevated" | "bordered";
  borderRadius: number;
  sectionSpacing: number;

  // Buttons
  buttonStyle: "rounded" | "squared" | "pill";
  buttonVariant: "filled" | "outlined" | "ghost";

  // Header
  headerStyle: "centered" | "split" | "minimal";
}

export interface ThemePreset {
  id?: string;
  name: string;
  config: ThemeConfig;
  createdAt?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  gradient: string;
  icon: string;
}
