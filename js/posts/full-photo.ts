import { clearComments, renderComments } from './comments';
import { Photo } from '../types';
import { isEscapeKey, toggleModalClasses } from '../utils';

const wrapper = document.querySelector<HTMLDivElement>('.big-picture');
const imageElement = wrapper?.querySelector<HTMLImageElement>('.big-picture__img img');
const descriptionElement = wrapper?.querySelector<HTMLParagraphElement>('.social__caption');
const likesElement = wrapper?.querySelector<HTMLSpanElement>('.likes-count');
const closeButton = wrapper?.querySelector<HTMLButtonElement>('.big-picture__cancel');

if (!wrapper || !imageElement || !descriptionElement || !likesElement || !closeButton) {
	throw new Error('Critical elements for Full Photo were not found');
}

const closeModal = () => {
	toggleModalClasses(wrapper, false);
	document.removeEventListener('keydown', onDocumentEscape);
	clearComments();
};

closeButton.addEventListener('click', () => closeModal());

function onDocumentEscape(evt: KeyboardEvent) {
	if (isEscapeKey(evt)) {
		closeModal();
	}
}

const renderPhoto = ({ url, description, likes, comments }: Photo) => {
	imageElement.src = url;
	imageElement.alt = description;
	descriptionElement.textContent = description;
	likesElement.textContent = likes.toString();

	renderComments(comments);
};

const openPhoto = (photo: Photo) => {
	toggleModalClasses(wrapper);
	renderPhoto(photo);
	document.addEventListener('keydown', onDocumentEscape);
};

export { openPhoto };
