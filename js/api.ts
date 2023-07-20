import { Photo } from './types';

const Method = {
	GET: 'GET',
	POST: 'POST',
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

class KekstagramAPI {
	#baseUrl = 'https://22.javascript.pages.academy/kekstagram';

	async fetch(route: string, method: Method = 'GET', body?: BodyInit) {
		const response = await fetch(`${this.#baseUrl}${route}`, { method, body });

		if (!response.ok) {
			throw new Error();
		}

		return response.json();
	}

	async getPhotos() {
		try {
			return await this.fetch('/data') as Photo[];
		} catch (error) {
			throw new Error('Не удалось загрузить данные. Попробуйте обновить страницу');
		}
	}

	async sendPhoto(body: FormData) {
		try {
			return await this.fetch('/', 'POST', body);
		} catch (error) {
			throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
		}
	}
}

export const api = new KekstagramAPI();
