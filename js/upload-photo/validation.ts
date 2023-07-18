import Pristine from 'pristinejs';
import { form } from './elements';



export const pristine = new Pristine(form!, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper'
});

let hashtagsError = '';

const validateHashtags = (value: string) => {
	console.log(value);

	if (value === '2') {
		hashtagsError = 'Custom error message';
		return false;
	}

	if (value === '3') {
		hashtagsError = 'Anoter custom error message';
		return false;
	}

	return true;
}

pristine.addValidator(form!.hashtags, validateHashtags, () => hashtagsError);


