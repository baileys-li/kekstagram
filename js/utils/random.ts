const enum Default {
	MIN_ID,
	MAX_ID = 1_000_000,
	MIN_NUMBER = 1,
	MAX_NUMBER = 100,
}

/**
 *
 * @param min min < max
 * @param max
 */
const getRandomInteger = (min: number = Default.MIN_NUMBER, max: number = Default.MAX_NUMBER) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = <Element>(array: Element[]) => array[getRandomInteger(0, array.length - 1)];
const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));


const createRandomIdGenerator = (min: number = Default.MIN_ID, max: number = Default.MAX_ID) => {
	const previousIds: number[] = [];

	return () => {
		if (previousIds.length === max - min + 1) {
			throw new Error('Нет свободных id');
		}

		let currentId = getRandomInteger(min, max);

		while (previousIds.includes(currentId)) {
			currentId = getRandomInteger(min, max);
		}

		previousIds.push(currentId);

		return currentId;
	};
};


export { getRandomInteger, getRandomElement, getRandomBoolean, createRandomIdGenerator };
