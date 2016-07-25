/*
 Задача:
 Загрузить города при помощи AJAX из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json (сервер поддерживает AJAX
 CORS)
 Отсортировать города по алфавиту и вывести на странице.
 Использование промисов обязательно.
 Запрещено использование любых библиотек (включая jQuery) и фреймворков.
 */


/*Функция AJAX запроса возвращающая Promis*/
function getCityFromJSON(url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = 'json';
		xhr.addEventListener('load', ()=> {
			resolve(xhr.response);
		});
		xhr.addEventListener('error', ()=> {
			reject();
		});
		xhr.send();
	})
}

/*Функция проверки принятых данных от сервера*/
function verify(arr) {
	var body = document.body,
		newElem;

	if (!arr) {
		throw new Error('Нет данных для обработки.');
	}

	if (!(arr instanceof Array)) {
		throw new Error('Принятый аргумент не массив.');
	}

	if (arr.length == 0) {
		newElem = document.createElement('DIV');
		newElem.innerText = 'Массив пуст.';
		body.appendChild(newElem);
	} else {
		onScreen(arr)
	}
}

/*Функция обработки ответа от сервера*/
function onScreen(arr) {
	var realArr = [],
		realArrSort,
		body = document.body,
		newElem = document.createElement('OL');

	for (var i = 0; i < arr.length; i++) {
		realArr.push(arr[i].name);
	}

	realArrSort = realArr.sort();

	for (var x = 0; x < realArrSort.length; x++) {
		var li = document.createElement('LI');
		li.innerText = realArrSort[x];
		newElem.appendChild(li);
	}

	body.appendChild(newElem);
}

var getJSON = getCityFromJSON('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');

getJSON.then((answer)=> {
	verify(answer);
}, ()=> {
	throw new Error('Данные не загрузились.');
});