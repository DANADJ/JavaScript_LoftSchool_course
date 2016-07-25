/**
 Задача:
 Создать модуль, который экспортирует функцию 'timer'.
 Функция 'timer' должна возвращать новый промис.
 Функция 'timer' принимает 1 аргумент - количество миллисекунд, через которые промис должен перейти в состояние 'fulfilled'.

 Пример использования:
 timer(3000).then(() => console.log('я вывелась через 3 секунды'))
 */

function timer(ms){
	return new Promise(function(resolve, reject){
		var time = ms/1000;
		setTimeout(()=>{
			resolve(time);
		}, ms);
	});
}

//Проверка работы функции
//timer(5000).then((time)=>console.log('Я отработала через '+time+' секунд.'));

module.exports = timer;