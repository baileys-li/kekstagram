import { isEscapeKey, toggleModalClasses } from '../utils';
import { form, wrapper } from './elements';
import { resetScale } from './scale';
import './validation';
import { resetValidation, validate } from './validation';
import './effect';
import { resetEffect } from './effect';
import { api } from '../api';
import { errorModal, successModal } from '../status-modals';
import { changeSubmitButtonState } from './button';

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

form!.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	if (validate()) {
		changeSubmitButtonState('SENDING');

		try {
			await api.sendPhoto(new FormData(form!));
			closeForm();
			successModal.open();
		} catch (error) {
			errorModal.open();
		}

		changeSubmitButtonState('IDLE');
	}
});
