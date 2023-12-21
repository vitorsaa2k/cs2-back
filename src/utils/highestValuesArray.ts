function selectHighestValues(arr1: any[], arr2: any[]) {
	var minLength = Math.min(arr1.length, arr2.length);
	var maxLength = Math.max(arr1.length, arr2.length);
	var longestArrayIndex = arr1.length > arr2.length ? 0 : 1;
	var _arr = [];
	for (var i = 0; i < minLength; i++) {
		_arr[i] = Math.max(arr1[i], arr2[i]);
	}
	if (maxLength > minLength) {
		var sliced = Array.prototype.slice.call(
			arguments[longestArrayIndex],
			minLength,
			maxLength
		);
		_arr = Array.prototype.concat.call(_arr, sliced);
	}
	return _arr;
}

export { selectHighestValues };
