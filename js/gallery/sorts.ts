import { Photo } from '../types';
import { debounce } from '../utils/optimizers';
import { randomSort } from '../utils/random';
import { clearThumbnails, renderThumbnails } from './thumbnails';

const enum Default {
	MAX_SORTED_PHOTOS = 10,
	AMOUNT_BUTTONS = 3
}

const WRAPPER_CLASS = 'img-filters';
const BUTTON_CLASS = `${WRAPPER_CLASS}__button`;
const ACTIVE_BUTTON_CLASS = `${BUTTON_CLASS}--active`;

const wrapper = document.querySelector<HTMLDivElement>(`.${WRAPPER_CLASS}`);
const sortButtons = wrapper?.querySelectorAll<HTMLButtonElement>(`.${BUTTON_CLASS}`);

let photos: Photo[] = [];

if (!wrapper || !sortButtons || sortButtons.length < Default.AMOUNT_BUTTONS) {
	throw new Error('No wrapper or buttons');
}

const [defaultButton, randomButton, discussedButton] = sortButtons;
let activeButton = defaultButton;

const isButton = (target: HTMLElement): target is HTMLButtonElement => target.classList.contains(BUTTON_CLASS);

const sortPhotos = () => {
	if (activeButton === randomButton) {
		return photos.toSorted(randomSort).slice(0, Default.MAX_SORTED_PHOTOS);
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

	activeButton!.classList.remove(ACTIVE_BUTTON_CLASS);
	target.classList.add(ACTIVE_BUTTON_CLASS);
	activeButton = target;

	reRenderPhotos();
});

export const initThumbnailSorting = (receivedPhotos: Photo[]) => {
	photos = receivedPhotos;
	wrapper.classList.remove(`${WRAPPER_CLASS}--inactive`);
	renderThumbnails(receivedPhotos);
};

