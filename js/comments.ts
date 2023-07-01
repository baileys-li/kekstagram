import { PhotoComment } from './types';
import { findBEMElement, findTemplate, renderPack } from './utils';

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

const createComment = ({ avatar, name, message }: PhotoComment) => {
	const comment = template.cloneNode(true) as typeof template;
	const avatarElement = findBEMElement<HTMLImageElement>(comment, 'picture', 'social');
	avatarElement.src = avatar;
	avatarElement.alt = name;
	findBEMElement(comment, 'text', 'social').textContent = message;

	return comment;
};

const renderComments = (comments: PhotoComment[]) => {
	countElement.textContent = comments.length.toString();
	renderPack(comments, list, createComment);
};

const clearComments = () => {
	list.innerHTML = '';
};

export { renderComments, clearComments };
