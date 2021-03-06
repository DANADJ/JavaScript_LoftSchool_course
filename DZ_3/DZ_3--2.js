var objA = {
	prop4: {
		subProp1: 'sub value1',
		subProp2: {
			subSubProp1: 'sub sub value1',
			subSubProp2: [1, 2, 4, 5]
		}
	},
	prop5: 1000,
	prop6: new Date(2016, 2, 10),
	prop7: function(){
		console.log(this.prop1);
	},
	prop8: [10,20,30]
};

var objB = {
	prop4: {
		subProp2: {
			subSubProp1: 'sub sub value1',
			subSubProp2: [1, 2, 4, 5]
		},
		subProp1: 'sub value1'
	},
	prop5: 1000,
	prop6: new Date(2016, 2, 10),
	prop7: function(){
		console.log(this.prop1);
	},
	prop8: [10,20,30]
};
console.log(deepEqual(objA, objB)); //объекты идентичны, вернет true

function deepEqual(obj1, obj2) {
	console.log('DEEP');
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
		if (arrPropsObj1.length === arrPropsObj2.length) {//сравниваю длины массивов с именами свойств
			let compRes = true;//Результат работы функции comparison
			for (let i = 0; i < arrPropsObj1.length; i++) {//Перебираю все элементы массивов
				//console.log('comparison - '+arrPropsObj1[i]+' - '+compRes);
				if (arrPropsObj1[i] === arrPropsObj2[i]) {//Сравниваю i элементы в массиве(имена свойств объектов)
					if (typeof obj1[arrPropsObj1[i]] === typeof obj2[arrPropsObj2[i]]) {//Сравниваю типы данных значений в объектах
						if (obj1[arrPropsObj1[i]] instanceof Object && obj2[arrPropsObj2[i]] instanceof Object) {// если тип объект
							if (obj1[arrPropsObj1[i]] instanceof Function && obj2[arrPropsObj2[i]] instanceof Function) {//прверяю на функц
								if (obj1[arrPropsObj1[i]].toString() !== obj2[arrPropsObj2[i]].toString()) {
									compRes = false;//если функции не равны ставлю результату фалсе и выхожу из цикла
									break;
								}
							} else if (obj1[arrPropsObj1[i]] instanceof Date && obj2[arrPropsObj2[i]] instanceof Date) {
								if (obj1[arrPropsObj1[i]].toDateString() !== obj2[arrPropsObj2[i]].toDateString()) {
									compRes = false;//если дата не про не равны ставлю результату фалсе и выхожу из цикла
									break;
								}
							} else {
								compRes = (deepEqual(obj1[arrPropsObj1[i]], obj2[arrPropsObj2[i]]));
								if (!compRes) {//если объект или массив вызываю для него рекурсию и проверяю возвращённое значение
									break;
								}
							}
						} else {
							if (obj1[arrPropsObj1[i]] !== obj2[arrPropsObj2[i]]) {
								compRes = false;
								break;
							}
						}
					} else {
						compRes = false;//если не равны имена свойств
						break
					}
					console.log('comparison - '+arrPropsObj1[i]+' - '+compRes);
				} else {
					compRes = false;//если не равны имена свойств
					break
				}
			}
			return compRes;//возвращаю из comparison когда закончился цикл
		} else {
			return false;//возвращаю из comparison если не равны масивы по длине
		}
	}

	return comparison(propObj1, propObj2, obj1, obj2);
}