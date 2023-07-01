
type EscapeKeyEvent = Omit<KeyboardEvent, 'key'> & { key: 'Escape' };

const isEscapeKey = (evt: KeyboardEvent): evt is EscapeKeyEvent => evt.key === 'Escape';

const isUniqueArray = <El>(array: El[] | readonly El[]) => new Set(array).size === array.length;

const findTemplate = <E extends HTMLElement = HTMLElement>(id: string) => {
	const templateElement = document.querySelector<HTMLTemplateElement>(`#${id}`);
	if (templateElement === null) {
		throw new Error(`Template with id ${id} not found`);
	}

	const template = templateElement.content.firstElementChild;
	if (template === null) {
		throw new Error(`Template with id ${id} is empty`);
	}

	return template as E;
};

export { isUniqueArray, isEscapeKey, findTemplate };
