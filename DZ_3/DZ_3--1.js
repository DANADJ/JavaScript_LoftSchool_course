/*Метод ForEach*/
function forEach(arr, func, thisArg) {
	if (arguments.length <= 1) {
		throw new Error('Для работы функции не хватает аргументов.');
	}
	if (!(arr instanceof Array)) {
		throw new Error('Первый аргумент не является массивом.');
	}
	if (!(func instanceof Function)) {
		throw new Error('Второй аргумент не является функцией.');
	}
	if (arr.length === 0) {
		return;
	}
	let rangeArgArr = arr.length,//запоминаю диапазон элементов массива на момент вызова функции forEach,
	//для того чтобы не обрабатывать элементы добавленные в массив после вызова функции forEach
		argFunc = func;//создаю локальную копию переданной callback функции для возможности изменения её значения this и
					   //избегания ветвления кода через конструкцию if else
	if (arguments.length >= 3) {//если в функцию forEach передан третий параметр,
		argFunc = func.bind(thisArg);//то присваиваю парамеру this функции callback значение этого параметра
	}
	for (let i = 0; i < rangeArgArr; i++) {//начинаю перебор того диапазона элементов масива, который был передан в функцию при её вызове
		if (i in arr) {//если элемент есть в массиве,
			argFunc(arr[i], i, arr);//  вызываю переданную callback функцию для этого элемента массива
		}
	}
}

/*Метод Filter*/
function filter(arr, func, thisArg) {
	if (arguments.length <= 1) {
		throw new Error('Для работы функции не хватает аргументов.');
	}
	if (!(arr instanceof Array)) {
		throw new Error('Первый аргумент не является массивом.');
	}
	if (!(func instanceof Function)) {
		throw new Error('Второй аргумент не является функцией.');
	}
	let newArr = [],
		argFunc = func;//создаю локальную копию переданной callback функции для возможности изменения её значения this и
					   //избегания ветвления кода через конструкцию if else
	if (arr.length === 0) {
		return newArr;
	}
	if (arguments.length >= 3) {//если в функцию forEach передан третий параметр,
		argFunc = func.bind(thisArg);//то присваиваю парамеру this функции callback значение этого параметра
	}
	for (let i = 0; i < arr.length; i++) {
		if (i in arr) {
			if (argFunc(arr[i], i, arr)) {
				newArr[newArr.length] = arr[i];
			}
		}
	}
	return newArr;
}

/*Метод Map*/
function map(arr, func, thisArg) {
	if (arguments.length <= 1) {
		throw new Error('Для работы функции не хватает аргументов.');
	}
	if (!(arr instanceof Array)) {
		throw new Error('Первый аргумент не является массивом.');
	}
	if (!(func instanceof Function)) {
		throw new Error('Второй аргумент не является функцией.');
	}
	let newArr = [],
		rangeArgArr = arr.length,//запоминаю диапазон элементов массива на момент вызова функции forEach,
								 //для того чтобы не обрабатывать элементы добавленные в массив после вызова функции forEach
		argFunc = func;//создаю локальную копию переданной callback функции для возможности изменения её значения this и
					   //избегания ветвления кода через конструкцию if else
	if (arr.length === 0) {
		return newArr;
	}
	if (arguments.length >= 3) {//если в функцию forEach передан третий параметр,
		argFunc = func.bind(thisArg);//то присваиваю парамеру this функции callback значение этого параметра
	}
	for (let i = 0; i < rangeArgArr; i++) {//начинаю перебор того диапазона элементов масива, который был передан в функцию при её вызове
		if (i in arr) {//если элемент есть в массиве,
			newArr[newArr.length] = argFunc(arr[i], i, arr);//записываю результат вызова переданной callback функции для этого элемента массива
			//в новый элемент нового массива
		}
	}
	return newArr;
}
/*Метод Slice*/
function slice(arr, begin, end) {
	if (arguments.length <= 1) {
		throw new Error('Для работы функции не хватает аргументов.');
	}
	begin = parseInt(begin);
	if (isNaN(begin)) {
		throw new Error('Второй аргумент не является числом.');
	}
	if (!(arr instanceof Array)) {
		throw new Error('Первый аргумент не является массивом.');
	}
	let newArr = [];

	if (begin >= arr.length) {//Если первый аргумент больше или равен длине массива - это означает, что элемента с которого должно
		// начаться копирование массива не существует
		return newArr;//поэтому функция возвращает сразу пустой массив
	}
	function realIndex(argIdx, arr) { //Функция определения реального индекса элемента в массиве. Принимает на вход индекс элемента
		// переданного функции slice  и сам массив.
		let realIndex = argIdx;//локальная копия индекса переданного функции
		if (realIndex < 0) {//если индекс отрицательный
			if (realIndex < arr.length * -1) {//выполняю проверку на то, меньше ли он чем длина всего массива
				realIndex = 0;//если меньше присваиваю элементу индекс 0
			} else {//если больше
				realIndex += arr.length;//вычисляю реальный индек элемента(не отрицательный)
			}
		}
		return realIndex;
	}

	let beginLocal = realIndex(begin, arr),//Создаю локальную переменную с реальным индексом элемента BEGIN в массиве
		endLocal = arr.length;//Создаю индекс элемента END  до которого которым будут копироваться элементы
	//без третьего переданного аргумента равен длине массива

	if (arguments.length >= 3) {//Если функции Slice передан третий аргумент,
		end = parseInt(end);
		if (isNaN(end)) {
			throw new Error('Третий аргумент не является числом.');
		}
		endLocal = realIndex(end, arr);// то тогда узнаю новый реальный индекс элемента END

		if (endLocal > arr.length) {//Если новый END больше длинны массива это означает что скопировать нужно все элементы до конца
			endLocal = arr.length;
		}

		if (endLocal === 0 || beginLocal >= endLocal) {//если новый END == 0 или BEGIN >= END, это значит что индекс END находится левее
			return newArr;//от индекса BEGIN и по факту скопировать ничего не получится, Поэтому возвращаю пустой массив
		}
	}
	for (; beginLocal < endLocal; beginLocal++) {//начинаю перебор массива в выявленном диапазоне
		if (beginLocal in arr) {//если элемент есть в массиве
			newArr[newArr.length] = arr[beginLocal];//Записываю его значение как новый элемент массива
		} else {//елемент в массиве не задан, но индекс есть, я просто увеличиваю блину массива на один индекс, тем самым создавая
			newArr.length++;//дырку в массиве
		}
	}
	return newArr;
}

