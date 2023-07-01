import { openPhoto } from './full-photo';
import { photos } from './mock/mock';
import type { Photo } from './types';
import { findTemplate } from './utils';

const template = findTemplate<HTMLAnchorElement>('#picture');
const picturesWrapper = document.querySelector('.pictures');

if (!picturesWrapper) {
	throw new Error('Pictures wrapper not found');
}

const fragment = document.createDocumentFragment();

const onThumbnailClick = (evt: Event) => {
	evt.preventDefault();
	const link = evt.currentTarget as HTMLAnchorElement;
	const id = Number(link.dataset.id);
	const foundPhoto = photos.find((photo) => photo.id === id);

	if (foundPhoto) {
		return openPhoto(foundPhoto);
	}
};

const createThumbnail = ({ id, url, description, likes, comments }: Photo) => {
	const thumbnailElement = template.cloneNode(true) as HTMLAnchorElement;
	const pictureElement = thumbnailElement.querySelector<HTMLImageElement>('.picture__img');
	thumbnailElement.dataset.id = id.toString();
	pictureElement!.src = url;
	pictureElement!.alt = description;
	thumbnailElement.querySelector('.picture__likes')!.textContent = likes.toString();
	thumbnailElement.querySelector('.picture__comments')!.textContent = comments.length.toString();

	return thumbnailElement;
};

const renderThumbnail = (photo: Photo) => {
	const thumbnail = createThumbnail(photo);
	thumbnail.addEventListener('click', onThumbnailClick);
	fragment.append(thumbnail);
};

photos.forEach(renderThumbnail);
picturesWrapper.append(fragment);
