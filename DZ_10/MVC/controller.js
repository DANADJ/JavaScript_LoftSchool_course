var Controller = {
	musicRoute: function () {
		return Model.getMusic().then(function (music) {
			results.innerHTML = View.render('music', {list: music.items});
		});
	},
	friendsRoute: function () {
		return Model.getFriends().then(function (friends) {
			results.innerHTML = View.render('friends', {list: friends.items});
		});
	},
	newsRoute: function () {
		return Model.getNews().then(function (news) {
			results.innerHTML = View.render('news', {list: news.items});
		});
	},
	groupsRoute: function () {
		return Model.getGroups().then(function (groups) {
			results.innerHTML = View.render('groups', {list: groups.items});
		});
	},
	albumsRoute: function () {
		return Model.getAlbums().then(function (albums) {
			results.innerHTML = View.render('albums', {list: albums.items});
		});
	},
	photosRoute: function (idAlbum) {
		return Model.getPhotos(idAlbum).then(function (photos) {
			results.innerHTML = View.render('photos', {list: photos.items});
		});
	}
};
