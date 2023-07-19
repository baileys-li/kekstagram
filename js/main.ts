import { api } from './api';
import {renderThumbnails} from './posts/thumbnails';
import './upload-photo';

renderThumbnails(await api.getPhotos());
