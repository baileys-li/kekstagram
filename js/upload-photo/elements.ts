type UploadForm = HTMLFormElement & {
	filename: HTMLInputElement;
	scale: HTMLInputElement;
	'effect-level': HTMLInputElement;
	effect: RadioNodeList;
	hashtags: HTMLInputElement;
	description: HTMLTextAreaElement	;
};

const form = document.querySelector<UploadForm>('.img-upload__form');

if (!form) {
	throw new Error('Form or her critical element was not found');
}

export { form };