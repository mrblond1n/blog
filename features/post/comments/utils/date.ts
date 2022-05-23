import {formatDate} from 'utils/date';

export const formattedDate = (date: string | number) => formatDate(date, 'hh:mm DD.MM.YY');
