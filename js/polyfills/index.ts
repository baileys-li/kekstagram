const isToSortedSupported = 'toSorted' in Array.prototype;
if (!isToSortedSupported) {
	Array.prototype.toSorted = function (compareFn) {
		return [...this].sort(compareFn);
	};
}
