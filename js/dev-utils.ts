/* eslint-disable no-console */

const testPerformance = (test: () => unknown, string = 'Тестируется') => {
	console.time(string);
	test();
	console.timeEnd(string);
};

export {testPerformance};
