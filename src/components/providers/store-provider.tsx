"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, products, type Product } from "@/lib/products";

export interface CartLine {
  productId: string;
  size?: string;
  quantity: number;
}

export interface AccountProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface StoreContextValue {
  hydrated: boolean;
  cart: CartLine[];
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    options?: { size?: string; quantity?: number },
  ) => boolean;
  updateQuantity: (
    productId: string,
    size: string | undefined,
    quantity: number,
  ) => void;
  removeFromCart: (productId: string, size?: string) => void;
  clearCart: () => void;
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => boolean;
  isWishlisted: (productId: string) => boolean;
  account: AccountProfile | null;
  signIn: (email: string) => void;
  signUp: (profile: { name: string; email: string }) => void;
  updateProfile: (profile: AccountProfile) => void;
  signOut: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEYS = {
  cart: "moonvibe.cart.v1",
  wishlist: "moonvibe.wishlist.v1",
  profile: "moonvibe.demo-profile.v1",
  session: "moonvibe.demo-session.v1",
} as const;

const MAX_QUANTITY = 10;

function readJson(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing. The demo still works for the session.
  }
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Partial<CartLine>;
  return (
    typeof line.productId === "string" &&
    typeof line.quantity === "number" &&
    Number.isFinite(line.quantity) &&
    line.quantity > 0 &&
    (line.size === undefined || typeof line.size === "string")
  );
}

function isAccountProfile(value: unknown): value is AccountProfile {
  if (!value || typeof value !== "object") return false;
  const profile = value as Partial<AccountProfile>;
  return (
    typeof profile.name === "string" &&
    profile.name.trim().length > 0 &&
    typeof profile.email === "string" &&
    profile.email.includes("@")
  );
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function nameFromEmail(email: string): string {
  const localPart = email.split("@")[0] ?? "Moon Vibe guest";
  return localPart
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [account, setAccount] = useState<AccountProfile | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // localStorage is only available in the browser. Loading it after mount keeps
  // the server-rendered markup deterministic and avoids hydration mismatches.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const storedCart = readJson(STORAGE_KEYS.cart);
    if (Array.isArray(storedCart)) {
      setCart(
        storedCart
          .filter(isCartLine)
          .filter((line) => Boolean(getProductById(line.productId)))
          .map((line) => ({
            ...line,
            quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.round(line.quantity))),
          })),
      );
    }

    const storedWishlist = readJson(STORAGE_KEYS.wishlist);
    if (Array.isArray(storedWishlist)) {
      setWishlist(
        storedWishlist.filter(
          (id): id is string =>
            typeof id === "string" && Boolean(getProductById(id)),
        ),
      );
    }

    const storedSession = readJson(STORAGE_KEYS.session);
    const storedProfile = readJson(STORAGE_KEYS.profile);
    if (
      typeof storedSession === "string" &&
      isAccountProfile(storedProfile) &&
      normalizeEmail(storedProfile.email) === normalizeEmail(storedSession)
    ) {
      setAccount(storedProfile);
    }

    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    writeJson(STORAGE_KEYS.cart, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeJson(STORAGE_KEYS.wishlist, wishlist);
  }, [wishlist, hydrated]);

  const addToCart = useCallback(
    (
      product: Product,
      options?: { size?: string; quantity?: number },
    ): boolean => {
      if (product.sizes?.length && !options?.size) {
        return false;
      }

      const quantity = Math.min(
        MAX_QUANTITY,
        Math.max(1, Math.round(options?.quantity ?? 1)),
      );

      setCart((current) => {
        const existing = current.find(
          (line) =>
            line.productId === product.id && line.size === options?.size,
        );

        if (existing) {
          return current.map((line) =>
            line === existing
              ? {
                  ...line,
                  quantity: Math.min(MAX_QUANTITY, line.quantity + quantity),
                }
              : line,
          );
        }

        return [
          ...current,
          { productId: product.id, size: options?.size, quantity },
        ];
      });
      setCartOpen(true);
      return true;
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, size: string | undefined, quantity: number) => {
      if (quantity <= 0) {
        setCart((current) =>
          current.filter(
            (line) => !(line.productId === productId && line.size === size),
          ),
        );
        return;
      }

      setCart((current) =>
        current.map((line) =>
          line.productId === productId && line.size === size
            ? { ...line, quantity: Math.min(MAX_QUANTITY, quantity) }
            : line,
        ),
      );
    },
    [],
  );

  const removeFromCart = useCallback(
    (productId: string, size: string | undefined) => {
      setCart((current) =>
        current.filter(
          (line) => !(line.productId === productId && line.size === size),
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string): boolean => {
    let added = false;
    setWishlist((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }
      added = true;
      return [...current, productId];
    });
    return added;
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const persistProfile = useCallback((profile: AccountProfile, session: string) => {
    writeJson(STORAGE_KEYS.profile, profile);
    writeJson(STORAGE_KEYS.session, session);
  }, []);

  const signIn = useCallback(
    (email: string) => {
      const normalized = normalizeEmail(email);
      const storedProfile = readJson(STORAGE_KEYS.profile);
      const profile =
        isAccountProfile(storedProfile) &&
        normalizeEmail(storedProfile.email) === normalized
          ? storedProfile
          : { name: nameFromEmail(normalized), email: normalized };

      setAccount(profile);
      persistProfile(profile, normalized);
    },
    [persistProfile],
  );

  const signUp = useCallback(
    (profileInput: { name: string; email: string }) => {
      const profile = {
        name: profileInput.name.trim(),
        email: normalizeEmail(profileInput.email),
      };
      setAccount(profile);
      persistProfile(profile, profile.email);
    },
    [persistProfile],
  );

  const updateProfile = useCallback(
    (profileInput: AccountProfile) => {
      const profile = {
        ...profileInput,
        name: profileInput.name.trim(),
        email: normalizeEmail(profileInput.email),
        avatarUrl: profileInput.avatarUrl?.trim() || undefined,
      };
      setAccount(profile);
      persistProfile(profile, profile.email);
    },
    [persistProfile],
  );

  const signOut = useCallback(() => {
    setAccount(null);
    try {
      window.localStorage.removeItem(STORAGE_KEYS.session);
    } catch {
      // Ignore unavailable storage; the in-memory session is still cleared.
    }
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((total, line) => total + line.quantity, 0),
    [cart],
  );

  const wishlistCount = wishlist.filter((id) =>
    products.some((product) => product.id === id),
  ).length;

  const value: StoreContextValue = {
    hydrated,
    cart,
    cartCount,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    wishlistCount,
    toggleWishlist,
    isWishlisted,
    account,
    signIn,
    signUp,
    updateProfile,
    signOut,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
