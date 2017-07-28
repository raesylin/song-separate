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

		$scope.form1Focused = false;
		$scope.showForm1 = true;
		$scope.showForm2 = false;
		$scope.collapseForm2 = false;


		var vm = this;
		vm.matchedSongs = [];
		vm.recomdSongs = [];
		vm.numRecs = 0;
		vm.frac = 0;
		vm.selectedSongID = '';
		vm.queryBySong = queryBySong;
		vm.queryRecom = queryRecom;

		/*============================================
		=            function definitions            =
		============================================*/
		

		function queryBySong (song, artist) {
			// $scope.form1Focused = false;

			dataService.getSongMatches(song, artist)
				.then(function(data) {
					vm.matchedSongs = data;
					if (vm.matchedSongs.length > 0) {
						$scope.showForm2 = true;
					}
					console.log(vm.matchedSongs);
				});

		}

		function queryRecom(numRecs, frac, songID) {
			var selectedArtistID = '';
			for (var i = 0; i < vm.matchedSongs.length; i++) {

				if (vm.matchedSongs[i].songID === songID) {
					selectedArtistID = vm.matchedSongs[i].artistID;
					break;
				}
			}

			console.log('selectedartist', selectedArtistID);

			dataService.getRecommendedSongs(songID, selectedArtistID, numRecs, frac)
				.then(function(data) {
					$scope.showForm1 = false;
					vm.recomdSongs = data;
					console.log(data);
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

	appRoutes.$inject = ['$routeProvider', '$locationProvider'];

	function appRoutes($routeProvider, $locationProvider) {
		
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

		function getRecommendedSongs (refSongId, refArtistId, numRecSongs, frac) {
			// var query_url = 'http://10.11.255.204:9010/SongRecommendation?song_key=' + refSongId 
			// 	+ '&artist_key=' + refArtistId 
			// 	+ '&num_recs=' + numRecSongs 
			// 	+ '&num_same_artist=' + Math.floor(pctSameArtist*numRecSongs/100)
			// 	+ '&sim_artist_param=' + simArtistParam
			// 	+ '&user_name=' + userName 
			// 	+ '&sim_user_param=' + simUserParam;

			var query_url = 'api/query2.json';

			return $http.get(query_url)
						.then(function(results) {
							console.log(refSongId, refArtistId, numRecSongs, frac);
							return results.data;
						}, function(error) {
							console.log('Failed to load recomended songs: ', error);
						});
		}

		/*=====  End of function definitions  ======*/
	}
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAuY29udHJvbGxlci5qcyIsImFwcC5yb3V0ZXMuanMiLCJhcHAuc2VydmljZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdhcHAnLCBbXHJcblx0XHRcdFx0J25nUm91dGUnLFxyXG5cdFx0XHRcdCduZ01hdGVyaWFsJ1xyXG5cdFx0XHRdKTtcclxuXHRcdFxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ2FwcCcpXHJcblx0XHQuY29udHJvbGxlcignbWFpbkN0cmwnLCBtYWluQ3RybCk7XHJcblxyXG5cdG1haW5DdHJsLiRpbmplY3QgPSBbJyRzY29wZScsICckaHR0cCcsICdkYXRhU2VydmljZSddO1xyXG5cclxuXHRmdW5jdGlvbiBtYWluQ3RybCgkc2NvcGUsICRodHRwLCBkYXRhU2VydmljZSkge1xyXG5cclxuXHRcdCRzY29wZS5mb3JtMUZvY3VzZWQgPSBmYWxzZTtcclxuXHRcdCRzY29wZS5zaG93Rm9ybTEgPSB0cnVlO1xyXG5cdFx0JHNjb3BlLnNob3dGb3JtMiA9IGZhbHNlO1xyXG5cdFx0JHNjb3BlLmNvbGxhcHNlRm9ybTIgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0dmFyIHZtID0gdGhpcztcclxuXHRcdHZtLm1hdGNoZWRTb25ncyA9IFtdO1xyXG5cdFx0dm0ucmVjb21kU29uZ3MgPSBbXTtcclxuXHRcdHZtLm51bVJlY3MgPSAwO1xyXG5cdFx0dm0uZnJhYyA9IDA7XHJcblx0XHR2bS5zZWxlY3RlZFNvbmdJRCA9ICcnO1xyXG5cdFx0dm0ucXVlcnlCeVNvbmcgPSBxdWVyeUJ5U29uZztcclxuXHRcdHZtLnF1ZXJ5UmVjb20gPSBxdWVyeVJlY29tO1xyXG5cclxuXHRcdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdD0gICAgICAgICAgICBmdW5jdGlvbiBkZWZpbml0aW9ucyAgICAgICAgICAgID1cclxuXHRcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHRcdFxyXG5cclxuXHRcdGZ1bmN0aW9uIHF1ZXJ5QnlTb25nIChzb25nLCBhcnRpc3QpIHtcclxuXHRcdFx0Ly8gJHNjb3BlLmZvcm0xRm9jdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0ZGF0YVNlcnZpY2UuZ2V0U29uZ01hdGNoZXMoc29uZywgYXJ0aXN0KVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdHZtLm1hdGNoZWRTb25ncyA9IGRhdGE7XHJcblx0XHRcdFx0XHRpZiAodm0ubWF0Y2hlZFNvbmdzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0JHNjb3BlLnNob3dGb3JtMiA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh2bS5tYXRjaGVkU29uZ3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBxdWVyeVJlY29tKG51bVJlY3MsIGZyYWMsIHNvbmdJRCkge1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWRBcnRpc3RJRCA9ICcnO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZtLm1hdGNoZWRTb25ncy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRpZiAodm0ubWF0Y2hlZFNvbmdzW2ldLnNvbmdJRCA9PT0gc29uZ0lEKSB7XHJcblx0XHRcdFx0XHRzZWxlY3RlZEFydGlzdElEID0gdm0ubWF0Y2hlZFNvbmdzW2ldLmFydGlzdElEO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZygnc2VsZWN0ZWRhcnRpc3QnLCBzZWxlY3RlZEFydGlzdElEKTtcclxuXHJcblx0XHRcdGRhdGFTZXJ2aWNlLmdldFJlY29tbWVuZGVkU29uZ3Moc29uZ0lELCBzZWxlY3RlZEFydGlzdElELCBudW1SZWNzLCBmcmFjKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdCRzY29wZS5zaG93Rm9ybTEgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHZtLnJlY29tZFNvbmdzID0gZGF0YTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Lyo9PT09PSAgRW5kIG9mIGZ1bmN0aW9uIGRlZmluaXRpb25zICA9PT09PT0qL1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdhcHAnKVxyXG5cdFx0LmNvbmZpZyhhcHBSb3V0ZXMpO1xyXG5cclxuXHRhcHBSb3V0ZXMuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInXTtcclxuXHJcblx0ZnVuY3Rpb24gYXBwUm91dGVzKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG5cdFx0XHJcblx0XHQkcm91dGVQcm92aWRlclxyXG5cdFx0XHQud2hlbignLycsIHtcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC92aWV3L21haW4udmlldy5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnbWFpbkN0cmwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ21haW4nXHJcblx0XHRcdH0pXHJcblx0XHRcdC5vdGhlcndpc2Uoe1xyXG5cdFx0XHRcdHJlZGlyZWN0VG86ICcvJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0fVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ2FwcCcpXHJcblx0XHQuZmFjdG9yeSgnZGF0YVNlcnZpY2UnLCBkYXRhU2VydmljZSk7XHJcblxyXG5cdGRhdGFTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG5cdGZ1bmN0aW9uIGRhdGFTZXJ2aWNlKCRodHRwKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0c2VsZi5zZXJ2aWNlcyA9IHtcclxuXHRcdFx0Z2V0U29uZ01hdGNoZXM6IGdldFNvbmdNYXRjaGVzLFxyXG5cdFx0XHRnZXRSZWNvbW1lbmRlZFNvbmdzOiBnZXRSZWNvbW1lbmRlZFNvbmdzXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBzZWxmLnNlcnZpY2VzO1xyXG5cclxuXHRcdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdD0gICAgICAgICAgICBmdW5jdGlvbiBkZWZpbml0aW9ucyAgICAgICAgICAgID1cclxuXHRcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHRcdFxyXG5cdFx0ZnVuY3Rpb24gZ2V0U29uZ01hdGNoZXMgKHNvbmcsIGFydGlzdCkge1xyXG5cdFx0XHQvLyB2YXIgcXVlcnlfdXJsID0gJ2h0dHA6Ly8xMC4xMS4yNTUuMjA0OjkwMTAvU29uZ1NlbGVjdGlvbj9zb25nX25hbWU9JyArIHNvbmcgKyAnJmFydGlzdF9uYW1lPScgKyBhcnRpc3Q7XHJcblx0XHRcdHZhciBxdWVyeV91cmwgPSAnYXBpL3F1ZXJ5MS5qc29uJztcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiAkaHR0cC5nZXQocXVlcnlfdXJsKVxyXG5cdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbihyZXN1bHRzKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHMuZGF0YTtcclxuXHRcdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnRmFpbGVkIHRvIGxvYWQgc29uZyBtYXRjaGVzOiAnLCBlcnJvcik7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldFJlY29tbWVuZGVkU29uZ3MgKHJlZlNvbmdJZCwgcmVmQXJ0aXN0SWQsIG51bVJlY1NvbmdzLCBmcmFjKSB7XHJcblx0XHRcdC8vIHZhciBxdWVyeV91cmwgPSAnaHR0cDovLzEwLjExLjI1NS4yMDQ6OTAxMC9Tb25nUmVjb21tZW5kYXRpb24/c29uZ19rZXk9JyArIHJlZlNvbmdJZCBcclxuXHRcdFx0Ly8gXHQrICcmYXJ0aXN0X2tleT0nICsgcmVmQXJ0aXN0SWQgXHJcblx0XHRcdC8vIFx0KyAnJm51bV9yZWNzPScgKyBudW1SZWNTb25ncyBcclxuXHRcdFx0Ly8gXHQrICcmbnVtX3NhbWVfYXJ0aXN0PScgKyBNYXRoLmZsb29yKHBjdFNhbWVBcnRpc3QqbnVtUmVjU29uZ3MvMTAwKVxyXG5cdFx0XHQvLyBcdCsgJyZzaW1fYXJ0aXN0X3BhcmFtPScgKyBzaW1BcnRpc3RQYXJhbVxyXG5cdFx0XHQvLyBcdCsgJyZ1c2VyX25hbWU9JyArIHVzZXJOYW1lIFxyXG5cdFx0XHQvLyBcdCsgJyZzaW1fdXNlcl9wYXJhbT0nICsgc2ltVXNlclBhcmFtO1xyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5X3VybCA9ICdhcGkvcXVlcnkyLmpzb24nO1xyXG5cclxuXHRcdFx0cmV0dXJuICRodHRwLmdldChxdWVyeV91cmwpXHJcblx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZWZTb25nSWQsIHJlZkFydGlzdElkLCBudW1SZWNTb25ncywgZnJhYyk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHMuZGF0YTtcclxuXHRcdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnRmFpbGVkIHRvIGxvYWQgcmVjb21lbmRlZCBzb25nczogJywgZXJyb3IpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvKj09PT09ICBFbmQgb2YgZnVuY3Rpb24gZGVmaW5pdGlvbnMgID09PT09PSovXHJcblx0fVxyXG59KSgpOyJdfQ==
