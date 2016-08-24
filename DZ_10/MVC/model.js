var Model = {
	login: function (appId, perms) {
		return new Promise(function (resolve, reject) {
			VK.init({
				apiId: appId
			});

			VK.Auth.login(function (response) {
				if (response.session) {
					resolve(response);
				} else {
					reject(new Error('Не удалось авторизоваться'));
				}
			}, perms);
		});
	},
	callApi: function (method, params) {
		return new Promise(function (resolve, reject) {
			VK.api(method, params, function (response) {
				if (response.error) {
					reject(new Error(response.error.error_msg));
				} else {
					resolve(response.response);
				}
			});
		});
	},
	getUser: function () {
		return this.callApi('users.get', {v: 5.53});
	},
	getMusic: function () {
		return this.callApi('audio.get', {v: 5.53});
	},
	getFriends: function () {
		return this.callApi('friends.get', {fields: 'photo_100', v: 5.53});
	},
	getNews: function () {
		return this.callApi('newsfeed.get', {filters: 'post', count: 20, v: 5.53});
	},
	getGroups: function () {
		return this.callApi('groups.get', {extended: 1, v: 5.53});
	},
	getAlbums: function () {
		return this.callApi('photos.getAlbums', {need_covers: 1, v: 5.53});
	},
	getPhotos: function (idAlbum) {
		return this.callApi('photos.get', {album_id: idAlbum, need_covers: 1, extended: 1, v: 5.53});
	}
};