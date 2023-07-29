import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.min.css';
import { customSliderWrapper, effectsWrapper, form, image, sliderFieldset } from './elements';
import { EFFECT_OPTION_MAP } from './effect-map';

const CHANGE_EVENT = new Event('change');

const slider = noUiSlider.create(customSliderWrapper!, {
	...EFFECT_OPTION_MAP.none.slider,
	connect: 'lower',
});

sliderFieldset!.hidden = true;

effectsWrapper?.addEventListener('change', () => {
	const effect = form!.effect.value;

	sliderFieldset!.hidden = effect === 'none';
	slider.updateOptions(EFFECT_OPTION_MAP[effect].slider, false);
});

slider.on('update', () => {
	const value = slider.get() as number;
	form!['effect-level'].value = String(value);
	const currentEffect = form!.effect.value;

	if (currentEffect === 'none') {
		return image!.style.removeProperty('filter');
	}

	const filter = EFFECT_OPTION_MAP[currentEffect].filter!;
	image!.style.filter = filter(value);
});

export const resetEffect = () => {
	form!.effect.value = 'none';
	effectsWrapper!.dispatchEvent(CHANGE_EVENT);
};
