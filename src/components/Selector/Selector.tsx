import { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setMonth, setYear } from '../../features/calendarSlice';
import { yearList, monthList } from '../../api/calendarParams';
import { SelectorType } from '../../types/SelectorType';
import './Selector.scss';

type Props = {
  type: SelectorType,
};

export const Selector: React.FC<Props> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { month, year } = useAppSelector(state => state.calendar);

  const initialValue = (type === 'month')
    ? `${monthList[month]}`
    : `${year}`;

  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState(initialValue);

  const optionsList = (type === 'month')
    ? monthList
    : yearList;

  const handleOptionClick = (option: string | number) => {
    setValue(`${option}`);
    setIsOpened(false);

    if (type === 'month') {
      const currentMonth = monthList.indexOf(`${option}`);

      dispatch(setMonth(currentMonth));
    }

    if (type === 'year') {
      dispatch(setYear(+option));
    }
  };

  return (
    <div
      className="filters__sort-filter"
      onMouseLeave={() => setIsOpened(false)}
    >
      <div className="filters__filter">
        <div className="selector">
          <button
            className={classNames(
              'selector__picker',
              { 'selector__picker--month': type === 'month' },
              { 'selector__picker--year': type === 'year' },
            )}
            type="button"
            onClick={() => setIsOpened(!isOpened)}
          >
            <div className="selector__picker--title">
              {value}
            </div>

            <div className="selector__picker--arrow">
              {!isOpened
                && (
                  <span
                    className="
                      selector__picker--icon
                      icon
                      icon__arrow-down"
                  />
                )}

              {isOpened
                && (
                  <span
                    className="
                      selector__picker--icon
                      icon
                      icon__arrow-up"
                  />
                )}
            </div>
          </button>

          <ul
            className={classNames(
              'selector__list',
              { 'selector__list--is-hidden': !isOpened },
            )}
          >
            {optionsList.map(option => (
              <li
                key={option}
                className="selector__item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
