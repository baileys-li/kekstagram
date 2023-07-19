import { submitButton } from './elements';

const PublishButtonText = {
	IDLE: 'Опубликовать',
	SENDING: 'Публикую...'
} as const;

export const changeSubmitButtonState = (state: keyof typeof PublishButtonText = 'IDLE') => {
	submitButton!.disabled = state === 'SENDING';
	submitButton!.textContent = PublishButtonText[state];
};
