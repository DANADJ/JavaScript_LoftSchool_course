/*
 К страничке из предыдущего задания необходимо добавить форму с текстовыми полями и кнопкой "добавить".
 Список текстовых полей:
 - имя
 - значение
 - срок годности (количество дней)

 После нажатия на кнопку "добавить" должна быть создана (и добавлена в таблицу) новая cookie с указанными параметрами. Обратите внимание, что в поле "срок годности" указывается количество дней (начиная с текущего), на протяжении которых будет доступна cookie.

 После добавление cookie, значения текстовых полей формы должны быть очищены.
 Если какое-то из полей формы не заполнено, то, при нажатии на кнопку "добавить", cookie не должна быть создана, а на экран должен быть выведен alert с предупреждением "Заполните все поля формы".
 Так же заметьте, что при работе с формой и таблицей, не должно быть перезагрузок страницы
 */

var mainJS = (function () {

	var table = document.getElementById('table'),
		addButton = document.querySelector('.addButton');

	/*Функция создания строки таблицы*/
	function addRow(name, value) {
		var tr = document.createElement('TR'),
			elemArr = [];

		tr.id = name;

		elemArr.push(name);
		elemArr.push(value);

		for (var i = 0; i <= elemArr.length; i++) {
			if (i != elemArr.length) {
				var td = document.createElement('TD');
				td.innerText = elemArr[i];
				tr.appendChild(td);
			} else {
				var tdDel = document.createElement('TD'),
					delBut = document.createElement('BUTTON');
				delBut.innerText = 'DELETE';
				tdDel.appendChild(delBut);
				tr.appendChild(tdDel);
			}
		}
		table.appendChild(tr);
	}

	/*Функция получения и обработки coockie*/
	function getCookie() {
		var firstCookie = document.cookie;
		if (firstCookie != '') {
			var firstCookieSplit = firstCookie.split('; '),
				cookieAsObj = firstCookieSplit.map((value)=> {
					var elem = value.split('=');
					return {
						name: elem[0],
						value: elem[1]
					}
				});

			if (cookieAsObj.length !== 0) {
				for (var i = 0; i < cookieAsObj.length; i++) {
					addRow(cookieAsObj[i].name, cookieAsObj[i].value);
				}
			}
		}
	}

	/*Функция удаления cookie и строки в таблице о ней*/
	function delCookie(e) {
		var delButton = e.target,//елемент по которому кликнули
			row = delButton.parentNode.parentNode,//строка по которой кликнули
			nameTD = row.firstChild,//первый дочерний элемент этой строки с именем куки для удаления
			name = nameTD.textContent,//имя куки для удаления
			value = nameTD.nextSibling.textContent;//значение куки для удаления

		if (confirm('Удалить cookie с именем: "' + name + '" ?')) {
			addOrDelCookie(name, value, -86400000);
			table.removeChild(row);
		}
	}

	/*Функция получения и проверки введённых данных*/
	function getInputValue() {
		var name = document.querySelector('.input-name').value,
			value = document.querySelector('.input-value').value,
			expires = document.querySelector('.input-expires').value;

		if (name == '' || value == '' || expires == '') {
			alert('Заполните все поля формы!')
		} else {
			addOrDelCookie(name, value, daytoMS(expires));
			if(!document.getElementById(name)) addRow(name,value);//проверка присутствия строки с cookie в таблице
			formClear();
		}
	}

	/*Функция перевода срока жизни cookie в милесекунды*/
	function daytoMS(day) {
		return parseInt(day) * 68400000;
	}

	/*Функция очистки полей форм*/
	function formClear() {
		document.querySelector('.input-name').value = '';
		document.querySelector('.input-value').value = '';
		document.querySelector('.input-expires').value = '';
	}

	/*Функция добавления или удаления cookie*/
	function addOrDelCookie(name, value, time) {
		var date = new Date(Date.now() + time).toUTCString();
		document.cookie = name + '=' + value + '; expires=' + date;
	}

	/*Функция прослушивания событий*/
	function _setUpListners() {
		table.addEventListener('click', delCookie);
		addButton.addEventListener('click', getInputValue);
	}

	/*Функция инициализации модуля*/
	function init() {
		document.cookie = 'firstCookie=123412345643634efgfdfsadf; expires=Sat, 31 Aug 2016 23:59:59 GMT';
		document.cookie = 'secondCookie=123412345643634efgfdfsadf; expires=Sat, 31 Aug 2016 23:59:59 GMT';
		document.cookie = 'thirdCookie=123412345643634efgfdfsadf; expires=Sat, 31 Aug 2016 23:54:59 GMT';
		_setUpListners();
		getCookie();
	}

	/*Возвращаю объект из модуля*/
	return {
		init: init
	}
})();

mainJS.init();