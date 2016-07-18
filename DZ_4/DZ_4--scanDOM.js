//Создать модуль, который экспортирует функцию `scanDOM`.
//	`scanDOM` должна перебирать все узлы на странице и выводить в консоль статистику по элементам и классам на странице. Например:
//Тэгов div: 10
//Тэгов a: 5
//Тэгов span: 10
//Текстовых узлов: 100
//Элементов с классом c1: 10
//Элементов с классом c2: 20
//
//Количеств и название классов/тегов заранее неизвестно. Функция сама должна определить количество и название тегов/классов.

function scanDOM() {
	var body = document.querySelector('body'),//получаю все элементы тела документа
		allDOMelem = body.childNodes,//создаю список со всеми дочериними элементами документа, для проверки наличия их в документе
		objList = {//создаю результирующий объект в который буду записывать найденные объекты и их количесвтво
			nodes: {
				textNode: 0,
				elemNode: 0,
				comment: 0
			},
			tags: {},
			classes: {},
			ids: {}
		};
	if (allDOMelem.length == 0) {
		return console.log('Документ пуст.');//если дочерних элементов нет, вывожу сообщение в консоль
	}

	//Функцыя сканирования имён всех свойств результирующего объекта
	function scanPropResObj(namePropResObj, flag) {
		var allPropFlagGroupResObj = Object.keys(objList[flag]);
		for (var i = 0; i < allPropFlagGroupResObj.length; i++) {
			if (allPropFlagGroupResObj[i] == namePropResObj) {
				return true;
			}
		}
		return false;
	}

	//Функция определения тега и записи его имени в результирующий объект
	function tegName(elem) {
		var tegName = elem.tagName;
		if (scanPropResObj(tegName, 'tags')) {
			objList.tags[tegName]++;
		} else {
			objList.tags[tegName] = 1;
		}
	}

	//Функция определения классов у элемента и записи их в результирующий объект
	function getClass(elem) {
		var strOfClasses = elem.getAttribute('class');
		if (strOfClasses != null) {
			var arrClasses = strOfClasses.split(' ');
			if (arrClasses.length != 0) {
				for (var i = 0; i < arrClasses.length; i++) {
					if (scanPropResObj(arrClasses[i], 'classes')) {
						objList.classes[arrClasses[i]]++;
					} else {
						objList.classes[arrClasses[i]] = 1;
					}
				}
			}
		}
	}

	//Функция определения классов у элемента и записи их в результирующий объект
	function getID(elem) {
		var id = elem.getAttribute('id');
		if (id != null) {
			if (scanPropResObj(id, 'ids')) {
				objList.ids[id] = '!!!> (id > 1) <!!!';
			} else {
				objList.ids[id] = '1';
			}
		}
	}

	//Функция сканирования элемента
	function scanElem(elem) {
		tegName(elem);
		getClass(elem);
		getID(elem);
		scanChilds(elem);
	}

	//Функция вывода всех свойств результирующего объекта в консоль
	function scanObjList(obj) {
		var allGroup = Object.keys(obj);
		for (var i = 0; i < allGroup.length; i++) {
			console.log('--------------------');
			console.log(allGroup[i] + ':');
			var group = Object.keys(obj[allGroup[i]]);
			for (var x = 0; x < group.length; x++) {
				var number = x + 1;
				console.log('    ' + number + ') ' + group[x] + ' : ' + obj[allGroup[i]][group[x]]);
			}
		}
	}

	//Функция сканирования любого элемента документа и выявления узлов различных типов
	function scanChilds(elem) {
		var elemChild = elem.childNodes;
		for (var i = 0; i < elemChild.length; i++) {
			if (elemChild[i].nodeType == 1) {//если дочерний элемент типа ЕЛЕМЕНТ, то обрабатываю его дальше как элемент
				objList.nodes.elemNode++;//изменяю число дочерних элементов типа ЕЛЕМЕНТ в результирующем объекте
				scanElem(elemChild[i]);
			} else if (elemChild[i].nodeType == 3) {//если дочерний элемент типа ТЕКС, то изменяю их число в результирующем объекте
				objList.nodes.textNode++;
			} else if (elemChild[i].nodeType == 8) {//если дочерний элемент типа КОММЕНТАРИЙ, то изменяю их число в результирующем объекте
				objList.nodes.comment++;
			}
		}
	}

	scanChilds(body);//вызываю функцию сканирования документа
	scanObjList(objList);//вызываю функцию вывода элементов документа в консоль
}

module.exports = scanDOM;