export function filterArrayForPage(
	arr: unknown[],
	page: number,
	itemsPerPage: number
) {
	const newArr = [];

	for (let i = 0; i < arr.length; i++) {
		if (i >= (page - 1) * itemsPerPage && i < page * itemsPerPage) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
