import { api } from './api';
import {renderThumbnails} from './posts/thumbnails';
import { errorModal } from './status-modals';
import './upload-photo';

try {
	const photos = await api.getPhotos();
	renderThumbnails(photos);
} catch (error) {
	errorModal.open({
		title: 'Не удалось загрузить фотографии',
		onClick: () => location.reload(),
	});
}

