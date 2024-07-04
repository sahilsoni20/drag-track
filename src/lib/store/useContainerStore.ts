import { DNDType } from "../types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ContainerStoreProps = {
  containers: DNDType[];
  setContainers: (containers: DNDType[]) => void;
  addContainer: (title: string) => void;
};

export const useContainerStore = create<ContainerStoreProps>()(
  persist(
    (set) => ({
      containers: [],
      setContainers: (containers) => set({ containers }),
      addContainer: (title: string) =>
        set((state) => ({
          containers: [
            ...state.containers,
            {
              id: `container-${Math.random() * 1000}`,
              title,
              items: [],
            },
          ],
        })),
    }),
    {
      name: "contaienr-storage",
    }
  )
);
