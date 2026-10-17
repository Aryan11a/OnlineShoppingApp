import { createContext, useContext, useMemo, useState } from "react";
import { currentSeller, initialListings, type Listing } from "@/lib/data";

type MarketplaceState = {
  listings: Listing[];
  savedIds: string[];
  toggleSaved: (id: string) => void;
  addListing: (listing: Listing) => void;
  markSold: (id: string) => void;
};

const MarketplaceContext = createContext<MarketplaceState | null>(null);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState(initialListings);
  const [savedIds, setSavedIds] = useState(["lamp"]);

  const value = useMemo(() => ({
    listings,
    savedIds,
    toggleSaved: (id: string) => setSavedIds((saved) => saved.includes(id) ? saved.filter((savedId) => savedId !== id) : [...saved, id]),
    addListing: (listing: Listing) => setListings((items) => [listing, ...items]),
    markSold: (id: string) => setListings((items) => items.map((item) => item.id === id ? { ...item, status: "sold" } : item)),
  }), [listings, savedIds]);

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error("useMarketplace must be used inside MarketplaceProvider");
  return context;
}

export { currentSeller };
