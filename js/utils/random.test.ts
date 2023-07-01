import { describe, expect, it } from 'vitest';
import { createRandomIdGenerator } from './random';
import { isUniqueArray } from '.';

describe('Тестируем генератор ID', () => {
	it('Получаем уникальные ID', () => {
		const generateID = createRandomIdGenerator(1, 5);
		const ids = Array.from({ length: 5 }, generateID);
		expect(ids).toSatisfy(isUniqueArray as never);
	});

	it('Кинет ошибку при достижении лимита', () => {
		const generateID = createRandomIdGenerator(1, 5);
		expect(() => Array.from({ length: 6 }, generateID)).toThrow();
	});
});
