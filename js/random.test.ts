import { describe, expect, it } from 'vitest';
import { createRandomIdGenerator, createRandomIdGeneratorArray } from './random';
import { isUniqueArray } from './utils';
import { testPerformance } from './bench';

[createRandomIdGenerator, createRandomIdGeneratorArray].forEach((generateGeneratorID) => {
	describe(`Тестируем генератор ID: ${generateGeneratorID.name}`, () => {
		const generateID = generateGeneratorID(1, 5);

		it('Получаем уникальные ID', () => {
			const ids = Array.from({ length: 5 }, generateID);
			expect(ids).toSatisfy(isUniqueArray as never);
		});
	});

	testPerformance(
		() =>
			Array.from({ length: 100_000 }, () => {
				const generateID = generateGeneratorID(1, 5);
				return Array.from({ length: 5 }, generateID);
			}),
		`${generateGeneratorID.name}: Генерация множества маленьких массивов 5 уникальных ID с помощью`
	);

	testPerformance(
		() =>
			Array.from({ length: 100_000 }, () => {
				const generateID = generateGeneratorID();
				return Array.from({ length: 5 }, generateID);
			}),
		`${generateGeneratorID.name}: Генерация множества маленьких массивов с большими границами`
	);

	const generateID = generateGeneratorID(0, 1_000_000_000);
	testPerformance(
		() =>
			Array.from({ length: 10_000_000 }, () => generateID),
		`${generateGeneratorID.name}: Генерация очень большого массива `
	);
});
