import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.min.css';
import { customSliderWrapper } from './elements';


noUiSlider.create(customSliderWrapper!, {
	range: {
		min: 0,
		max : 100,
	},
	start: 0,
	step: 1,
	connect: 'lower',
});