let arr5 = [0, 10, 20, 8, 30, 40];
function foo5(previousValue, currentValue, index, arr) {
	return previousValue + currentValue;
}
//console.log(arr5.length);
//console.log(arr5);
console.log(arr5.reduce(foo5, 1));
console.log(reduce(arr5, foo5, 1));

/*Метод Reduce*/
function reduce(arr, func, initialValue) {
	if (arguments.length <= 1) {
		throw new Error('Для работы функции не хватает аргументов.');
	}
	if (!(arr instanceof Array)) {
		throw new Error('Первый аргумент не является массивом.');
	}
	if (!(func instanceof Function)) {
		throw new Error('Второй аргумент не является функцией.');
	}
	var amountArgsArr = 0,//флаг - количество реальных элементов в массиве
		singularElem;//значение элемента массива, если он в нём один
	for (let i = 0; i < arr.length; i++) {//проверяю массив на количество реальных элементов
		if (amountArgsArr < 2) {
			if (i in arr) {
				amountArgsArr++;
				if (singularElem === undefined) {
					singularElem = arr[i];
				}
			}
		} else {
			break;//если элементов больше чем 1 прекращаю перебор массива
		}
	}
	if ((amountArgsArr === 0 && arguments.length < 3) || (arr.length === 0 && arguments.length < 3)) {
		throw new Error('Массив пустой c незаданным начальным значение.');//Выбрасываю исключение если массив пустой и без initial Value
	}
	if ((amountArgsArr === 0 && arguments.length >= 3) || (arr.length === 0 && arguments.length >= 3)) {
		return arguments[2];//возвращаю initialValue если массив пустой но есть initialValue
	}
	if (amountArgsArr === 1 && arguments.length < 3) {
		return singularElem;//возвращаю единственный элемент в массиве, если он в нём один и нет initialValue
	}

	let previousValue,// создаю локальные переменные
		currentValueIdx;

	if (arguments.length >= 3) {
		previousValue = initialValue;
		currentValueIdx = 0;
	} else {
		currentValueIdx = 1;
	}
	function clearArr(array) {
		let newArr = [];
		for (let x = 0; x < array.length; x++) {
			if (x in array) {
				newArr[newArr.length] = array[x];
			}
		}
		return newArr;
	}

		for(let i = 0; i < arr.length; i++){
		let newClearArray = clearArr(arr);
		if (currentValueIdx === 0) {
			previousValue = func(previousValue, newClearArray[currentValueIdx], currentValueIdx, arr);
		} else {
			if (previousValue === undefined) {
				previousValue = func(newClearArray[0], newClearArray[currentValueIdx], currentValueIdx, arr);
			} else {
				previousValue = func(previousValue, newClearArray[currentValueIdx], currentValueIdx, arr);
			}
		}
		currentValueIdx++;
		}
	return previousValue;
}