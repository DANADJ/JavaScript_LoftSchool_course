/*Функция на вход принимает два аргумента: Массив и число(индекс элемента массива с которого нужно выводит массив на экран)*/

/*Вариант с проверкой вводимых данных*/
function consoleRec(array, something) {
	if (array === undefined || something === undefined) {
		console.log('Не хватает аргументов! Вернитесь и вызовите функцию с аргументами!');
	} else {
		if (!array[0]) {
			console.log('Первый аргумент должен быть массивом! Вернитесь и введите корректные данные!');
		} else {
			if (isNaN(something)) {
				console.log('Второй аргумент должен быть целым числом! Вернитесь и введите корректные данные!');
			} else {
				if (something < 0) {
					console.log('Второй аргумент не должен быть меньше ноля! Вернитесь и введите корректные данные!');
				} else {
					if (array[something]) {
						console.log(array[something]);
						var i = something + 1;
						consoleRec(array, i);
					} else {
						console.log('Функция успешно отработала!');
					}
				}
			}
		}
	}
}
/*/!*Вариант без проверки вводимых данных*!/
function consoleRec(array, something) {
	if (array[something]) {
		console.log(array[something]);
		var i = something + 1;
		consoleRec(array, i);
	}
}*/

//consoleRec(["Я", "умею", "писать", "рекурсивные", "функции."], 0);

module.exports = consoleRec;