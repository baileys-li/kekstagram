import { findBEMElement, findTemplate, isEscapeKey } from './utils';

const successTemplate = findTemplate<HTMLDivElement>('success');
const errorTemplate = findTemplate<HTMLDivElement>('error');

export const addSuccessModal = () => {
	const wrapper = successTemplate.cloneNode(true) as typeof errorTemplate;
	document.body.appendChild(wrapper);
	const isAnotherModalOpen = document.body.classList.contains('modal-open');
	const cta = findBEMElement<HTMLButtonElement>(wrapper, 'button');

	if (!isAnotherModalOpen) {
		document.body.classList.add('modal-open');
	}

	const close = () => {
		wrapper.remove();

		if (!isAnotherModalOpen) {
			document.body.classList.remove('modal-open');
		}
		document.removeEventListener('keydown', onDocumentEscape, true);
	};

	document.addEventListener('keydown', onDocumentEscape, true);

	function onDocumentEscape(evt: KeyboardEvent) {
		if (isEscapeKey(evt)) {
			evt.preventDefault();
			evt.stopPropagation();
			close();
		}
	}

	document.addEventListener('click', (evt) => {
		if (evt.target === wrapper || evt.target === cta) {
			close();
		}
	});
};


export const addErrorModal = () => {
	const errorElement = errorTemplate.cloneNode(true) as typeof errorTemplate;
	document.body.appendChild(errorElement);
	const isAnotherModalOpen = document.body.classList.contains('modal-open');
	const cta = findBEMElement<HTMLButtonElement>(errorElement, 'button');

	if (!isAnotherModalOpen) {
		document.body.classList.add('modal-open');
	}

	const close = () => {
		errorElement.remove();

		if (!isAnotherModalOpen) {
			document.body.classList.remove('modal-open');
		}
		document.removeEventListener('keydown', onDocumentEscape, true);
	};

	document.addEventListener('keydown', onDocumentEscape, true);

	function onDocumentEscape(evt: KeyboardEvent) {
		if (isEscapeKey(evt)) {
			evt.preventDefault();
			evt.stopPropagation();
			close();
		}
	}

	document.addEventListener('click', (evt) => {
		if (evt.target === errorElement || evt.target === cta) {
			close();
		}
	});
};
