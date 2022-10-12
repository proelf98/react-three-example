import create from "zustand";

// interface is needed for zustand + typescript
interface CubeState {
  transformCubeHeight: number;
  transformPositionY: number;
  rangeMin: number;
  rangeMax: number;
  setCubeHeight: (by: number) => void;
}

export const cubeState = create<CubeState>()((set) => ({
  // initial state
  transformCubeHeight: 1,
  transformPositionY: 1,
  rangeMin: 1,
  rangeMax: 10,

  // method to modify state
  setCubeHeight: (by) =>
    set((state) => ({
      transformCubeHeight: by,
      transformPositionY: state.transformCubeHeight - state.transformPositionY,
    })),
}));
