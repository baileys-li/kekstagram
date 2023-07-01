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

const findBEMElement = <E extends HTMLElement = HTMLElement>(blockNode: Element, element: string, block?: string) => {
	if (!block) {
		block = blockNode.classList[0]!;
	}

	const elementNode = blockNode.querySelector<E>(`.${block}__${element}`);
	if (elementNode === null) {
		throw new Error(`Element ${element} not found in block ${block}`);
	}

	return elementNode;
};

const renderPack = <El>(items: El[], container: Element, render: (item: El) => HTMLElement) => {
	const fragment = document.createDocumentFragment();
	items.forEach((item) => fragment.append(render(item)));
	container.append(fragment);
};


export { isUniqueArray, isEscapeKey, findTemplate, findBEMElement, renderPack };
