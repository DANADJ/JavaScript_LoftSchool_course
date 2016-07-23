var mainJS = (function () {

	var allItems = document.getElementsByClassName('accordeon-item'),//Беру из документа все элементы с нужным классом и
	// сохраняю их в массив
		quantityOfHeadings = allItems.length;//Узнаю количество элементов и сохраняю это число в переменную

	/*Функция установки класса .active*/
	function addActiveClass (elem) {
		for (var i = 0; i < quantityOfHeadings; i++) {//проверяю каждый элемент массива с подгруппами
			if (elem === allItems[i]) {//нахожу конкретную подгруппу по которой кликнули
				elem.classList.toggle('active');//добавляю/удаляю класс active
			} else {
				allItems[i].classList.remove('active');//всем остальным элементам убираю класс active
			}
		}
	}

	/*Функция определяния родителя элемента по которому кликнули и вызова функции добавления класса .active*/
	function parent (elem){
		var target = elem.target;//сохраняю элемент по которому клинкнулти в переменную
		if(target.parentNode.className !== 'accordeon-item'){//если у родителя нет класса accordeon-item
			var firstParent = target.parentNode;//записываю элемент родитель в нову переменную
			addActiveClass(firstParent.parentNode);//и передаю его родителя в функцию добавления класса active
		} else {//иначе
			addActiveClass(target.parentNode);//сразу передаю родителя в функцию добавления класса active
		}
	}

	/*Функция прослушивания события клика*/
	function _setUpListners () {
		var accordeon = document.querySelector('.accordeon');//Сохраняю весб аккордеон в переменную
		accordeon.addEventListener('click', parent);//Прослушивание клика по любому элементу на аккордеоне для запуска функции
		// установки класса .active
	}

	/*Функция инициализации модуля*/
	function init () {
		_setUpListners();
	}

	/*Возвращаем объект из модуля*/
	return {
		init: init
	}
})();

mainJS.init();