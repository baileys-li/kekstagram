import Pristine from 'pristinejs';
import { form } from './elements';
import { isUniqueArray } from '../utils';

const enum Hashtags {
	MAX_COUNT = 5,
	MAX_COUNT_ERROR = 'Нельзя указать больше пяти хэш-тегов',
	UNIQUE_ERROR = 'Один и тот же хэш-тег не может быть использован дважды',
	HASH_START_ERROR = 'Хэштег должен начинаться с #',
	LENGTH_ERROR = 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
	CHARACTERS_ERROR = 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы спецсимволы и т п символы пунктуации тире дефис запятая и т п эмодзи и т д',
	ONLY_HASH_ERROR = 'Хеш-тег не может состоять только из одной решётки',
	MAX_LENGTH = 20
}

const enum Description {
	MAX_LENGTH = 140,
}

const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/;

export const pristine = new Pristine(form!, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper',
});

let hashtagsError = '';

const validateHashtags = (value: string) => {
	/** @hint потому что не required */
	if (!value.length) {
		return true;
	}

	const tags = value
		.trim()
		.toLocaleLowerCase()
		.split(/\s*(?=#)/);

	if (tags.length > Hashtags.MAX_COUNT) {
		hashtagsError = Hashtags.MAX_COUNT_ERROR;
		return false;
	}

	if (!isUniqueArray(tags)) {
		hashtagsError = Hashtags.UNIQUE_ERROR;
		return false;
	}

	return tags.every((tag) => {
		if (tag[0] !== '#') {
			hashtagsError = Hashtags.HASH_START_ERROR;
			return false;
		}

		if (tag.length > Hashtags.MAX_LENGTH) {
			hashtagsError = Hashtags.LENGTH_ERROR;
			return false;
		}

		if (tag === '#') {
			hashtagsError = Hashtags.ONLY_HASH_ERROR;
			return false;
		}

		if (!HASHTAG_REG_EXP.test(tag)) {
			hashtagsError = Hashtags.CHARACTERS_ERROR;
			return false;
		}

		return true;
	});
};

pristine.addValidator(form!.hashtags, validateHashtags, () => hashtagsError);
pristine.addValidator(
	form!.description,
	(value: string) => value.length <= Description.MAX_LENGTH,
	`Максимальная длина комментария ${Description.MAX_LENGTH} символов`
);

const validate = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { validate, resetValidation };
