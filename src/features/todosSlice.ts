import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type State = {
  todos: Todo[];
};

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      todos: [...state.todos, ...action.payload],
    }),
    editTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }

        return action.payload;
      });
    },
    removeTodo: (state, action: PayloadAction<Todo>) => ({
        ...state,
        todos: state.todos.filter(
          item => item.id !== action.payload.id,
        ),
      }),
    },
  },
);

export default todosSlice.reducer;
export const {
  setTodos,
  editTodo,
  removeTodo,
} = todosSlice.actions;
