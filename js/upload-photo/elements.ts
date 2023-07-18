type UploadForm = HTMLFormElement & {
	filename: HTMLInputElement;
	scale: HTMLInputElement;
	'effect-level': HTMLInputElement;
	effect: RadioNodeList;
	hashtags: HTMLInputElement;
	description: HTMLTextAreaElement	;
};

const form = document.querySelector<UploadForm>('.img-upload__form');
const wrapper = form?.querySelector<HTMLDivElement>('.img-upload__overlay');
const image = form?.querySelector<HTMLImageElement>('.img-upload__preview img');
const customSliderWrapper = form?.querySelector<HTMLDivElement>('.effect-level__slider');
const effectsWrapper = form?.querySelector<HTMLUListElement>('.effects__list');

if (!form || !wrapper || !image || !customSliderWrapper || !effectsWrapper) {
	throw new Error('Form or it\'s critical element was not found');
}

export { form, wrapper, image, customSliderWrapper, effectsWrapper };
