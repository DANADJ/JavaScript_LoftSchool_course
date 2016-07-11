function calculator(firstNumber) {
	if(isNaN(parseFloat(firstNumber))){
		throw new Error('Передаваемый параметр не число.');
	}
	return {
		firstNumber: parseFloat(firstNumber),
		sum: function () {
			let res = this.firstNumber;
			for (let i = 0; i < arguments.length; i++) {
				if (isNaN(parseFloat(arguments[i]))){
					throw new Error ('Один из делителей не число. Вернитесь и введите корректные данные.')
				}
				res += parseFloat(arguments[i]);
			}
			return res;
		},
		dif: function () {
			let res = this.firstNumber;
			for (let i = 0; i < arguments.length; i++) {
				if (isNaN(parseFloat(arguments[i]))){
					throw new Error ('Один из делителей не число. Вернитесь и введите корректные данные.')
				}
				res -= parseFloat(arguments[i]);
			}
			return res;
		},
		div: function () {
			let res = this.firstNumber;
			for (let i = 0; i < arguments.length; i++) {
				if (isNaN(parseFloat(arguments[i]))){
					throw new Error ('Один из делителей не число. Вернитесь и введите корректные данные.')
				}
				if(parseFloat(arguments[i]) === 0){
					throw new Error('Один из делителей равен "0". А на ноль делить нельзя!');
				}
				res /= parseFloat(arguments[i]);
			}
			return res;
		},
		mul: function () {
			let res = this.firstNumber;
			for (let i = 0; i < arguments.length; i++) {
				if (isNaN(parseFloat(arguments[i]))){
					throw new Error ('Один из делителей не число. Вернитесь и введите корректные данные.')
				}
				res *= parseFloat(arguments[i]);
			}
			return res;
		}
	};
}
module.exports = calculator;