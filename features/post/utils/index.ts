import {formatDate} from 'utils/date';

export const concatStrings = (...strings: string[]) => strings.join(' * ');

export const formattedDate = (date: string | number) => formatDate(date, 'hh:mm DD.MM.YY');

export const getInitials = (name: string) =>
    name
        .split(' ')
        .map(value => value.charAt(0).toUpperCase())
        .join('');
