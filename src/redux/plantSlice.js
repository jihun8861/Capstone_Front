import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlant: null, // 선택된 식물 정보
};

const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    setSelectedPlant(state, action) {
      state.selectedPlant = action.payload; // 선택한 식물 저장
    },
    updatePlantData(state, action) {
      if (state.selectedPlant) {
        state.selectedPlant = { ...state.selectedPlant, ...action.payload }; // 식물 데이터 업데이트
      }
    },
  },
});

export const { setSelectedPlant, updatePlantData } = plantSlice.actions;
export default plantSlice.reducer;
