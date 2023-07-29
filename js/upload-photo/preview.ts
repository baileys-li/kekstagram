import { form, image } from './elements';

const IMAGE_EXTENSIONS = ['png', 'jpeg', 'jpg'];
const previews = form!.querySelectorAll<HTMLSpanElement>('.effects__preview');

const isValidType = (file: File) => {
	const fileName = file.name.toLowerCase();
	return IMAGE_EXTENSIONS.some((ext) => fileName.endsWith(ext));
};

const renderPreviews = (file: File) => {
	image!.src = URL.createObjectURL(file);
	previews.forEach((preview) => {
		preview.style.backgroundImage = `url(${image!.src})`;
	});
};

const processFile = () => {
	const files = form!.filename.files;
	if (files === null || files.length === 0) {
		return false;
	}

	const file = files[0];

	if (!isValidType(file)) {
		return false;
	}

	renderPreviews(file);
	return true;
};

export { processFile };
