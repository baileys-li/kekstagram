import { clearComments, renderComments } from './comments';
import { Photo } from './types';
import { isEscapeKey } from './utils/utils';

const wrapper = document.querySelector<HTMLDivElement>('.big-picture');
const imageElement = wrapper?.querySelector<HTMLImageElement>('.big-picture__img img');
const descriptionElement = wrapper?.querySelector<HTMLParagraphElement>('.social__caption');
const likesElement = wrapper?.querySelector<HTMLSpanElement>('.likes-count');
const closeButton = wrapper?.querySelector<HTMLButtonElement>('.big-picture__cancel');

if (
	!wrapper ||
	!imageElement ||
	!descriptionElement ||
	!likesElement ||
	!closeButton
) {
	throw new Error('Critical elements for Full Photo were not found');
}


const toggleModalClasses = (willBeOpened = true) => {
	wrapper.classList.toggle('hidden', !willBeOpened);
	document.body.classList.toggle('modal-open', willBeOpened);
};

const closeModal = () => {
	toggleModalClasses(false);
	document.removeEventListener('keydown', onDocumentEscape);
	clearComments()
};

closeButton.addEventListener('click', () => closeModal());

function onDocumentEscape(evt: KeyboardEvent) {
	if (isEscapeKey(evt)) {
		closeModal();
	}
}



const openPhoto = ({ url, description, likes, comments }: Photo) => {
	toggleModalClasses(true);

	imageElement.src = url;
	imageElement.alt = description;
	descriptionElement.textContent = description;
	likesElement.textContent = likes.toString();

	renderComments(comments);
	document.addEventListener('keydown', onDocumentEscape);
};

export { openPhoto };
