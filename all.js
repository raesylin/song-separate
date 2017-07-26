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
					console.log('here');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAuY29udHJvbGxlci5qcyIsImFwcC5yb3V0ZXMuanMiLCJhcHAuc2VydmljZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdhcHAnLCBbXHJcblx0XHRcdFx0J25nUm91dGUnLFxyXG5cdFx0XHRcdCduZ01hdGVyaWFsJ1xyXG5cdFx0XHRdKTtcclxuXHRcdFxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ2FwcCcpXHJcblx0XHQuY29udHJvbGxlcignbWFpbkN0cmwnLCBtYWluQ3RybCk7XHJcblxyXG5cdG1haW5DdHJsLiRpbmplY3QgPSBbJyRzY29wZScsICckaHR0cCcsICdkYXRhU2VydmljZSddO1xyXG5cclxuXHRmdW5jdGlvbiBtYWluQ3RybCgkc2NvcGUsICRodHRwLCBkYXRhU2VydmljZSkge1xyXG5cclxuXHRcdCRzY29wZS5mb3JtMUZvY3VzZWQgPSBmYWxzZTtcclxuXHRcdCRzY29wZS5zaG93Rm9ybTEgPSB0cnVlO1xyXG5cdFx0JHNjb3BlLnNob3dGb3JtMiA9IGZhbHNlO1xyXG5cdFx0JHNjb3BlLmNvbGxhcHNlRm9ybTIgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0dmFyIHZtID0gdGhpcztcclxuXHRcdHZtLm1hdGNoZWRTb25ncyA9IFtdO1xyXG5cdFx0dm0ucmVjb21kU29uZ3MgPSBbXTtcclxuXHRcdHZtLm51bVJlY3MgPSAwO1xyXG5cdFx0dm0uZnJhYyA9IDA7XHJcblx0XHR2bS5zZWxlY3RlZFNvbmdJRCA9ICcnO1xyXG5cdFx0dm0ucXVlcnlCeVNvbmcgPSBxdWVyeUJ5U29uZztcclxuXHRcdHZtLnF1ZXJ5UmVjb20gPSBxdWVyeVJlY29tO1xyXG5cclxuXHRcdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdD0gICAgICAgICAgICBmdW5jdGlvbiBkZWZpbml0aW9ucyAgICAgICAgICAgID1cclxuXHRcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHRcdFxyXG5cclxuXHRcdGZ1bmN0aW9uIHF1ZXJ5QnlTb25nIChzb25nLCBhcnRpc3QpIHtcclxuXHRcdFx0Ly8gJHNjb3BlLmZvcm0xRm9jdXNlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0ZGF0YVNlcnZpY2UuZ2V0U29uZ01hdGNoZXMoc29uZywgYXJ0aXN0KVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdHZtLm1hdGNoZWRTb25ncyA9IGRhdGE7XHJcblx0XHRcdFx0XHRpZiAodm0ubWF0Y2hlZFNvbmdzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0JHNjb3BlLnNob3dGb3JtMiA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh2bS5tYXRjaGVkU29uZ3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBxdWVyeVJlY29tKG51bVJlY3MsIGZyYWMsIHNvbmdJRCkge1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWRBcnRpc3RJRCA9ICcnO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZtLm1hdGNoZWRTb25ncy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRpZiAodm0ubWF0Y2hlZFNvbmdzW2ldLnNvbmdJRCA9PT0gc29uZ0lEKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnaGVyZScpO1xyXG5cdFx0XHRcdFx0c2VsZWN0ZWRBcnRpc3RJRCA9IHZtLm1hdGNoZWRTb25nc1tpXS5hcnRpc3RJRDtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coJ3NlbGVjdGVkYXJ0aXN0Jywgc2VsZWN0ZWRBcnRpc3RJRCk7XHJcblxyXG5cdFx0XHRkYXRhU2VydmljZS5nZXRSZWNvbW1lbmRlZFNvbmdzKHNvbmdJRCwgc2VsZWN0ZWRBcnRpc3RJRCwgbnVtUmVjcywgZnJhYylcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHQkc2NvcGUuc2hvd0Zvcm0xID0gZmFsc2U7XHJcblx0XHRcdFx0XHR2bS5yZWNvbWRTb25ncyA9IGRhdGE7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qPT09PT0gIEVuZCBvZiBmdW5jdGlvbiBkZWZpbml0aW9ucyAgPT09PT09Ki9cclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhclxyXG5cdFx0Lm1vZHVsZSgnYXBwJylcclxuXHRcdC5jb25maWcoYXBwUm91dGVzKTtcclxuXHJcblx0YXBwUm91dGVzLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJ107XHJcblxyXG5cdGZ1bmN0aW9uIGFwcFJvdXRlcygkcm91dGVQcm92aWRlcikge1xyXG5cdFx0XHJcblx0XHQkcm91dGVQcm92aWRlclxyXG5cdFx0XHQud2hlbignLycsIHtcclxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC92aWV3L21haW4udmlldy5odG1sJyxcclxuXHRcdFx0XHRjb250cm9sbGVyOiAnbWFpbkN0cmwnLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ21haW4nXHJcblx0XHRcdH0pXHJcblx0XHRcdC5vdGhlcndpc2Uoe1xyXG5cdFx0XHRcdHJlZGlyZWN0VG86ICcvJ1xyXG5cdFx0XHR9KTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhclxyXG5cdFx0Lm1vZHVsZSgnYXBwJylcclxuXHRcdC5mYWN0b3J5KCdkYXRhU2VydmljZScsIGRhdGFTZXJ2aWNlKTtcclxuXHJcblx0ZGF0YVNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcblx0ZnVuY3Rpb24gZGF0YVNlcnZpY2UoJGh0dHApIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0XHRzZWxmLnNlcnZpY2VzID0ge1xyXG5cdFx0XHRnZXRTb25nTWF0Y2hlczogZ2V0U29uZ01hdGNoZXMsXHJcblx0XHRcdGdldFJlY29tbWVuZGVkU29uZ3M6IGdldFJlY29tbWVuZGVkU29uZ3NcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIHNlbGYuc2VydmljZXM7XHJcblxyXG5cdFx0Lyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0PSAgICAgICAgICAgIGZ1bmN0aW9uIGRlZmluaXRpb25zICAgICAgICAgICAgPVxyXG5cdFx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cdFx0XHJcblx0XHRmdW5jdGlvbiBnZXRTb25nTWF0Y2hlcyAoc29uZywgYXJ0aXN0KSB7XHJcblx0XHRcdC8vIHZhciBxdWVyeV91cmwgPSAnaHR0cDovLzEwLjExLjI1NS4yMDQ6OTAxMC9Tb25nU2VsZWN0aW9uP3NvbmdfbmFtZT0nICsgc29uZyArICcmYXJ0aXN0X25hbWU9JyArIGFydGlzdDtcclxuXHRcdFx0dmFyIHF1ZXJ5X3VybCA9ICdhcGkvcXVlcnkxLmpzb24nO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuICRodHRwLmdldChxdWVyeV91cmwpXHJcblx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cy5kYXRhO1xyXG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gbG9hZCBzb25nIG1hdGNoZXM6ICcsIGVycm9yKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0UmVjb21tZW5kZWRTb25ncyAocmVmU29uZ0lkLCByZWZBcnRpc3RJZCwgbnVtUmVjU29uZ3MsIGZyYWMpIHtcclxuXHRcdFx0Ly8gdmFyIHF1ZXJ5X3VybCA9ICdodHRwOi8vMTAuMTEuMjU1LjIwNDo5MDEwL1NvbmdSZWNvbW1lbmRhdGlvbj9zb25nX2tleT0nICsgcmVmU29uZ0lkIFxyXG5cdFx0XHQvLyBcdCsgJyZhcnRpc3Rfa2V5PScgKyByZWZBcnRpc3RJZCBcclxuXHRcdFx0Ly8gXHQrICcmbnVtX3JlY3M9JyArIG51bVJlY1NvbmdzIFxyXG5cdFx0XHQvLyBcdCsgJyZudW1fc2FtZV9hcnRpc3Q9JyArIE1hdGguZmxvb3IocGN0U2FtZUFydGlzdCpudW1SZWNTb25ncy8xMDApXHJcblx0XHRcdC8vIFx0KyAnJnNpbV9hcnRpc3RfcGFyYW09JyArIHNpbUFydGlzdFBhcmFtXHJcblx0XHRcdC8vIFx0KyAnJnVzZXJfbmFtZT0nICsgdXNlck5hbWUgXHJcblx0XHRcdC8vIFx0KyAnJnNpbV91c2VyX3BhcmFtPScgKyBzaW1Vc2VyUGFyYW07XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlfdXJsID0gJ2FwaS9xdWVyeTIuanNvbic7XHJcblxyXG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KHF1ZXJ5X3VybClcclxuXHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlZlNvbmdJZCwgcmVmQXJ0aXN0SWQsIG51bVJlY1NvbmdzLCBmcmFjKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cy5kYXRhO1xyXG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gbG9hZCByZWNvbWVuZGVkIHNvbmdzOiAnLCBlcnJvcik7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qPT09PT0gIEVuZCBvZiBmdW5jdGlvbiBkZWZpbml0aW9ucyAgPT09PT09Ki9cclxuXHR9XHJcbn0pKCk7Il19
