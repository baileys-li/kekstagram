import { form, image } from './elements';

const enum Default {
	STEP = 25,
	MIN = 25,
	MAX = 100,
	PERCENT_COEFFICIENT = 100,
}

const decreaseButton = form!.querySelector<HTMLButtonElement>('.scale__control--smaller');
const increaseButton = form!.querySelector<HTMLButtonElement>('.scale__control--bigger');

const getScale = () => parseInt(form!.scale.value, 10);
const setScale = (value: number) => {
	image!.style.transform = `scale(${value / Default.PERCENT_COEFFICIENT})`;
	form!.scale.value = `${value}%`;
};

decreaseButton?.addEventListener('click', () => {
	const currentScale = getScale();

	if (currentScale <= Default.MIN) {
		return;
	}

	setScale(currentScale - Default.STEP);
});

increaseButton?.addEventListener('click', () => {
	const currentScale = getScale();

	if (currentScale >= Default.MAX) {
		return;
	}

	setScale(currentScale + Default.STEP);
});

export const resetScale = () => image!.style.removeProperty('transform');
