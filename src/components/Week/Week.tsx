import { v4 as uuid } from 'uuid'
import { Day } from '../Day';
import './Week.scss';

type Props = {
  week: Date[],
}

export const Week: React.FC<Props> = ({ week }) => (
  <div className="calendar__week week">
    {week.map((date, index) => (
      <Day
        key={uuid()}
        dayDate={date}
        index={index}
      />
    ))}
  </div>
);
