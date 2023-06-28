import { describe, expect, test } from 'vitest';
import { TimeString, isOnWorkHours, isOnWorkHoursDate } from './time';
import { testPerformance } from './bench';
import { getRandomElement } from './random';

interface TimeMock {
	values: [TimeString, TimeString, TimeString, number];
	result: boolean;
}

const TEST_CASES: TimeMock[] = [
	{ values: ['08:00', '17:30', '14:00', 90], result: true },
	{ values: ['8:00', '10:0', '8:00', 120], result: true },
	{ values: ['08:00', '14:30', '14:00', 90], result: false },
	{ values: ['14:00', '17:30', '08:0', 90], result: false },
	{ values: ['8:00', '17:30', '08:00', 900], result: false },
];

const performanceCases = Array.from({ length: 100_000 }, () => getRandomElement(TEST_CASES).values);

[isOnWorkHours, isOnWorkHoursDate].forEach((timeFn: typeof isOnWorkHours) => {
	testPerformance(
		() =>
			describe(`${timeFn.name}: функция на проверку превысит ли встреча рабочие часы`, () => {
				test.each(TEST_CASES)('With arguments $values', ({ values, result }) => expect(timeFn(...values)).toStrictEqual(result));
			}),
		timeFn.name
	);

	testPerformance(() => performanceCases.forEach((values: TimeMock['values']) => timeFn(...values)), `${timeFn.name}: performance`);
});
