import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getMonthRender } from '../../utils/calendarHelper';
import { Week } from '../Week';
import './Calendar.scss';

export const Calendar: React.FC = () => {
  const { month, year } = useAppSelector(state => state.calendar);

  const initialMonthInfo = getMonthRender(year, month);

  const [monthInfo, setMonthInfo] = useState(initialMonthInfo);

  useEffect(() => {
    setMonthInfo(initialMonthInfo);
  }, [month, year]);

  return (
    <div className="calendar">
      {monthInfo.map((week) => (
        <Week
          key={uuid()}
          week={week}
        />
        ))}
    </div>
  );
}
