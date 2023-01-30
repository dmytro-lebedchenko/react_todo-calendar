import classNames from 'classnames';
import { useState } from 'react';
import { monthList } from '../../api/calendarParams';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setNextMonth, setPrevMonth } from '../../features/calendarSlice';
import { setIsOpenedForm } from '../../features/selectedTodoSlice';
import { Selector } from '../Selector';
import './Header.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const { month, year } = useAppSelector(state => state.calendar);
  const { isOpenedForm } = useAppSelector(state => state.selectedTodo);

  const [ isOpenedDatePicker, setIsOpenedDatePicker ] = useState(false);

  return (
    <header className="header">
      <button
        type="button"
        className={classNames(
          'header__button',
          'icon',
          { 'icon__plus': !isOpenedForm },
          { 'header__button--opened': isOpenedForm },
          { 'icon__minus': isOpenedForm },
        )}
        onClick={() => dispatch(setIsOpenedForm(!isOpenedForm))}
      />

      <div className="header__date-nav date-nav">
        {!isOpenedDatePicker && (
          <nav
            className="
              date-nav__month-selecter
              month-selecter"
          >
            <button
              type="button"
              className="
                month-selecter__button
                month-selecter__button--prev
                icon
                icon__arrow-left"
              onClick={() => dispatch(setPrevMonth())}
            />

            <div className="month-selecter__current-month">
              {`${monthList[month]} ${year}`}
            </div>

            <button
              type="button"
              className="
                month-selecter__button
                month-selecter__button--next
                icon
                icon__arrow-right"
              onClick={() => dispatch(setNextMonth())}
            />
          </nav>
        )}

        {isOpenedDatePicker && <Selector type="month" />}
        {isOpenedDatePicker && <Selector type="year" />}

        <button
          type="button"
          className="
            date-nav__button
            icon
            icon__calendar"
          onClick={() => setIsOpenedDatePicker(!isOpenedDatePicker)}
        />
      </div>
    </header>
  );
}
