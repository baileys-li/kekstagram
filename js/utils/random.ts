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

/**
 * Use for random sorting
 */
const randomSort = () => getRandomInteger(-1, 1) as -1 | 0 | 1;


export { getRandomInteger, randomSort };
