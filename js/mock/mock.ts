import { createRandomIdGenerator, getRandomElement, getRandomInteger } from '../utils/random';
import { Photo, PhotoComment } from '../types';

const enum Default {
	AMOUNT = 25,
	MIN_LIKES = 15,
	MAX_LIKES = 200,
	TEXTS_MIN = 1,
	TEXTS_MAX = 3,
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

const DESCRIPTIONS = [
	'Волшебство природы: погрузись в мир цветов и ароматов 🌸',
	'Встречайте новый день с улыбкой! 😄☀️',
	'Окунись в море приключений и открой новые горизонты 🌊⛰️',
	'Лучший способ расслабиться – наслаждаться прекрасными видами природы 🌿✨',
	'Сделайте место в своей жизни для искусства и вдохновения 🎨🖌️',
	'Вместе с друзьями каждый момент становится незабываемым! 👭❤️',
	'Вкусная жизнь: насладись моментом и изысканными вкусами 🍽️😋',
	'Путешествуй с открытым сердцем и душой – мир полон удивительных открытий ✈️🌍',
	'Загадочность ночного города: исследуй его скрытые уголки и секреты 🌃🔍',
	'Следуй за своими мечтами и никогда не останавливайся! 💫🌟',
];

const NAMES = ['Артем', 'Андрей', 'Александр', 'Алексей', 'Антон', 'Анна', 'Алиса', 'Алена', 'Алина'];

const generateCommentID = createRandomIdGenerator();
const generatePhotoID = createRandomIdGenerator(1, Default.AMOUNT);

const getText = (strings: string[]) => Array.from({length: getRandomInteger(Default.TEXTS_MIN, Default.TEXTS_MAX)}, () => getRandomElement(strings)).join('');

const mockComment = (): PhotoComment => ({
	id: generateCommentID(),
	avatar: `img/avatar-${getRandomInteger(Avatar.MIN_ID, Avatar.MAX_ID)}.svg`,
	message: getText(COMMENT_TEXTS),
	name: getRandomElement(NAMES),
});

const mockPhoto = (): Photo => {
	const id = generatePhotoID();
	return {
		id,
		url: `photos/${id}.jpg`,
		description: getText(DESCRIPTIONS),
		likes: getRandomInteger(Default.MIN_LIKES, Default.MAX_LIKES),
		comments: Array.from({ length: getRandomInteger(0, 30) }, mockComment),
	};
};

const photos = Array.from({ length: Default.AMOUNT }, mockPhoto);

export { photos };
