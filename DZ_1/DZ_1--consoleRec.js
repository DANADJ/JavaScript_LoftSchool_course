/*Функция на вход принимает два аргумента: Массив и число(индекс элемента массива с которого нужно выводит массив на экран)*/

/*Вариант с проверкой вводимых данных*/
function consoleRec(array, something) {

	let argument2 = parseInt(something);

	if (array === undefined || something === undefined) {
		throw new Error('Не хватает аргументов! Вернитесь и вызовите функцию с аргументами!');
	}
	if (!(array instanceof Array)) {
		throw new Error('Первый аргумент не является массивом! Вернитесь и введите корректные данные!');
	}
	if (array.length === 0) {
		throw new Error('Передаваемый массив пуст! Вернитесь и введите корректные данные!');
	}
	if (isNaN(argument2)) {
		throw new Error('Второй аргумент не является числом! Вернитесь и введите корректные данные!');
	}
	if (argument2 < 0) {
		throw new Error('Второй аргумент не должен быть меньше "0"! Вернитесь и введите корректные данные!');
	}
	if (argument2 > array.length - 1) {
		throw new Error('Второй аргумент больше чем длина массива! Вернитесь и введите корректные данные!');
	}

	console.log(array[argument2]);
	argument2++;

	if(argument2 <= array.length -1 ) consoleRec(array, argument2);
}

module.exports = consoleRec;