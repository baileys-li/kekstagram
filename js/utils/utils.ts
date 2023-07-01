
type EscapeKeyEvent = Omit<KeyboardEvent, 'key'> & { key: 'Escape' };

const isEscapeKey = (evt: KeyboardEvent): evt is EscapeKeyEvent => evt.key === 'Escape';

const isUniqueArray = <El>(array: El[] | readonly El[]) => new Set(array).size === array.length;

export { isUniqueArray, isEscapeKey };
