import { getRandomElement } from './random';

export const getRandomSlice = <Element>(elements: Element[] | readonly Element[], length: number) => {
	const result: Element[] = [];

	for (let i = 0; i < length; i++) {
		let element = getRandomElement(elements);
		while (result.includes(element)) {
			element = getRandomElement(elements);
		}
		result.push(element);
	}

	return result;
};
