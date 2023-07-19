import { findBEMElement, findTemplate, isEscapeKey } from './utils';

const successTemplate = findTemplate<HTMLDivElement>('success');
const errorTemplate = findTemplate<HTMLDivElement>('error');

class Modal<T extends Element = Element> {
	#template: T;
	#isAnotherModalOpen = false;
	#wrapper: T | null = null;
	#button: HTMLButtonElement | null = null;

	constructor(template: T) {
		this.#template = template;
	}

	open() {
		this.#wrapper = this.#template.cloneNode(true) as T;
		document.body.appendChild(this.#wrapper);
		this.#isAnotherModalOpen = document.body.classList.contains('modal-open');
		this.#button = findBEMElement<HTMLButtonElement>(this.#wrapper, 'button');

		this.#toggleBodyClass(true);

		this.#wrapper.addEventListener('click', this.#handleClick);
		document.addEventListener('keydown', this.#onDocumentEscape, true);
	}

	close() {
		this.#toggleBodyClass(false);
		this.#wrapper!.remove();
		document.removeEventListener('keydown', this.#onDocumentEscape, true);
	}

	#toggleBodyClass(willBeAdded = false) {
		if (this.#isAnotherModalOpen) {
			return;
		}

		document.body.classList.toggle('modal-open', willBeAdded);
	}

	#onDocumentEscape = (evt: KeyboardEvent) => {
		if (isEscapeKey(evt)) {
			evt.preventDefault();
			evt.stopPropagation();
			this.close();
		}
	};

	#handleClick = (evt: Event) => {
		if (evt.target === this.#wrapper || evt.target === this.#button) {
			this.close();
		}
	};
}

export const successModal = new Modal(successTemplate);
export const errorModal = new Modal(errorTemplate);
