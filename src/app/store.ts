import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import calendarSlice from '../features/calendarSlice';
import selectedTodoSlice from '../features/selectedTodoSlice';
import todosSlice from '../features/todosSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    todos: todosSlice,
    selectedTodo: selectedTodoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
