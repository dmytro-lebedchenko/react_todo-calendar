import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  month: number;
  year: number;
};

const initialState: State = {
  month: JSON.parse(localStorage.getItem('month') || `${new Date().getMonth()}`),
  year: JSON.parse(localStorage.getItem('year') || `${new Date().getFullYear()}`),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<number>) => ({
      ...state,
      month: action.payload,
    }),
    setPrevMonth: (state) => ({
      ...state,
      month: new Date(state.year, state.month - 1).getMonth(),
      year: new Date(state.year, state.month - 1).getFullYear(),
    }),
    setNextMonth: (state) => ({
      ...state,
      month: new Date(state.year, state.month + 1).getMonth(),
      year: new Date(state.year, state.month + 1).getFullYear(),
    }),
    setYear: (state, action: PayloadAction<number>) => ({
      ...state,
      year: action.payload,
    }),
  },
});

export default calendarSlice.reducer;
export const {
  setMonth,
  setPrevMonth,
  setNextMonth,
  setYear,
} = calendarSlice.actions;
