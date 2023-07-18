import { form, image } from './elements';

const enum Default {
	STEP = 25,
	MIN = 25,
	MAX = 100,
}

const decreaseButton = form!.querySelector<HTMLButtonElement>('.scale__control--smaller');
const increaseButton = form!.querySelector<HTMLButtonElement>('.scale__control--bigger');

decreaseButton?.addEventListener('click', () => {
	const currentScale = parseInt(form!.scale.value, 10);

	if (currentScale <= Default.MIN) {
		return;
	}

	const newScale = currentScale - Default.STEP;
	image!.style.transform = `scale(${newScale / 100})`;
	form!.scale.value = `${newScale}%`;
});

increaseButton?.addEventListener('click', () => {
	const currentScale = parseInt(form!.scale.value, 10);

	if (currentScale >= Default.MAX) {
		return;
	}

	const newScale = currentScale + Default.STEP;
	image!.style.transform = `scale(${newScale / 100})`;
	form!.scale.value = `${newScale}%`;
});

export const resetScale = () => image!.style.removeProperty('transform');
