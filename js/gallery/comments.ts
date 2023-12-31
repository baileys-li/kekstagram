import { PhotoComment } from '../types';
import { findBEMElement, findTemplate, renderPack } from '../utils';

const enum Default {
	PACK_COUNT = 5,
}

const template = findTemplate<HTMLLIElement>('comment');
const list = document.querySelector<HTMLUListElement>('.social__comments');
const status = document.querySelector<HTMLDivElement>('.social__comment-count');
const loader = document.querySelector<HTMLButtonElement>('.comments-loader');
const allCount = status?.querySelector<HTMLSpanElement>('.comments-count');
const renderedCount = status?.querySelector<HTMLSpanElement>('.comments-rendered');


let currentComments: PhotoComment[] = [];

if (!list || !status || !loader || !allCount || !renderedCount) {
	throw new Error('Critical elements for Comments were not found');
}

const createComment = ({ avatar, name, message }: PhotoComment) => {
	const comment = template.cloneNode(true) as typeof template;
	const avatarElement = findBEMElement<HTMLImageElement>(comment, 'picture', 'social');
	avatarElement.src = avatar;
	avatarElement.alt = name;
	findBEMElement(comment, 'text', 'social').textContent = message;

	return comment;
};

loader.addEventListener('click', () => {
	const currentCount = list.childElementCount;

	let endOfSlice = currentCount + Default.PACK_COUNT;
	const isAllWillBeShown = endOfSlice >= currentComments.length;
	endOfSlice = isAllWillBeShown ? currentComments.length : endOfSlice;

	const nextPackComments = currentComments.slice(currentCount, endOfSlice);
	renderPack(nextPackComments, list, createComment);

	renderedCount.textContent = endOfSlice.toString();

	loader.hidden = isAllWillBeShown;
});

const renderComments = (comments: PhotoComment[]) => {
	currentComments = comments;
	allCount.textContent = comments.length.toString();
	loader.click();
};

const clearComments = () => {
	list.innerHTML = '';
	currentComments = [];
};

export { renderComments, clearComments };
