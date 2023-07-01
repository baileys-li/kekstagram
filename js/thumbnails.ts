import { openPhoto } from './full-photo';
import { photos } from './mock/mock';
import type { Photo } from './types';
import { findBEMElement, findTemplate } from './utils';

const template = findTemplate<HTMLAnchorElement>('#picture');
const picturesWrapper = document.querySelector('.pictures');

if (!picturesWrapper) {
	throw new Error('Pictures wrapper not found');
}

const fragment = document.createDocumentFragment();

const onThumbnailClick = (evt: Event) => {
	evt.preventDefault();
	const link = evt.currentTarget as typeof template;
	const id = Number(link.dataset.id);
	const foundPhoto = photos.find((photo) => photo.id === id);

	if (foundPhoto) {
		return openPhoto(foundPhoto);
	}
};

const createThumbnail = ({ id, url, description, likes, comments }: Photo) => {
	const thumbnail = template.cloneNode(true) as typeof template;
	const pictureElement = findBEMElement<HTMLImageElement>(thumbnail, 'img');
	thumbnail.dataset.id = id.toString();
	pictureElement!.src = url;
	pictureElement!.alt = description;

	findBEMElement(thumbnail, 'likes').textContent = likes.toString();
	findBEMElement(thumbnail, 'comments').textContent = comments.length.toString();

	return thumbnail;
};

const renderThumbnail = (photo: Photo) => {
	const thumbnail = createThumbnail(photo);
	thumbnail.addEventListener('click', onThumbnailClick);
	fragment.append(thumbnail);
};

photos.forEach(renderThumbnail);
picturesWrapper.append(fragment);
