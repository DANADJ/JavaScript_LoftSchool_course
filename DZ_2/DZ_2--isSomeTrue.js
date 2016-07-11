function isSomeTrue(sourse, filterFn) {
	if (!(sourse instanceof Array)) {
		throw new Error('Первый аргумент не массив.');
	}
	if (sourse.length === 0) {
		throw new Error('Пустой массив.');
	}
	if (!(filterFn instanceof Function)) {
		throw new Error('Пустой массив.');
	}
	for (let i = 0; i < sourse.length; i++) {
		if (filterFn(sourse[i])) return true;
	}
	return false;
}
module.exports = isSomeTrue;