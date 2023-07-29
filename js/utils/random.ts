const enum Default {
	MIN_ID,
	MAX_ID = 1_000_000,
	MIN_NUMBER = 1,
	MAX_NUMBER = 100,
	COMPENSATION = 1,
}

const enum RandomResult {
	LESS = -1,
	EQUAL = 0,
	MORE = 1,
}

const enum RandomBoolean {
	FALSE,
	TRUE
}

/**
 *
 * @param min min < max
 * @param max
 */
const getRandomInteger = (min: number = Default.MIN_NUMBER, max: number = Default.MAX_NUMBER) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + Default.COMPENSATION)) + min;
};

/**
 * Use for random sorting
 */
const randomSort = () => getRandomInteger(RandomResult.LESS, RandomResult.MORE) as RandomResult;


// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const getRandomElement = <Element>(array: Element[]) => array[getRandomInteger(0, array.length - 1)];


const getRandomBoolean = () => Boolean(getRandomInteger(RandomBoolean.FALSE, RandomBoolean.TRUE));


export { getRandomInteger, randomSort, getRandomElement, getRandomBoolean };
