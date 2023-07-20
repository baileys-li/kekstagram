import { api } from '../api';
import { errorModal } from '../status-modals';
import { initThumbnailSorting } from './sorts';

api
	.getPhotos()
	.then(initThumbnailSorting)
	.catch(() =>
		errorModal.open({
			title: 'Не удалось загрузить фотографии',
			onClick: () => location.reload(),
		})
	);
