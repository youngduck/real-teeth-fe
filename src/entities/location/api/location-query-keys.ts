// Location Query Keys

export const LOCATION_QUERY_KEYS = {
  CURRENT: ["location", "current"] as const,
  COORDS_FROM_ADDRESS: (address: string) => ["location", "coords", address] as const,
  ADDRESS_SEARCH: (query: string) => ["location", "search", query] as const,
} as const;
