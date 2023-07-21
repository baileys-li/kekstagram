import type { Effect } from './effect-map';

type EffectRadioNodeList = Omit<RadioNodeList, 'value'> & {
	value: Effect;
}

type UploadForm = HTMLFormElement & {
	filename: HTMLInputElement;
	scale: HTMLInputElement;
	'effect-level': HTMLInputElement;
	effect: EffectRadioNodeList;
	hashtags: HTMLInputElement;
	description: HTMLTextAreaElement;
};

const form = document.querySelector<UploadForm>('.img-upload__form');
const wrapper = form?.querySelector<HTMLDivElement>('.img-upload__overlay');
const image = form?.querySelector<HTMLImageElement>('.img-upload__preview img');
const sliderFieldset = form?.querySelector<HTMLDivElement>('.img-upload__effect-level');
const customSliderWrapper = sliderFieldset?.querySelector<HTMLDivElement>('.effect-level__slider');
const effectsWrapper = form?.querySelector<HTMLUListElement>('.effects__list');
const submitButton = form?.querySelector<HTMLButtonElement>('.img-upload__submit');

if (!form || !wrapper || !image || !customSliderWrapper || !sliderFieldset || !effectsWrapper || !submitButton) {
	throw new Error('Form or it\'s critical element was not found');
}

export { form, wrapper, image, sliderFieldset, customSliderWrapper, effectsWrapper, submitButton };
