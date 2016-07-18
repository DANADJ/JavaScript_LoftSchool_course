/*
Задача:
Создать модуль, который экспортирует функцию `prepend`
prepend имеет два параметра, в которые нужно передать элементы
Задача функции - вставить второй элемент в начало первого.
Например:
`prepend(container, newElement)` - newElement должен быть добавлен в начало элемента container.
*/



/*Функция принимает два строковых параметра. Первый - это элемент на странице, второй это новый вставляемый элемент*/
function prepend(container, newElem) {
	let cont =  document.querySelector(container),//нахожу нужный элемент на странице по его CSS селектору
		firstChild = cont.firstElementChild,//нахожу первый дочерний элемент в элементе-контейнере
		addElem = document.createElement(newElem);//создаю новый элемент с заданным тегом
		addElem.innerText = 'Новый элемент';//Добавляю в новый элемент текст для того чтобы его было видно при добавлении
	if(firstChild === null){//если дочерних элементов нет,
		cont.appendChild(addElem);//добавляю просто новый элемент
	} else {//если есть хотябы один дочерний элемент
		cont.insertBefore(addElem, firstChild);//то добавляю новый элемент в начало элемента контейнера
	}
}

module.exports = prepend;