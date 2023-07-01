import { describe, expect, it } from 'vitest';
import { photos } from '.';

describe('Тестрируем моки', () => {
	const expectedAmount = photos.length;
	let commentAmount = 0;
	const uniqueIDs = new Set<number>();
	const uniqueCommentIDs = new Set<number>();

	photos.forEach(({ id, comments }) => {
		uniqueIDs.add(id);
		commentAmount += comments.length;
		comments.forEach((comment) => uniqueCommentIDs.add(comment.id));
	});

	it('У каждой фотографии уникальный ID', () => expect(expectedAmount).toBe(uniqueIDs.size));

	it('У каждого комментария уникальный ID', () => expect(commentAmount).toBe(uniqueCommentIDs.size));
});
