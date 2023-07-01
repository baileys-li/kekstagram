import { openPhoto } from './full-photo';
import { photos } from './mock/mock';
import type { Photo } from './types';

const template = document.querySelector<HTMLTemplateElement>('#picture')?.content.querySelector<HTMLAnchorElement>('.picture');
const picturesWrapper = document.querySelector('.pictures');

if (!template || !picturesWrapper) {
	throw new Error('Template or pictures wrapper not found');
}

const fragment = document.createDocumentFragment();

const renderPicture = (photo: Photo) => {
	const { url, description, likes, comments } = photo;
	const pictureElement = template.cloneNode(true) as HTMLAnchorElement;
	const pictureTag = pictureElement.querySelector<HTMLImageElement>('.picture__img');
	if (!pictureTag) {
		return;
	}
	pictureElement.addEventListener('click', (evt) => {
		evt.preventDefault();
		openPhoto(photo);
	})

	// pictureElement.href = `photos/${id}`;

	pictureTag.src = url;
	pictureTag.alt = description;
	pictureElement.querySelector('.picture__likes')!.textContent = likes.toString();
	pictureElement.querySelector('.picture__comments')!.textContent = comments.length.toString();

	fragment.append(pictureElement);
};

photos.forEach(renderPicture);
picturesWrapper.append(fragment);
