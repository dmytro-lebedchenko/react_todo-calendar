import { getYearList } from "../utils/calendarHelper";

export const yearList = getYearList(1920, 2100);
export const yearDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const leapYearDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const weekLength = 7;
export const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export const weekFromMonday = [6, 0, 1, 2, 3, 4, 5];

export const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
