import { PhotoComment } from './types';

const commentCountElement = document.querySelector<HTMLSpanElement>('.comments-count');
const commentTemplate = document.querySelector<HTMLTemplateElement>('#comment')?.content.querySelector<HTMLLIElement>('.social__comment');
const commentsWrapper = document.querySelector<HTMLUListElement>('.social__comments');
const commentsStatus = document.querySelector<HTMLDivElement>('.social__comment-count');
const commentsLoader = document.querySelector<HTMLButtonElement>('.comments-loader');

if (!commentCountElement || !commentTemplate || !commentsWrapper || !commentsStatus || !commentsLoader) {
	throw new Error('Critical elements for Comments were not found');
}

commentsLoader.hidden = true;
commentsStatus.hidden = true;

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

const clearComments = () => {
	commentsWrapper.innerHTML = '';
};

export { renderComments, clearComments };
