
if ('toSorted' in Array.prototype) {
	Array.prototype.toSorted = function (compareFn) {
		return [...this].sort(compareFn);
	};
}
