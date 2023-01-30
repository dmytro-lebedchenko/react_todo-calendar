import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { weekDays } from '../../api/calendarParams';
import { setSelectedDate } from '../../features/selectedTodoSlice';
import { setMonth, setYear } from '../../features/calendarSlice';
import { getNormalizedDate } from '../../utils/calendarHelper';
import { TodoList } from '../TodoList';
import './Day.scss';

type Props = {
  dayDate: Date,
  index: number,
}

export const Day: React.FC<Props> = ({ dayDate, index }) => {
  const dispatch = useAppDispatch();

  const { month } = useAppSelector(state => state.calendar);
  const { selectedDate } = useAppSelector(state => state.selectedTodo);

  const currentDayTitle = weekDays[index % 7];
  const currentDayNumber = dayDate.getDate();
  const currentMonth = dayDate.getMonth();
  const currentYear = dayDate.getFullYear();

  const getSelectedDay = () => {
    return getNormalizedDate(dayDate) === selectedDate;
  };

  const handleClick = () => {
    const normalizedDate = getNormalizedDate(dayDate);

    if (currentMonth !== month) {
      dispatch(setMonth(currentMonth));
      dispatch(setYear(currentYear));
    }

    dispatch(setSelectedDate(normalizedDate));
  };

  return (
    <div
      className={classNames(
        'week__day',
        'day',
        { 'day--active': getSelectedDay() },
        { 'day--disabled': currentMonth !== month },
      )}
      onClick={handleClick}
    >
      <div className="day__details">
        <div className="day__number">
          {currentDayNumber}
        </div>

        <div className="day__title">
          {currentDayTitle}
        </div>
      </div>

      <TodoList date={dayDate} />
    </div>
  );
};
