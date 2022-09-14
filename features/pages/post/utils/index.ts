export const concatStrings = (...strings: string[]) => strings.join(' – ');

export const getInitials = (name: string) =>
    name
        .split(' ')
        .map(value => value.charAt(0).toUpperCase())
        .join('');
