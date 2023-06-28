const enum Default {
	MAX_LENGTH = 140,
	NAMES_AMOUNT = 100,
	START_NUMBER = 1,
}

/**
 * Checks if a string is shorter than a given length
 *
 * @param string given string
 * @param maxLength maximum length of the string
 */
const isShorterThan = (
	{ length }: string,
	maxLength: number = Default.MAX_LENGTH
) => length <= maxLength;

const isPalindrome = (string: string) => {
	string = string.toLowerCase().replaceAll(' ', '');
	const middle = string.length >> 1;

	for (let index = 0; index < middle; index++) {
		if (string.at(index) !== string.at(-1 - index)) {
			return false;
		}
	}
	return true;
};

const concatNumber = (input: number | string) => {
	const stringWithOnlyDigits = String(input).replace(/\D/g, '');
	return parseInt(stringWithOnlyDigits, 10);
};

const generateNumberArray = (length: number = Default.NAMES_AMOUNT, startValue: number = Default.START_NUMBER) => Array.from({ length }, (_, index) => index + startValue);

const isUniqueArray = <El>(array: El[] | readonly El[]) => new Set(array).size === array.length;

export { isShorterThan, isPalindrome, concatNumber, generateNumberArray, isUniqueArray };
