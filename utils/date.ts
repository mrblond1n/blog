import moment from 'moment';
moment.locale('en');

export const formatDate = (date: string | number, convertTo: string): string =>
    validDate(date) ? moment(new Date(date)).format(convertTo) : '';

const validDate = (date: string | number, convertFrom?: string) => moment(new Date(date), convertFrom).isValid();
