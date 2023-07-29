/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-console */
import { getRandomElement, randomSort } from './random';

type El = { id: number };
const mockData: El[] = Array.from({ length: 25 }, (_, id) => ({ id }));
console.log(mockData);

console.time('random-sort');
const sorted = mockData.toSorted(randomSort).slice(0, 10);
console.log(sorted);
console.timeEnd('random-sort');

console.time('iterate');
const result: El[] = [];

for (let i = 0; i < 10; i++) {
	let element = getRandomElement(mockData);
	while (result.includes(element)) {
		element = getRandomElement(mockData);
	}
	result.push(element);
}

console.log(result);
console.timeEnd('iterate');

console.time('sety');
const setResult = new Set<El>();

for (let i = 0; i < 10; i++) {
	let element = getRandomElement(mockData);
	while (setResult.has(element)) {
		element = getRandomElement(mockData);
	}
	setResult.add(element);
}

console.log(setResult);
console.timeEnd('sety');
