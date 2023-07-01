import { photos } from './mock/mock';
import { Photo, PhotoComment } from './types';
import { isEscapeKey } from './utils/utils';

const wrapper = document.querySelector<HTMLDivElement>('.big-picture');
const imageElement = wrapper?.querySelector<HTMLImageElement>('.big-picture__img img');
const descriptionElement = wrapper?.querySelector<HTMLParagraphElement>('.social__caption');
const likesElement = wrapper?.querySelector<HTMLSpanElement>('.likes-count');
const commentCountElement = wrapper?.querySelector<HTMLSpanElement>('.comments-count');
const commentTemplate = document.querySelector<HTMLTemplateElement>('#comment')?.content.querySelector<HTMLLIElement>('.social__comment');
const commentsWrapper = wrapper?.querySelector<HTMLUListElement>('.social__comments');
const commentsStatus = wrapper?.querySelector<HTMLDivElement>('.social__comment-count');
const commentsLoader = wrapper?.querySelector<HTMLButtonElement>('.comments-loader');
const closeButton = wrapper?.querySelector<HTMLButtonElement>('.big-picture__cancel');

if (
	!wrapper ||
	!imageElement ||
	!descriptionElement ||
	!likesElement ||
	!commentCountElement ||
	!commentTemplate ||
	!commentsWrapper ||
	!commentsStatus ||
	!commentsLoader ||
	!closeButton
) {
	throw new Error('Critical elements for Full Photo were not found');
}

commentsLoader.hidden = true;
commentsStatus.hidden = true;

const closeModal = () => {
	wrapper.classList.add('hidden');
	document.body.classList.remove('modal-open');

	document.removeEventListener('keydown', onDocumentEscape);

	commentsWrapper.innerHTML = '';
};

closeButton.addEventListener('click', () => closeModal());

function onDocumentEscape(evt: KeyboardEvent) {
	if (isEscapeKey(evt)) {
		closeModal();
	}
}

const renderComments = (comments: PhotoComment[]) => {
	commentCountElement.textContent = comments.length.toString();

	const fragment = document.createDocumentFragment();
	comments.forEach((comment) => {
		const commentElement = commentTemplate.cloneNode(true) as HTMLLIElement;
		const commentAvatar = commentElement.querySelector<HTMLImageElement>('.social__picture');
		commentAvatar!.src = comment.avatar;
		commentAvatar!.alt = comment.name;
		commentElement.querySelector<HTMLParagraphElement>('.social__text')!.textContent = comment.message;
		fragment.append(commentElement);
	});

	commentsWrapper.append(fragment);
};

const openPhoto = ({ url, description, likes, comments }: Photo) => {
	wrapper.classList.remove('hidden');
	document.body.classList.add('modal-open');

	imageElement.src = url;
	imageElement.alt = description;

	descriptionElement.textContent = description;

	likesElement.textContent = likes.toString();

	renderComments(comments);

	document.addEventListener('keydown', onDocumentEscape);
};

openPhoto(photos[0]);
