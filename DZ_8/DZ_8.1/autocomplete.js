/*
 После загрузки страницы, происходит загрузка городов через AJAX.
 Города сортируются по имени и выводятся на странице при помощи шаблонизатора Handlebars.
 При вводе значений в текстовое поле, должны скрываться те города, в названии которых нет подстроки, указанной в текстовом поле.
* */

var myModul = (function () {

	var ol = document.querySelector('.cities'),
		input = document.getElementById('city');

	/*Функция проверки статуса загрузки страницы*/
	function pageLoaded () {
		return new Promise(function(resolve){
			if(document.readyState == 'cpmpelete'){
				resolve();
			} else {
				window.onload = resolve;
			}
		});
	}

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
	function delHidden(arr) {
		arr.forEach((elem)=> {
			elem.className = ''
		});
	}

	/*Функция вывода возможных вариантов*/
	function onScreen(arr) {
		var strInput = input.value.toLowerCase();
		var cities = document.querySelectorAll('li');
		delHidden(cities);
		if (input.value != '') {
			for (var i = 0; i < arr.length; i++) {
				if (!arr[i].toLowerCase().startsWith(strInput)) {
					document.getElementById(arr[i].toLowerCase()).classList.toggle('hidden');
				}
			}
		} else {
			delHidden(cities);
		}
	}

	/*Функция создания списка в DOM*/
	function addLi(arr) {
		var source = document.getElementById('city-list').innerHTML,
			templateFn = Handlebars.compile(source);
		document.getElementById('cities').innerHTML = templateFn({list: arr});
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
		pageLoaded().then(function(){
			return getCityFromJSON('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
		}).then(function(answer){
			var realArr = verify(answer);
			addLi(realArr);
			_setUpListners(realArr);
		}, function(){
			throw new Error('Данные не загрузились.');
		});
	}

	return {
		init: init
	}

})();

myModul.init();