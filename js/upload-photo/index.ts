import { isEscapeKey, toggleModalClasses } from '../utils';
import { form, wrapper } from './elements';

const closeForm = () => form!.reset();

const onDocumentEscape = (evt: KeyboardEvent) => {
	if (isEscapeKey(evt)) {
		closeForm();
	}
};

form!.filename.addEventListener('change', () => {
	toggleModalClasses(wrapper!);
	document.addEventListener('keydown', onDocumentEscape);
});

form!.addEventListener('reset', () => {
	toggleModalClasses(wrapper!, false);
	document.removeEventListener('keydown', onDocumentEscape);
});

