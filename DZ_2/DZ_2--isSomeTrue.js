function isSomeTrue(sourse, filterFn) {
	if (sourse.length === 0) {
		throw new Error('Пустой массив.')
	}
	var isSomeTrueRes = false;
	for (var i = 0; i < sourse.length; i++) {
		var localRes = filterFn(sourse[i]);
		if (localRes === true) {
			isSomeTrueRes = true;
		}
	}
	return isSomeTrueRes;
}
module.exports = isSomeTrue;