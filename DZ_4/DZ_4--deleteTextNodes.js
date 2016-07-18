/*
 Задача:
 Создать модуль, который экспортирует функцию `deleteTextNodes`
 Эта функция принимает на вход элемент и должна удалить все текстовые узлы внутри указанного элемента.
 Функция может работать не рекурсивно, то есть не заходить внутрь дочерних элементов контейнера.
 */

function deleteTextNodes(elem) {
	var allChild = elem.childNodes;//получаю все дочерние узлы переданного элемента
	if(allChild.length != 0) {
		for (var i = 0; i < allChild.length; i++) {
			if (allChild[i].nodeType == 3) elem.removeChild(allChild[i]);//если дочерний элемент типа текст - удалить его
		}
	} else {
		console.log("Нет дочерних элементов.");
	}
}

module.exports = deleteTextNodes;