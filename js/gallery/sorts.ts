import { Photo } from '../types';
import { debounce } from '../utils/optimizers';
import { randomSort } from '../utils/random';
import { clearThumbnails, renderThumbnails } from './thumbnails';

const wrapper = document.querySelector<HTMLDivElement>('.img-filters');
const sortButtons = wrapper?.querySelectorAll<HTMLButtonElement>('.img-filters__button');

let photos: Photo[] = [];

if (!wrapper || !sortButtons || sortButtons.length < 3) {
	throw new Error('No wrapper or buttons');
}

const [defaultButton, randomButton, discussedButton] = sortButtons;
let activeButton = defaultButton;

const isButton = (target: HTMLElement): target is HTMLButtonElement => target.classList.contains('img-filters__button');

const sortPhotos = () => {
	if (activeButton === randomButton) {
		return photos.toSorted(randomSort).slice(0, 10);
	}

	if (activeButton === discussedButton) {
		return photos.toSorted((a, b) => b.comments.length - a.comments.length);
	}

	return photos;
};

const reRenderPhotos = debounce(() => {
	clearThumbnails();
	renderThumbnails(sortPhotos());
});

wrapper.addEventListener('click', (evt) => {
	const target = evt.target as HTMLElement;

	if (!isButton(target) || activeButton === target) {
		return;
	}

	activeButton!.classList.remove('img-filters__button--active');
	target.classList.add('img-filters__button--active');
	activeButton = target;

	reRenderPhotos();
});

export const initThumbnailSorting = (receivedPhotos: Photo[]) => {
	photos = receivedPhotos;
	wrapper.classList.remove('img-filters--inactive');
	renderThumbnails(receivedPhotos);
};

