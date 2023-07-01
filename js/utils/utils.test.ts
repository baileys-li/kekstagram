import { describe, expect, it } from 'vitest';
import { isUniqueArray } from './utils';

describe('isUniqueArray', () => {
	it('returns true for arrays with unique elements', () => {
		expect(isUniqueArray([1, 2, 3])).toBe(true);
	});

	it('returns false for non-unique arrays', () => {
		expect(isUniqueArray([1, 2, 2])).toBe(false);
	});
});
