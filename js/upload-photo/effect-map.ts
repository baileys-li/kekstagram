/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Options } from 'nouislider';

const FROM_ZERO_TO_ONE = createSliderData(0, 1, 0.1);
const FROM_ZERO_TO_HUNDRED = createSliderData();

export type Effect = 'none' | 'chrome' | 'sepia' | 'marvin' | 'phobos' | 'heat';

interface EffectOptions {
	slider: Options;
	filter?: (value: number) => string;
}

export const EFFECT_OPTION_MAP: Record<Effect, EffectOptions> = {
	none: {
		slider: FROM_ZERO_TO_HUNDRED,
	},
	chrome: {
		slider: FROM_ZERO_TO_ONE,
		filter: (value) => `grayscale(${value})`,
	},

	sepia: {
		slider: FROM_ZERO_TO_ONE,
		filter: (value) => `sepia(${value})`,
	},

	marvin: {
		slider: FROM_ZERO_TO_HUNDRED,
		filter: (value) => `invert(${value}%)`,
	},
	phobos: {
		slider: createSliderData(0, 3, 0.1),
		filter: (value) => `blur(${value}px)`,
	},
	heat: {
		slider: createSliderData(1, 3, 0.1),
		filter: (value) => `brightness(${value})`,
	},
};

function createSliderData(min = 0, max = 100, step = 1, start = max): Options {
	return {
		range: {
			min,
			max,
		},
		start,
		step,
	};
}
