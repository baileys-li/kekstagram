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

if (!form || !wrapper || !image) {
	throw new Error('Form or her critical element was not found');
}

export { form, wrapper, image };
