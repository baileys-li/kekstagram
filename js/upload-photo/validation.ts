import Pristine from 'pristinejs';
import { form } from './elements';
import { isUniqueArray } from '../utils';

const enum Hashtags {
	MaxCount = 5,
	MaxCountError = 'Нельзя указать больше пяти хэш-тегов',
	UniqueError = 'Один и тот же хэш-тег не может быть использован дважды',
	HashStartError = 'Хэштег должен начинаться с #',
	LengthError = 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
	CharactersError = 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы спецсимволы и т п символы пунктуации тире дефис запятая и т п эмодзи и т д',
	OnlyHashError = 'Хеш-тег не может состоять только из одной решётки',
}

const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/;

export const pristine = new Pristine(form!, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper',
});

let hashtagsError = '';

const validateHashtags = (value: string) => {
	/** @hint потому что не required */
	if (value.length === 0) {
		return true;
	}

	const tags = value.trim().toLocaleLowerCase().split(' ');

	if (tags.length > Hashtags.MaxCount) {
		hashtagsError = Hashtags.MaxCountError;
		return false;
	}

	if (!isUniqueArray(tags)) {
		hashtagsError = Hashtags.UniqueError;
		return false;
	}

	return tags.every((tag) => {
		if (tag[0] !== '#') {
			hashtagsError = Hashtags.HashStartError;
			return false;
		}

		if (tag.length > 20) {
			hashtagsError = Hashtags.LengthError;
			return false;
		}

		if (tag === '#') {
			hashtagsError = Hashtags.OnlyHashError;
			return false;
		}

		if (!HASHTAG_REG_EXP.test(tag)) {
			hashtagsError = Hashtags.CharactersError;
			return false;
		}


		return true;
	});
};

pristine.addValidator(form!.hashtags, validateHashtags, () => hashtagsError);

const validate = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { validate, resetValidation };
