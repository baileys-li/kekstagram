/* eslint-disable @typescript-eslint/no-magic-numbers */

import { describe, expect, it } from 'vitest';
import { isUniqueArray } from '.';

const Examples = {
	UNIQUE: [1, 2, 3],
	NON_UNIQUE: [1, 2, 2],
};

describe('isUniqueArray', () => {
	it('returns true for arrays with unique elements', () => {
		expect(isUniqueArray(Examples.UNIQUE)).toBe(true);
	});

	it('returns false for non-unique arrays', () => {
		expect(isUniqueArray(Examples.NON_UNIQUE)).toBe(false);
	});
});
