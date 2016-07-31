var myModul = (function () {

	var ol = document.querySelector('.cities'),
		input = document.getElementById('city');

	/*Функция подгрузки данных по AJAX*/
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
		if (!arr) {
			throw new Error('Нет данных для обработки.');
		}
		if (!(arr instanceof Array)) {
			throw new Error('Принятый аргумент не массив.');
		}
		if (arr.length !== 0) {
			return JSONtoARR(arr);
		}
	}

	/*Функция преобразования ответа JSON в обычный массив*/
	function JSONtoARR(arr) {
		var realArr = [],
			realArrSort;
		for (var i = 0; i < arr.length; i++) realArr.push(arr[i].name);
		realArrSort = realArr.sort();
		return realArrSort;
	}

	/*Функция установки класса hidden*/
	function addHidden(arr) {
		arr.forEach((elem)=> {
			elem.className = 'hidden'
		});
	}

	/*Функция вывода возможных вариантов*/
	function onScreen(arr) {
		var strInput = input.value.toLowerCase();
		var cities = document.querySelectorAll('li');
		addHidden(cities);
		if (input.value != '') {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].toLowerCase().startsWith(strInput)) {
					document.getElementById(arr[i].toLowerCase()).classList.toggle('hidden');
				}
			}
		} else {
			addHidden(cities);
		}
	}

	/*Функция создания списка в DOM*/
	function addLi(arr) {
		for (var i = 0; i < arr.length; i++) {
			var li = document.createElement('LI');
			li.innerText = arr[i];
			li.className = 'hidden';
			li.id = arr[i].toLowerCase();
			ol.appendChild(li);
		}
	}

	/*Функция отслеживания событий*/
	function _setUpListners(realArr) {
		var arr = realArr;
		input.addEventListener('input', function (e) {
			e.preventDefault();
			onScreen(arr);
		});
		ol.addEventListener('click', function (e) {
			e.preventDefault();
			input.value = e.target.innerText;
			onScreen(arr);
			var elem = e.target;
			elem.className = 'hidden';
		});
	}

	/*Функция инициализации модуля*/
	function init() {
		var getJSON = getCityFromJSON('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
		getJSON.then((answer)=> {
			var realArr = verify(answer);
			addLi(realArr);
			_setUpListners(realArr);
		}, ()=> {
			throw new Error('Данные не загрузились.');
		});

	}

	return {
		init: init
	}

})();

myModul.init();