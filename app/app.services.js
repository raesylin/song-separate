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