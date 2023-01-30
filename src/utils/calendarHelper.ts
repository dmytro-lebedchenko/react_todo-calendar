import {
  yearDays,
  leapYearDays,
  weekLength,
  weekFromMonday,
} from '../api/calendarParams';
import { DirectionType } from '../types/DirectionType';

export const getYearList = (from: number, to: number) => {
  let yearList = [];

  for (let i = from; i < to; i++) {
    yearList.push(i);
  }

  return yearList;
};

export const getNormalizedDate = (date: Date) => {
  const currentDate = date.toLocaleDateString('fr-CH');

  return currentDate.split('.').reverse().join('-');
};

export const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export const getMonthLength = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return isLeapYear(year)
    ? leapYearDays[month]
    : yearDays[month];
}

export const getMonthInfo = (year: number, month: number) => {
  const result: (Date | undefined)[][] = [];

  const date = new Date(year, month);
  const dayIndex = date.getDay();
  const monthLength = getMonthLength(date);
  const monthFirstDay = weekFromMonday[dayIndex];

  let day = 1;

  for (let i = 0; i < (monthLength + monthFirstDay) / weekLength; i++) {
    result[i] = [];

    for (let j = 0; j < weekLength; j++) {
      if ((i === 0 && j < monthFirstDay) || day > monthLength) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day);

        day++;
      }
    }
  }

  return result;
}

export const getMonthInfoWeek = (
  direction: DirectionType,
  year: number,
  month: number,
) => {
  return (direction === 'prev')
    ? (getMonthInfo(year, month - 1).slice(-1))[0]
    : (getMonthInfo(year, month + 1)[0]);
};

export const getMonthRender = (
  year: number,
  month: number,
): (Date)[][] => {
  let result: any[] = [];

  result = getMonthInfo(year, month);
  const prevMonth = getMonthInfoWeek('prev', year, month);
  const nextMouth = getMonthInfoWeek('next', year, month);

  if (prevMonth.some(item => item === undefined)) {
    prevMonth.forEach((item, index) => {
      if (item) {
        result[0][index] = item;
      }
    });
  } else {
    result.unshift(prevMonth);
  }

  if (nextMouth.some(item => item === undefined)) {
    nextMouth.forEach((item, index) => {
      if (item) {
        result[result.length - 1][index] = item;
      }
    });
  } else {
    result.push(nextMouth);
  }

  return result;
}
