
import { openPhoto } from './full-photo';
import type { Photo } from '../types';
import { findBEMElement, findTemplate, renderPack } from '../utils';

const template = findTemplate<HTMLAnchorElement>('picture');
const picturesWrapper = document.querySelector('.pictures');

if (!picturesWrapper) {
	throw new Error('Pictures wrapper not found');
}


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

export const renderThumbnails = (photos: Photo[]) => renderPack(photos, picturesWrapper, (photo) => {
	const thumbnail = createThumbnail(photo);
	thumbnail.addEventListener('click', (evt) => {
		evt.preventDefault();
		openPhoto(photo);
	});

	return thumbnail;
});
