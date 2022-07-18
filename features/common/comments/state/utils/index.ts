export const getInitials = (name: string) =>
    name
        .split(' ')
        .map(value => value.charAt(0).toUpperCase())
        .join('');

export const getUniqueArray = <V>(...items: V[][]) => [...new Set(items.flat())];
