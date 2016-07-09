function calculator(firstNumber) {
	return {
		firstNumber: firstNumber,
		sum: function () {
			var res = this.firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] !== 'number'){
					throw new Error ('Один из делителей не число. Вернитесь и введите корректные данные.')
				}
				res += arguments[i];
			}
			return res;
		},
		dif: function () {
			var res = this.firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] !== 'number'){
					throw new Error ('Один из делителей не число. Вернитесь и введите корректные данные.')
				}
				res -= arguments[i];
			}
			return res;
		},
		div: function () {
			var res = this.firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] !== 'number'){
					throw new Error ('Один из делителей не число. Вернитесь и введите корректные данные.')
				}
				if(arguments[i] === 0){
					throw new Error('Один из делителей равен "0". А на ноль делить нельзя!');
				}
				res /= arguments[i];
			}
			return res;
		},
		mul: function () {
			var res = this.firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] !== 'number'){
					throw new Error ('Один из делителей не число. Вернитесь и введите корректные данные.')
				}
				res *= arguments[i];
			}
			return res;
		}
	};
}
module.exports = calculator;