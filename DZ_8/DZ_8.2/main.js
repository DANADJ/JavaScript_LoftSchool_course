/*
 Создать приложение для ВКонтакте, которое загружает список ваших друзей и выводит их на страницу в следующем формате: Фото, ФИО, Возраст, Дата рождения.
 Друзья должны быть отсортированы по дате рождения в порядке убывания. То есть на самом верху списка расположен друг с ближайший датой рождения.
 Использование шаблонизатора приветствуется.
 */
;
var mainModul = (function () {

	function pageReady() {
		new Promise(function (resolve) {
			if (document.readyState == 'complete') {
				resolve();
			} else {
				window.onload = resolve;
			}
		}).then(function () {
				return new Promise(function (resolve, reject) {
					VK.init({
						apiId: 5571345
					});
					let cb = function (response) {
						if (response.session) {
							resolve(response);
						} else {
							reject(new Error('Отмена авторизации!'));
						}
					};
					VK.Auth.login(cb, 2);
				})
			}).then(function () {
				return new Promise(function (resolve, reject) {
					VK.Api.call('friends.get', {'fields': 'nickname, photo_100, bdate'}, function (ansver) {
						if (ansver.error) {
							reject(new Error('error'));
						} else {
							resolve(ansver.response);
						}
					})
				})
			}).then(function (arrFriends) {

				var date = new Date(),
					sort = function(a, b){
						return a.dateForSort - b.dateForSort;
					};

				var newArray = arrFriends.filter(function (val) {return (val.bdate)});
				newArray.forEach(function(val){
					//debugger;
					var dateInArr = val.bdate.split('.');
					if(dateInArr.length == 3){
						val.age = date.getFullYear() - dateInArr[2];
					} else {
						val.age = 'Скрыт';
					}
					val.dateForSort = new Date(2016, dateInArr[1] - 1, dateInArr[0]);
				});

				var dateBefore = newArray.filter(function(val){
					return date > val.dateForSort;
				}).sort(sort);

				var dateAfter = newArray.filter(function(val){
					return date <= val.dateForSort;
				}).sort(sort);

				newArray = dateAfter.concat(dateBefore);

				var source = document.getElementById('friend').innerHTML,
					templateFn = Handlebars.compile(source);
				document.getElementById('friends-list').innerHTML = templateFn({list: newArray});
			});
	}

	/*Функция инициализации модуля*/
	function init() {
		pageReady();
	}

	return {
		init: init
	}
})();

mainModul.init();