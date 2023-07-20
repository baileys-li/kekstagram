import { findBEMElement, findTemplate, isEscapeKey } from './utils';

const successTemplate = findTemplate<HTMLDivElement>('success');
const errorTemplate = findTemplate<HTMLDivElement>('error');

interface OpenOptions {
	title?: string
	onClick?: () => void
}
class Modal<T extends Element = Element> {
	#template: T;
	#isAnotherModalOpen = false;
	#wrapper: T | null = null;
	#button: HTMLButtonElement | null = null;
	#title: HTMLHeadingElement | null = null;

	constructor(template: T) {
		this.#template = template;
	}

	open(options?: OpenOptions) {
		this.#updateState();
		document.body.appendChild(this.#wrapper!);
		this.#toggleBodyClass(true);
		this.#addListeners();

		if (options) {
			this.#processOptions(options);
		}
	}

	#updateState() {
		this.#wrapper = this.#template.cloneNode(true) as T;
		this.#isAnotherModalOpen = document.body.classList.contains('modal-open');
		this.#button = findBEMElement<HTMLButtonElement>(this.#wrapper, 'button');
		this.#title = findBEMElement<HTMLHeadingElement>(this.#wrapper, 'title');
	}

	#processOptions({title, onClick}: OpenOptions) {
		if (title) {
			this.#title!.textContent = title;
		}

		if (onClick) {
			this.#button!.addEventListener('click', onClick);
		}
	}

	#addListeners() {
		this.#wrapper!.addEventListener('click', this.#handleClick);
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
