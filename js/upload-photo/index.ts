import { isEscapeKey, toggleModalClasses } from '../utils';
import { form, wrapper } from './elements';
import { resetScale } from './scale';
import './validation';
import { resetValidation, validate } from './validation';
import './effect';
import { resetEffect } from './effect';

const closeForm = () => form!.reset();

const onDocumentEscape = (evt: KeyboardEvent) => {
	const isFocusOnText = document.activeElement === form!.hashtags || document.activeElement === form!.description;
	if (isEscapeKey(evt) && !isFocusOnText) {
		closeForm();
	}
};

form!.filename.addEventListener('change', () => {
	toggleModalClasses(wrapper!);
	document.addEventListener('keydown', onDocumentEscape);
});

form!.addEventListener('reset', () => {
	toggleModalClasses(wrapper!, false);
	resetValidation();
	resetScale();
	resetEffect();
	document.removeEventListener('keydown', onDocumentEscape);
});

form!.addEventListener('submit', (evt) => {
	evt.preventDefault();

	if (validate()) {
		closeForm();
	}
});
