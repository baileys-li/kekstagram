import { isEscapeKey } from '../utils';
import { form, wrapper } from './elements';

const toggleModalClasses = (willBeOpened = true) => {
	wrapper!.classList.toggle('hidden', !willBeOpened);
	document.body.classList.toggle('modal-open', willBeOpened);
};

const onDocumentEscape = (evt: KeyboardEvent) => {
	if (isEscapeKey(evt)) {
		form!.reset();
	}
};

form!.filename.addEventListener('change', () => {
	toggleModalClasses();
	document.addEventListener('keydown', onDocumentEscape);
});

form!.addEventListener('reset', () => {
	toggleModalClasses(false);
	document.removeEventListener('keydown', onDocumentEscape);
});

