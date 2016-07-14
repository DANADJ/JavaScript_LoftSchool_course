/*
 Как известно, в js не существует способа проверить идентичность объектов.
 Написав 'objA === objB' мы получим true только в том случае, если objA и objB указывают на один и тот же объект.

 Задача: написать функцию deepEqual, которая принимает в качестве параметров два аргуманта - два объекта.

 Если обе переменные указывают на один и тот же объект, значит оба объекта идентичны.

 Если оба объекта имеют одинаковые свойства и их значения, значит оба объекта идентичны.

 Посмотрите на примеры того, как должна работать фиункция deepEqual:
 */
var objA = {
	prop1: 'value1',
	prop2: 'value2',
	prop3: 'value3',
	prop4: {
		subProp1: 'sub value1',
		subProp2: {
			subSubProp1: 'sub sub value1',
			subSubProp2: [1, 2, {prop2: 1, prop: 2}, 1]
		}
	},
	prop5: 1000,
	prop6: new Date(2016, 3, 10),
	prop7: function () {
		console.log(this.prop1)
	},
	prop8: [1, 2, 3]
};

var objB = {
	prop5: 1000,
	prop3: 'value3',
	prop1: 'value1',
	prop2: 'value2',
	prop6: new Date('2016/03/10'),
	prop7: function () {
		console.log(this.prop1)
	},
	prop4: {
		subProp1: 'sub value1',
		subProp2: {
			subSubProp1: 'sub sub value1',
			subSubProp2: [1, 2, {prop2: 1, prop: 2}, 1]
		}
	},
	prop8: [1, 2, 3]
};

var objC = objA;

console.log(deepEqual(objA, objB)); //объекты идентичны, вернет true
/*
 Не смотря на то, что свойства в objB перемешаны(последовательность свойста в objB отичается от последовательности свойств в objA), функция всё равно вернет true, так как количество свойств, из имена и значения совпадают у обоих объектов.
 Так же обратите вснимание, что deepEqual должна работать рекурсивно.

 Это значит, что если значением какого-то свойства объекта является массив или объект, то начать сверять и их у обоих объектов.

 Если одним из элементов сверяемого массива, является другой массив или объект, то их тоже надо сверить рекурсивно.

 При сверке объектов - последовательность свойств не важна, но при сверке массивов, вашна последовательность элементов, то есть массивы: `[1,2,3,4]` и `[2,1,3,4]` не равны, так как, хотя и имеют одинаковые значения, отличаются в последовательности этих значений.

 Так же обратите внимание, что даты тоже должны сравниваться корректно, не смотря на отличия в способах создания.

 Запрещено использовать сторонние библиотеки типа jQuery, underscore и прочие.

 */

function deepEqual(obj1, obj2) {
	if (arguments.length < 2) {
		throw new Error('Для работы функции не хватает аргументов.');
	}
	if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
		throw new Error('Один или оба аргумента не явлется объектом');
	}
	if (obj1 === obj2) {
		return true;
	}
	let propObj1 = obj1,
		propObj2 = obj2;
	if (!(obj1 instanceof Array) && !(obj2 instanceof Array)) {
		propObj1 = Object.getOwnPropertyNames(obj1).sort();
		propObj2 = Object.getOwnPropertyNames(obj2).sort();
	}
	function comparison(arrPropsObj1, arrPropsObj2, obj1, obj2) {
		if (arrPropsObj1.length === arrPropsObj2.length) {
			for (let i = 0; i < arrPropsObj1.length; i++) {
				if (arrPropsObj1[i] === arrPropsObj2[i]) {
					if (typeof obj1[arrPropsObj1[i]] === typeof obj2[arrPropsObj2[i]]) {
						if (obj1[arrPropsObj1[i]] instanceof Object && obj2[arrPropsObj2[i]] instanceof Object) {
							if (obj1[arrPropsObj1[i]] instanceof Function && obj2[arrPropsObj2[i]] instanceof Function) {
								if (obj1[arrPropsObj1[i]].toString() !== obj2[arrPropsObj2[i]].toString()) return false;
							} else if (obj1[arrPropsObj1[i]] instanceof Date && obj2[arrPropsObj2[i]] instanceof Date) {
								if (obj1[arrPropsObj1[i]].toString() !== obj2[arrPropsObj2[i]].toString()) return false;
							} else {
								deepEqual(obj1[arrPropsObj1[i]], obj2[arrPropsObj2[i]]);
							}
						} else {
							if (obj1[arrPropsObj1[i]] !== obj2[arrPropsObj2[i]]) return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
			return true;
		} else {
			return false;
		}
	}
	let result = comparison(propObj1, propObj2, obj1, obj2);
	console.log('console '+result);
	return result;
}

//console.log([1,2,3].toString() === [1,2,3].toString());