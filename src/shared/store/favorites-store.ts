import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IFavoriteLocation } from "@shared/types/favorites";

interface IFavoritesStore {
  favorites: IFavoriteLocation[];
  addFavorite: (address: string, alias?: string) => void;
  removeFavorite: (id: string) => void;
  updateFavoriteAlias: (id: string, alias: string) => void;
  isFavorite: (address: string) => boolean;
  getFavoriteByAddress: (address: string) => IFavoriteLocation | undefined;
  canAddMore: () => boolean;
}

const MAX_FAVORITES = 6;

export const useFavoritesStore = create<IFavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (address: string, alias?: string) => {
        const { favorites } = get();
        
        // 최대 개수 체크
        if (favorites.length >= MAX_FAVORITES) {
          return;
        }

        // 이미 추가된 주소인지 체크
        if (get().isFavorite(address)) {
          return;
        }

        const newFavorite: IFavoriteLocation = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          address,
          alias: alias || address,
          createdAt: Date.now(),
        };

        set({ favorites: [...favorites, newFavorite] });
      },

      removeFavorite: (id: string) => {
        set({ favorites: get().favorites.filter((fav) => fav.id !== id) });
      },

      updateFavoriteAlias: (id: string, alias: string) => {
        set({
          favorites: get().favorites.map((fav) =>
            fav.id === id ? { ...fav, alias } : fav
          ),
        });
      },

      isFavorite: (address: string) => {
        return get().favorites.some((fav) => fav.address === address);
      },

      getFavoriteByAddress: (address: string) => {
        return get().favorites.find((fav) => fav.address === address);
      },

      canAddMore: () => {
        return get().favorites.length < MAX_FAVORITES;
      },
    }),
    {
      name: "favorites-storage", // localStorage key
    }
  )
);
