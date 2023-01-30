import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type State = {
  selectedTodo: Todo | null;
  selectedDate: string | null;
  isOpenedForm: boolean;
};

const initialState: State = {
  selectedTodo: null,
  selectedDate: null,
  isOpenedForm: false,
};

const selectedTodoSlice = createSlice({
  name: 'selectedTodo',
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<Todo>) => ({
      ...state,
      selectedTodo: action.payload,
    }),
    removeSelectedTodo: (state) => ({
      ...state,
      selectedTodo: null,
    }),
    setSelectedDate: (state, action: PayloadAction<string | null>) => ({
      ...state,
      selectedDate: action.payload,
    }),
    setIsOpenedForm: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpenedForm: action.payload,
    }),
  },
});

export default selectedTodoSlice.reducer;
export const {
  setSelectedTodo,
  removeSelectedTodo,
  setSelectedDate,
  setIsOpenedForm,
} = selectedTodoSlice.actions;
