/// <reference types="vite/client" />

declare module 'pristinejs' {
	export default Pristine;
}

interface Array<T> {
	toSorted(compareFn: (a: T, b: T) => number): T[];
}
