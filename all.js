(function() {
	'use strict';

	angular
		.module('app', [
				'ngRoute',
				'ngMaterial'
			]);
		
})();
(function() {
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$http', 'dataService'];

	function mainCtrl($scope, $http, dataService) {
		var vm = this;
		vm.title = 'Resistance is Futile';
		vm.matchedSongs = [];
		vm.queryBySong = queryBySong;

		/*============================================
		=            function definitions            =
		============================================*/
		
		function queryBySong (song, artist) {
			dataService.getSongMatches(song, artist)
				.then(function(data) {
					vm.matchedSongs = data;
					console.log(vm.matchedSongs);
				});

		}
		
		/*=====  End of function definitions  ======*/
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.config(appRoutes);

	appRoutes.$inject = ['$routeProvider'];

	function appRoutes($routeProvider) {
		
		$routeProvider
			.when('/', {
				templateUrl: 'app/view/main.view.html',
				controller: 'mainCtrl',
				controllerAs: 'main'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.factory('dataService', dataService);

	dataService.$inject = ['$http'];

	function dataService($http) {
		var self = this;

		self.services = {
			getSongMatches: getSongMatches,
			getRecommendedSongs: getRecommendedSongs
		};

		return self.services;

		/*============================================
		=            function definitions            =
		============================================*/
		
		function getSongMatches (song, artist) {
			// var query_url = 'http://10.11.255.204:9010/SongSelection?song_name=' + song + '&artist_name=' + artist;
			var query_url = 'api/query1.json';
			
			return $http.get(query_url)
						.then(function(results) {
							return results.data;
						}, function(error) {
							console.log('Failed to load song matches: ', error);
						});
		}

		function getRecommendedSongs (refSongId, refArtistId, numRecSongs, pctSameArtist, simArtistParam, userName, simUserParam) {
			var query_url = 'http://10.11.255.204:9010/SongRecommendation?song_key=' + refSongId 
				+ '&artist_key=' + refArtistId 
				+ '&num_recs=' + numRecSongs 
				+ '&num_same_artist=' + Math.floor(pctSameArtist*numRecSongs/100)
				+ '&sim_artist_param=' + simArtistParam
				+ '&user_name=' + userName 
				+ '&sim_user_param=' + simUserParam;

			return $http.get(query_url)
						.then(function(results) {
							return results.data;
						}, function(error) {
							console.log('Failed to load recomended songs: ', error);
						});
		}

		/*=====  End of function definitions  ======*/
	}
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAuY29udHJvbGxlci5qcyIsImFwcC5yb3V0ZXMuanMiLCJhcHAuc2VydmljZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdhcHAnLCBbXHJcblx0XHRcdFx0J25nUm91dGUnLFxyXG5cdFx0XHRcdCduZ01hdGVyaWFsJ1xyXG5cdFx0XHRdKTtcclxuXHRcdFxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ2FwcCcpXHJcblx0XHQuY29udHJvbGxlcignbWFpbkN0cmwnLCBtYWluQ3RybCk7XHJcblxyXG5cdG1haW5DdHJsLiRpbmplY3QgPSBbJyRzY29wZScsICckaHR0cCcsICdkYXRhU2VydmljZSddO1xyXG5cclxuXHRmdW5jdGlvbiBtYWluQ3RybCgkc2NvcGUsICRodHRwLCBkYXRhU2VydmljZSkge1xyXG5cdFx0dmFyIHZtID0gdGhpcztcclxuXHRcdHZtLnRpdGxlID0gJ1Jlc2lzdGFuY2UgaXMgRnV0aWxlJztcclxuXHRcdHZtLm1hdGNoZWRTb25ncyA9IFtdO1xyXG5cdFx0dm0ucXVlcnlCeVNvbmcgPSBxdWVyeUJ5U29uZztcclxuXHJcblx0XHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ9ICAgICAgICAgICAgZnVuY3Rpb24gZGVmaW5pdGlvbnMgICAgICAgICAgICA9XHJcblx0XHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0XHRcclxuXHRcdGZ1bmN0aW9uIHF1ZXJ5QnlTb25nIChzb25nLCBhcnRpc3QpIHtcclxuXHRcdFx0ZGF0YVNlcnZpY2UuZ2V0U29uZ01hdGNoZXMoc29uZywgYXJ0aXN0KVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdHZtLm1hdGNoZWRTb25ncyA9IGRhdGE7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh2bS5tYXRjaGVkU29uZ3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Lyo9PT09PSAgRW5kIG9mIGZ1bmN0aW9uIGRlZmluaXRpb25zICA9PT09PT0qL1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdhcHAnKVxyXG5cdFx0LmNvbmZpZyhhcHBSb3V0ZXMpO1xyXG5cclxuXHRhcHBSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInXTtcclxuXHJcblx0ZnVuY3Rpb24gYXBwUm91dGVzKCRyb3V0ZVByb3ZpZGVyKSB7XHJcblx0XHRcclxuXHRcdCRyb3V0ZVByb3ZpZGVyXHJcblx0XHRcdC53aGVuKCcvJywge1xyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnYXBwL3ZpZXcvbWFpbi52aWV3Lmh0bWwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdtYWluQ3RybCcsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnbWFpbidcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm90aGVyd2lzZSh7XHJcblx0XHRcdFx0cmVkaXJlY3RUbzogJy8nXHJcblx0XHRcdH0pO1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdhcHAnKVxyXG5cdFx0LmZhY3RvcnkoJ2RhdGFTZXJ2aWNlJywgZGF0YVNlcnZpY2UpO1xyXG5cclxuXHRkYXRhU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cclxuXHRmdW5jdGlvbiBkYXRhU2VydmljZSgkaHR0cCkge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNlbGYuc2VydmljZXMgPSB7XHJcblx0XHRcdGdldFNvbmdNYXRjaGVzOiBnZXRTb25nTWF0Y2hlcyxcclxuXHRcdFx0Z2V0UmVjb21tZW5kZWRTb25nczogZ2V0UmVjb21tZW5kZWRTb25nc1xyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gc2VsZi5zZXJ2aWNlcztcclxuXHJcblx0XHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ9ICAgICAgICAgICAgZnVuY3Rpb24gZGVmaW5pdGlvbnMgICAgICAgICAgICA9XHJcblx0XHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0XHRcclxuXHRcdGZ1bmN0aW9uIGdldFNvbmdNYXRjaGVzIChzb25nLCBhcnRpc3QpIHtcclxuXHRcdFx0Ly8gdmFyIHF1ZXJ5X3VybCA9ICdodHRwOi8vMTAuMTEuMjU1LjIwNDo5MDEwL1NvbmdTZWxlY3Rpb24/c29uZ19uYW1lPScgKyBzb25nICsgJyZhcnRpc3RfbmFtZT0nICsgYXJ0aXN0O1xyXG5cdFx0XHR2YXIgcXVlcnlfdXJsID0gJ2FwaS9xdWVyeTEuanNvbic7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KHF1ZXJ5X3VybClcclxuXHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzLmRhdGE7XHJcblx0XHRcdFx0XHRcdH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ0ZhaWxlZCB0byBsb2FkIHNvbmcgbWF0Y2hlczogJywgZXJyb3IpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRSZWNvbW1lbmRlZFNvbmdzIChyZWZTb25nSWQsIHJlZkFydGlzdElkLCBudW1SZWNTb25ncywgcGN0U2FtZUFydGlzdCwgc2ltQXJ0aXN0UGFyYW0sIHVzZXJOYW1lLCBzaW1Vc2VyUGFyYW0pIHtcclxuXHRcdFx0dmFyIHF1ZXJ5X3VybCA9ICdodHRwOi8vMTAuMTEuMjU1LjIwNDo5MDEwL1NvbmdSZWNvbW1lbmRhdGlvbj9zb25nX2tleT0nICsgcmVmU29uZ0lkIFxyXG5cdFx0XHRcdCsgJyZhcnRpc3Rfa2V5PScgKyByZWZBcnRpc3RJZCBcclxuXHRcdFx0XHQrICcmbnVtX3JlY3M9JyArIG51bVJlY1NvbmdzIFxyXG5cdFx0XHRcdCsgJyZudW1fc2FtZV9hcnRpc3Q9JyArIE1hdGguZmxvb3IocGN0U2FtZUFydGlzdCpudW1SZWNTb25ncy8xMDApXHJcblx0XHRcdFx0KyAnJnNpbV9hcnRpc3RfcGFyYW09JyArIHNpbUFydGlzdFBhcmFtXHJcblx0XHRcdFx0KyAnJnVzZXJfbmFtZT0nICsgdXNlck5hbWUgXHJcblx0XHRcdFx0KyAnJnNpbV91c2VyX3BhcmFtPScgKyBzaW1Vc2VyUGFyYW07XHJcblxyXG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KHF1ZXJ5X3VybClcclxuXHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzLmRhdGE7XHJcblx0XHRcdFx0XHRcdH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ0ZhaWxlZCB0byBsb2FkIHJlY29tZW5kZWQgc29uZ3M6ICcsIGVycm9yKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Lyo9PT09PSAgRW5kIG9mIGZ1bmN0aW9uIGRlZmluaXRpb25zICA9PT09PT0qL1xyXG5cdH1cclxufSkoKTsiXX0=
