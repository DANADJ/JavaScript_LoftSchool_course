//Создать страницу, которая выводит все имеющиеся cookie в виде таблицы (имя, значение).
//	Для каждой cookie в таблице, необходимо добавить кнопку "удалить", При нажатии на "удалить", на экран должен быть выведен confirm с текстом
// "Удалить cookie с именем …?". Вместо … необходимо подставить имя удаляемой cookie. Если пользователь ответил положительно, то соответствующая
// cookie должна быть удалена.

var mainJS = (function () {

	var table = document.getElementById('table');

	/*Функция создания строки таблицы*/
	function addRow(idx, name, value) {
		var tr = document.createElement('TR'),
			elemArr = [];

		tr.id = 'row' + idx;

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
					addRow(i + 1, cookieAsObj[i].name, cookieAsObj[i].value);
				}
			}
		}
	}

	/*Функция удаления строки из таблицы*/
	function delCookie(e) {
		var delButton = e.target,
			row = delButton.parentNode.parentNode,
			nameTD = row.firstChild,
			name = nameTD.textContent,
			value = nameTD.nextSibling.textContent;

		if (confirm('Удалить cookie с именем: "' + name + '" ?')) {
			setExpires(name, value, -86400000);
			table.removeChild(row);
		}

	}

	/*Функция установки времени жизни cookie*/
	function setExpires(name, value, time) {
		var date = new Date(Date.now() + time).toUTCString();
		document.cookie = name + '=' + value + '; expires=' + date;
	}

	/*Функция прослушивания событий*/
	function _setUpListners() {
		var table = document.querySelector('.table');
		table.addEventListener('click', delCookie);
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