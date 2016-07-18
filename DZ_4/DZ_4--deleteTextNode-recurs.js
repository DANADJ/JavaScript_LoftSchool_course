/*
 Задача:
 Создать модуль, который экспортирует функцию `deleteTextNodes`
 Эта функция принимает на вход элемент и должна удалить все текстовые узлы внутри указанного элемента.
 Функция должна работать рекурсивно, то есть заходить внутрь дочерних элементов контейнера.
 */

function deleteTextNodesRecurs(elem) {
	var allChild = elem.childNodes;//получаю все дочерние узлы переданного элемента
	if(allChild.length != 0) {
		for (var i = 0; i < allChild.length; i++) {
			if (allChild[i].nodeType == 1) deleteTextNodesRecurs(allChild[i]);
			else if (allChild[i].nodeType == 3) elem.removeChild(allChild[i]);//если дочерний элемент типа текст - удалить его
		}
	} else {
		console.log("Нет дочерних элементов.");
	}
}

module.exports = deleteTextNodesRecurs;