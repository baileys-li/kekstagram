import { photos } from './mock';

const findPhotoByID = (id: number) => photos.find((photo) => photo.id === id);
export { photos, findPhotoByID };
