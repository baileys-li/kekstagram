import { bench } from 'vitest';

bench('normal sorting', () => {
	const x = [1, 5, 4, 2, 3];
	x.sort((a, b) => a - b);
}, { time: 1000 });

// describe('Тестируем производительность Палиндромов', () => {
// 	const manyCases = Array.from({length: 100}, () => 'ДовОд');
// 	bench('isPalindrome: На множестве кейсов', () => manyCases.forEach(isPalindrome));
// 	bench('isPalindromeOptimized: На множестве кейсов', () => manyCases.forEach(isPalindromeOptimized));
// 	const longString = 'Лёша на полке клопа нашёл '.repeat(20);

// 	bench('isPalindrome: Для длинной строки', () => {
// 		isPalindrome(longString);
// 	});
// 	bench('isPalindromeOptimized: Для длинной строки', () => {
// 		isPalindromeOptimized(longString);
// 	});
// });

