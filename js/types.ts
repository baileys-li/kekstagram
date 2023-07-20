interface PhotoComment {
	id: number;
	avatar: `img/avatar-${number}.svg`,
	message: string;
	name: string;
}

interface Photo {
	id: number;
	url: `photos/${number}.jpg`
	description: string;
	likes: number;
	comments: PhotoComment[];
}

export type { PhotoComment, Photo };
