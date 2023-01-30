import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getNormalizedDate } from '../../utils/calendarHelper';
import { TodoItem } from '../TodoItem';
import './TodoList.scss';

type Props = {
  date: Date,
}

export const TodoList: React.FC<Props> = ({ date }) => {
  const { todos } = useAppSelector(state => state.todos);

  const todoList = useMemo(() => {
    return todos.filter(todoItem => (
      todoItem.date === getNormalizedDate(date)
    )).sort(
      (todoA, todoB) => todoA.time.localeCompare(todoB.time),
    );
  }, [date, todos]);

  return (
    <div className="day__todo-list todo-list">
      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
};
