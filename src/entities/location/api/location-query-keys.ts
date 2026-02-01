// Location Query Keys

export const LOCATION_QUERY_KEYS = {
  COORDS_FROM_ADDRESS: (address: string) => ["location", "coords", address] as const,
  ADDRESS_SEARCH: (query: string) => ["location", "search", query] as const,
} as const;
