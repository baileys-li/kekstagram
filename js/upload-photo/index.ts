import { isEscapeKey, toggleModalClasses } from '../utils';
import { form, submitButton, wrapper } from './elements';
import { resetScale } from './scale';
import './validation';
import { resetValidation, validate } from './validation';
import './effect';
import { resetEffect } from './effect';
import { api } from '../api';
import { addErrorModal } from '../status-modals';

const closeForm = () => form!.reset();

const PublishButtonText = {
	IDLE: 'Опубликовать',
	SENDING: 'Публикую...'
};

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
		submitButton!.disabled = true;
		submitButton!.textContent = PublishButtonText.SENDING;

		try {
			await api.sendPhoto(new FormData(form!));
		} catch (error) {
			addErrorModal();
		}

		submitButton!.disabled = false;
		submitButton!.textContent = PublishButtonText.IDLE;
	}
});
