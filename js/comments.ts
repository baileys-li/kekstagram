import { PhotoComment } from './types';
import { findTemplate } from './utils';

const countElement = document.querySelector<HTMLSpanElement>('.comments-count');
const template = findTemplate<HTMLLIElement>('#comment');
const list = document.querySelector<HTMLUListElement>('.social__comments');
const status = document.querySelector<HTMLDivElement>('.social__comment-count');
const loader = document.querySelector<HTMLButtonElement>('.comments-loader');

if (!countElement || !list || !status || !loader) {
	throw new Error('Critical elements for Comments were not found');
}

loader.hidden = true;
status.hidden = true;

const renderComments = (comments: PhotoComment[]) => {
	countElement.textContent = comments.length.toString();

	const fragment = document.createDocumentFragment();
	comments.forEach((comment) => {
		const commentElement = template.cloneNode(true) as HTMLLIElement;
		const commentAvatar = commentElement.querySelector<HTMLImageElement>('.social__picture');
		commentAvatar!.src = comment.avatar;
		commentAvatar!.alt = comment.name;
		commentElement.querySelector<HTMLParagraphElement>('.social__text')!.textContent = comment.message;
		fragment.append(commentElement);
	});

	list.append(fragment);
};

const clearComments = () => {
	list.innerHTML = '';
};

export { renderComments, clearComments };
