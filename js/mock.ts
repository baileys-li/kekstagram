import { createRandomIdGenerator, getRandomElement, getRandomInteger } from './random';
import { Photo, PhotoComment } from './types';

const enum Default {
	AMOUNT = 25,
	MIN_LIKES = 15,
	MAX_LIKES = 200,
}

const enum Avatar {
	MIN_ID = 1,
	MAX_ID = 6,
}

const COMMENT_TEXTS = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Артем', 'Андрей', 'Александр', 'Алексей', 'Антон', 'Анна', 'Алиса', 'Алена', 'Алина'];

const generateCommentID = createRandomIdGenerator();
const generatePhotoID = createRandomIdGenerator(1, Default.AMOUNT);

const mockComment = (): PhotoComment => ({
	id: generateCommentID(),
	avatar: `img/avatar-${getRandomInteger(Avatar.MIN_ID, Avatar.MAX_ID)}.svg`,
	message: getRandomElement(COMMENT_TEXTS),
	name: getRandomElement(NAMES),
});

const mockPhoto = (): Photo => {
	const id = generatePhotoID();
	return {
		id,
		url: `photos/${id}.jpg`,
		description: 'Тестовое фото',
		likes: getRandomInteger(Default.MIN_LIKES, Default.MAX_LIKES),
		comments: Array.from({ length: getRandomInteger(0, 30) }, mockComment),
	};
};

const photos = Array.from({ length: Default.AMOUNT }, mockPhoto);

export { photos };
