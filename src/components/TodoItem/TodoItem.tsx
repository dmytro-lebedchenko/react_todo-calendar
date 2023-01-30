import { useAppDispatch } from '../../app/hooks';
import {
  setIsOpenedForm,
  setSelectedTodo,
} from '../../features/selectedTodoSlice';
import { Todo } from '../../types/Todo';
import './TodoItem.scss';

type Props = {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsOpenedForm(true));
    dispatch(setSelectedTodo(todo));
  }

  return (
    <p
      className="todo-list__item todo"
      onClick={handleClick}
    >
      {todo.title}
    </p>
  );
};
