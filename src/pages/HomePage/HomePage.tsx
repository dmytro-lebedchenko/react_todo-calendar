import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage
} from '../../app/hooks';
import { Header } from '../../components/Header';
import { NewTodoForm } from '../../components/NewTodoForm';
import { Calendar } from '../../components/Calendar';
import { setSelectedDate } from '../../features/selectedTodoSlice';
import { getNormalizedDate } from '../../utils/calendarHelper';
import { Todo } from '../../types/Todo';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { todos } = useAppSelector(state => state.todos);
  const { month, year } = useAppSelector(state => state.calendar);
  const { isOpenedForm } = useAppSelector(state => state.selectedTodo);

  const [setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [setMonth] = useLocalStorage('month', 0);
  const [setYear] = useLocalStorage('year', 0);

  const handleSetToday = () => {
    const todayDate = new Date();
    const normalizedDate = getNormalizedDate(todayDate);

    dispatch(setSelectedDate(normalizedDate));
  }

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  useEffect(() => {
    setMonth(month);
  }, [month]);

  useEffect(() => {
    setYear(year);
  }, [year]);

  useEffect(() => {
    handleSetToday();
  }, []);

  return (
    <>
      <Header />

      <Calendar />

      {isOpenedForm && <NewTodoForm />}
    </>
  );
}
