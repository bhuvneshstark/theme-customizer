"use client";

import React, { useMemo } from "react";
import {
  Star,
  ShoppingBag,
  Flower2,
  Flame,
  Watch,
  Shirt,
  Glasses,
  Sofa,
  Heart,
  Search,
  Menu,
  User,
  ChevronRight,
  Package,
  Truck,
  Shield,
  CreditCard,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useThemeStore } from "./store";
import { MOCK_PRODUCTS } from "./defaults";
import { ThemeConfig } from "./types";
import { FONT_URLS } from "./defaults";

// ─── Product Icon Map ─────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingBag,
  Flower2,
  Flame,
  Watch,
  Shirt,
  Glasses,
  Sofa,
  Scarf: Heart,
};

// ─── Star Rating ──────────────────────────────────────────────
function StarRating({
  rating,
  color,
  size = 12,
}: {
  rating: number;
  color: string;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? "fill-current"
              : "text-gray-300 dark:text-gray-600"
          }
          style={{ color: i <= Math.round(rating) ? color : undefined }}
        />
      ))}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────
function ProductCard({
  product,
  theme,
}: {
  product: (typeof MOCK_PRODUCTS)[0];
  theme: ThemeConfig;
}) {
  const Icon = ICON_MAP[product.icon] || ShoppingBag;
  const cardClasses = [
    theme.cardStyle === "elevated" && "shadow-lg",
    theme.cardStyle === "bordered" && "border-2",
    theme.cardStyle === "flat" && "shadow-none border border-gray-100",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ borderRadius: `${theme.borderRadius}px` }}
    >
      <div
        className={cardClasses}
        style={{
          backgroundColor: theme.cardBackgroundColor,
          borderRadius: `${theme.borderRadius}px`,
          overflow: "hidden",
        }}
      >
        {/* Image area */}
        <div
          className={`relative aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
          style={{ borderRadius: `${theme.borderRadius}px ${theme.borderRadius}px 0 0` }}
        >
          <Icon
            size={48}
            style={{ color: "rgba(0,0,0,0.15)" }}
            strokeWidth={1}
          />
          {/* Quick actions overlay */}
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center"
            style={{ borderRadius: `${theme.borderRadius}px ${theme.borderRadius}px 0 0` }}
          >
            <button
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 size-10 flex items-center justify-center bg-white/90 rounded-full shadow-md hover:bg-white"
              style={{ borderRadius: "50%" }}
            >
              <Heart size={16} style={{ color: theme.accentColor }} />
            </button>
          </div>
        </div>

        {/* Info area */}
        <div className="p-3 space-y-1.5">
          <p
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: theme.accentColor }}
          >
            {product.category}
          </p>
          <h3
            className="text-sm font-medium leading-tight"
            style={{ color: theme.textColor }}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} color={theme.accentColor} />
            <span className="text-[10px]" style={{ color: theme.textColor, opacity: 0.5 }}>
              ({product.reviews})
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span
              className="text-base font-bold"
              style={{ color: theme.textColor }}
            >
              ${product.price.toFixed(2)}
            </span>
            <button
              className="px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor:
                  theme.buttonVariant === "filled"
                    ? theme.primaryColor
                    : theme.buttonVariant === "outlined"
                      ? "transparent"
                      : `${theme.primaryColor}15`,
                color:
                  theme.buttonVariant === "filled"
                    ? "#ffffff"
                    : theme.buttonVariant === "outlined"
                      ? theme.primaryColor
                      : theme.primaryColor,
                border:
                  theme.buttonVariant === "outlined"
                    ? `1.5px solid ${theme.primaryColor}`
                    : "1.5px solid transparent",
                borderRadius:
                  theme.buttonStyle === "pill"
                    ? "9999px"
                    : theme.buttonStyle === "squared"
                      ? "0px"
                      : `${Math.max(theme.borderRadius - 2, 0)}px`,
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Storefront Preview ──────────────────────────────────
export function StorefrontPreview() {
  const { theme } = useThemeStore();

  // Compute CSS custom properties from theme
  const customStyle = useMemo(
    () =>
      ({
        "--store-primary": theme.primaryColor,
        "--store-secondary": theme.secondaryColor,
        "--store-accent": theme.accentColor,
        "--store-bg": theme.backgroundColor,
        "--store-text": theme.textColor,
        "--store-card-bg": theme.cardBackgroundColor,
        "--store-radius": `${theme.borderRadius}px`,
        "--store-heading-font": theme.headingFont,
        "--store-body-font": theme.bodyFont,
        "--store-font-size": `${theme.baseFontSize}px`,
        "--store-heading-weight": theme.headingWeight,
        "--store-spacing": `${theme.sectionSpacing}px`,
        "--store-grid-cols": theme.gridColumns,
        fontSize: `${theme.baseFontSize}px`,
        fontFamily: theme.bodyFont,
      }) as React.CSSProperties,
    [theme]
  );

  // Dynamic grid template
  const gridStyle = {
    gridTemplateColumns: `repeat(${theme.gridColumns}, minmax(0, 1fr))`,
  };

  // Navbar layout class
  const isCentered = theme.headerStyle === "centered";
  const isMinimal = theme.headerStyle === "minimal";

  return (
    <div
      className="w-full h-full overflow-auto"
      style={{ backgroundColor: theme.backgroundColor, ...customStyle }}
    >
      {/* Global transition for live theme changes */}
      <style>{`
        .store-transition * { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease !important; }
        .store-transition img, .store-transition svg { transition: none !important; }
      `}</style>
      {/* ── Font Loader (inject Google Fonts) ── */}
      <FontLoader fonts={[theme.headingFont, theme.bodyFont]} />

      <div
        className="max-w-5xl mx-auto store-transition"
        style={{ fontFamily: theme.bodyFont }}
      >
        {/* ── NAVBAR ── */}
        <nav
          className="sticky top-0 z-10 backdrop-blur-md"
          style={{
            backgroundColor:
              isMinimal
                ? theme.backgroundColor
                : `${theme.headerColor}ee`,
            borderBottom: isMinimal
              ? `1px solid ${theme.textColor}15`
              : "none",
          }}
        >
          <div className="px-6 py-4">
            {isCentered ? (
              /* Centered nav */
              <div className="flex flex-col items-center gap-2">
                <h1
                  className="text-xl font-bold tracking-[0.2em]"
                  style={{
                    fontFamily: theme.headingFont,
                    fontWeight: theme.headingWeight,
                    color: isMinimal ? theme.textColor : "#ffffff",
                  }}
                >
                  {theme.storeName}
                </h1>
                <div className="flex items-center gap-6">
                  {["Shop", "Collections", "About", "Contact"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-sm transition-colors hover:opacity-70"
                      style={{
                        color: isMinimal ? theme.textColor : "#ffffffcc",
                        fontFamily: theme.bodyFont,
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ) : isMinimal ? (
              /* Minimal nav */
              <div className="flex items-center justify-between">
                <h1
                  className="text-lg font-bold tracking-[0.15em]"
                  style={{
                    fontFamily: theme.headingFont,
                    fontWeight: theme.headingWeight,
                    color: theme.textColor,
                  }}
                >
                  {theme.storeName}
                </h1>
                <div className="flex items-center gap-4">
                  <Search size={16} style={{ color: theme.textColor }} />
                  <User size={16} style={{ color: theme.textColor }} />
                  <div className="relative">
                    <ShoppingBag
                      size={16}
                      style={{ color: theme.textColor }}
                    />
                    <span
                      className="absolute -top-1.5 -right-1.5 size-3.5 rounded-full text-[8px] font-bold flex items-center justify-center"
                      style={{
                        backgroundColor: theme.accentColor,
                        color: "#ffffff",
                      }}
                    >
                      2
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Split nav */
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <h1
                    className="text-lg font-bold tracking-[0.15em]"
                    style={{
                      fontFamily: theme.headingFont,
                      fontWeight: theme.headingWeight,
                      color: "#ffffff",
                    }}
                  >
                    {theme.storeName}
                  </h1>
                  <div className="hidden md:flex items-center gap-6">
                    {["New Arrivals", "Best Sellers", "Sale"].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-sm text-white/70 transition-colors hover:text-white"
                        style={{ fontFamily: theme.bodyFont }}
                        onClick={(e) => e.preventDefault()}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <Search size={16} />
                  <User size={16} />
                  <div className="relative">
                    <ShoppingBag size={16} />
                    <span
                      className="absolute -top-1.5 -right-1.5 size-3.5 rounded-full text-[8px] font-bold flex items-center justify-center"
                      style={{
                        backgroundColor: theme.accentColor,
                        color: "#ffffff",
                      }}
                    >
                      2
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden text-white"
          style={{
            background: `linear-gradient(135deg, ${theme.heroGradientFrom}, ${theme.heroGradientTo})`,
            borderRadius: 0,
            padding: `${theme.sectionSpacing}px 24px`,
          }}
        >
          <div className="relative z-10 max-w-lg space-y-4">
            <p
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: `${theme.accentColor}` }}
            >
              New Collection 2025
            </p>
            <h2
              className="text-3xl md:text-4xl leading-tight"
              style={{
                fontFamily: theme.headingFont,
                fontWeight: theme.headingWeight,
              }}
            >
              {theme.storeTagline}
            </h2>
            <p className="text-sm text-white/70" style={{ fontFamily: theme.bodyFont }}>
              Discover handcrafted pieces designed for the modern lifestyle.
              Quality materials, timeless design.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                className="px-6 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: theme.accentColor,
                  color: "#ffffff",
                  borderRadius:
                    theme.buttonStyle === "pill"
                      ? "9999px"
                      : theme.buttonStyle === "squared"
                        ? "0px"
                        : `${theme.borderRadius}px`,
                }}
              >
                Shop Now
              </button>
              <button
                className="px-6 py-2.5 text-sm font-semibold transition-all hover:opacity-80"
                style={{
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  borderRadius:
                    theme.buttonStyle === "pill"
                      ? "9999px"
                      : theme.buttonStyle === "squared"
                        ? "0px"
                        : `${theme.borderRadius}px`,
                }}
              >
                Explore
              </button>
            </div>
          </div>
          {/* Decorative circles */}
          <div
            className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 rounded-full opacity-10"
            style={{ backgroundColor: theme.accentColor }}
          />
          <div
            className="absolute top-10 right-32 w-24 h-24 rounded-full opacity-10"
            style={{ backgroundColor: "#ffffff" }}
          />
        </section>

        {/* ── FEATURED PRODUCTS ── */}
        <section
          style={{ padding: `${theme.sectionSpacing}px 24px` }}
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2
                className="text-2xl"
                style={{
                  fontFamily: theme.headingFont,
                  fontWeight: theme.headingWeight,
                  color: theme.textColor,
                }}
              >
                Featured Products
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: `${theme.textColor}88` }}
              >
                Our most loved pieces, curated for you
              </p>
            </div>
            <button
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: theme.accentColor }}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid gap-5" style={gridStyle}>
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                theme={theme}
              />
            ))}
          </div>
        </section>

        {/* ── PROMO BANNER ── */}
        <section style={{ padding: `0 24px ${theme.sectionSpacing}px` }}>
          <div
            className="relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.secondaryColor}, ${theme.primaryColor}20)`,
              borderRadius: `${theme.borderRadius * 2}px`,
              padding: "32px 40px",
            }}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="max-w-sm space-y-2">
                <h3
                  className="text-xl"
                  style={{
                    fontFamily: theme.headingFont,
                    fontWeight: theme.headingWeight,
                    color: theme.textColor,
                  }}
                >
                  Summer Sale — Up to 40% Off
                </h3>
                <p
                  className="text-sm"
                  style={{ color: `${theme.textColor}88` }}
                >
                  Limited time offer on selected items. Don&apos;t miss out!
                </p>
              </div>
              <button
                className="px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
                style={{
                  backgroundColor: theme.accentColor,
                  borderRadius:
                    theme.buttonStyle === "pill"
                      ? "9999px"
                      : theme.buttonStyle === "squared"
                        ? "0px"
                        : `${theme.borderRadius}px`,
                }}
              >
                Shop Sale
              </button>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ── */}
        <section style={{ padding: `0 24px ${theme.sectionSpacing}px` }}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
              { icon: Shield, label: "Secure Payment", desc: "256-bit encryption" },
              { icon: Package, label: "Easy Returns", desc: "30-day return policy" },
              { icon: CreditCard, label: "Flexible Pay", desc: "Buy now, pay later" },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2 p-4"
                style={{ color: theme.textColor }}
              >
                <div
                  className="size-10 rounded-full flex items-center justify-center mb-1"
                  style={{ backgroundColor: `${theme.primaryColor}10` }}
                >
                  <Icon size={18} style={{ color: theme.primaryColor }} />
                </div>
                <p className="text-xs font-semibold">{label}</p>
                <p className="text-[10px]" style={{ color: `${theme.textColor}66` }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section style={{ padding: `0 24px ${theme.sectionSpacing}px` }}>
          <div
            className="text-center space-y-3 p-8"
            style={{
              backgroundColor: `${theme.primaryColor}08`,
              borderRadius: `${theme.borderRadius * 2}px`,
            }}
          >
            <Mail size={24} style={{ color: theme.accentColor }} className="mx-auto" />
            <h3
              className="text-lg"
              style={{
                fontFamily: theme.headingFont,
                fontWeight: theme.headingWeight,
                color: theme.textColor,
              }}
            >
              Stay in the Loop
            </h3>
            <p className="text-sm" style={{ color: `${theme.textColor}77` }}>
              Subscribe for exclusive offers and new arrivals
            </p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 py-2 text-sm outline-none transition-all"
                style={{
                  backgroundColor: theme.cardBackgroundColor,
                  border: `1.5px solid ${theme.textColor}20`,
                  borderRadius:
                    theme.buttonStyle === "pill"
                      ? "9999px"
                      : theme.buttonStyle === "squared"
                        ? "0px"
                        : `${theme.borderRadius}px`,
                  color: theme.textColor,
                  fontFamily: theme.bodyFont,
                }}
              />
              <button
                className="px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: theme.primaryColor,
                  borderRadius:
                    theme.buttonStyle === "pill"
                      ? "9999px"
                      : theme.buttonStyle === "squared"
                        ? "0px"
                        : `${theme.borderRadius}px`,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            backgroundColor: theme.primaryColor,
            color: "#ffffffcc",
            fontFamily: theme.bodyFont,
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            style={{ padding: `${theme.sectionSpacing}px 24px` }}
          >
            <div className="md:col-span-1 space-y-3">
              <h4
                className="text-base font-bold text-white tracking-[0.15em]"
                style={{
                  fontFamily: theme.headingFont,
                  fontWeight: theme.headingWeight,
                }}
              >
                {theme.storeName}
              </h4>
              <p className="text-xs leading-relaxed">
                {theme.storeTagline}. Quality craftsmanship meets contemporary design.
              </p>
              <div className="flex gap-3 pt-1">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="size-8 rounded-full flex items-center justify-center bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">
                Shop
              </h5>
              {["New Arrivals", "Best Sellers", "Sale", "Gift Cards"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-xs text-white/50 hover:text-white transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">
                Company
              </h5>
              {["About Us", "Sustainability", "Careers", "Press"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-xs text-white/50 hover:text-white transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">
                Contact
              </h5>
              <div className="space-y-1.5">
                <p className="flex items-center gap-2 text-xs text-white/50">
                  <MapPin size={12} /> 123 Design Street, NYC
                </p>
                <p className="flex items-center gap-2 text-xs text-white/50">
                  <Phone size={12} /> +1 (555) 123-4567
                </p>
                <p className="flex items-center gap-2 text-xs text-white/50">
                  <Mail size={12} /> hello@maison.com
                </p>
              </div>
            </div>
          </div>
          <div
            className="border-t border-white/10 text-center text-[10px] text-white/40 py-4"
            style={{ fontFamily: theme.bodyFont }}
          >
            &copy; 2025 {theme.storeName}. All rights reserved. Theme Customizer Preview.
          </div>
        </footer>
      </div>
    </div>
  );
}

// ─── Dynamic Font Loader ──────────────────────────────────────
function FontLoader({ fonts }: { fonts: string[] }) {
  const loadedRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    fonts.forEach((font) => {
      if (loadedRef.current.has(font)) return;
      const url = FONT_URLS[font];
      if (!url) return;

      // Check if already loaded in the document
      const existing = document.querySelector(
        `link[href="${url}"]`
      ) as HTMLLinkElement | null;
      if (existing) {
        loadedRef.current.add(font);
        return;
      }

      const link = document.createElement("link");
      link.href = url;
      link.rel = "stylesheet";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      loadedRef.current.add(font);
    });
  }, [fonts]);

  return null;
}
