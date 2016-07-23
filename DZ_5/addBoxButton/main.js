var mainJS = (function () {

	let dropElem,
		offsetX = 0,
		offsetY = 0;

	/*Функция генерации случайного числа в заданном диапазоне*/
	function randDigital(min, max) {
		min = parseInt(min);
		max = parseInt(max);
		return Math.ceil(Math.random() * (max - min + 1)) + min;
	}

	/*Функция генерации случайного цвета*/
	function get_random_color() {
		return "#" + ((1 << 24) * Math.random() | 0).toString(16);
	}

	/*Функция создания и добавления элемента на страницу*/
	function createElem() {
		let doc = document.body,//сохраняю тело документа
			newElem = document.createElement('DIV'),//создаю элемент
			width = randDigital(10, 400),//вычисляю будущую ширину блока
			height = randDigital(10, 400),//вычисляю будущую высоту блока
			top = randDigital(0, (window.innerHeight - height)),
			left = randDigital(0, (window.innerWidth - width)),
			color = get_random_color();


		newElem.className = 'newElem';//добавляю новому элементу класс и прописываю визуальные стили
		newElem.setAttribute('style', 'position:absolute; top:' + top + 'px; left:' + left + 'px; width:' + width + 'px; height:' + height + 'px;' +
			' background:' + color);

		doc.appendChild(newElem);//добавляю новый элемент в тело документа
	}

	/*Функция отслеживания нажатия и удержания левой клавиши мыши*/
	function mouseDown(event) {
		if (event.target.className == 'newElem') {
			dropElem = event.target;
			offsetX = event.offsetX;
			offsetY = event.offsetY;
			console.log(event);
		}
	}

	/*Функцыя отслеживания отпускания левой клавиши мыши*/
	function mouseUp() {
		dropElem = null;
	}

	/*Функция отслеживания перетаскивания элемента*/
	function mouseMove(event) {
		if (dropElem) {
			dropElem.style.top = (event.clientY - offsetY + 'px');
			dropElem.style.left = (event.clientX - offsetX + 'px');
		}
	}

	/*Функция прослушивания событий*/
	function _setUpListners() {
		var button = document.querySelector('#addBox');//Сохраняю кнопку в переменную
		button.addEventListener('click', createElem);//Отслеживаю нажатие кнопки для создания нового элемента
		document.addEventListener('mousedown', mouseDown);//Отслеживание нажатия и удержания левой кнопки мыши
		document.addEventListener('mouseup', mouseUp);//Отслеживание отпускания левой кнопки мыши
		document.addEventListener('mousemove', mouseMove);//Отслеживание перемещения курсора мыши
	}

	/*Функция инициализации модуля*/
	function init() {
		_setUpListners();
	}

	/*Возвращаю объект из модуля*/
	return {
		init: init
	}
})();

mainJS.init();