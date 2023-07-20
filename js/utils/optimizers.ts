
const enum Default {
	DELAY = 500,
}

const debounce = <A = unknown, R = void>(callback: (...args: A[]) => R, delay: number = Default.DELAY) => {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: A[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), delay);
	};
};

const throttle = <A = unknown, R = void>(callback: (...args: A[]) => R, delay: number = Default.DELAY) => {
	let shouldWait = false;
	let waitedArgs: A[] | null = null;

	const timeoutFunction = () => {
		if (waitedArgs === null) {
			shouldWait = false;
			return;
		}

		callback(...waitedArgs);
		waitedArgs = null;
		setTimeout(timeoutFunction, delay);
	};

	return (...args: A[]) => {
		if (shouldWait) {
			waitedArgs = args;
			return;
		}

		callback(...args);
		shouldWait = true;
		setTimeout(timeoutFunction, delay);
	};
};

export { debounce, throttle };
