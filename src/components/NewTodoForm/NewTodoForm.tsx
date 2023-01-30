import classNames from 'classnames';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeSelectedTodo,
  setIsOpenedForm,
} from '../../features/selectedTodoSlice';
import {
  editTodo,
  removeTodo,
  setTodos,
} from '../../features/todosSlice';
import './NewTodoForm.scss';

export const NewTodoForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    isOpenedForm,
    selectedDate,
    selectedTodo,
  } = useAppSelector(state => state.selectedTodo);

  const initialValuesState = {
    title: '',
    body: '',
    date: '',
    time: '',
  };

  const initialErrorsState = {
    title: false,
    date: false,
  };

  const [values, setValues] = useState(initialValuesState);
  const [errors, setErrors] = useState(initialErrorsState);

  const {
    title,
    body,
    date,
    time,
  } = values;

  const handleRemoveTodo = () => {
    if (selectedTodo) {
      dispatch(removeTodo(selectedTodo));
      dispatch(removeSelectedTodo());
    }

    dispatch(setIsOpenedForm(false));
    setErrors(initialErrorsState);
    setValues(initialValuesState);
  };

  const handleCloseForm = () => {
    setErrors(initialErrorsState);
    dispatch(setIsOpenedForm(!isOpenedForm));
    dispatch(removeSelectedTodo());
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      name: field,
      value,
    } = event.target;

    setErrors(initialErrorsState);

    setValues(current => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setErrors(initialErrorsState);

    if (!title) {
      return setErrors(current => ({
        ...current,
        title: true,
      }));
    }

    if (!date) {
      return setErrors(current => ({
        ...current,
        date: true,
      }));
    }

    const uniqueId = +(new Date());
    const updatedDate = new Date().toLocaleDateString('fr-CH');
    const updateTime = new Date().toTimeString().slice(0, 5);

    const newTodo = {
      id: 0,
      title,
      description: body,
      date,
      time,
      updatedAt: `${updatedDate} ${updateTime}`,
    };

    if (!selectedTodo) {
      dispatch(setTodos([{
        ...newTodo,
        id: uniqueId,
      }]));
    } else {
      dispatch(editTodo({
        ...newTodo,
        id: selectedTodo.id,
      }));
    }

    dispatch(removeSelectedTodo());
    dispatch(setIsOpenedForm(false));
    setValues(initialValuesState);
    setErrors(initialErrorsState);
  };

  useEffect(() => {
    if (selectedTodo) {
      setValues(current => ({
        ...current,
        title: selectedTodo?.title,
        body: selectedTodo?.description,
        date: selectedTodo?.date,
        time: selectedTodo?.time,
      }));
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (selectedDate) {
      setValues(current => ({
        ...current,
        date: selectedDate,
      }));
    }
  }, [selectedDate]);

  return (
    <form
      className="new-todo-form"
      onSubmit={handleSubmit}
    >
      <div className="new-todo-form__top-actions">
        <h1 className="new-todo-form__title">
          {!selectedTodo
            ? 'Add new idea item'
            : 'Edit idea item'}
        </h1>

        <button
          type="button"
          className="
            new-todo-form__close
            icon
            icon__cross"
          onClick={handleCloseForm}
        />
      </div>

      {selectedTodo && (
        <p className='new-todo-form__status'>
          {`Created at: ${selectedTodo.updatedAt}`}
        </p>
      )}

      <input
        type="text"
        name="title"
        className={classNames(
          'new-todo-form__input',
          'new-todo-form__input--title',
          { 'new-todo-form__input--warning': errors.title },
        )}
        placeholder={errors.title
          ? "Title is required"
          : "Title goes here"}
        value={title}
        onChange={handleChange}
      />

      <textarea
        name="body"
        className="
          new-todo-form__input
          new-todo-form__input--text"
        placeholder="Description"
        value={body}
        onChange={handleChange}
      />

      <div className="new-todo-form__date-options">
        <input
          type="date"
          name="date"
          className={classNames(
            'new-todo-form__input',
            'new-todo-form__input--date',
            { 'new-todo-form__input--warning': errors.date },
          )}
          value={date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          className="
            new-todo-form__input
            new-todo-form__input--time"
          value={time}
          onChange={handleChange}
        />
      </div>

      <div className="new-todo-form__buttons form-buttons">
        {selectedTodo && (
          <button
            type="button"
            className="
              form-buttons__item
              form-buttons__item--delete
              icon
              icon__trash"
            onClick={handleRemoveTodo}
          />
        )}

        <button
          type="submit"
          className="
            form-buttons__item
            form-buttons__item--save
            icon
            icon__save"
        />
      </div>
    </form>
  );
}
