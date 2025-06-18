import { create } from "zustand";
import type { IGetLocationsIndexResponse } from "../domain";
import { initialLocationStoreValues } from "./initialStoreValues";

type LocationStore = {
  location: IGetLocationsIndexResponse | null;
  setLocation: (location: IGetLocationsIndexResponse) => void;
  resetLocation: () => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: initialLocationStoreValues.location,

  setLocation: (location) => set({ location }),

  resetLocation: () => set({ location: initialLocationStoreValues.location }),
}));
