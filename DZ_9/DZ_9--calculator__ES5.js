/*
 Необходимо модифицировать калькулятор следующим образом:
 Превратить калькулятор в Класс (конструктор + прототип)
 Создать класс SqrCalc и унаследовать его от оригинального калькулятора.
 SqrCalc должен расширять все методы оригинального калькулятора таким образом, чтобы возводить в квадрат результат всех расчетов. Например:

 let myCalculator = new SqlCalc(100);

 console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
 console.log(myCalculator.dif(10, 20)); //вернет 4 900
 console.log(myCalculator.div(2, 2)); //вернет 625
 console.log(myCalculator.mul(2, 2)); //вернет 160 000


 Обратите внимание, что не должно быть дублирования кода из методов оригинального калькулятора. Необходимо применить наследование.
 Задачу необходимо выполнить в двух вариантах: ES5 и ES6
 */

/*Функция-конструктор Калькулятор (родитель)*/
function Calculator(param) {//Создаю конструктор и запоминаю переданоое число в виде свойства в возвращаемом объекте
	if (isNaN(parseFloat(param))) {
		throw new Error('Передаваемый параметр не число.');
	}
	this.number = parseFloat(param);
}

//Добавляю в прототип Калькулятора метод сложения
Calculator.prototype.sum = function () {
	var res = this.number;
	for (var i = 0; i < arguments.length; i++) {
		if (isNaN(parseFloat(arguments[i]))) {
			throw new Error('Один из делителей не число. Вернитесь и введите корректные данные.')
		}
		res += parseFloat(arguments[i]);
	}
	return res;
};

//Добавляю в прототип Калькулятора метод вычитания
Calculator.prototype.dif = function () {
	var res = this.number;
	for (var i = 0; i < arguments.length; i++) {
		if (isNaN(parseFloat(arguments[i]))) {
			throw new Error('Один из делителей не число. Вернитесь и введите корректные данные.')
		}
		res -= parseFloat(arguments[i]);
	}
	return res;
};

//Добавляю в прототип Калькулятора метод деления
Calculator.prototype.div = function () {
	var res = this.number;
	for (var i = 0; i < arguments.length; i++) {
		if (isNaN(parseFloat(arguments[i]))) {
			throw new Error('Один из делителей не число. Вернитесь и введите корректные данные.')
		}
		if (parseFloat(arguments[i]) === 0) {
			throw new Error('Один из делителей равен "0". А на ноль делить нельзя!');
		}
		res /= parseFloat(arguments[i]);
	}
	return res;
};

//Добавляю в прототип Калькулятора метод умножения
Calculator.prototype.mul = function () {
	var res = this.number;
	for (var i = 0; i < arguments.length; i++) {
		if (isNaN(parseFloat(arguments[i]))) {
			throw new Error('Один из делителей не число. Вернитесь и введите корректные данные.')
		}
		res *= parseFloat(arguments[i]);
	}
	return res;
};

/*Функция-конструктор Квадратный калькулятор  (наследник)*/
function SqrCalc(param) {
	Calculator.call(this, param);//Наследование свойств родителя
}

SqrCalc.prototype = Object.create(Calculator.prototype);//Наследование прототипа родителя

//Добавление наследнику функции возведения в квадрат
SqrCalc.prototype.sqr = function(method, arg){
	var res = method.apply(this, arg);
	return res * res;
};

//Переопределение метода сложения у наследника
SqrCalc.prototype.sum = function () {
	return this.sqr(Calculator.prototype.sum, arguments);
};

//Переопределение метода вычитания у наследника
SqrCalc.prototype.dif = function () {
	return this.sqr(Calculator.prototype.dif, arguments);
};

//Переопределение метода деления у наследника
SqrCalc.prototype.div = function () {
	return this.sqr(Calculator.prototype.div, arguments);
};

//Переопределение метода сумножения у наследника
SqrCalc.prototype.mul = function () {
	return this.sqr(Calculator.prototype.mul, arguments);
};

module.exports = SqrCalc;