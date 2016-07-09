function isAllTrue(sourse, filterFn) {
	if (sourse.length === 0) {
		throw new Error('Пустой массив.')
	}
	var isAllTrueRes = true;
	for (var i = 0; i < sourse.length; i++) {
		var localRes = filterFn(sourse[i]);
		if (localRes === false) {
			isAllTrueRes = false;
		}
	}
	return isAllTrueRes;
}
module.exports = isAllTrue;