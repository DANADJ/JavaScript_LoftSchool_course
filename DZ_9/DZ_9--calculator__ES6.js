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

/*Класс Калькулятор (родитель)*/
class Calculator {
	constructor(param) {//Создаю конструктор и запоминаю переданоое число в виде свойства в возвращаемом объекте
		if (isNaN(parseFloat(param))) {
			throw new Error('Передаваемый параметр не число.');
		}
		this.number = parseFloat(param);
	}

	//Добавляю классу Калькулятор метод сложения
	sum() {
		let res = this.number;
		for (let i = 0; i < arguments.length; i++) {
			if (isNaN(parseFloat(arguments[i]))) {
				throw new Error('Один из слогаемых не число. Вернитесь и введите корректные данные.')
			}
			res += parseFloat(arguments[i]);
		}
		return res;
	}

//Добавляю классу Калькулятор метод вычитания
	dif() {
		let res = this.number;
		for (let i = 0; i < arguments.length; i++) {
			if (isNaN(parseFloat(arguments[i]))) {
				throw new Error('Один из вычитаемых не число. Вернитесь и введите корректные данные.')
			}
			res -= parseFloat(arguments[i]);
		}
		return res;
	}

//Добавляю классу Калькулятор метод деления
	div() {
		let res = this.number;
		for (let i = 0; i < arguments.length; i++) {
			if (isNaN(parseFloat(arguments[i]))) {
				throw new Error('Один из делителей не число. Вернитесь и введите корректные данные.')
			}
			if (parseFloat(arguments[i]) === 0) {
				throw new Error('Один из делителей равен "0". А на ноль делить нельзя!');
			}
			res /= parseFloat(arguments[i]);
		}
		return res;
	}

//Добавляю классу Калькулятор метод умножения
	mul() {
		let res = this.number;
		for (let i = 0; i < arguments.length; i++) {
			if (isNaN(parseFloat(arguments[i]))) {
				throw new Error('Один из множителей не число. Вернитесь и введите корректные данные.')
			}
			res *= parseFloat(arguments[i]);
		}
		return res;
	}
}

/*Класс Квадратный калькулятор (наследник) наследуется от класса Калькулятор*/
class SqrCalc extends Calculator {

//Добавление наследнику метода возведения в квадрат
	sqr(method, arg) {
		let res = method.apply(this, arg);
		return res * res;
	}

//Переопределение метода сложения у наследника
	sum() {
		return this.sqr(super.sum, arguments);
	}

//Переопределение метода вычитания у наследника
	dif() {
		return this.sqr(Calculator.prototype.dif, arguments);
	}

//Переопределение метода деления у наследника
	div() {
		return this.sqr(super.div, arguments)
	}

//Переопределение метода сумножения у наследника
	mul() {
		return this.sqr(super.mul, arguments);
	}
}

module.exports = SqrCalc;